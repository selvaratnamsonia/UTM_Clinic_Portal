// js/mc-generator.js

export async function generateMCPDF(mcData) {
    const pdfEngine = window.html2pdf;
    
    if (!pdfEngine) {
        console.error("Dependency Error: html2pdf engine layout context is missing in window root.");
        alert("System component missing. Please refresh the page.");
        return;
    }
    
    const tempDiv = document.createElement('div');
    tempDiv.style.padding = '40px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.fontFamily = "'Times New Roman', serif";
    tempDiv.style.maxWidth = '800px';
    tempDiv.style.margin = '0 auto';

    // --- DATA MAPPING ---
    // Added mcData.matricId here to catch standard user DB formats
    const safeMatric = mcData.matricId || mcData.matricNumber || mcData.matricNo || mcData.studentId || mcData.patientId || 'N/A';
    const safeMCDays = parseInt(mcData.mcDays || mcData.mcDuration || 1);
    const safeFaculty = mcData.faculty || 'General';
    const safeDate = mcData.diagnosisDate ? new Date(mcData.diagnosisDate) : new Date();
    
    const today = new Date().toLocaleDateString('en-MY', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const currentTime = new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const mcNumber = `PKUJBMC${new Date().toISOString().slice(0,10).replace(/-/g,'')}${Math.floor(Math.random() * 1000)}`;
    
    const startDate = new Date(safeDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (safeMCDays - 1));
    const formatDate = (date) => date.toLocaleDateString('en-MY', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    tempDiv.innerHTML = `
        <div style="border: 2px solid #802c44; padding: 30px; border-radius: 8px; max-width: 700px; margin: 0 auto; color: #000;">
            <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #802c44; padding-bottom: 15px;">
                <div style="width: 70px; height: 70px; background: #802c44; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; margin-left: auto; margin-right: auto;">UTM</div>
                <div style="font-size: 22px; font-weight: bold; color: #802c44;">Pusat Kesihatan Universiti</div>
                <div style="font-size: 13px;">Universiti Teknologi Malaysia</div>
                <div style="font-size: 11px;">Tel: 07-5537227</div>
            </div>
            <div style="text-align: right; font-size: 11px; color: #666; margin-bottom: 15px;">No. Siri: ${mcNumber}</div>
            <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 25px 0; text-transform: uppercase;">SIJIL AKUAN SAKIT<br><span style="font-size: 12px; font-weight: normal;">MEDICAL CERTIFICATE</span></div>
            <p style="font-size: 14px; margin-bottom: 10px;">Saya mengesahkan telah memeriksa / *I certify that I have examined*:</p>
            <div style="background: #f8fafc; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 15px 0; font-size: 14px;">
                <div style="margin-bottom: 8px;"><span style="font-weight: bold; width: 160px; display: inline-block;">Nama / Name</span>: <strong style="text-transform: uppercase;">${escapeHtml(mcData.patientName || 'N/A')}</strong></div>
                <div style="margin-bottom: 8px;"><span style="font-weight: bold; width: 160px; display: inline-block;">No. Matrik / Matric No.</span>: <strong>${escapeHtml(safeMatric)}</strong></div>
                <div><span style="font-weight: bold; width: 160px; display: inline-block;">Fakulti / Faculty</span>: <strong>${escapeHtml(safeFaculty)}</strong></div>
            </div>
            <p style="font-size: 14px; line-height: 1.6;">dan mendapati beliau **TIDAK SIHAT** untuk bertugas / belajar dan telah diberi cuti sakit selama **${safeMCDays} HARI**.<br><em style="font-size: 13px; color: #555;">and found them UNFIT to attend duty / classes and is granted medical leave for ${safeMCDays} DAY(S).</em></p>
            <div style="background: #f8fafc; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 15px 0; font-size: 14px;">
                <div style="margin-bottom: 8px;"><span style="font-weight: bold; width: 160px; display: inline-block;">Dari / From</span>: <strong>${formatDate(startDate)}</strong></div>
                <div><span style="font-weight: bold; width: 160px; display: inline-block;">Hingga / To</span>: <strong>${formatDate(endDate)}</strong></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 40px; font-size: 13px;">
                <div style="align-self: flex-end;">
                    <div>Tarikh / Date: <strong>${today}</strong></div>
                    <div>Masa Dicetak / Printed: ${currentTime}</div>
                </div>
                <div style="text-align: center; min-width: 220px;">
                    ${mcData.doctorSignatureUrl ? `<img src="${mcData.doctorSignatureUrl}" style="max-width: 180px; max-height: 60px; display: block; margin: 0 auto 5px;" />` : `<div style="margin-bottom: 45px;"></div>`}
                    <div style="border-top: 1px dashed #000; padding-top: 5px;"><strong>${escapeHtml(mcData.doctorName || 'Pegawai Perubatan')}</strong></div>
                    <div style="font-size: 12px; color: #333;">${escapeHtml(mcData.doctorSpecialization || 'Pegawai Perubatan')}</div>
                    <div style="font-size: 11px; color: #555;">No. Pendaftaran: ${escapeHtml(mcData.doctorLicenseNumber || 'MMC Registered')}</div>
                    <div style="font-size: 11px; font-weight: bold; margin-top: 3px; color: #802c44;">PUSAT KESIHATAN UNIVERSITI (UTM)</div>
                </div>
            </div>
            <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px dashed #e2e8f0; padding-top: 12px;">
                <div>SALINAN BENAR ELEKTRONIK / ELECTRONIC TRUE COPY</div>
                <div>This document is generated automatically by UTM Clinic Portal. No physical stamp is required.</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(tempDiv);
    
    const safeFileName = `MC_${(mcData.patientName || 'Patient').replace(/[^a-zA-Z0-9]/g, '_')}_${today.replace(/\//g, '')}.pdf`;

    const opt = { 
        margin: [0.4, 0.4, 0.4, 0.4], 
        filename: safeFileName, 
        image: { type: 'jpeg', quality: 0.98 }, 
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: false 
        }, 
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } 
    };
    
    try {
        await pdfEngine().set(opt).from(tempDiv).save();
    } catch (error) {
        console.error("PDF generation layout processing issue:", error);
        alert("An error occurred formatting the document canvas.");
    } finally {
        tempDiv.remove();
    }
}

function escapeHtml(str) { 
    if (!str) return ''; 
    return String(str).replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : m === '>' ? '&gt;' : m); 
}