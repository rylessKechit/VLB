import { useState } from 'react';
import '../styles/pages/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({
    success: false,
    message: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitResult({
          success: true,
          message: data.message || 'Votre message a été envoyé avec succès.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Une erreur est survenue. Veuillez réessayer.',
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Une erreur est survenue. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>CONTACTEZ TAXI VLB À VERRIÈRES LE BUISSON</h1>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          <h2>POSEZ-MOI VOS QUESTIONS</h2>
          <p>
            N'hésitez pas à m'adresser vos demandes à l'aide de ce formulaire de contact. 
            Je vous répondrai dans les plus brefs délais.
          </p>
          
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>TÉLÉPHONE</h3>
                <p><a href="tel:+33600000000">+33 6 00 00 00 00</a></p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>EMAIL</h3>
                <p><a href="mailto:contact@taxivlb.com">contact@taxivlb.com</a></p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>ADRESSE</h3>
                <p>Verrières-le-Buisson, 91370</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>DISPONIBILITÉ</h3>
                <p>7j/7 et 24h/24</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre email"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Votre numéro de téléphone"
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                rows="6"
                required
              ></textarea>
            </div>
            
            {submitResult.message && (
              <div className={`submit-result ${submitResult.success ? 'success' : 'error'}`}>
                {submitResult.message}
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="booking-simulator">
        <h2>SIMULATEUR DE COURSE</h2>
        <div className="simulator-container">
          <div className="simulator-form">
            <div className="form-group">
              <label>ADRESSE DE DÉPART *</label>
              <input type="text" placeholder="Entrez l'adresse de départ" />
            </div>
            
            <div className="form-group">
              <label>ADRESSE D'ARRIVÉE *</label>
              <input type="text" placeholder="Entrez l'adresse d'arrivée" />
            </div>
            
            <div className="form-group">
              <label>DATE ET HEURE DE DÉPART *</label>
              <input type="datetime-local" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>NOMBRE DE PASSAGERS *</label>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>NOMBRE DE BAGAGES *</label>
                <select>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            
            <div className="form-group checkbox">
              <label>
                <input type="checkbox" />
                ALLER RETOUR ?
              </label>
            </div>
            
            <button className="calculate-button">
              Calculer le prix
            </button>
          </div>
        </div>
      </div>
      
      <div className="map-section">
        <div className="map-container">
          <iframe
            title="Taxi VLB Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21019.54502675787!2d2.2450169!3d48.7479652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e677a353f59295%3A0x40b82c3688c5a80!2s91370%20Verri%C3%A8res-le-Buisson!5e0!3m2!1sfr!2sfr!4v1682338456975!5m2!1sfr!2sfr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;