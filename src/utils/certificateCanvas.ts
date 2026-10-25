import QRCode from 'qrcode';

export interface CertificateData {
  studentName: string;
  fatherName?: string;
  registrationNumber: string;
  courseName: string;
  duration?: string;
  admissionDate?: string;
  issueDate?: string;
  courseStartDate?: string;
  courseEndDate?: string;
  status?: string;
  campus?: string;
  qrType?: 'vansh_code' | 'verification_link';
}

export type CertificateTemplateType = 'classic' | 'luxury';

export const loadImg = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

/**
 * Official Vansh Classic Certificate Engine (100% faithful to original Vansh Certificate)
 * Features:
 * - Geometric gold + navy facets
 * - 2020 Award Laurel Medal badge
 * - Classical blue serif VANSH AVIATION header
 * - Mr./Miss. and S/o/D/o. underline text
 * - Official ISO 9001:2015 & IATA Classic seals
 * - User's official QR code (Vanshcode.png) with SCAN TO VERIFY
 * - Official Director Signature
 */
export const renderVanshClassicCertificate = async (
  canvas: HTMLCanvasElement,
  data: CertificateData,
  qrSrc: string = '/vansh-qr-code.png'
): Promise<void> => {
  const W = 2400;
  const H = 1650;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Crisp White Canvas
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Subtle security vertical lines in content region
  ctx.strokeStyle = '#F6F8FA';
  ctx.lineWidth = 1.5;
  for (let x = 700; x < W - 38; x += 18) {
    ctx.beginPath();
    ctx.moveTo(x, 38);
    ctx.lineTo(x, H - 38);
    ctx.stroke();
  }

  // 2. Outer Border Frame
  const m = 38;
  ctx.strokeStyle = '#32373F';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(m, m, W - m * 2, H - m * 2);

  // 3. Geometric Left Facets
  // Polygon 1: Warm Gold (Top Left)
  const C_GOLD = '#CE9E43';
  ctx.fillStyle = C_GOLD;
  ctx.beginPath();
  ctx.moveTo(m, m);
  ctx.lineTo(740, m);
  ctx.lineTo(130, 900);
  ctx.lineTo(m, 900);
  ctx.closePath();
  ctx.fill();

  // Polygon 2: Cool Grey Accent
  ctx.fillStyle = '#EBEEF2';
  ctx.beginPath();
  ctx.moveTo(740, m);
  ctx.lineTo(130, 900);
  ctx.lineTo(560, 900);
  ctx.closePath();
  ctx.fill();

  // Polygon 3: Slate Navy (Bottom Left)
  ctx.fillStyle = '#1C2636';
  ctx.beginPath();
  ctx.moveTo(m, 900);
  ctx.lineTo(560, 900);
  ctx.lineTo(1020, H - m);
  ctx.lineTo(m, H - m);
  ctx.closePath();
  ctx.fill();

  // 4. 2020 Award Medal Badge
  try {
    const badgeImg = await loadImg('/certificate/badge-2020-award-clean.png');
    ctx.drawImage(badgeImg, 180, 180, 390, 390);
  } catch (err) {
    console.warn('Could not load award badge image', err);
  }

  // 5. Top Meta Info (Aligned with body text at x: 840)
  ctx.fillStyle = '#2D3748';
  ctx.font = 'bold 26px "Inter", "Helvetica Neue", sans-serif';
  ctx.textAlign = 'left';
  const regNoText = data.registrationNumber || 'ISO2020IATA066-USRWA50056';
  ctx.fillText(`Certificate No.: ${regNoText}`, 840, 110);

  const displayDate = data.issueDate || data.admissionDate || new Date().toLocaleDateString('en-GB');
  ctx.fillText(`Date : ${displayDate}`, 840, 160);

  // 6. Center Headings (Content area center ~ 1550)
  const contentCenterX = 1550;

  // Blue Title
  ctx.fillStyle = '#10448C';
  ctx.font = 'bold 92px "Cinzel", "Times New Roman", "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('VANSH AVIATION', contentCenterX, 280);

  // Certificate text
  ctx.fillStyle = '#23262D';
  ctx.font = '106px "Cinzel", "Times New Roman", "Georgia", serif';
  ctx.fillText('C E R T I F I C A T E', contentCenterX, 400);

  // Subtitle
  ctx.fillStyle = '#23262D';
  ctx.font = '34px "Inter", "Montserrat", sans-serif';
  ctx.fillText('O F   A P P R E C I A T I O N', contentCenterX, 490);

  // Decorative Rule
  ctx.strokeStyle = '#787878';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(820, 560);
  ctx.lineTo(2280, 560);
  ctx.stroke();

  // 7. Form Fields
  const line1Left = 1010;
  const lineRight = 2280;
  const line1Center = (line1Left + lineRight) / 2; // ~1645

  // Row 1: Mr./Miss.
  ctx.fillStyle = '#222222';
  ctx.font = '34px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Mr./Miss.', 840, 695);

  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(line1Left, 735);
  ctx.lineTo(lineRight, 735);
  ctx.stroke();

  // Cadet Name in bold uppercase
  ctx.fillStyle = '#0F1419';
  ctx.font = 'bold 44px "Inter", "Helvetica Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((data.studentName || '').toUpperCase(), line1Center, 715);

  // Row 2: S/o/D/o.
  ctx.fillStyle = '#222222';
  ctx.font = '34px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('S/o/D/o.', 840, 815);

  ctx.beginPath();
  ctx.moveTo(line1Left, 855);
  ctx.lineTo(lineRight, 855);
  ctx.stroke();

  // Father Name
  ctx.fillStyle = '#0F1419';
  ctx.font = 'bold 44px "Inter", "Helvetica Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((data.fatherName || '').toUpperCase(), line1Center, 835);

  // Row 3: Course Completion
  ctx.fillStyle = '#222222';
  ctx.font = '34px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Has Successfully Completed Certificate Course In', 840, 935);

  // Course Name (auto-adjust font size if long)
  const courseStr = data.courseName || 'IATA Basic Aviation';
  const courseFontSize = courseStr.length > 26 ? 34 : 42;
  ctx.fillStyle = '#10448C';
  ctx.font = `bold ${courseFontSize}px "Cinzel", "Times New Roman", "Georgia", serif`;
  ctx.textAlign = 'left';
  ctx.fillText(courseStr, 1640, 935);

  // Row 4: Duration From ... To ...
  ctx.fillStyle = '#222222';
  ctx.font = '34px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Duration From :', 840, 1055);

  // Date 1 Line
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(1110, 1095);
  ctx.lineTo(1570, 1095);
  ctx.stroke();

  // Date 1 Value
  const sDate = data.courseStartDate || data.admissionDate || '15-08-2026';
  ctx.fillStyle = '#0F1419';
  ctx.font = 'bold 36px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(sDate, (1110 + 1570) / 2, 1075);

  // 'To'
  ctx.fillStyle = '#222222';
  ctx.font = '34px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('To', 1610, 1055);

  // Date 2 Line
  ctx.beginPath();
  ctx.moveTo(1680, 1095);
  ctx.lineTo(2280, 1095);
  ctx.stroke();

  // Date 2 Value
  const eDate = data.courseEndDate || '15-09-2026';
  ctx.fillStyle = '#0F1419';
  ctx.font = 'bold 36px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(eDate, (1680 + 2280) / 2, 1075);

  // 8. Bottom Row: ISO Seal + IATA Seal + Official QR Code + Signature
  // ISO Seal
  try {
    const isoImg = await loadImg('/certificate/iso-stamp-clean.png');
    ctx.drawImage(isoImg, 1080, 1260, 220, 220);
  } catch (err) {
    console.warn('Could not load ISO seal', err);
  }

  // IATA Seal
  try {
    const iataImg = await loadImg('/certificate/iata-stamp-clean.png');
    ctx.drawImage(iataImg, 1360, 1260, 220, 220);
  } catch (err) {
    console.warn('Could not load IATA seal', err);
  }

  // Official QR Code (User's QR Code Vanshcode.png or dynamic verification link)
  try {
    let qrImageElement: HTMLImageElement;
    if (data.qrType === 'verification_link') {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://vanshaviationacademy.com';
      const verifyUrl = `${origin}/verify?q=${encodeURIComponent(data.registrationNumber)}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 400,
        margin: 1,
        color: { dark: '#000000', light: '#FFFFFF' },
      });
      qrImageElement = await loadImg(qrDataUrl);
    } else {
      qrImageElement = await loadImg(qrSrc);
    }

    const qx = 1650;
    const qy = 1275;
    const qs = 190;
    ctx.drawImage(qrImageElement, qx, qy, qs, qs);

    // Gold border frame around QR
    ctx.strokeStyle = C_GOLD;
    ctx.lineWidth = 3;
    ctx.strokeRect(qx - 6, qy - 6, qs + 12, qs + 12);

    // Scan to verify caption
    ctx.fillStyle = '#5A5A5A';
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN TO VERIFY', qx + qs / 2, qy + qs + 30);
  } catch (err) {
    console.warn('Could not load QR code image', err);
  }

  // Official Signature - Raj Pratap Singh
  try {
    const sigImg = await loadImg('/certificate/raj-pratap-singh-signature.png');
    ctx.drawImage(sigImg, 1920, 1250, 310, 150);
  } catch (err) {
    console.warn('Could not load signature image', err);
  }

  // Signature line & Authorised Signatory text
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(1920, 1420);
  ctx.lineTo(2240, 1420);
  ctx.stroke();

  ctx.fillStyle = '#10448C';
  ctx.font = 'bold 24px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('RAJ PRATAP SINGH', 2080, 1455);

  ctx.fillStyle = '#4A5568';
  ctx.font = 'bold 16px "Inter", sans-serif';
  ctx.fillText('Director & Authorised Signatory', 2080, 1485);
};

export const renderLuxuryCertificate = async (
  canvas: HTMLCanvasElement,
  data: CertificateData,
  logoSrc: string,
  signatureSrc?: string
): Promise<void> => {
  const W = 2400;
  const H = 1700;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Distinctive Vansh Aviation Academy Color Palette
  // Inspired by Vansh Aviation original certificate: Rich Royal Pilot Blue, Warm Bronze Gold & Slate Navy
  const C_PRIMARY_BLUE = '#0D2F62';     // Rich Classic Royal Pilot Blue
  const C_ROYAL_BLUE = '#10448C';       // Vansh Aviation Signboard Blue (as on original certificate)
  const C_ACCENT_GOLD = '#C2974D';      // Warm Vansh Bronze Gold (exact facet color from original certificate)
  const C_GOLD_DARK = '#9E742D';        // Deep burnished antique bronze
  const C_GOLD_LIGHT = '#EACD7A';       // Pale champagne gold
  const C_GOLD_PALE = '#FDF9EC';        // Warm parchment cream for ribbon text
  const C_SLATE_DARK = '#1C2636';       // Vansh slate navy (exact charcoal from original certificate)
  const C_SLATE_MUTED = '#5B697C';      // Clean slate steel for labels
  const C_CARD_BORDER = '#D6DEE8';

  // 1. Background (Pristine luxury white parchment canvas)
  ctx.fillStyle = '#FCFDFE';
  ctx.fillRect(0, 0, W, H);

  // Outer solid pilot navy frame
  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.fillRect(0, 0, W, 32);
  ctx.fillRect(0, H - 32, W, 32);
  ctx.fillRect(0, 0, 32, H);
  ctx.fillRect(W - 32, 0, 32, H);

  // Triple Warm Bronze Gold Borders
  ctx.strokeStyle = C_ACCENT_GOLD;
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  ctx.strokeStyle = C_GOLD_DARK;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  ctx.strokeStyle = C_GOLD_LIGHT;
  ctx.lineWidth = 2;
  ctx.strokeRect(56, 56, W - 112, H - 112);

  // 4 Corner Ornaments (Art-Deco Diamonds in Royal Blue & Bronze Gold)
  const corners = [
    { cx: 56, cy: 56, sx: 1, sy: 1 },
    { cx: W - 56, cy: 56, sx: -1, sy: 1 },
    { cx: 56, cy: H - 56, sx: 1, sy: -1 },
    { cx: W - 56, cy: H - 56, sx: -1, sy: -1 },
  ];

  corners.forEach(({ cx, cy, sx, sy }) => {
    ctx.fillStyle = C_PRIMARY_BLUE;
    const x1 = Math.min(cx, cx + sx * 40);
    const y1 = Math.min(cy, cy + sy * 40);
    ctx.fillRect(x1, y1, 40, 40);

    const dx = cx + sx * 20;
    const dy = cy + sy * 20;
    ctx.fillStyle = C_ACCENT_GOLD;
    ctx.beginPath();
    ctx.moveTo(dx, dy - 8);
    ctx.lineTo(dx + 8, dy);
    ctx.lineTo(dx, dy + 8);
    ctx.lineTo(dx - 8, dy);
    ctx.closePath();
    ctx.fill();
  });

  // Subtle Guilloche Rings in Pale Warm Champagne
  ctx.strokeStyle = '#F4EEDC';
  ctx.lineWidth = 1;
  for (let r = 400; r < 1200; r += 60) {
    ctx.beginPath();
    ctx.ellipse(W / 2, H / 2, r, r * 0.7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Helper Image Loader
  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  // 2. Official Academy Logo
  try {
    const logoImg = await loadImg(logoSrc);
    const logoH = 150;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.drawImage(logoImg, W / 2 - logoW / 2, 85, logoW, logoH);
  } catch (e) {
    console.warn('Failed to load logo on certificate canvas', e);
  }

  // Academy Title (Royal Pilot Blue)
  ctx.fillStyle = C_ROYAL_BLUE;
  ctx.font = 'bold 48px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('VANSH AVIATION ACADEMY', W / 2, 285);

  // Subtitle with DGCA, IATA & ISO Accreditations
  ctx.fillStyle = C_GOLD_DARK;
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.fillText(
    'DGCA APPROVED • IATA ALIGNED • ISO 9001:2015 CERTIFIED AVIATION ACADEMY • INDORE CAMPUS',
    W / 2,
    320
  );

  // Warm Bronze Gold Divider Lines & Center Star
  const lineW = 440;
  ctx.strokeStyle = C_ACCENT_GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - lineW, 345);
  ctx.lineTo(W / 2 - 40, 345);
  ctx.moveTo(W / 2 + 40, 345);
  ctx.lineTo(W / 2 + lineW, 345);
  ctx.stroke();

  // Center Star
  ctx.fillStyle = C_ACCENT_GOLD;
  drawStar(ctx, W / 2, 345, 5, 12, 6);

  // 3. Title Ribbon Banner
  const bw = 980;
  const bh = 68;
  const bx = W / 2 - bw / 2;
  const by = 380;

  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.fillRect(bx, by, bw, bh);

  ctx.strokeStyle = C_ACCENT_GOLD;
  ctx.lineWidth = 2;
  ctx.strokeRect(bx + 4, by + 4, bw - 8, bh - 8);

  // Ribbon end triangles
  const foldSize = 28;
  ctx.fillStyle = C_ACCENT_GOLD;
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx - foldSize, by + bh / 2);
  ctx.lineTo(bx, by + bh);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(bx + bw, by);
  ctx.lineTo(bx + bw + foldSize, by + bh / 2);
  ctx.lineTo(bx + bw, by + bh);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = C_GOLD_PALE;
  ctx.font = 'bold 32px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL ADMISSION LETTER & CERTIFICATE', W / 2, by + 46);

  // 4. Preamble & Student Name
  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = 'italic 23px "Times New Roman", Georgia, serif';
  ctx.fillText(
    'This is to officially certify that the candidate whose particulars appear below',
    W / 2,
    480
  );
  ctx.fillText(
    'has been formally admitted and registered with Vansh Aviation Academy.',
    W / 2,
    513
  );

  // Candidate Name
  const rawName = data.studentName.trim().toUpperCase() || 'STUDENT FULL NAME';
  const displayName = rawName.startsWith('MR.') || rawName.startsWith('MS.') ? rawName : `MR. ${rawName}`;
  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.font = 'bold 44px "Times New Roman", Georgia, serif';
  ctx.fillText(displayName, W / 2, 570);

  // Father's Name (S/O, D/O)
  const fatherRaw = (data.fatherName || '').trim();
  if (fatherRaw) {
    const fatherUpper = fatherRaw.toUpperCase();
    const displayFather =
      fatherUpper.startsWith('MR.') ||
      fatherUpper.startsWith('SHRI') ||
      fatherUpper.startsWith('LATE')
        ? fatherUpper
        : `SHRI ${fatherUpper}`;
    ctx.fillStyle = C_GOLD_DARK;
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillText(`S/O, D/O: ${displayFather}`, W / 2, 605);
  }

  // Warm Gold accent line under name
  const nameMetric = ctx.measureText(displayName);
  const nameW = Math.max(nameMetric.width, 360);
  ctx.strokeStyle = C_ACCENT_GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameW / 2 - 20, 625);
  ctx.lineTo(W / 2 + nameW / 2 + 20, 625);
  ctx.stroke();

  // 5. Details Card (Enrollment Particulars)
  const cardX = 200;
  const cardY = 655;
  const cardW = 2000;
  const cardH = 375;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(cardX, cardY, cardW, cardH);
  ctx.strokeStyle = C_ACCENT_GOLD;
  ctx.lineWidth = 2;
  ctx.strokeRect(cardX, cardY, cardW, cardH);

  // Card Header strip (Royal Pilot Blue)
  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.fillRect(cardX, cardY, cardW, 44);

  ctx.fillStyle = C_GOLD_PALE;
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('ENROLLMENT RECORD & PROGRAM PARTICULARS', cardX + 30, cardY + 28);

  ctx.fillStyle = C_GOLD_LIGHT;
  ctx.textAlign = 'right';
  ctx.fillText('AUTHENTIC DATABASE ENTRY', cardX + cardW - 30, cardY + 28);

  // Card Fields Grid
  const fields = [
    {
      label: 'REGISTRATION NUMBER',
      val: data.registrationNumber || 'VAA-2026-101',
      isHighlight: true,
    },
    {
      label: "FATHER'S NAME (S/O, D/O)",
      val: data.fatherName ? data.fatherName.toUpperCase() : 'N/A',
      isHighlight: false,
    },
    {
      label: 'PROGRAM ENROLLED',
      val: data.courseName || 'COMMERCIAL PILOT LICENSE (CPL)',
      isHighlight: false,
    },
    {
      label: 'COURSE DURATION',
      val: data.duration || '12 - 18 Months (Full Time)',
      isHighlight: false,
    },
    {
      label: 'DATE OF ADMISSION',
      val: data.admissionDate || new Date().toLocaleDateString('en-GB'),
      isHighlight: false,
    },
    {
      label: 'TRAINING STATUS',
      val: data.status || 'Verified Active Cadet',
      isHighlight: false,
    },
    {
      label: 'CAMPUS LOCATION',
      val: data.campus || 'PU4 Vijay Nagar, Behind Konark Hotel, Indore (M.P.)',
      isHighlight: false,
    },
    {
      label: 'CENTRAL FLIGHT REGISTRY',
      val: 'Authenticated DGCA & IATA Cadet Database',
      isHighlight: false,
    },
  ];

  const col1X = cardX + 60;
  const col2X = cardX + cardW / 2 + 40;
  const rowYs = [cardY + 68, cardY + 144, cardY + 220, cardY + 296];

  fields.forEach((f, idx) => {
    const colX = idx % 2 === 0 ? col1X : col2X;
    const rowY = rowYs[Math.floor(idx / 2)];

    // Gold bullet dot
    ctx.fillStyle = C_ACCENT_GOLD;
    ctx.beginPath();
    ctx.arc(colX + 4, rowY + 6, 4, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = C_SLATE_MUTED;
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(f.label, colX + 18, rowY + 10);

    // Value
    ctx.fillStyle = f.isHighlight ? C_PRIMARY_BLUE : C_SLATE_DARK;
    ctx.font = f.isHighlight ? 'bold 22px Arial, sans-serif' : 'bold 20px Arial, sans-serif';
    ctx.fillText(f.val, colX + 18, rowY + 38);

    // Divider line
    ctx.strokeStyle = C_CARD_BORDER;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(colX + 18, rowY + 54);
    ctx.lineTo(colX + 840, rowY + 54);
    ctx.stroke();
  });

  // 6. Confirmation Statement
  ctx.fillStyle = C_SLATE_DARK;
  ctx.font = 'italic 21px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'We are pleased to confirm your admission. The institution certifies that your enrollment records have been',
    W / 2,
    1070
  );
  ctx.fillText(
    'authenticated and registered under Vansh Aviation Academy central registry in accordance with DGCA & IATA guidelines.',
    W / 2,
    1100
  );

  // 7. Five Authority & Accreditation Pillars (Director Signature • ISO 9001:2015 • Seal • IATA • QR)
  const sigY = 1245;

  // Pillar 1 (Left): Authorized Signatory - Raj Pratap Singh (Director & Authorised Signatory)
  const col1Mid = 310;
  const effectiveSigSrc = signatureSrc || '/certificate/raj-pratap-singh-signature.png';
  let sigDrawn = false;
  try {
    const sigImg = await loadImg(effectiveSigSrc);
    const targetW = 280;
    const targetH = (sigImg.height * targetW) / sigImg.width;
    ctx.drawImage(sigImg, col1Mid - targetW / 2, sigY - 35, targetW, targetH);
    sigDrawn = true;
  } catch (err) {
    console.warn('Failed to load signature image', err);
  }

  if (!sigDrawn) {
    ctx.fillStyle = C_PRIMARY_BLUE;
    ctx.font = 'italic bold 34px "Brush Script MT", "Snell Roundhand", cursive, "Times New Roman"';
    ctx.textAlign = 'center';
    ctx.fillText('Raj Pratap Singh', col1Mid, sigY + 30);
  }

  // Signature line
  ctx.strokeStyle = C_SLATE_MUTED;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(col1Mid - 150, sigY + 55);
  ctx.lineTo(col1Mid + 150, sigY + 55);
  ctx.stroke();

  // Signatory Title & Designation
  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.font = 'bold 21px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('RAJ PRATAP SINGH', col1Mid, sigY + 84);

  ctx.fillStyle = C_SLATE_DARK;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.fillText('Director & Authorised Signatory', col1Mid, sigY + 106);

  ctx.fillStyle = C_GOLD_DARK;
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText('Vansh Aviation Academy • Indore Campus', col1Mid, sigY + 125);

  // Pillar 2 (Center-Left): Official ISO 9001:2015 Certified Logo
  const col2Mid = 750;
  try {
    const isoImg = await loadImg('/certificate/iso-9001-logo.png');
    const isoW = 145;
    const isoH = (isoImg.height * isoW) / isoImg.width;
    ctx.drawImage(isoImg, col2Mid - isoW / 2, sigY - 40, isoW, isoH);
  } catch (err) {
    console.warn('Could not load ISO logo', err);
    // Vector fallback badge
    ctx.fillStyle = C_PRIMARY_BLUE;
    ctx.beginPath();
    ctx.arc(col2Mid, sigY + 30, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C_GOLD_LIGHT;
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ISO 9001:2015', col2Mid, sigY + 30);
  }

  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ISO 9001:2015 CERTIFIED', col2Mid, sigY + 114);

  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = '11px Arial, sans-serif';
  ctx.fillText('Quality Management System', col2Mid, sigY + 133);

  // Pillar 3 (Center): Official Vansh Aviation Gold Embossed Academy Seal
  const sealCx = W / 2;
  const sealCy = sigY + 40;
  const sealR = 74;

  ctx.fillStyle = C_ACCENT_GOLD;
  for (let angle = 0; angle < 360; angle += 10) {
    const rad = (angle * Math.PI) / 180;
    const tx = sealCx + (sealR + 8) * Math.cos(rad);
    const ty = sealCy + (sealR + 8) * Math.sin(rad);
    ctx.beginPath();
    ctx.arc(tx, ty, 11, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, sealR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = C_GOLD_LIGHT;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.strokeStyle = C_ACCENT_GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, sealR - 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = C_GOLD_PALE;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VANSH AVIATION', sealCx, sealCy - 28);

  ctx.fillStyle = C_ACCENT_GOLD;
  ctx.font = 'bold 11px Arial, sans-serif';
  ctx.fillText('DGCA APPROVED', sealCx, sealCy - 9);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillText('OFFICIAL', sealCx, sealCy + 10);
  ctx.fillText('SEAL', sealCx, sealCy + 27);

  ctx.fillStyle = C_GOLD_LIGHT;
  ctx.font = 'bold 11px Arial, sans-serif';
  ctx.fillText('INDORE', sealCx, sealCy + 44);

  // Pillar 4 (Center-Right): Official IATA Classic Partner Logo
  const col4Mid = 1650;
  try {
    const iataImg = await loadImg('/certificate/iata-logo.png');
    const iataW = 140;
    const iataH = (iataImg.height * iataW) / iataImg.width;
    ctx.drawImage(iataImg, col4Mid - iataW / 2, sigY - 40, iataW, iataH);
  } catch (err) {
    console.warn('Could not load IATA logo', err);
    // Vector fallback badge
    ctx.fillStyle = C_PRIMARY_BLUE;
    ctx.beginPath();
    ctx.arc(col4Mid, sigY + 30, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C_GOLD_LIGHT;
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('IATA', col4Mid, sigY + 30);
  }

  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IATA CLASSIC STANDARDS', col4Mid, sigY + 114);

  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = '11px Arial, sans-serif';
  ctx.fillText('International Aviation Curriculum', col4Mid, sigY + 133);

  // Pillar 5 (Right): Verification QR Code (Vanshcode.png / Dynamic QR)
  const col5Mid = 2080;
  const qrW = 150;
  const qrX = col5Mid - (qrW + 16) / 2;
  const qrY = sigY - 45;

  try {
    let qrImg: HTMLImageElement;
    if (data.qrType === 'verification_link') {
      const verifyUrl = data.registrationNumber 
        ? `https://vanshaviationacademy.com/verify?q=${encodeURIComponent(data.registrationNumber)}`
        : 'https://vanshaviationacademy.com/verify';
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 1,
        color: {
          dark: C_PRIMARY_BLUE,
          light: '#FFFFFF',
        },
      });
      qrImg = await loadImg(qrDataUrl);
    } else {
      qrImg = await loadImg('/vansh-qr-code.png');
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrW + 16, qrW + 16);
    ctx.strokeStyle = C_ACCENT_GOLD;
    ctx.lineWidth = 2;
    ctx.strokeRect(qrX, qrY, qrW + 16, qrW + 16);
    ctx.drawImage(qrImg, qrX + 8, qrY + 8, qrW, qrW);
  } catch (err) {
    console.warn('Failed to load QR code', err);
  }

  ctx.fillStyle = C_PRIMARY_BLUE;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN TO VERIFY CADET', col5Mid, qrY + qrW + 36);

  ctx.fillStyle = C_ACCENT_GOLD;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.fillText('www.vanshaviationacademy.com', col5Mid, qrY + qrW + 54);

  // 8. Bottom Security Ribbon
  const ribbonY = H - 90;
  ctx.strokeStyle = C_ACCENT_GOLD;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(100, ribbonY);
  ctx.lineTo(W - 100, ribbonY);
  ctx.stroke();

  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'PRECISION   •   SAFETY   •   EXCELLENCE   •   DGCA APPROVED   •   IATA ALIGNED   •   ISO 9001:2015 CERTIFIED   —   VANSH AVIATION ACADEMY, INDORE',
    W / 2,
    ribbonY + 22
  );
};

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}
