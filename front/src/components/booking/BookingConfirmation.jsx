import { useState } from 'react';
import { bookingService } from '../../services/api';
import '../../styles/components/BookingConfirmation.css';

const BookingConfirmation = ({ bookingData, priceEstimate, onSuccess, onCancel }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Préparer les données de réservation
      const bookingRequestData = {
        pickupAddress: bookingData.pickupAddress,
        pickupPlaceId: bookingData.pickupAddressPlaceId,
        dropoffAddress: bookingData.dropoffAddress,
        dropoffPlaceId: bookingData.dropoffAddressPlaceId,
        pickupDateTime: `${bookingData.pickupDate}T${bookingData.pickupTime}`,
        passengers: parseInt(bookingData.passengers),
        luggage: parseInt(bookingData.luggage),
        roundTrip: bookingData.roundTrip,
        price: {
          amount: priceEstimate.exactPrice,
          currency: priceEstimate.currency || 'EUR'
        },
        customerInfo: {
          ...customerInfo,
          // Ajouter une indication que ce message doit être envoyé par WhatsApp
          notifyByWhatsApp: true
        }
      };
      
      // Si c'est un aller-retour et qu'il y a une date de retour définie
      if (bookingData.roundTrip && bookingData.returnDate && bookingData.returnTime) {
        bookingRequestData.returnDateTime = `${bookingData.returnDate}T${bookingData.returnTime}`;
      }
      
      console.log("Envoi de la réservation:", bookingRequestData);
      
      // Appel à l'API pour créer la réservation
      const response = await bookingService.createBooking(bookingRequestData);
      
      console.log("Réservation créée:", response.data);
      
      // Informer le parent du succès
      onSuccess(response.data);
      
    } catch (err) {
      console.error("Erreur lors de la création de la réservation:", err);
      setError(err.response?.data?.error || "Une erreur est survenue lors de la réservation. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="booking-confirmation">
      <h3>Finaliser votre réservation</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom complet *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            placeholder="Entrez votre nom"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            placeholder="Entrez votre email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Téléphone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            placeholder="Entrez votre numéro de téléphone"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="specialRequests">Demandes spéciales</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={customerInfo.specialRequests}
            onChange={handleInputChange}
            placeholder="Informations complémentaires (optionnel)"
            rows="3"
          ></textarea>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="confirmation-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={onCancel}
          >
            Annuler
          </button>
          
          <button 
            type="submit" 
            className="confirm-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Traitement en cours...' : 'Confirmer la réservation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingConfirmation;