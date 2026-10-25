export interface Student {
  id: string;
  application_number: string;
  registration_number: string;
  student_name: string;
  father_name: string;
  date_of_birth: string; // YYYY-MM-DD
  mobile_number: string;
  email?: string | null;
  course_name: string;
  admission_date: string;
  course_start_date: string;
  course_end_date?: string | null;
  status: 'Active' | 'Completed' | 'Discontinued' | 'Certified' | 'In Training';
  is_archived: boolean;
  photo_url?: string | null; // Optional base64 or URL
  flying_hours?: string;
  aircraft_type?: string;
  dgca_computer_no?: string;
  created_at?: string;
  updated_at?: string;
}

// Backwards compatibility alias
export type StudentRecord = Student;

export type NewStudentInput = Omit<Student, 'id' | 'created_at' | 'updated_at' | 'is_archived'> & {
  is_archived?: boolean;
};

export interface PublicVerificationResult {
  student_name: string;
  father_name: string;
  registration_number: string;
  application_number?: string;
  date_of_birth?: string;
  course_name: string;
  admission_date: string;
  course_start_date: string;
  course_end_date?: string | null;
  status: string;
  photo_url?: string | null;
  id?: string;
}

export interface VerificationResult {
  verified: boolean;
  data: StudentRecord | null;
  error: string | null;
}
