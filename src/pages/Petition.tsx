import { useState, FormEvent } from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip, PageNumber, Header } from 'docx';
import '../styles/Petition.css';

interface FormData {
  subject: string;
  plaintiffName: string;
  plaintiffAddress: string;
  defendantName: string;
  defendantAddress: string;
  details: string;
  evidences: string;
  demands: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const Petition = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    plaintiffName: '',
    plaintiffAddress: '',
    defendantName: '',
    defendantAddress: '',
    details: '',
    evidences: '',
    demands: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [generatedPetition, setGeneratedPetition] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setGeneratedPetition(null);

    try {
      const requestData = {
        query: formData.subject,
        user_info: {
          Davacı_Adı_Soyadı: formData.plaintiffName,
          Davacı_Adresi: formData.plaintiffAddress,
          Davalı_Adı_Soyadı: formData.defendantName,
          Davalı_Adresi: formData.defendantAddress,
          Acikalamalar: formData.details,
          deliller: formData.evidences,
          talepler: formData.demands
        }
      };

      const response = await axios.post('https://api.hukukarama.com/generate-dilekce', requestData);
      setGeneratedPetition(response.data);
      setSuccess('Dilekçeniz başarıyla oluşturuldu.');
      setIsModalOpen(true);
      
      // Form verilerini sıfırla
      setFormData({
        subject: '',
        plaintiffName: '',
        plaintiffAddress: '',
        defendantName: '',
        defendantAddress: '',
        details: '',
        evidences: '',
        demands: ''
      });
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const convertHtmlToDocxElements = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const processNode = (node: Node): Paragraph[] => {
      const paragraphs: Paragraph[] = [];

      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent?.trim()) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: node.textContent,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                line: 360,
                before: 240,
                after: 240,
              },
            })
          );
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        
        switch (element.tagName.toLowerCase()) {
          case 'h1':
          case 'h2':
            paragraphs.push(
              new Paragraph({
                text: element.textContent || '',
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: {
                  before: 480,
                  after: 240,
                },
              })
            );
            break;

          case 'p':
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: element.textContent || '',
                    font: "Times New Roman",
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                  line: 360,
                  before: 240,
                  after: 240,
                },
              })
            );
            break;

          case 'ul':
          case 'ol':
            Array.from(element.children).forEach((li, index) => {
              paragraphs.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${index + 1}. ${li.textContent}`,
                      font: "Times New Roman",
                      size: 24,
                    }),
                  ],
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: {
                    line: 360,
                    before: 240,
                    after: 240,
                  },
                  indent: { left: convertInchesToTwip(0.5) },
                })
              );
            });
            break;

          default:
            Array.from(node.childNodes).forEach((child) => {
              paragraphs.push(...processNode(child));
            });
        }
      }

      return paragraphs;
    };

    return processNode(doc.body);
  };

  const downloadAsWord = async () => {
    if (!generatedPetition) return;

    const docElements = convertHtmlToDocxElements(generatedPetition);

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Sayfa ",
                    font: "Times New Roman",
                    size: 20,
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: "Times New Roman",
                    size: 20,
                  }),
                  new TextRun({
                    text: " / ",
                    font: "Times New Roman",
                    size: 20,
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font: "Times New Roman",
                    size: 20,
                  }),
                ],
              }),
            ],
          }),
        },
        children: docElements,
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dilekce.docx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="petition-container">
      <div className="petition-header">
        <h1>Dilekçe Oluştur</h1>
        <p>
          Hukuki dilekçenizi kolayca oluşturun. Aşağıdaki formu doldurarak profesyonel bir dilekçe hazırlayabilirsiniz.
        </p>
      </div>

      <div className="petition-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label" htmlFor="subject">
                Konu
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Dilekçe konusunu yazın"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="plaintiffName">
                Davacı Adı Soyadı
              </label>
              <input
                type="text"
                id="plaintiffName"
                name="plaintiffName"
                className="form-input"
                value={formData.plaintiffName}
                onChange={handleChange}
                placeholder="Davacı adı soyadı"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="plaintiffAddress">
                Davacı Adresi
              </label>
              <input
                type="text"
                id="plaintiffAddress"
                name="plaintiffAddress"
                className="form-input"
                value={formData.plaintiffAddress}
                onChange={handleChange}
                placeholder="Davacı adresi"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="defendantName">
                Davalı Adı Soyadı
              </label>
              <input
                type="text"
                id="defendantName"
                name="defendantName"
                className="form-input"
                value={formData.defendantName}
                onChange={handleChange}
                placeholder="Davalı adı soyadı"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="defendantAddress">
                Davalı Adresi
              </label>
              <input
                type="text"
                id="defendantAddress"
                name="defendantAddress"
                className="form-input"
                value={formData.defendantAddress}
                onChange={handleChange}
                placeholder="Davalı adresi"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="details">
                Açıklamalar
              </label>
              <textarea
                id="details"
                name="details"
                className="form-textarea"
                value={formData.details}
                onChange={handleChange}
                placeholder="Dava ile ilgili detaylı açıklamaları yazın"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="evidences">
                Deliller
              </label>
              <textarea
                id="evidences"
                name="evidences"
                className="form-textarea"
                value={formData.evidences}
                onChange={handleChange}
                placeholder="Delilleri listeleyin"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="demands">
                Talepler
              </label>
              <textarea
                id="demands"
                name="demands"
                className="form-textarea"
                value={formData.demands}
                onChange={handleChange}
                placeholder="Talepleri yazın"
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="disclaimer-note" style={{
            backgroundColor: "rgba(255, 214, 19, 0.1)",
            border: "1px solid rgba(255, 214, 19, 0.3)",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "20px",
            fontSize: "14px",
            color: "#FFFFFF",
            textAlign: "left",
            lineHeight: "1.6",
            fontFamily: "Poppins, sans-serif"
          }}>
            <strong style={{ color: "#FFD613", fontFamily: "Poppins, sans-serif", fontWeight: "500" }}>Önemli Not:</strong> Bu dilekçe tamamen yapay zeka tarafından oluşturulmaktadır. Yapay zeka hata yapabilir, yanlış bilgiler sunabilir veya güncel olmayan hukuki bilgiler içerebilir. Oluşturulan dilekçenin hukuki sorumluluğu tamamen kullanıcıya aittir. Kullanmadan önce bir hukuk uzmanına danışmanız önerilir.
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Dilekçe Oluşturuluyor...' : 'Dilekçe Oluştur'}
          </button>
        </form>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="generated-petition-container">
          <h2>Oluşturulan Dilekçe</h2>
          <div className="generated-petition" dangerouslySetInnerHTML={{ __html: generatedPetition || '' }} />
          <div className="modal-actions">
            <button className="download-button" onClick={downloadAsWord}>
              Word Olarak İndir
            </button>
          </div>
        </div>
      </Modal>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default Petition; 