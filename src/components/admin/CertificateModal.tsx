import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Download,
  Printer,
  Award,
  Sparkles,
  CheckCircle2,
  QrCode,
  Layers,
  PenTool,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Student } from '@/types/student';
import {
  renderLuxuryCertificate,
  renderVanshClassicCertificate,
  CertificateData,
  CertificateTemplateType,
} from '@/utils/certificateCanvas';

const logoImage = '/vanshaviation-logo.png';
const rajPratapSignature = '/certificate/raj-pratap-singh-signature.png';

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  open,
  onOpenChange,
  student,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(false);
  // Default to Modern Luxury UI as requested
  const [templateType, setTemplateType] = useState<CertificateTemplateType>('luxury');

  // Form Fields
  const [formData, setFormData] = useState<CertificateData>({
    studentName: 'Rajesh Kumar Verma',
    fatherName: 'Surendra Kumar Verma',
    registrationNumber: 'VAA-2025-CPL-01',
    courseName: 'Commercial Pilot License (CPL)',
    duration: '12 - 18 Months (Full Time)',
    admissionDate: '15/01/2025',
    issueDate: new Date().toLocaleDateString('en-GB'),
    courseStartDate: '2025-02-01',
    courseEndDate: '2026-06-30',
    status: 'Course Completed & Certified',
    campus: 'PU4 Vijay Nagar, Behind Konark Hotel, Indore (M.P.) - 452010',
    qrType: 'vansh_code',
  });

  // Pre-fill when student changes
  useEffect(() => {
    if (student) {
      setFormData({
        studentName: student.student_name || '',
        fatherName: student.father_name || '',
        registrationNumber: student.registration_number || 'VAA-2025-CPL-01',
        courseName: student.course_name || 'Commercial Pilot License (CPL)',
        duration: '12 - 18 Months (Full Time)',
        admissionDate: student.admission_date || new Date().toLocaleDateString('en-GB'),
        issueDate: new Date().toLocaleDateString('en-GB'),
        courseStartDate: student.course_start_date || '2025-02-01',
        courseEndDate: student.course_end_date || '2026-06-30',
        status:
          student.status === 'Completed' || student.status === 'Certified'
            ? 'Course Completed & DGCA Certified'
            : 'Verified Active Cadet',
        campus: 'PU4 Vijay Nagar, Behind Konark Hotel, Indore (M.P.) - 452010',
        qrType: 'vansh_code',
      });
    } else {
      setFormData({
        studentName: 'Rajesh Kumar Verma',
        fatherName: 'Surendra Kumar Verma',
        registrationNumber: 'VAA-2025-CPL-01',
        courseName: 'Commercial Pilot License (CPL)',
        duration: '12 - 18 Months (Full Time)',
        admissionDate: '15/01/2025',
        issueDate: new Date().toLocaleDateString('en-GB'),
        courseStartDate: '2025-02-01',
        courseEndDate: '2026-06-30',
        status: 'Course Completed & DGCA Certified',
        campus: 'PU4 Vijay Nagar, Behind Konark Hotel, Indore (M.P.) - 452010',
        qrType: 'vansh_code',
      });
    }
  }, [student, open]);

  // Re-render canvas whenever formData, templateType, or modal opens
  useEffect(() => {
    if (!open) return;

    let isMounted = true;
    const render = async () => {
      if (canvasRef.current && isMounted) {
        setLoading(true);
        try {
          if (templateType === 'luxury') {
            await renderLuxuryCertificate(
              canvasRef.current,
              formData,
              logoImage,
              rajPratapSignature
            );
          } else {
            await renderVanshClassicCertificate(
              canvasRef.current,
              formData,
              '/vansh-qr-code.png'
            );
          }
        } catch (err) {
          console.error('Error rendering certificate canvas:', err);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    };

    const timer = setTimeout(render, 60);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [formData, templateType, open]);

  const [downloading, setDownloading] = useState(false);

  // Helper to trigger safe download on mobile and desktop
  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 400);
  };

  // Handle Download High-Res PNG with mobile compatibility & blob support
  const handleDownloadPNG = () => {
    if (!canvasRef.current) {
      toast.error('Certificate canvas is still rendering. Please wait a moment.');
      return;
    }

    const canvas = canvasRef.current;
    const safeName = (formData.studentName || 'Vansh_Cadet').trim().replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Vansh_Aviation_Certificate_${safeName}.png`;

    setDownloading(true);
    const toastId = toast.loading('Generating high-resolution PNG...');

    try {
      if (canvas.toBlob) {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              const dataUrl = canvas.toDataURL('image/png', 1.0);
              triggerDownload(dataUrl, filename);
            } else {
              const blobUrl = URL.createObjectURL(blob);
              triggerDownload(blobUrl, filename);
              setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
            }
            toast.success('High-definition certificate downloaded!', { id: toastId });
            setDownloading(false);
          },
          'image/png',
          1.0
        );
      } else {
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        triggerDownload(dataUrl, filename);
        toast.success('High-definition certificate downloaded!', { id: toastId });
        setDownloading(false);
      }
    } catch (err) {
      console.error('Error downloading certificate:', err);
      try {
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        triggerDownload(dataUrl, filename);
        toast.success('High-definition certificate downloaded!', { id: toastId });
      } catch (fallbackErr) {
        toast.error('Failed to download certificate image', { id: toastId });
      } finally {
        setDownloading(false);
      }
    }
  };

  // Handle Print / PDF
  const handlePrint = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png', 1.0);
    const win = window.open('', '_blank');
    if (!win) {
      toast.error('Popup blocked. Please allow popups to print/save certificate as PDF.');
      return;
    }

    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Official Certificate - ${formData.studentName}</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
            }
            img {
              width: 100vw;
              height: 100vh;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] sm:w-[94vw] max-w-6xl max-h-[92vh] flex flex-col p-0 overflow-hidden bg-slate-900 border-slate-800 text-white shadow-2xl rounded-2xl sm:rounded-xl">
        {/* Header */}
        <DialogHeader className="p-3.5 sm:p-5 border-b border-slate-800 shrink-0 bg-slate-950/90 pr-12 md:pr-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-start sm:items-center space-x-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-slate-900 flex items-center justify-center text-white shadow-md shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-sm sm:text-lg font-bold text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span>Official Flight Certificate Generator</span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 whitespace-nowrap">
                    HD • Raj Pratap Singh
                  </span>
                </DialogTitle>
                <DialogDescription className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                  Authorized signatory: Raj Pratap Singh • Direct verification QR & 2400x1700 HD Download.
                </DialogDescription>
              </div>
            </div>

            {/* Desktop / Tablet Header Actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrint}
                disabled={downloading}
                className="text-xs bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Print / PDF
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleDownloadPNG}
                disabled={downloading}
                className="text-xs bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer shadow-md transition-all active:scale-95"
              >
                {downloading ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 mr-1" />
                )}
                Download (HD PNG)
              </Button>
            </div>
          </div>

          {/* Mobile Header Quick Actions */}
          <div className="flex md:hidden items-center gap-2 pt-1 w-full">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrint}
              disabled={downloading}
              className="flex-1 text-xs h-9 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white"
            >
              <Printer className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Print / PDF
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleDownloadPNG}
              disabled={downloading}
              className="flex-1 text-xs h-9 bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-md active:scale-95"
            >
              {downloading ? (
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5 mr-1.5" />
              )}
              Download (HD PNG)
            </Button>
          </div>
        </DialogHeader>

        {/* Content Body: Left Form Inputs + Right Live Preview */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 bg-slate-950/40">
          {/* Column 1: Editable Fields (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            {/* Template Selector */}
            <div>
              <Label className="text-slate-300 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Certificate Design Format</span>
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setTemplateType('luxury')}
                  className={`p-2.5 rounded-lg text-left border text-xs font-medium transition-all ${
                    templateType === 'luxury'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    <span>✈️ Modern Luxury UI</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Brand-New Gold & Navy Pilot</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTemplateType('classic')}
                  className={`p-2.5 rounded-lg text-left border text-xs font-medium transition-all ${
                    templateType === 'classic'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    <span>🎖️ Classic Format</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Reference Design</div>
                </button>
              </div>
            </div>

            {/* Authorised Signatory Info Card */}
            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/30">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Raj Pratap Singh</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">Signed</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Director & Authorised Signatory</div>
                </div>
              </div>
              <div className="text-[11px] text-amber-400 font-serif italic">
                Raj Pratap Singh
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Certificate Particulars</span>
              </span>
              {student && (
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Auto-filled
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <Label className="text-slate-300 text-xs font-medium">Cadet Full Name *</Label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Rajesh Kumar Verma"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400 font-bold uppercase"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-xs font-medium">Father's Name (S/O, D/O) *</Label>
                <Input
                  value={formData.fatherName || ''}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  placeholder="e.g. Surendra Kumar Verma"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400 font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-slate-300 text-xs font-medium">Registration Number *</Label>
                  <Input
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    placeholder="e.g. VAA-2025-CPL-01"
                    className="bg-slate-950 border-slate-800 text-white text-xs mt-1 font-mono focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 text-xs font-medium">Date of Admission / Issue</Label>
                  <Input
                    value={formData.admissionDate || ''}
                    onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                    placeholder="DD/MM/YYYY"
                    className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300 text-xs font-medium">Aviation Program *</Label>
                <Input
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  placeholder="e.g. Commercial Pilot License (CPL)"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-slate-300 text-xs font-medium">Course Duration</Label>
                  <Input
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="12 - 18 Months (Full Time)"
                    className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 text-xs font-medium">Training Status</Label>
                  <Input
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="Course Completed & Certified"
                    className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300 text-xs font-medium">Campus Location</Label>
                <Input
                  value={formData.campus || ''}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                  placeholder="PU4 Vijay Nagar, Behind Konark Hotel, Indore (M.P.)"
                  className="bg-slate-950 border-slate-800 text-white text-xs mt-1 focus:border-amber-400"
                />
              </div>

              {/* QR Code Style Selector */}
              <div className="pt-2 border-t border-slate-800">
                <Label className="text-slate-300 text-xs font-medium flex items-center gap-1.5 mb-1.5">
                  <QrCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>QR Code on Certificate</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, qrType: 'vansh_code' })}
                    className={`p-2 rounded text-left border text-[11px] transition-all ${
                      formData.qrType === 'vansh_code'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold">Official Vansh QR</div>
                    <div className="text-[9px] text-slate-500">Vanshcode.png</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, qrType: 'verification_link' })}
                    className={`p-2 rounded text-left border text-[11px] transition-all ${
                      formData.qrType === 'verification_link'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold">Direct Verify Link</div>
                    <div className="text-[9px] text-slate-500">/verify?q=RegNo</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Live Canvas Preview (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 relative min-h-[300px] sm:min-h-[420px]">
            {loading && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-amber-400 gap-2">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-medium text-slate-300">Rendering 2400x1700 Certificate...</span>
              </div>
            )}

            <div className="w-full shadow-2xl rounded-lg overflow-hidden border border-slate-700/60 bg-white">
              <canvas
                ref={canvasRef}
                className="w-full h-auto block select-none"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>

            {/* Direct Action Buttons under canvas preview */}
            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full">
              <Button
                type="button"
                size="sm"
                onClick={handleDownloadPNG}
                disabled={downloading}
                className="w-full sm:w-auto text-xs sm:text-sm bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold shadow-lg shadow-amber-950/40 px-5 py-2.5 active:scale-95 transition-all"
              >
                {downloading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download Certificate (HD PNG)
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrint}
                disabled={downloading}
                className="w-full sm:w-auto text-xs bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                Print / Save as PDF
              </Button>
            </div>

            <div className="mt-3 text-center text-[10px] sm:text-[11px] text-slate-400 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <span>Resolution: <strong>2400 × 1700 px (300 DPI)</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Signatory: <strong className="text-amber-300">Raj Pratap Singh</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Format: <strong>HD Canvas PNG</strong></span>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/95 backdrop-blur shrink-0 flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>2400 × 1700 High-Resolution Canvas Ready • DGCA Verified</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Close
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleDownloadPNG}
              disabled={downloading}
              className="flex-1 sm:flex-initial text-xs bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-md active:scale-95 transition-all"
            >
              {downloading ? (
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5 mr-1.5" />
              )}
              Download (HD PNG)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
