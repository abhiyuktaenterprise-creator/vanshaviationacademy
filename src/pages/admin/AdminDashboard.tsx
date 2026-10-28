import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { studentService } from '@/services/studentService';
import { Student, NewStudentInput } from '@/types/student';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  LogOut,
  Eye,
  Pencil,
  Trash2,
  Archive,
  RotateCcw,
  ExternalLink,
  Award,
  Download,
  Upload,
  RefreshCw,
  Camera,
  X,
  Plane,
  Calendar,
  User,
  Phone,
  Mail,
  BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';
import { CertificateModal } from '@/components/admin/CertificateModal';

const logoImage = '/vanshaviation-logo.png';

const POPULAR_COURSES = [
  'Commercial Pilot License (CPL)',
  'Private Pilot License (PPL)',
  'DGCA Aviation Ground School',
  'Flight Simulator & RTR(A) Training',
  'Ground Services & Airport Operations',
  'Cabin Crew & Hospitality',
];

// Helper: Compress photo on client canvas to lightweight base64
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxSize = 400; // Passport photo optimal dimension

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [certStudent, setCertStudent] = useState<Student | null>(null);

  const handleOpenCertificate = (student?: Student | null) => {
    setCertStudent(student || null);
    setShowCertModal(true);
  };

  // Active student targets
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputAddRef = useRef<HTMLInputElement>(null);
  const photoInputEditRef = useRef<HTMLInputElement>(null);

  // Form state
  const initialFormState: NewStudentInput = {
    student_name: '',
    father_name: '',
    date_of_birth: '',
    mobile_number: '',
    email: '',
    application_number: '',
    registration_number: '',
    course_name: 'Commercial Pilot License (CPL)',
    admission_date: '',
    course_start_date: '',
    course_end_date: '',
    status: 'Completed',
    photo_url: null,
  };

  const [formData, setFormData] = useState<NewStudentInput>(initialFormState);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Load students
  const loadStudents = async () => {
    setLoading(true);
    const res = await studentService.getStudents(searchQuery, showArchived);
    if (res.error) {
      toast.error('Error', { description: res.error });
    } else {
      setStudents(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, [showArchived]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadStudents();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Logout handler
  const handleLogout = async () => {
    await authService.signOutAdmin();
    toast.success('Signed out successfully');
    navigate('/admin/login', { replace: true });
  };

  // Generate next sequential registration and application numbers starting from 101
  const getNextSequentialIds = () => {
    const year = new Date().getFullYear();
    let maxNum = 100;

    students.forEach((s) => {
      const regMatch = s.registration_number.match(/-0*(\d+)$/);
      if (regMatch) {
        const num = parseInt(regMatch[1], 10);
        if (!isNaN(num) && num > maxNum && num < 1000) {
          maxNum = num;
        }
      }
    });

    const nextNumber = maxNum + 1;
    return {
      registration_number: `VAA-${year}-${nextNumber}`,
      application_number: `VAA-APP-${year}-${nextNumber}`,
    };
  };

  // Open Add modal
  const handleOpenAdd = () => {
    const { registration_number, application_number } = getNextSequentialIds();
    const today = new Date().toISOString().slice(0, 10);
    setFormData({
      ...initialFormState,
      application_number,
      registration_number,
      admission_date: today,
      course_start_date: today,
      course_end_date: '',
    });
    setIsAddOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      student_name: student.student_name,
      father_name: student.father_name,
      date_of_birth: student.date_of_birth,
      mobile_number: student.mobile_number || '',
      email: student.email || '',
      application_number: student.application_number,
      registration_number: student.registration_number,
      course_name: student.course_name,
      admission_date: student.admission_date,
      course_start_date: student.course_start_date,
      course_end_date: student.course_end_date || '',
      status: student.status,
      photo_url: student.photo_url || null,
    });
    setIsEditOpen(true);
  };

  // Upload Photo handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG or PNG)');
      return;
    }
    try {
      toast.loading('Processing photo...', { id: 'photo-upload' });
      const compressedBase64 = await compressImage(file);
      setFormData((prev) => ({ ...prev, photo_url: compressedBase64 }));
      toast.success('Photo attached successfully!', { id: 'photo-upload' });
    } catch {
      toast.error('Failed to process photo', { id: 'photo-upload' });
    }
    e.target.value = '';
  };

  // Remove Photo handler
  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photo_url: null }));
    toast.info('Photo removed');
  };

  // Open View modal
  const handleOpenView = (student: Student) => {
    setSelectedStudent(student);
    setIsViewOpen(true);
  };

  // Open Delete modal
  const handleOpenDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  // Submit Add Student
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    const res = await studentService.addStudent(formData);
    if (res.error) {
      toast.error('Could not add student', { description: res.error });
      setFormSubmitting(false);
      return;
    }

    toast.success('Student registered successfully!', {
      description: `${formData.student_name} (${formData.registration_number})`,
    });
    setIsAddOpen(false);
    setFormSubmitting(false);
    loadStudents();
  };

  // Submit Edit Student
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    setFormSubmitting(true);

    const res = await studentService.updateStudent(selectedStudent.id, formData);
    if (res.error) {
      toast.error('Could not update student', { description: res.error });
      setFormSubmitting(false);
      return;
    }

    toast.success('Student updated successfully!');
    setIsEditOpen(false);
    setFormSubmitting(false);
    loadStudents();
  };

  // Toggle Archive
  const handleToggleArchive = async (student: Student) => {
    const nextStatus = !student.is_archived;
    const res = await studentService.toggleArchive(student.id, student.is_archived);
    if (res.error) {
      toast.error('Error', { description: res.error });
      return;
    }
    toast.success(nextStatus ? 'Student moved to archive' : 'Student restored');
    loadStudents();
  };

  // Permanent Delete
  const handlePermanentDelete = async () => {
    if (!selectedStudent) return;
    const res = await studentService.deleteStudent(selectedStudent.id);
    if (res.error) {
      toast.error('Delete failed', { description: res.error });
      return;
    }
    toast.success('Student record deleted permanently');
    setIsDeleteOpen(false);
    loadStudents();
  };

  // Export registry to JSON
  const handleExportData = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(studentService.exportJSON());
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `vaa-students-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success('Backup downloaded successfully');
    } catch {
      toast.error('Failed to export data');
    }
  };

  // Import JSON backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const res = studentService.importJSON(content);
        if (res.success) {
          toast.success(`Successfully imported ${res.count} student records`);
          loadStudents();
        } else {
          toast.error('Import failed', { description: res.error || 'Invalid file format' });
        }
      } catch {
        toast.error('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Live Cloud Sync
  const handleSyncRegistry = async () => {
    setLoading(true);
    const res = await studentService.getStudents('', showArchived);
    if (!res.error && res.data) {
      setStudents(res.data);
      toast.success('Live cloud registry synchronized successfully', {
        description: `${res.data.length} flight cadet records active in registry.`,
      });
    } else {
      toast.error('Sync failed', { description: res.error || 'Could not reach cloud database' });
    }
    setLoading(false);
  };

  // Status Badge styling helper
  const getStatusBadge = (status: string, isArchived: boolean) => {
    if (isArchived) {
      return <Badge variant="secondary" className="bg-slate-200 text-slate-700">Archived</Badge>;
    }
    switch (status) {
      case 'Completed':
      case 'Certified':
        return <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">Completed</Badge>;
      case 'Active':
      case 'In Training':
        return <Badge className="bg-sky-600 hover:bg-sky-700 text-white">In Training</Badge>;
      case 'Discontinued':
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Discontinued</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <img
                src={logoImage}
                alt="Vansh Aviation Academy"
                className="h-9 sm:h-10 w-auto object-contain cursor-pointer shrink-0 bg-white rounded-lg p-0.5"
                onClick={() => navigate('/')}
              />
              <div className="min-w-0 truncate">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm sm:text-lg tracking-tight block truncate">
                    Vansh Aviation Academy
                  </span>
                  {isSupabaseConfigured ? (
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                      Live Cloud Sync
                    </span>
                  ) : (
                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mr-1.5" />
                      Local Storage
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] text-sky-400 font-medium block uppercase tracking-wider">
                  Registrar Superadmin Portal
                </span>
              </div>
            </div>

            {/* Navigation links & Logout */}
            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs sm:text-sm hidden sm:inline-flex items-center cursor-pointer"
                onClick={() => window.open('/', '_blank')}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Live Website
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs sm:text-sm inline-flex items-center cursor-pointer"
                onClick={() => window.open('/verify', '_blank')}
              >
                <Award className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                <span className="hidden sm:inline">Verify Page</span>
                <span className="sm:hidden">Verify</span>
              </Button>
              <div className="h-5 w-px bg-slate-700 hidden sm:block" />
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="text-xs sm:text-sm font-medium inline-flex items-center cursor-pointer bg-red-600 hover:bg-red-700"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Action Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Central Registry & Flight Cadets
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Manage student registrations, flight hours, DGCA verification credentials, and certificates
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <Button
              onClick={handleSyncRegistry}
              variant="outline"
              size="sm"
              className="text-xs text-slate-700 hover:text-slate-900 border-slate-300 cursor-pointer"
              title="Sync with Live Cloud Database"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1 text-sky-600" />
              Sync Cloud
            </Button>
            <Button
              onClick={handleExportData}
              variant="outline"
              size="sm"
              className="text-xs text-slate-700 hover:text-slate-900 border-slate-300 cursor-pointer"
              title="Download backup JSON file"
            >
              <Download className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Backup
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              className="text-xs text-slate-700 hover:text-slate-900 border-slate-300 cursor-pointer"
              title="Import JSON backup"
            >
              <Upload className="w-3.5 h-3.5 mr-1 text-blue-600" />
              Import
            </Button>
            <Button
              onClick={handleOpenAdd}
              className="bg-slate-900 hover:bg-sky-600 text-white font-semibold shadow-md inline-flex items-center cursor-pointer text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Student
            </Button>
            <Button
              onClick={() => handleOpenCertificate(null)}
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-md inline-flex items-center cursor-pointer text-xs sm:text-sm px-3.5 py-2 sm:px-4 sm:py-2.5"
              title="Open Certificate Generator"
            >
              <Award className="w-4 h-4 mr-1.5" />
              <span>Create Certificate</span>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-sm border-slate-200">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <Input
                  type="text"
                  placeholder="Search by Cadet Name, Reg No, App No, or Mobile..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white border-slate-200 text-slate-900 text-sm focus:border-sky-500"
                />
              </div>

              {/* Show Archived Toggle */}
              <div className="flex items-center space-x-2 self-start sm:self-center text-sm text-slate-600">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showArchived}
                    onChange={(e) => setShowArchived(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <span>Show archived records</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile View: Cards */}
        <div className="block md:hidden space-y-3">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-sky-600" />
              Loading student registry...
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
              No students found matching your criteria.
            </div>
          ) : (
            students.map((student) => (
              <Card key={student.id} className="border-slate-200 shadow-sm overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {student.photo_url ? (
                        <img
                          src={student.photo_url}
                          alt={student.student_name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-sky-500 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-900 text-sky-400 font-bold flex items-center justify-center shrink-0 text-sm">
                          {student.student_name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{student.student_name}</h3>
                        <p className="text-xs text-slate-500">S/O: {student.father_name}</p>
                        <span className="font-mono text-xs text-sky-700 font-semibold block">
                          {student.registration_number}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(student.status, student.is_archived)}
                  </div>

                  <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span>{student.course_name}</span>
                    <span className="text-slate-400">{student.admission_date}</span>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-100">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenCertificate(student)}
                      className="text-xs h-8 font-semibold text-sky-700 hover:text-sky-900 border-sky-300 hover:border-sky-400 bg-sky-50/70 hover:bg-sky-100 cursor-pointer shadow-sm transition-colors"
                      title="Generate Certificate"
                    >
                      <Award className="w-3.5 h-3.5 mr-1 text-sky-600" />
                      Certificate
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenView(student)}
                      className="h-8 w-8 p-0 text-slate-600"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenEdit(student)}
                      className="h-8 w-8 p-0 text-blue-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleArchive(student)}
                      className="h-8 w-8 p-0 text-amber-600"
                    >
                      {student.is_archived ? <RotateCcw className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenDelete(student)}
                      className="h-8 w-8 p-0 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-slate-300 uppercase text-[11px] tracking-wider border-b border-slate-800">
                  <th className="py-3.5 px-4 font-semibold">Cadet Particulars</th>
                  <th className="py-3.5 px-4 font-semibold">Registration No.</th>
                  <th className="py-3.5 px-4 font-semibold">Course Program</th>
                  <th className="py-3.5 px-4 font-semibold">Admission Date</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500 text-sm">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-sky-600" />
                      Loading student registry...
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500 text-sm">
                      No flight cadet records found.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {student.photo_url ? (
                            <img
                              src={student.photo_url}
                              alt={student.student_name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-sky-500 shrink-0 shadow-sm"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-900 text-sky-400 font-bold flex items-center justify-center shrink-0 text-xs shadow-sm">
                              {student.student_name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-slate-900">{student.student_name}</div>
                            <div className="text-xs text-slate-500">S/O: {student.father_name}</div>
                            {student.mobile_number && (
                              <div className="text-[11px] text-slate-400">📞 {student.mobile_number}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-700">
                        {student.registration_number}
                        <span className="block text-[11px] font-normal text-slate-400">
                          App: {student.application_number}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800">{student.course_name}</span>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-1">
                          <span>📅 {student.course_start_date || student.admission_date}</span>
                          {student.course_end_date ? (
                            <span className="text-emerald-700 font-medium">to {student.course_end_date}</span>
                          ) : (
                            <span className="text-amber-600 font-medium">(Ongoing)</span>
                          )}
                        </div>
                        {student.flying_hours && (
                          <span className="block text-[11px] text-sky-600">✈️ {student.flying_hours}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {student.admission_date}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(student.status, student.is_archived)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1">
                          {/* Generate Certificate */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenCertificate(student)}
                            className="h-8 text-xs font-semibold text-sky-700 hover:text-sky-900 border-sky-300 hover:border-sky-400 bg-sky-50/70 hover:bg-sky-100 cursor-pointer shadow-sm transition-colors"
                            title="Generate Luxury Admission Certificate"
                          >
                            <Award className="w-3.5 h-3.5 mr-1 text-sky-600" />
                            Certificate
                          </Button>
                          {/* View */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenView(student)}
                            className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {/* Edit */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenEdit(student)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                            title="Edit Record"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          {/* Archive */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleArchive(student)}
                            className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 cursor-pointer"
                            title={student.is_archived ? 'Restore' : 'Archive'}
                          >
                            {student.is_archived ? <RotateCcw className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                          </Button>
                          {/* Delete */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenDelete(student)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                            title="Delete Permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL 1: ADD STUDENT */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleAddSubmit}>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
                <Plane className="w-5 h-5 text-sky-600" />
                <span>Register New Flight Cadet</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Create an official DGCA student record. This cadet will be immediately verifiable on the public portal.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4 text-xs sm:text-sm">
              {/* Photo Upload Section */}
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="relative">
                  {formData.photo_url ? (
                    <img
                      src={formData.photo_url}
                      alt="Cadet Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-sky-500 shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                      <Camera className="w-6 h-6" />
                    </div>
                  )}
                  {formData.photo_url && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-1 -right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-slate-800 text-xs mb-1">Cadet Passport Photo (Optional)</span>
                  <input
                    type="file"
                    ref={photoInputAddRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => photoInputAddRef.current?.click()}
                    className="text-xs text-slate-700"
                  >
                    <Camera className="w-3.5 h-3.5 mr-1.5" />
                    {formData.photo_url ? 'Change Photo' : 'Upload Photo'}
                  </Button>
                </div>
              </div>

              {/* Row 1: Student Name & Father Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Cadet Full Name *</Label>
                  <Input
                    required
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    placeholder="e.g. Rajesh Kumar Verma"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Father's Name *</Label>
                  <Input
                    required
                    value={formData.father_name}
                    onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                    placeholder="e.g. Surendra Kumar Verma"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Row 2: DOB & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Date of Birth *</Label>
                  <Input
                    required
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Mobile Number</Label>
                  <Input
                    value={formData.mobile_number || ''}
                    onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Row 3: Email & Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Email Address</Label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="cadet@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Aviation Program *</Label>
                  <Select
                    value={formData.course_name}
                    onValueChange={(val) => setFormData({ ...formData, course_name: val })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {POPULAR_COURSES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Reg No & App No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Registration Number *</Label>
                  <Input
                    required
                    value={formData.registration_number}
                    onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                    placeholder="e.g. VAA-2026-101"
                    className="mt-1 font-mono uppercase"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Application Number *</Label>
                  <Input
                    required
                    value={formData.application_number}
                    onChange={(e) => setFormData({ ...formData, application_number: e.target.value })}
                    placeholder="e.g. VAA-APP-2026-101"
                    className="mt-1 font-mono uppercase"
                  />
                </div>
              </div>

              {/* Row 5: Admission Date & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Admission Date *</Label>
                  <Input
                    required
                    type="date"
                    value={formData.admission_date}
                    onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Training Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Active">In Training</SelectItem>
                      <SelectItem value="Certified">Certified</SelectItem>
                      <SelectItem value="Discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 6: Course Schedule / Training Period */}
              <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-100">
                <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-2">
                  Course Training Duration (Start & End Dates)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Course Start Date *
                    </Label>
                    <Input
                      required
                      type="date"
                      value={formData.course_start_date}
                      onChange={(e) => setFormData({ ...formData, course_start_date: e.target.value })}
                      className="mt-1 bg-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Commencement date of flight program</span>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Course End Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.course_end_date || ''}
                      onChange={(e) => setFormData({ ...formData, course_end_date: e.target.value })}
                      className="mt-1 bg-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Graduation / completion date</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={formSubmitting}
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold"
              >
                {formSubmitting ? 'Registering...' : 'Register Cadet'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: EDIT STUDENT */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
                <Pencil className="w-5 h-5 text-blue-600" />
                <span>Edit Flight Cadet Record</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Update cadet particulars, training status, or upload photo.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4 text-xs sm:text-sm">
              {/* Photo Upload Section */}
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="relative">
                  {formData.photo_url ? (
                    <img
                      src={formData.photo_url}
                      alt="Cadet Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-sky-500 shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                      <Camera className="w-6 h-6" />
                    </div>
                  )}
                  {formData.photo_url && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-1 -right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-slate-800 text-xs mb-1">Cadet Passport Photo</span>
                  <input
                    type="file"
                    ref={photoInputEditRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => photoInputEditRef.current?.click()}
                    className="text-xs text-slate-700"
                  >
                    <Camera className="w-3.5 h-3.5 mr-1.5" />
                    {formData.photo_url ? 'Change Photo' : 'Upload Photo'}
                  </Button>
                </div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Cadet Full Name *</Label>
                  <Input
                    required
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Father's Name *</Label>
                  <Input
                    required
                    value={formData.father_name}
                    onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Date of Birth *</Label>
                  <Input
                    required
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Mobile Number</Label>
                  <Input
                    value={formData.mobile_number || ''}
                    onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Email Address</Label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Aviation Program *</Label>
                  <Select
                    value={formData.course_name}
                    onValueChange={(val) => setFormData({ ...formData, course_name: val })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {POPULAR_COURSES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Registration Number *</Label>
                  <Input
                    required
                    value={formData.registration_number}
                    onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                    className="mt-1 font-mono uppercase"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Application Number *</Label>
                  <Input
                    required
                    value={formData.application_number}
                    onChange={(e) => setFormData({ ...formData, application_number: e.target.value })}
                    className="mt-1 font-mono uppercase"
                  />
                </div>
              </div>

              {/* Row 5: Admission Date & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold">Admission Date</Label>
                  <Input
                    type="date"
                    value={formData.admission_date}
                    onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Training Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Active">In Training</SelectItem>
                      <SelectItem value="Certified">Certified</SelectItem>
                      <SelectItem value="Discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 6: Course Schedule / Training Period */}
              <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-100">
                <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-2">
                  Course Training Duration (Start & End Dates)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Course Start Date *
                    </Label>
                    <Input
                      required
                      type="date"
                      value={formData.course_start_date}
                      onChange={(e) => setFormData({ ...formData, course_start_date: e.target.value })}
                      className="mt-1 bg-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Commencement date of flight program</span>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Course End Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.course_end_date || ''}
                      onChange={(e) => setFormData({ ...formData, course_end_date: e.target.value })}
                      className="mt-1 bg-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Graduation / completion date</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={formSubmitting}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
              >
                {formSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: VIEW CADET DETAILS */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center justify-between">
              <span>Cadet Flight Record</span>
              {selectedStudent && getStatusBadge(selectedStudent.status, selectedStudent.is_archived)}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Verified record particulars stored in central academy registry.
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="py-3 space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                {selectedStudent.photo_url ? (
                  <img
                    src={selectedStudent.photo_url}
                    alt={selectedStudent.student_name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-sky-500 shadow"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-sky-400 font-bold flex items-center justify-center text-lg">
                    {selectedStudent.student_name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-black text-slate-900">{selectedStudent.student_name}</h3>
                  <p className="text-xs text-slate-500">S/O: {selectedStudent.father_name}</p>
                  <p className="font-mono text-xs font-bold text-sky-700 mt-0.5">
                    {selectedStudent.registration_number}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Application No.</span>
                  <span className="font-mono font-bold text-slate-800">{selectedStudent.application_number}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Date of Birth</span>
                  <span className="font-bold text-slate-800">{selectedStudent.date_of_birth}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Program</span>
                  <span className="font-bold text-slate-800">{selectedStudent.course_name}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Admission Date</span>
                  <span className="font-bold text-slate-800">{selectedStudent.admission_date}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-700 uppercase block">Course Start Date</span>
                  <span className="font-bold text-slate-800">{selectedStudent.course_start_date || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-700 uppercase block">Course End Date</span>
                  <span className="font-bold text-slate-800">
                    {selectedStudent.course_end_date ? (
                      <span className="text-emerald-700 font-semibold">{selectedStudent.course_end_date}</span>
                    ) : (
                      <span className="text-amber-600 font-medium text-xs">In Training / Ongoing</span>
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Contact Phone</span>
                  <span className="font-bold text-slate-800">{selectedStudent.mobile_number || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Email Address</span>
                  <span className="font-bold text-slate-800">{selectedStudent.email || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex items-center justify-between gap-2">
            <Button
              type="button"
              onClick={() => {
                setIsViewOpen(false);
                handleOpenCertificate(selectedStudent);
              }}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
            >
              <Award className="w-3.5 h-3.5 mr-1" />
              Generate Certificate
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 4: DELETE CONFIRMATION */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 font-bold">
              Permanently Delete Student Record?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-600">
              Are you sure you want to delete the record for{' '}
              <strong>{selectedStudent?.student_name}</strong> ({selectedStudent?.registration_number})?
              This action cannot be undone and will remove the cadet from public verification.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePermanentDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* MODAL 5: LUXURY CERTIFICATE GENERATOR MODAL */}
      <CertificateModal
        open={showCertModal}
        onOpenChange={setShowCertModal}
        student={certStudent}
      />
    </div>
  );
};

export default AdminDashboard;
