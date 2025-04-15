import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/BookingSuccess.css';

const BookingSuccess = ({ bookingData }) => {
  const [showPrintVersion, setShowPrintVersion] = useState(false);

  // Formatage de la date et l'heure pour l'affichage
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Non spécifié';
    
    const date = new Date(dateTimeString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Formatage du prix
  const formatPrice = (price) => {
    if (!price) return '0,00 €';
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: price.currency || 'EUR'
    }).format(price.amount);
  };

  // Fonction pour générer QR code (simulée)
  const getQRCodeUrl = (bookingId) => {
    return `/api/qr-code/${bookingId}`;
  };

  // Fonction pour afficher la version imprimable
  const handlePrint = () => {
    setShowPrintVersion(true);
    setTimeout(() => {
      window.print();
      setShowPrintVersion(false);
    }, 300);
  };

  // Véhicule sélectionné
  const getVehicleInfo = (type) => {
    const vehicles = {
      'sedan': { name: 'Berline de Luxe', desc: 'Mercedes Classe E ou similaire', icon: 'car-side' },
      'green': { name: 'Green - Tesla Model 3', desc: 'Véhicule 100% électrique', icon: 'leaf' },
      'premium': { name: 'Berline Premium', desc: 'Mercedes Classe S ou similaire', icon: 'car' },
      'suv': { name: 'SUV de Luxe', desc: 'BMW X5 ou similaire', icon: 'truck' },
      'van': { name: 'Van VIP', desc: 'Mercedes Classe V ou similaire', icon: 'shuttle-van' }
    };

    return vehicles[type] || { name: 'Véhicule standard', desc: '', icon: 'car' };
  };

  const vehicleInfo = getVehicleInfo(bookingData.vehicleType);

  return (
    <div className={`booking-success ${showPrintVersion ? 'print-version' : ''}`}>
      <div className="success-header">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h2>Réservation confirmée !</h2>
        
        <p className="success-message">
          Merci pour votre réservation. Votre chauffeur est informé et vous contactera prochainement.
        </p>
      </div>
      
      <div className="booking-details">
        <div className="booking-reference">
          <h3>Référence de réservation</h3>
          <div className="reference-code">
            <span>{bookingData.id || 'En attente'}</span>
          </div>
          <div className="booking-qrcode">
            <img src={getQRCodeUrl(bookingData.id)} alt="QR Code de réservation" className="qrcode-img" />
            <span className="qrcode-info">Présentez ce code à votre chauffeur</span>
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Informations du trajet</h3>
          
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Date et heure:</span>
              <span className="detail-value">
                {formatDateTime(bookingData.pickupDateTime)}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Départ:</span>
              <span className="detail-value">
                <i className="fas fa-map-marker-alt"></i>
                {bookingData.pickupAddress}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Destination:</span>
              <span className="detail-value">
                <i className="fas fa-map-marker-alt"></i>
                {bookingData.dropoffAddress}
              </span>
            </div>
            
            {bookingData.flightNumber && (
              <div className="detail-item">
                <span className="detail-label">Numéro de vol:</span>
                <span className="detail-value">
                  <i className="fas fa-plane"></i>
                  {bookingData.flightNumber}
                </span>
              </div>
            )}
            
            {bookingData.trainNumber && (
              <div className="detail-item">
                <span className="detail-label">Numéro de train:</span>
                <span className="detail-value">
                  <i className="fas fa-train"></i>
                  {bookingData.trainNumber}
                </span>
              </div>
            )}
            
            {bookingData.roundTrip && (
              <div className="detail-item">
                <span className="detail-label">Retour:</span>
                <span className="detail-value">
                  <i className="fas fa-calendar-alt"></i>
                  {formatDateTime(bookingData.returnDateTime)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Votre véhicule</h3>
          
          <div className="vehicle-card">
            <div className="vehicle-icon">
              <i className={`fas fa-${vehicleInfo.icon}`}></i>
            </div>
            <div className="vehicle-info">
              <h4>{vehicleInfo.name}</h4>
              <p>{vehicleInfo.desc}</p>
              <div className="vehicle-capacity">
                <span><i className="fas fa-users"></i> {bookingData.passengers} passagers</span>
                <span><i className="fas fa-suitcase"></i> {bookingData.luggage} bagages</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Prix et paiement</h3>
          
          <div className="payment-details">
            <div className="price-row total">
              <span>Prix total</span>
              <span className="price">{formatPrice(bookingData.price)}</span>
            </div>
            <div className="payment-method">
              <span>Paiement auprès du chauffeur</span>
              <div className="payment-icons">
                <i className="fas fa-money-bill-wave"></i>
                <i className="fas fa-credit-card"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Contact chauffeur</h3>
          
          <div className="driver-contact">
            <p><i className="fas fa-phone"></i> Le chauffeur vous contactera peu avant votre prise en charge.</p>
            <div className="contact-option">
              <span>Pour toute question, contactez notre service client :</span>
              <a href="tel:+33600000000" className="phone-link">
                <i className="fas fa-phone-alt"></i> +33 6 00 00 00 00
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="success-actions">
        <button onClick={handlePrint} className="action-button print-button">
          <i className="fas fa-print"></i>
          Imprimer la confirmation
        </button>
        
        <Link to="/" className="action-button home-button">
          <i className="fas fa-home"></i>
          Retour à l'accueil
        </Link>
      </div>
      
      <div className="additional-options">
        <h4>Complétez votre expérience</h4>
        <div className="options-grid">
          <div className="option-card">
            <div className="option-icon">
              <i className="fas fa-glass-cheers"></i>
            </div>
            <h5>Champagne à bord</h5>
            <p>Commencez votre voyage avec une bouteille de champagne</p>
            <a href="#" className="option-link">Ajouter (+75€)</a>
          </div>
          
          <div className="option-card">
            <div className="option-icon">
              <i className="fas fa-concierge-bell"></i>
            </div>
            <h5>Service VIP</h5>
            <p>Accueil personnalisé et service de conciergerie</p>
            <a href="#" className="option-link">Ajouter (+50€)</a>
          </div>
          
          <div className="option-card">
            <div className="option-icon">
              <i className="fas fa-child"></i>
            </div>
            <h5>Siège enfant</h5>
            <p>Siège adapté pour les enfants de moins de 10 ans</p>
            <a href="#" className="option-link">Ajouter (+15€)</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;