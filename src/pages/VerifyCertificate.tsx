import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Plane, 
  Calendar, 
  FileText, 
  User, 
  Award,
  RefreshCw,
  Phone,
  Mail,
  Building,
  Lock
} from 'lucide-react';
import { verifyCertificate } from '@/lib/verification';
import { StudentRecord } from '@/types/student';

const logoImage = '/vanshaviation-logo.png';

const formatDateDisplay = (dateStr?: string | null): string | null => {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split('-');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  }
  return trimmed;
};

export const VerifyCertificate = () => {
  const [searchParams] = useSearchParams();
  const [identifier, setIdentifier] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StudentRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    document.title = 'Certificate & Student Verification | Vansh Aviation Academy Indore';
    window.scrollTo(0, 0);

    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      runVerification(initialQuery);
    }
  }, [searchParams]);

  const runVerification = async (queryId: string, queryDob?: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await verifyCertificate(queryId, queryDob);
      if (response.verified && response.data) {
        setResult(response.data);
        setError(null);
      } else {
        setResult(null);
        setError(response.error || 'Record not found.');
      }
    } catch {
      setResult(null);
      setError('Verification service temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter a Registration Number or Application Number.');
      return;
    }
    runVerification(identifier);
  };

  const handleQuickSearch = (sampleId: string) => {
    setIdentifier(sampleId);
    runVerification(sampleId);
  };

  const handleReset = () => {
    setIdentifier('');
    setResult(null);
    setError(null);
    setHasSearched(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-aviation-cyan selection:text-slate-950">
      {/* Top Header Navigation (hidden in print) */}
      <header className="print:hidden sticky top-0 z-40 bg-[#0A192F]/95 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoImage} 
              alt="Vansh Aviation Academy Logo" 
              className="w-10 h-10 object-contain bg-white rounded-xl p-1" 
            />
            <div>
              <span className="font-bold text-white text-base md:text-lg block leading-tight">
                Vansh Aviation Academy
              </span>
              <span className="text-[11px] text-aviation-cyan font-semibold block uppercase tracking-wider">
                DGCA Credential Verification Registry
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="inline-flex items-center text-xs font-semibold text-slate-300 hover:text-aviation-cyan transition-colors py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Home
            </Link>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3.5 py-2 rounded-xl border border-slate-700"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Registrar</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Verification Hero Title (hidden in print) */}
        <div className="print:hidden text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-aviation-cyan border border-sky-500/30 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Official DGCA & Flight Training Registry</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Student & Certificate Verification
          </h1>
          <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
            Verify the authenticity of pilot flight training credentials, ground school certifications, 
            and enrollment status issued by Vansh Aviation Academy, Indore.
          </p>
        </div>

        {/* Verification Search Box (hidden in print) */}
        <div className="print:hidden bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#0A192F] to-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
              <Search className="w-5 h-5 text-aviation-cyan" />
              <span>Registry Lookup</span>
            </div>
            <span className="text-xs bg-aviation-cyan/20 text-aviation-cyan px-2.5 py-1 rounded-full font-mono font-bold">
              24/7 Verified
            </span>
          </div>

          <form onSubmit={handleSearch} className="p-6 md:p-8 space-y-5">
            <div>
              <label 
                htmlFor="regInput" 
                className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Registration Number or Application Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="regInput"
                  type="text"
                  placeholder="e.g. VAA-2025-CPL-01 or VAA2025/8421"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-12 px-4 font-mono text-sm sm:text-base uppercase bg-slate-950 border border-slate-700 rounded-xl text-white focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-aviation-cyan focus:border-transparent transition-all"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                Printed at the top of course certificates, flight log transcripts, or admission letters.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold mb-0.5">Verification Failed</div>
                  <div>{error}</div>
                  <div className="mt-2 text-xs text-red-300">
                    Need help? Contact the registrar office at{' '}
                    <a href="tel:+919506891936" className="font-bold underline text-white">+91 9506891936</a>.
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-aviation-cyan hover:bg-sky-400 text-slate-950 font-black py-3.5 px-6 rounded-xl text-sm shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Verifying Database...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-slate-950" />
                    <span>Verify Credential Authenticity</span>
                  </>
                )}
              </button>

              {hasSearched && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3.5 px-5 rounded-xl text-xs transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Sample Links for demonstration */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-2">
                Sample Verification Records:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickSearch('VAA-2025-CPL-01')}
                  className="text-xs font-mono bg-slate-950 hover:bg-slate-800 text-aviation-cyan px-2.5 py-1.5 rounded-lg border border-slate-800 transition-colors"
                >
                  VAA-2025-CPL-01 (CPL Certified)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSearch('VAA-2025-CPL-02')}
                  className="text-xs font-mono bg-slate-950 hover:bg-slate-800 text-aviation-cyan px-2.5 py-1.5 rounded-lg border border-slate-800 transition-colors"
                >
                  VAA-2025-CPL-02 (CPL Graduate)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSearch('VAA-2026-PPL-03')}
                  className="text-xs font-mono bg-slate-950 hover:bg-slate-800 text-aviation-cyan px-2.5 py-1.5 rounded-lg border border-slate-800 transition-colors"
                >
                  VAA-2026-PPL-03 (PPL Flight)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSearch('VAA-2026-GS-04')}
                  className="text-xs font-mono bg-slate-950 hover:bg-slate-800 text-aviation-cyan px-2.5 py-1.5 rounded-lg border border-slate-800 transition-colors"
                >
                  VAA-2026-GS-04 (Ground School)
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Official Verifiable Credential Result Card */}
        {result && (
          <div className="bg-white text-slate-900 rounded-3xl shadow-2xl border-4 border-sky-400/40 overflow-hidden mb-12 animate-in fade-in-50 slide-in-from-bottom-4 duration-300 print:shadow-none print:border print:m-0">
            {/* Top Security Banner */}
            <div className="bg-[#0A192F] px-6 py-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-aviation-cyan">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aviation-cyan/20 flex items-center justify-center text-aviation-cyan">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-base md:text-lg tracking-wide uppercase text-white">
                    Official Credential Verified
                  </div>
                  <div className="text-xs text-aviation-cyan font-mono">
                    Authenticated Record • Vansh Aviation Academy Central Database
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 print:hidden">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 bg-aviation-cyan text-slate-950 hover:bg-sky-300 font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save Certificate
                </button>
              </div>
            </div>

            {/* Official Certificate Verification Document */}
            <div className="p-6 sm:p-10 relative bg-white">
              {/* Academy Watermark in background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
                <Plane className="w-[450px] h-[450px] text-aviation-navy transform -rotate-12" />
              </div>

              {/* Institution Header */}
              <div className="border-b-2 border-slate-200 pb-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <img 
                    src={logoImage} 
                    alt="Vansh Aviation Academy" 
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Vansh Aviation Academy
                    </h2>
                    <p className="text-xs text-sky-600 font-bold uppercase tracking-wider">
                      DGCA Approved Flight Training Organization
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar, Indore (M.P.)
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="inline-block bg-sky-100 text-sky-900 font-black text-xs px-3.5 py-1.5 rounded-full border border-sky-300 uppercase">
                    Status: {result.status}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    Ref ID: {result.id}
                  </div>
                </div>
              </div>

              {/* Cadet Profile Preview if photo exists */}
              {result.photo_url && (
                <div className="flex items-center gap-4 p-4 bg-sky-50/80 rounded-2xl border border-sky-100 mb-6">
                  <img
                    src={result.photo_url}
                    alt={result.student_name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-sky-500 shadow-sm shrink-0"
                  />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 block">
                      Enrolled Flight Cadet Record
                    </span>
                    <h3 className="text-xl font-black text-slate-900">{result.student_name}</h3>
                    <p className="text-xs text-slate-600">S/O, D/O: {result.father_name}</p>
                  </div>
                </div>
              )}

              {/* Student & Course Particulars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                    Student Full Name
                  </span>
                  <span className="text-lg font-black text-slate-900 block">
                    {result.student_name}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                    Father's / Guardian's Name
                  </span>
                  <span className="text-base font-bold text-slate-800 block">
                    {result.father_name}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                    Registration Number
                  </span>
                  <span className="text-base font-mono font-black text-sky-700 block">
                    {result.registration_number}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                    Application / Roll Number
                  </span>
                  <span className="text-base font-mono font-bold text-slate-800 block">
                    {result.application_number}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                    Enrolled Flight Program
                  </span>
                  <span className="text-base md:text-lg font-black text-slate-900 block">
                    {result.course_name}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                    Date of Admission
                  </span>
                  <span className="text-sm font-bold text-slate-800 block">
                    {formatDateDisplay(result.admission_date) || result.admission_date || 'N/A'}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                    DGCA Computer / File Ref
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-800 block">
                    {result.dgca_computer_no || 'DGCA Verified'}
                  </span>
                </div>

                {/* Course Start Date */}
                <div className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs">
                  <span className="text-xs font-bold uppercase text-sky-700 flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    Course Start Date
                  </span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    {formatDateDisplay(result.course_start_date) || result.course_start_date || 'N/A'}
                  </span>
                  {result.course_start_date && (
                    <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                      ISO: {result.course_start_date}
                    </span>
                  )}
                </div>

                {/* Course End Date */}
                <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                  <span className="text-xs font-bold uppercase text-emerald-700 flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Course End Date
                  </span>
                  {result.course_end_date ? (
                    <>
                      <span className="text-base font-extrabold text-slate-900 block">
                        {formatDateDisplay(result.course_end_date) || result.course_end_date}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                        ISO: {result.course_end_date}
                      </span>
                    </>
                  ) : (
                    <span className="inline-block text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md mt-0.5">
                      In Training / Ongoing Course
                    </span>
                  )}
                </div>

                {/* Training Duration / Schedule */}
                <div className="md:col-span-2 p-3 bg-slate-100/80 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                    Training Duration & Schedule
                  </span>
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>
                      {formatDateDisplay(result.course_start_date) || result.course_start_date || 'N/A'}
                    </span>
                    <span className="text-slate-400">→</span>
                    <span>
                      {result.course_end_date
                        ? (formatDateDisplay(result.course_end_date) || result.course_end_date)
                        : 'Present (In Progress)'}
                    </span>
                  </span>
                </div>

                {result.flying_hours && (
                  <div>
                    <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                      Flight & Simulator Hours
                    </span>
                    <span className="text-sm font-semibold text-slate-700 block">
                      {result.flying_hours}
                    </span>
                  </div>
                )}

                {result.aircraft_type && (
                  <div>
                    <span className="text-xs font-semibold uppercase text-slate-500 block mb-1">
                      Training Aircraft Fleet
                    </span>
                    <span className="text-sm font-semibold text-slate-700 block">
                      {result.aircraft_type}
                    </span>
                  </div>
                )}
              </div>

              {/* Official Seal & Signature Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-sky-500 flex items-center justify-center bg-sky-50">
                    <Award className="w-7 h-7 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Official Seal of Registry
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Vansh Aviation Academy • Indore Campus
                    </div>
                    <div className="text-[10px] text-sky-700 font-mono mt-0.5">
                      Verified Online: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    Authorized Signatory
                  </div>
                  <div className="font-serif italic font-bold text-slate-900 text-sm">
                    Director of Flight Training
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Vansh Aviation Academy Indore
                  </div>
                </div>
              </div>

              {/* Verification Footer Notes */}
              <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-500 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>
                  Official credential verification document issued under academy charter.
                </span>
                <span className="font-mono text-slate-400">
                  Secure URL: vanshaviationacademy.com/verify
                </span>
              </div>
            </div>

            {/* Card Action Bar (hidden in print) */}
            <div className="print:hidden bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                For questions regarding this record, contact the Registrar Office at +91 9506891936.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Verify Another Record
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 bg-[#0A192F] text-white hover:bg-slate-900 font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-colors"
                >
                  <Printer className="w-4 h-4 text-aviation-cyan" />
                  Print / Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer (hidden in print) */}
      <footer className="print:hidden bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Vansh Aviation Academy. All rights reserved. DGCA Approved Training Institute.</p>
          <p className="mt-1 text-slate-500">
            PU4 Vijay Nagar, Behind Konark Hotel, Indore, Madhya Pradesh • Phone: +91 9506891936
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VerifyCertificate;
