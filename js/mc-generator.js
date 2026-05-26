// js/mc-generator.js
export async function generateMCPDF(mcData) {
    const html2pdf = await import('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.esm.min.js');
    const tempDiv = document.createElement('div');
    tempDiv.style.padding = '40px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.fontFamily = "'Times New Roman', serif";
    tempDiv.style.maxWidth = '800px';
    tempDiv.style.margin = '0 auto';
    
    const today = new Date().toLocaleDateString('en-MY', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const currentTime = new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const mcNumber = `PKUJBMC${new Date().toISOString().slice(0,10).replace(/-/g,'')}${Math.floor(Math.random() * 1000)}`;
    const startDate = new Date(mcData.diagnosisDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (mcData.mcDays - 1));
    const formatDate = (date) => date.toLocaleDateString('en-MY', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    tempDiv.innerHTML = `
        <div style="border: 2px solid #802c44; padding: 30px; border-radius: 8px; max-width: 700px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #802c44; padding-bottom: 15px;">
                <div style="width: 70px; height: 70px; background: #802c44; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px;">UTM</div>
                <div style="font-size: 22px; font-weight: bold; color: #802c44;">Pusat Kesihatan Universiti</div>
                <div style="font-size: 13px;">Universiti Teknologi Malaysia</div>
                <div style="font-size: 11px;">Tel: 07-5537227</div>
            </div>
            <div style="text-align: right; font-size: 11px; color: #666; margin-bottom: 15px;">No. Siri: ${mcNumber}</div>
            <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 25px 0; text-transform: uppercase;">SIJIL AKUAN SAKIT<br><span style="font-size: 12px;">MEDICAL CERTIFICATE</span></div>
            <p>Saya mengesahkan telah memeriksa:</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <div><span style="font-weight: bold; width: 130px; display: inline-block;">Nama / Name</span>: <strong>${escapeHtml(mcData.patientName)}</strong></div>
                <div style="margin-top: 8px;"><span style="font-weight: bold; width: 130px; display: inline-block;">No. Matrik / Matric No.</span>: <strong>${escapeHtml(mcData.matricNumber)}</strong></div>
                <div style="margin-top: 8px;"><span style="font-weight: bold; width: 130px; display: inline-block;">Fakulti / Faculty</span>: <strong>${escapeHtml(mcData.faculty || '—')}</strong></div>
            </div>
            <p>dan mendapat beliau <strong>TIDAK SIHAT</strong> untuk bertugas / belajar<br>dan telah diberi cuti sakit selama <strong>${mcData.mcDays} HARI</strong></p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <div><span style="font-weight: bold; width: 130px; display: inline-block;">Dari / From</span>: <strong>${formatDate(startDate)}</strong></div>
                <div style="margin-top: 8px;"><span style="font-weight: bold; width: 130px; display: inline-block;">Hingga / To</span>: <strong>${formatDate(endDate)}</strong></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                <div><div>Tarikh / Date: ${today}</div><div>Masa Dicetak / Printed: ${currentTime}</div></div>
                <div style="text-align: center;">
                    ${mcData.doctorSignatureUrl ? `<img src="${mcData.doctorSignatureUrl}" style="max-width: 180px; max-height: 60px; margin-bottom: 10px;" />` : `<div style="margin-bottom: 25px;">_________________________</div>`}
                    <div><strong>${escapeHtml(mcData.doctorName)}</strong></div>
                    <div style="font-size: 12px;">${escapeHtml(mcData.doctorSpecialization)}</div>
                    <div style="font-size: 11px;">${escapeHtml(mcData.doctorLicenseNumber || 'PEGAWAI PERUBATAN')}</div>
                    <div style="font-size: 11px;">PUSAT KESIHATAN UNIVERSITI</div>
                    <div style="font-size: 11px;">UNIVERSITI TEKNOLOGI MALAYSIA</div>
                </div>
            </div>
            <div style="margin-top: 25px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #eee; padding-top: 12px;">
                <div>TRUE COPY | SALINAN BENAR</div>
                <div>Document generated electronically</div>
            </div>
        </div>
    `;
    document.body.appendChild(tempDiv);
    const opt = { margin: [0.5, 0.5, 0.5, 0.5], filename: `MC_${mcData.patientName.replace(/\s/g, '_')}_${mcData.diagnosisDate}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
    await html2pdf.default().set(opt).from(tempDiv).save();
    tempDiv.remove();
}
function escapeHtml(str) { if (!str) return ''; return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : m === '>' ? '&gt;' : m); }