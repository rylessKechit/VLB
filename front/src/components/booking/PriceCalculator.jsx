import { useState } from 'react';
import BookingConfirmation from './BookingConfirmation';
import BookingSuccess from './BookingSuccess';
import '../../styles/components/PriceCalculator.css';

const PriceCalculator = ({ estimate, bookingData, onBookNow }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  
  // Vérifier si estimate existe avant d'accéder à ses propriétés
  if (!estimate) {
    return (
      <div className="price-calculator">
        <div className="price-overview">
          <h3>Estimation de prix</h3>
          <p>Les données d'estimation ne sont pas disponibles.</p>
        </div>
      </div>
    );
  }
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  const formatTime = (seconds) => {
    if (!seconds) return 'Non disponible';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes} minutes`;
  };

  // Vérifier la présence des propriétés nécessaires
  const hasDistanceInfo = estimate.distanceInfo && estimate.distanceInfo.text;
  const hasDurationInfo = estimate.durationInfo && estimate.durationInfo.value;
  
  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };
  
  const handleBookingSuccess = (result) => {
    setBookingResult(result);
    setShowBookingForm(false);
  };
  
  const handleBookingCancel = () => {
    setShowBookingForm(false);
  };
  
  // Afficher le formulaire de réservation si l'utilisateur a cliqué sur "Réserver maintenant"
  if (showBookingForm) {
    return (
      <BookingConfirmation 
        bookingData={bookingData}
        priceEstimate={estimate}
        onSuccess={handleBookingSuccess}
        onCancel={handleBookingCancel}
      />
    );
  }
  
  // Afficher le message de succès si la réservation a été confirmée
  if (bookingResult) {
    return (
      <BookingSuccess bookingData={bookingResult.data || bookingResult} />
    );
  }

  return (
    <div className="price-calculator">
      <div className="price-overview">
        <h3>Estimation de prix</h3>
        
        <div className="journey-details">
          {hasDistanceInfo && (
            <div className="detail-item">
              <i className="fas fa-route"></i>
              <span>{estimate.distanceInfo.text}</span>
            </div>
          )}
          {hasDurationInfo && (
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <span>{formatTime(estimate.durationInfo.value)}</span>
            </div>
          )}
        </div>
        
        <div className="price-range">
          <span className="price-label">Prix estimé:</span>
          <span className="price">
            {formatPrice(estimate.minPrice)} - {formatPrice(estimate.maxPrice)}
          </span>
        </div>
        
        <button 
          className="toggle-breakdown"
          onClick={() => setShowBreakdown(!showBreakdown)}
        >
          {showBreakdown ? 'Masquer le détail' : 'Voir le détail'}
        </button>
      </div>
      
      {showBreakdown && estimate.breakdown && (
        <div className="price-breakdown">
          <div className="breakdown-item">
            <span>Tarif de base</span>
            <span>{formatPrice(estimate.breakdown.baseFare)}</span>
          </div>
          
          {hasDistanceInfo && (
            <div className="breakdown-item">
              <span>Distance ({estimate.distanceInfo.text})</span>
              <span>{formatPrice(estimate.breakdown.distanceCharge)}</span>
            </div>
          )}
          
          {hasDurationInfo && (
            <div className="breakdown-item">
              <span>Durée ({formatTime(estimate.durationInfo.value)})</span>
              <span>{formatPrice(estimate.breakdown.timeCharge)}</span>
            </div>
          )}
          
          {estimate.breakdown.luggageCharge > 0 && (
            <div className="breakdown-item">
              <span>Supplément bagages ({bookingData.luggage})</span>
              <span>{formatPrice(estimate.breakdown.luggageCharge)}</span>
            </div>
          )}
          
          {estimate.breakdown.nightRate && (
            <div className="breakdown-item highlight">
              <span>Tarif de nuit (22h-6h)</span>
              <span>+30%</span>
            </div>
          )}
          
          {estimate.breakdown.weekendRate && (
            <div className="breakdown-item highlight">
              <span>Tarif weekend</span>
              <span>+20%</span>
            </div>
          )}
          
          {estimate.breakdown.roundTripDiscount && (
            <div className="breakdown-item discount">
              <span>Réduction aller-retour</span>
              <span>-10%</span>
            </div>
          )}
          
          <div className="breakdown-total">
            <span>Total</span>
            <span>{formatPrice(estimate.exactPrice)}</span>
          </div>
          
          <p className="estimate-note">
            * Les prix sont estimatifs et peuvent varier en fonction du trafic et d'autres facteurs.
          </p>
        </div>
      )}
      
      <div className="booking-actions">
        <button className="book-now-button" onClick={handleBookNowClick}>
          Réserver maintenant
        </button>
        <a 
          href={`https://wa.me/+33600000000?text=Bonjour, je souhaite réserver un taxi de ${bookingData.pickupAddress} à ${bookingData.dropoffAddress} le ${bookingData.pickupDate} à ${bookingData.pickupTime}. Prix estimé: ${estimate.exactPrice}€.`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="contact-driver-button"
        >
          Contacter le chauffeur
        </a>
      </div>
    </div>
  );
};

export default PriceCalculator;