import { useState } from 'react';
import '../styles/Petition.css';

interface PetitionForm {
  subject: string;
  description: string;
  fullName: string;
  identificationNumber: string;
  address: string;
  phone: string;
}

const Petition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPetition, setGeneratedPetition] = useState<string>('');
  const [petitionForm, setPetitionForm] = useState<PetitionForm>({
    subject: '',
    description: '',
    fullName: '',
    identificationNumber: '',
    address: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const requestBody = {
        query: `${petitionForm.subject}. ${petitionForm.description}`,
        user_info: {
          "Ad Soyad": petitionForm.fullName,
          "TC Kimlik No": petitionForm.identificationNumber,
          "Adres": petitionForm.address,
          "Telefon": petitionForm.phone
        }
      };

      const response = await fetch('https://api.hukukarama.com/generate-dilekce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }

      const htmlContent = await response.text();
      
      const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const bodyContent = bodyMatch ? bodyMatch[1].trim() : htmlContent;
      
      setGeneratedPetition(bodyContent);
    } catch (error) {
      console.error('API Error:', error);
      alert('Dilekçe oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetitionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dilekçe</title>
          <style>
            @page {
              size: A4;
              margin: 2cm;
            }
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              background: white;
              color: black;
              padding: 20px;
            }
            .print-content {
              margin: 0;
              padding: 0;
            }
            .print-content h2,
            .print-content h3,
            .print-content p,
            .print-content div {
              margin: 0;
              padding: 0;
              text-align: left;
            }
            .print-content h2 {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 1rem;
            }
            .print-content h3 {
              font-size: 14px;
              font-weight: bold;
              margin: 1rem 0;
            }
            .print-content p {
              margin-bottom: 0.5rem;
            }
            .print-content ul {
              margin: 0.5rem 0;
              padding-left: 1.5rem;
            }
            .print-content li {
              margin-bottom: 0.25rem;
            }
            @media print {
              body {
                width: 21cm;
                min-height: 29.7cm;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            ${generatedPetition}
          </div>
        </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    const iframeDoc = iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(printContent);
      iframeDoc.close();
      
      setTimeout(() => {
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 250);
    }
  };

  const handleDownloadWord = () => {
    const template = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Dilekçe</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 2cm;
            }
            .word-content {
              margin: 0;
              padding: 0;
            }
            .word-content h2,
            .word-content h3,
            .word-content p,
            .word-content div {
              margin: 0;
              padding: 0;
              text-align: left;
            }
            .word-content h2 {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 1rem;
            }
            .word-content h3 {
              font-size: 14px;
              font-weight: bold;
              margin: 1rem 0;
            }
            .word-content p {
              margin-bottom: 0.5rem;
            }
            .word-content ul {
              margin: 0.5rem 0;
              padding-left: 1.5rem;
            }
            .word-content li {
              margin-bottom: 0.25rem;
            }
          </style>
        </head>
        <body>
          <div class="word-content">
            ${generatedPetition}
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([template], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `dilekce_${new Date().getTime()}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="petition-page">
      <div className="petition-header">
        <h1>Dilekçe Oluştur</h1>
        <p>Dilekçe oluşturmak için aşağıdaki formu doldurun.</p>
      </div>

      <div className="petition-container">
        <form onSubmit={handleSubmit} className="petition-form">
          <div className="form-group">
            <label htmlFor="subject">Dilekçe Konusu</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={petitionForm.subject}
              onChange={handleInputChange}
              placeholder="Dilekçenizin konusunu yazın"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Detaylı Açıklama</label>
            <textarea
              id="description"
              name="description"
              value={petitionForm.description}
              onChange={handleInputChange}
              placeholder="Dilekçenizin içeriğini detaylı bir şekilde açıklayın"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Ad Soyad</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={petitionForm.fullName}
              onChange={handleInputChange}
              placeholder="Adınız ve soyadınız"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="identificationNumber">TC Kimlik No / Pasaport No</label>
            <input
              type="text"
              id="identificationNumber"
              name="identificationNumber"
              value={petitionForm.identificationNumber}
              onChange={handleInputChange}
              placeholder="TC Kimlik numaranız veya pasaport numaranız"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Adres</label>
            <input
              type="text"
              id="address"
              name="address"
              value={petitionForm.address}
              onChange={handleInputChange}
              placeholder="Açık adresiniz"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={petitionForm.phone}
              onChange={handleInputChange}
              placeholder="Telefon numaranız"
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Dilekçe Oluşturuluyor...' : 'Dilekçe Oluştur'}
          </button>
        </form>

        {generatedPetition && (
          <div className="generated-petition">
            <h2>Oluşturulan Dilekçe</h2>
            <div 
              className="petition-content"
              dangerouslySetInnerHTML={{ __html: generatedPetition }}
            />
            <div className="petition-actions">
              <button onClick={handlePrint} className="action-button">
                Yazdır / PDF Olarak Kaydet
              </button>
              <button onClick={handleDownloadWord} className="action-button">
                Word Olarak İndir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Petition; 