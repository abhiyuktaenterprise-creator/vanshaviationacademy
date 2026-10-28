import { Student, NewStudentInput, PublicVerificationResult } from '@/types/student';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const LOCAL_STORAGE_KEY = 'vaa_students_local_registry';

// Default Verified Flight Cadets
const DEFAULT_STUDENTS: Student[] = [
  {
    id: 'vaa-std-1',
    registration_number: 'VAA-2025-CPL-01',
    application_number: 'VAA-APP-2025-01',
    student_name: 'Rajesh Kumar Verma',
    father_name: 'Surendra Kumar Verma',
    date_of_birth: '2001-08-15',
    mobile_number: '9876543210',
    email: 'rajesh.verma@example.com',
    course_name: 'Commercial Pilot License (CPL)',
    admission_date: '2025-01-15',
    course_start_date: '2025-02-01',
    course_end_date: '2026-06-30',
    status: 'Completed',
    flying_hours: '200 Hours',
    aircraft_type: 'Cessna 172 Skyhawk',
    dgca_computer_no: 'C-1049283',
    photo_url: null,
    is_archived: false,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-01-15T10:00:00.000Z'
  },
  {
    id: 'vaa-std-2',
    registration_number: 'VAA-2025-PPL-02',
    application_number: 'VAA-APP-2025-02',
    student_name: 'Priya Sharma',
    father_name: 'Dinesh Sharma',
    date_of_birth: '2002-11-20',
    mobile_number: '9876543211',
    email: 'priya.sharma@example.com',
    course_name: 'Private Pilot License (PPL)',
    admission_date: '2025-02-10',
    course_start_date: '2025-03-01',
    course_end_date: '2025-08-30',
    status: 'Certified',
    flying_hours: '50 Hours',
    aircraft_type: 'Cessna 152',
    dgca_computer_no: 'P-2039481',
    photo_url: null,
    is_archived: false,
    created_at: '2025-02-10T11:00:00.000Z',
    updated_at: '2025-02-10T11:00:00.000Z'
  },
  {
    id: 'vaa-std-3',
    registration_number: 'VAA-2025-GS-03',
    application_number: 'VAA-APP-2025-03',
    student_name: 'Amit Patel',
    father_name: 'Mahesh Patel',
    date_of_birth: '2000-05-12',
    mobile_number: '9876543212',
    email: 'amit.patel@example.com',
    course_name: 'DGCA Aviation Ground School',
    admission_date: '2025-03-01',
    course_start_date: '2025-03-15',
    course_end_date: '2025-06-30',
    status: 'Completed',
    flying_hours: 'Simulator 20 Hours',
    aircraft_type: 'FSTD Simulator',
    dgca_computer_no: 'G-3029182',
    photo_url: null,
    is_archived: false,
    created_at: '2025-03-01T09:30:00.000Z',
    updated_at: '2025-03-01T09:30:00.000Z'
  },
  {
    id: 'vaa-std-4',
    registration_number: 'VAA-2025-CPL-04',
    application_number: 'VAA-APP-2025-04',
    student_name: 'Rohit Joshi',
    father_name: 'Sunil Joshi',
    date_of_birth: '2002-04-18',
    mobile_number: '9876543213',
    email: 'rohit.joshi@example.com',
    course_name: 'Commercial Pilot License (CPL)',
    admission_date: '2025-04-01',
    course_start_date: '2025-04-15',
    course_end_date: '2026-10-30',
    status: 'Active',
    flying_hours: '85 Hours Completed',
    aircraft_type: 'Cessna 172',
    dgca_computer_no: 'C-4091823',
    photo_url: null,
    is_archived: false,
    created_at: '2025-04-01T14:20:00.000Z',
    updated_at: '2025-04-01T14:20:00.000Z'
  }
];

function getLocalStudents(): Student[] {
  if (typeof window === 'undefined') return DEFAULT_STUDENTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_STUDENTS;
  } catch {
    return DEFAULT_STUDENTS;
  }
}

function saveLocalStudents(students: Student[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
  } catch (err) {
    console.error('Failed to save to local storage', err);
  }
}

export const studentService = {
  /**
   * Fetch all active students with search & archive filter
   */
  async getStudents(
    searchQuery = '',
    showArchived = false
  ): Promise<{ data: Student[]; error: string | null }> {
    if (isSupabaseConfigured) {
      try {
        let query = supabase
          .from('students')
          .select('*')
          .not('registration_number', 'ilike', 'IAA%')
          .not('registration_number', 'ilike', 'IS0%')
          .not('registration_number', 'ilike', 'IATA%')
          .order('created_at', { ascending: false });

        if (!showArchived) {
          query = query.eq('is_archived', false);
        }

        const { data, error } = await query;
        if (!error && data) {
          let results = data as Student[];
          const trimmed = searchQuery.trim().toLowerCase();
          if (trimmed) {
            results = results.filter(
              (s) =>
                s.student_name?.toLowerCase().includes(trimmed) ||
                s.registration_number?.toLowerCase().includes(trimmed) ||
                s.application_number?.toLowerCase().includes(trimmed) ||
                (s.mobile_number && s.mobile_number.includes(trimmed))
            );
          }
          if (results.length > 0 && !trimmed && !showArchived) {
            saveLocalStudents(results);
          }
          return { data: results, error: null };
        }
      } catch {
        // Fall back to local storage
      }
    }

    // Local Storage / Offline fallback
    let list = getLocalStudents();
    if (!showArchived) {
      list = list.filter((s) => !s.is_archived);
    }

    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed) {
      list = list.filter(
        (s) =>
          s.student_name.toLowerCase().includes(trimmed) ||
          s.registration_number.toLowerCase().includes(trimmed) ||
          s.application_number.toLowerCase().includes(trimmed) ||
          (s.mobile_number && s.mobile_number.includes(trimmed))
      );
    }

    return { data: list, error: null };
  },

  /**
   * Add a new student record
   */
  async addStudent(
    student: NewStudentInput
  ): Promise<{ data: Student | null; error: string | null }> {
    const today = new Date().toISOString().slice(0, 10);
    const payload = {
      ...student,
      application_number: student.application_number ? student.application_number.trim() : `VAA-APP-${Date.now()}`,
      registration_number: student.registration_number ? student.registration_number.trim() : `VAA-${Date.now()}`,
      student_name: student.student_name ? student.student_name.trim() : 'Flight Cadet',
      father_name: student.father_name ? student.father_name.trim() : 'Guardian',
      date_of_birth: student.date_of_birth && student.date_of_birth.trim() !== '' 
        ? student.date_of_birth.trim() 
        : '2001-01-01',
      mobile_number: student.mobile_number ? student.mobile_number.trim() : '',
      email: student.email && student.email.trim() !== '' ? student.email.trim() : null,
      course_name: student.course_name ? student.course_name.trim() : 'Commercial Pilot License (CPL)',
      admission_date: student.admission_date && student.admission_date.trim() !== '' 
        ? student.admission_date.trim() 
        : today,
      course_start_date: student.course_start_date && student.course_start_date.trim() !== '' 
        ? student.course_start_date.trim() 
        : today,
      course_end_date: student.course_end_date && student.course_end_date.trim() !== '' 
        ? student.course_end_date.trim() 
        : null,
      status: student.status || 'Completed',
      is_archived: student.is_archived ?? false,
      photo_url: student.photo_url || null,
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('students')
          .insert([payload])
          .select()
          .single();

        if (!error && data) {
          const list = getLocalStudents();
          const existingIdx = list.findIndex((s) => s.id === (data as Student).id);
          if (existingIdx !== -1) {
            list[existingIdx] = data as Student;
          } else {
            list.unshift(data as Student);
          }
          saveLocalStudents(list);
          return { data: data as Student, error: null };
        }
        if (error) {
          console.warn('Supabase insert error:', error.message);
          if (error.code === '23505') {
            return { data: null, error: `Registration or Application number already exists in cloud registry.` };
          }
        }
      } catch (err) {
        console.warn('Supabase insert network error:', err);
      }
    }

    // Local Storage fallback
    const list = getLocalStudents();

    if (list.some((s) => s.registration_number.toLowerCase() === payload.registration_number.toLowerCase())) {
      return { data: null, error: `Registration Number "${payload.registration_number}" already exists.` };
    }
    if (list.some((s) => s.application_number.toLowerCase() === payload.application_number.toLowerCase())) {
      return { data: null, error: `Application Number "${payload.application_number}" already exists.` };
    }

    const newStudent: Student = {
      ...payload,
      id: `vaa-std-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    list.unshift(newStudent);
    saveLocalStudents(list);

    return { data: newStudent, error: null };
  },

  /**
   * Update an existing student record
   */
  async updateStudent(
    id: string,
    updates: Partial<Student>
  ): Promise<{ data: Student | null; error: string | null }> {
    const cleanUpdates = { ...updates };
    delete (cleanUpdates as any).id;
    delete (cleanUpdates as any).created_at;
    delete (cleanUpdates as any).updated_at;

    // Sanitize dates for PostgreSQL date columns
    if (cleanUpdates.date_of_birth !== undefined) {
      cleanUpdates.date_of_birth = cleanUpdates.date_of_birth && cleanUpdates.date_of_birth.trim() !== ''
        ? cleanUpdates.date_of_birth.trim()
        : '2001-01-01';
    }
    if (cleanUpdates.course_end_date !== undefined) {
      cleanUpdates.course_end_date = cleanUpdates.course_end_date && cleanUpdates.course_end_date.trim() !== ''
        ? cleanUpdates.course_end_date.trim()
        : null;
    }
    if (cleanUpdates.email !== undefined) {
      cleanUpdates.email = cleanUpdates.email && cleanUpdates.email.trim() !== ''
        ? cleanUpdates.email.trim()
        : null;
    }
    if (cleanUpdates.photo_url !== undefined && !cleanUpdates.photo_url) {
      cleanUpdates.photo_url = null;
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('students')
          .update(cleanUpdates)
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          const list = getLocalStudents();
          const existingIdx = list.findIndex((s) => s.id === (data as Student).id);
          if (existingIdx !== -1) {
            list[existingIdx] = data as Student;
          } else {
            list.unshift(data as Student);
          }
          saveLocalStudents(list);
          return { data: data as Student, error: null };
        }
        if (error) {
          console.warn('Supabase update error:', error.message);
          return { data: null, error: error.message };
        }
      } catch (err) {
        console.warn('Supabase update network error:', err);
      }
    }

    // Local Storage fallback
    const list = getLocalStudents();
    const index = list.findIndex((s) => s.id === id);

    if (index === -1) {
      return { data: null, error: 'Student record not found.' };
    }

    const updated: Student = {
      ...list[index],
      ...cleanUpdates,
      updated_at: new Date().toISOString(),
    };

    list[index] = updated;
    saveLocalStudents(list);

    return { data: updated, error: null };
  },

  /**
   * Delete a student record
   */
  async deleteStudent(id: string): Promise<{ success: boolean; error: string | null }> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('students').delete().eq('id', id);
        if (!error) {
          const list = getLocalStudents().filter((s) => s.id !== id);
          saveLocalStudents(list);
          return { success: true, error: null };
        }
        return { success: false, error: error.message };
      } catch {
        // Fallback
      }
    }

    const list = getLocalStudents().filter((s) => s.id !== id);
    saveLocalStudents(list);
    return { success: true, error: null };
  },

  /**
   * Toggle archive state
   */
  async toggleArchive(
    id: string,
    currentArchived: boolean
  ): Promise<{ success: boolean; error: string | null }> {
    return this.updateStudent(id, { is_archived: !currentArchived }).then((res) => ({
      success: !!res.data,
      error: res.error,
    }));
  },

  /**
   * Public certificate verification lookup
   */
  async verifyCertificate(
    identifier: string
  ): Promise<{ verified: boolean; data?: PublicVerificationResult; error?: string }> {
    const cleanId = identifier.trim();
    if (!cleanId) {
      return { verified: false, error: 'Please enter a valid Registration Number or Application ID.' };
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .or(`registration_number.ilike.${cleanId},application_number.ilike.${cleanId}`)
          .eq('is_archived', false)
          .order('created_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          const record = data[0];
          // Update local cache
          const list = getLocalStudents();
          const existingIdx = list.findIndex((s) => s.id === record.id);
          if (existingIdx !== -1) {
            list[existingIdx] = record as Student;
          } else {
            list.unshift(record as Student);
          }
          saveLocalStudents(list);

          return {
            verified: true,
            data: {
              student_name: record.student_name,
              father_name: record.father_name,
              registration_number: record.registration_number,
              application_number: record.application_number,
              date_of_birth: record.date_of_birth,
              course_name: record.course_name,
              admission_date: record.admission_date,
              course_start_date: record.course_start_date,
              course_end_date: record.course_end_date,
              status: record.status,
              photo_url: record.photo_url,
              id: record.id,
              flying_hours: record.flying_hours,
              aircraft_type: record.aircraft_type,
              dgca_computer_no: record.dgca_computer_no,
            },
          };
        }
      } catch (err) {
        console.warn('Supabase verification lookup error:', err);
      }
    }

    // Local Storage Fallback
    const list = getLocalStudents().filter((s) => !s.is_archived);
    const lowerClean = cleanId.toLowerCase();
    const found = list.find(
      (s) =>
        s.registration_number.toLowerCase() === lowerClean ||
        s.application_number.toLowerCase() === lowerClean
    );

    if (found) {
      return {
        verified: true,
        data: {
          student_name: found.student_name,
          father_name: found.father_name,
          registration_number: found.registration_number,
          application_number: found.application_number,
          date_of_birth: found.date_of_birth,
          course_name: found.course_name,
          admission_date: found.admission_date,
          course_start_date: found.course_start_date,
          course_end_date: found.course_end_date,
          status: found.status,
          photo_url: found.photo_url,
          id: found.id,
          flying_hours: found.flying_hours,
          aircraft_type: found.aircraft_type,
          dgca_computer_no: found.dgca_computer_no,
        },
      };
    }

    return {
      verified: false,
      error: `No verified flight cadet record found matching "${identifier}".`,
    };
  },

  /**
   * Export all students as JSON
   */
  exportJSON(): string {
    return JSON.stringify(getLocalStudents(), null, 2);
  },

  /**
   * Import students from JSON
   */
  importJSON(jsonString: string): { success: boolean; count: number; error: string | null } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        return { success: false, count: 0, error: 'Invalid JSON format: expected an array of students.' };
      }
      saveLocalStudents(parsed);
      return { success: true, count: parsed.length, error: null };
    } catch (e: any) {
      return { success: false, count: 0, error: e.message || 'Invalid JSON string' };
    }
  },

  /**
   * Reset local storage to default registry
   */
  resetToDefaults(): Student[] {
    saveLocalStudents(DEFAULT_STUDENTS);
    return DEFAULT_STUDENTS;
  },
};
