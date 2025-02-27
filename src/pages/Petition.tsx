import { useState, FormEvent } from 'react';
import '../styles/Petition.css';

interface FormData {
  petitionType: string;
  court: string;
  subject: string;
  plaintiffName: string;
  plaintiffAddress: string;
  defendantName: string;
  defendantAddress: string;
  details: string;
  evidences: string;
  demands: string;
}

const Petition = () => {
  const [formData, setFormData] = useState<FormData>({
    petitionType: '',
    court: '',
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

    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Dilekçeniz başarıyla oluşturuldu.');
      // Form verilerini sıfırla
      setFormData({
        petitionType: '',
        court: '',
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
    } finally {
      setIsLoading(false);
    }
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
            <div className="form-group">
              <label className="form-label" htmlFor="petitionType">
                Dilekçe Türü
              </label>
              <select
                id="petitionType"
                name="petitionType"
                className="form-select"
                value={formData.petitionType}
                onChange={handleChange}
                required
              >
                <option value="">Seçiniz</option>
                <option value="dava">Dava Dilekçesi</option>
                <option value="itiraz">İtiraz Dilekçesi</option>
                <option value="temyiz">Temyiz Dilekçesi</option>
                <option value="skayet">Şikayet Dilekçesi</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="court">
                Mahkeme
              </label>
              <select
                id="court"
                name="court"
                className="form-select"
                value={formData.court}
                onChange={handleChange}
                required
              >
                <option value="">Seçiniz</option>
                <option value="asliye-hukuk">Asliye Hukuk Mahkemesi</option>
                <option value="sulh-hukuk">Sulh Hukuk Mahkemesi</option>
                <option value="is">İş Mahkemesi</option>
                <option value="aile">Aile Mahkemesi</option>
                <option value="ticaret">Ticaret Mahkemesi</option>
              </select>
            </div>

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

          <div className="form-checkbox-group">
            <input
              type="checkbox"
              id="terms"
              className="form-checkbox"
              required
            />
            <label htmlFor="terms" className="checkbox-label">
              Bilgilerin doğruluğunu onaylıyorum ve dilekçenin oluşturulmasını kabul ediyorum.
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Dilekçe Oluşturuluyor...' : 'Dilekçe Oluştur'}
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default Petition; 