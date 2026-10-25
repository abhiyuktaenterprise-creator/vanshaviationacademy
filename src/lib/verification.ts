import { StudentRecord, VerificationResult } from '@/types/student';
import { studentService } from '@/services/studentService';

export async function verifyCertificate(
  identifier: string,
  _dob?: string
): Promise<VerificationResult> {
  const cleanId = identifier.trim();

  if (!cleanId) {
    return {
      verified: false,
      data: null,
      error: 'Please enter a valid Registration Number or Application Number.'
    };
  }

  const res = await studentService.verifyCertificate(cleanId);
  if (res.verified && res.data) {
    return {
      verified: true,
      data: res.data as StudentRecord,
      error: null
    };
  }

  return {
    verified: false,
    data: null,
    error: res.error || `No verified flight cadet record found matching "${identifier}".`
  };
}

export function getStudentRegistry(): StudentRecord[] {
  // Synchronous read for compatibility
  try {
    const raw = localStorage.getItem('vaa_students_local_registry');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return [];
}
