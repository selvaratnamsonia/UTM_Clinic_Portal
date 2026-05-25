// js/mc-generator.js
// Medical Certificate PDF Generator for UTM Clinic Portal

export async function generateMCPDF(mcData) {
    // Dynamically import html2pdf.js
    const html2pdf = await import('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.esm.min.js');
    
    // Create a temporary div for the MC content
    const tempDiv = document.createElement('div');
    tempDiv.style.padding = '40px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.fontFamily = "'Times New Roman', serif";
    tempDiv.style.maxWidth = '800px';
    tempDiv.style.margin = '0 auto';
    
    // Format dates
    const today = new Date().toLocaleDateString('en-MY', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    const currentTime = new Date().toLocaleTimeString('en-MY', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Generate MC number (PKUJB + date + random)
    const mcNumber = `PKUJBMC${new Date().toISOString().slice(0,10).replace(/-/g,'')}${Math.floor(Math.random() * 1000)}`;
    
    // Calculate end date based on rest days
    const startDate = new Date(mcData.diagnosisDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (mcData.mcDays - 1));
    
    const formatDate = (date) => {
        return date.toLocaleDateString('en-MY', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    
    tempDiv.innerHTML = `
        <style>
            .mc-container {
                border: 2px solid #802c44;
                padding: 30px;
                border-radius: 8px;
                position: relative;
            }
            .mc-header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #802c44;
                padding-bottom: 20px;
            }
            .utm-logo {
                width: 80px;
                height: 80px;
                margin: 0 auto 10px;
                background: #802c44;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 32px;
                font-weight: bold;
            }
            .clinic-name {
                font-size: 24px;
                font-weight: bold;
                color: #802c44;
                margin-bottom: 5px;
            }
            .clinic-sub {
                font-size: 14px;
                color: #666;
            }
            .mc-title {
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                margin: 25px 0;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            .mc-number {
                text-align: right;
                font-size: 12px;
                color: #666;
                margin-bottom: 20px;
            }
            .certificate-body {
                margin: 30px 0;
                line-height: 1.8;
            }
            .patient-info {
                margin: 20px 0;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
            }
            .signature-section {
                margin-top: 50px;
                display: flex;
                justify-content: space-between;
            }
            .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 10px;
                color: #999;
                border-top: 1px solid #eee;
                padding-top: 15px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            td {
                padding: 8px;
                vertical-align: top;
            }
            .label {
                font-weight: bold;
                width: 140px;
            }
        </style>
        
        <div class="mc-container">
            <div class="mc-header">
                <div class="utm-logo">UTM</div>
                <div class="clinic-name">Pusat Kesihatan Universiti</div>
                <div class="clinic-sub">Universiti Teknologi Malaysia</div>
                <div class="clinic-sub">Tel: 07-5537227</div>
            </div>
            
            <div class="mc-number">
                No. Siri: ${mcNumber}
            </div>
            
            <div class="mc-title">
                SIJIL AKUAN SAKIT
                <br>
                <small style="font-size: 12px;">MEDICAL CERTIFICATE</small>
            </div>
            
            <div class="certificate-body">
                <p>Saya mengesahkan telah memeriksa:</p>
                
                <div class="patient-info">
                    <table>
                        <tr>
                            <td class="label">Nama / Name</td>
                            <td>: <strong>${mcData.patientName}</strong></td>
                        </tr>
                        <tr>
                            <td class="label">No. Matrik / Matric No.</td>
                            <td>: <strong>${mcData.matricNumber}</strong></td>
                        </tr>
                        <tr>
                            <td class="label">Fakulti / Faculty</td>
                            <td>: <strong>${mcData.faculty || '—'}</strong></td>
                        </tr>
                    </table>
                </div>
                
                <p>dan mendapat beliau <strong>TIDAK SIHAT</strong> untuk bertugas / belajar<br>
                dan telah diberi cuti sakit selama <strong>${mcData.mcDays} HARI</strong></p>
                
                <div class="patient-info">
                    <table>
                        <tr>
                            <td class="label">Dari / From</td>
                            <td>: <strong>${formatDate(startDate)}</strong></td>
                        </tr>
                        <tr>
                            <td class="label">Hingga / To</td>
                            <td>: <strong>${formatDate(endDate)}</strong></td>
                        </tr>
                    </table>
                </div>
                
                <div class="signature-section">
                    <div>
                        <p>Tarikh / Date: ${today}</p>
                        <p>Masa Dicetak / Printed: ${currentTime}</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="margin-bottom: 30px;">_________________________</div>
                        <div><strong>${mcData.doctorName}</strong></div>
                        <div style="font-size: 12px;">PEGAWAI PERUBATAN</div>
                        <div style="font-size: 12px;">PUSAT KESIHATAN UNIVERSITI</div>
                        <div style="font-size: 12px;">UNIVERSITI TEKNOLOGI MALAYSIA</div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <div>TRUE COPY | SALINAN BENAR</div>
                <div>Document generated electronically - No signature required</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(tempDiv);
    
    // PDF options
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `MC_${mcData.patientName.replace(/\s/g, '_')}_${mcData.diagnosisDate}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate PDF
    await html2pdf.default().set(opt).from(tempDiv).save();
    
    // Clean up
    tempDiv.remove();
}

export function formatDateForMC(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}