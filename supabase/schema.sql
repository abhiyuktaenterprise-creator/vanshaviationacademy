-- ==============================================================================
-- VANSH AVIATION ACADEMY - OFFICIAL SUPABASE DATABASE SCHEMA
-- Execute this entire script in your new Supabase Project SQL Editor
-- (Supabase Dashboard -> SQL Editor -> New Query -> Run)
-- ==============================================================================

-- 1. Create the students table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Unique Identifiers
    application_number VARCHAR(50) NOT NULL UNIQUE,
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    
    -- Personal Information
    student_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    date_of_birth DATE NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    
    -- Course & Academic Information
    course_name VARCHAR(150) NOT NULL,
    admission_date DATE NOT NULL,
    course_start_date DATE NOT NULL,
    course_end_date DATE,
    
    -- Aviation Specific Information
    flying_hours VARCHAR(100),
    aircraft_type VARCHAR(100),
    dgca_computer_no VARCHAR(100),
    
    -- Status & Archival
    status VARCHAR(30) NOT NULL DEFAULT 'Completed', -- 'Active', 'Completed', 'Discontinued', 'Certified', 'In Training'
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    photo_url TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create search indexes for fast lookups & verification
CREATE INDEX IF NOT EXISTS idx_vaa_students_reg_no ON public.students(registration_number);
CREATE INDEX IF NOT EXISTS idx_vaa_students_app_no ON public.students(application_number);
CREATE INDEX IF NOT EXISTS idx_vaa_students_name ON public.students(student_name);
CREATE INDEX IF NOT EXISTS idx_vaa_students_mobile ON public.students(mobile_number);
CREATE INDEX IF NOT EXISTS idx_vaa_students_dob ON public.students(date_of_birth);

-- 3. Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_students_updated_at ON public.students;
CREATE TRIGGER trigger_students_updated_at
    BEFORE UPDATE ON public.students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- 5. Security Policy: Allow frontend app (anon & authenticated) full access to manage & verify students
DROP POLICY IF EXISTS "Public and Admin access to students" ON public.students;
CREATE POLICY "Public and Admin access to students"
    ON public.students
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Insert Initial Verified Flight Cadets of Vansh Aviation Academy
INSERT INTO public.students (
    application_number, registration_number, student_name, father_name,
    date_of_birth, mobile_number, email, course_name, admission_date,
    course_start_date, course_end_date, status, flying_hours, aircraft_type, dgca_computer_no, is_archived
) VALUES
('VAA-APP-2025-01', 'VAA-2025-CPL-01', 'Rajesh Kumar Verma', 'Surendra Kumar Verma', '2001-08-15', '9876543210', 'rajesh.verma@example.com', 'Commercial Pilot License (CPL)', '2025-01-15', '2025-02-01', '2026-06-30', 'Completed', '200 Hours', 'Cessna 172 Skyhawk', 'C-1049283', false),
('VAA-APP-2025-02', 'VAA-2025-PPL-02', 'Priya Sharma', 'Dinesh Sharma', '2002-11-20', '9876543211', 'priya.sharma@example.com', 'Private Pilot License (PPL)', '2025-02-10', '2025-03-01', '2025-08-30', 'Certified', '50 Hours', 'Cessna 152', 'P-2039481', false),
('VAA-APP-2025-03', 'VAA-2025-GS-03', 'Amit Patel', 'Mahesh Patel', '2000-05-12', '9876543212', 'amit.patel@example.com', 'DGCA Aviation Ground School', '2025-03-01', '2025-03-15', '2025-06-30', 'Completed', 'Simulator 20 Hours', 'FSTD Simulator', 'G-3029182', false),
('VAA-APP-2025-04', 'VAA-2025-CPL-04', 'Rohit Joshi', 'Sunil Joshi', '2002-04-18', '9876543213', 'rohit.joshi@example.com', 'Commercial Pilot License (CPL)', '2025-04-01', '2025-04-15', '2026-10-30', 'Active', '85 Hours Completed', 'Cessna 172', 'C-4091823', false),
('VAA-APP-2026-110', 'VAA-2026-110', 'Umesh', 'Father Name', '2001-01-01', '9876543210', 'umesh@example.com', 'Commercial Pilot License (CPL)', '2026-10-25', '2026-10-25', '2027-10-25', 'Completed', NULL, NULL, NULL, false),
('VAA-APP-2026-101', 'VAA-2026-101', 'Cadet_2578', 'Vikramaditya', '2002-09-15', '', NULL, 'Commercial Pilot License (CPL)', '2026-10-25', '2026-10-25', NULL, 'Completed', NULL, NULL, NULL, false),
('VAA-APP-2026-111', 'VAA-2026-111', 'Sanghamitra vilas wasnik', 'Vilas wasnik', '2008-08-18', '80559 53347', 'pramilawasnik93@gmail.com', 'Ground Services & Airport Operations', '2026-11-14', '2026-08-01', '2026-08-31', 'Completed', NULL, NULL, NULL, false)
ON CONFLICT (registration_number) DO NOTHING;
