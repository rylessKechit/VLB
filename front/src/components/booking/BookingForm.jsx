import { useState, useEffect } from 'react';
import AddressInput from './AddressInput';
import DateTimePicker from './DateTimePicker';
import BookingSuccess from './BookingSuccess';
import { priceService } from '../../services/api';

const BookingForm = () => {
  // États pour les étapes du formulaire
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 2,
    luggage: 1,
    roundTrip: false,
    returnDate: '',
    returnTime: '',
    pickupAddressPlaceId: '',
    dropoffAddressPlaceId: '',
    flightNumber: '',
    trainNumber: '',
    specialRequests: '',
    customerInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });
  
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [isAirport, setIsAirport] = useState(false);
  const [isTrainStation, setIsTrainStation] = useState(false);
  
  // Initialiser les champs de date et heure
  useEffect(() => {
    // Date de demain
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = formatDate(tomorrow);
    
    // Heure actuelle + 2 heures
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours() + 2);
    const formattedTime = formatTime(defaultTime);
    
    setFormData(prev => ({
      ...prev,
      pickupDate: formattedDate,
      pickupTime: formattedTime
    }));
  }, []);

  // Vérifier si l'adresse contient un aéroport ou une gare
  useEffect(() => {
    const checkAddressType = (address) => {
      if (!address) return;
      
      const airportKeywords = ['aéroport', 'airport', 'cdg', 'orly', 'beauvais', 'roissy'];
      const trainKeywords = ['gare', 'station', 'sncf', 'tgv', 'train'];
      
      const lowerCaseAddress = address.toLowerCase();
      
      setIsAirport(airportKeywords.some(keyword => lowerCaseAddress.includes(keyword)));
      setIsTrainStation(trainKeywords.some(keyword => lowerCaseAddress.includes(keyword)));
    };
    
    checkAddressType(formData.pickupAddress);
    checkAddressType(formData.dropoffAddress);
  }, [formData.pickupAddress, formData.dropoffAddress]);
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const handleInputChange = (name, value) => {
    if (name.includes('.')) {
      // Gestion des objets imbriqués (customerInfo)
      const [parent, child] = name.split('.');
      setFormData(prev => ({ 
        ...prev, 
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Reset price estimate when inputs change
    if (['pickupAddress', 'dropoffAddress', 'pickupDate', 'pickupTime', 'passengers', 'luggage', 'roundTrip'].includes(name)) {
      setPriceEstimate(null);
    }
    
    // If roundTrip is toggled to false, clear return date/time
    if (name === 'roundTrip' && value === false) {
      setFormData(prev => ({ ...prev, returnDate: '', returnTime: '' }));
    }
    
    // If roundTrip is toggled to true, set default return date/time
    if (name === 'roundTrip' && value === true && !formData.returnDate) {
      // Default return date is pickup date + 3 days
      const returnDate = new Date(formData.pickupDate);
      returnDate.setDate(returnDate.getDate() + 3);
      
      setFormData(prev => ({ 
        ...prev, 
        returnDate: formatDate(returnDate),
        returnTime: formData.pickupTime
      }));
    }
  };
  
  const handleAddressSelect = (name, address, placeId) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: address,
      [`${name}PlaceId`]: placeId
    }));
    setPriceEstimate(null);
  };
  
  const calculatePrice = async () => {
    // Validation du formulaire
    if (!formData.pickupAddress || !formData.dropoffAddress || !formData.pickupDate || !formData.pickupTime) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!formData.pickupAddressPlaceId || !formData.dropoffAddressPlaceId) {
      setError('Veuillez sélectionner des adresses valides dans les suggestions');
      return;
    }
    
    setError('');
    setIsCalculating(true);
    
    try {
      // Utiliser priceService pour faire la requête
      const response = await priceService.calculateEstimate({
        pickupPlaceId: formData.pickupAddressPlaceId,
        dropoffPlaceId: formData.dropoffAddressPlaceId,
        pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}`,
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage),
        roundTrip: formData.roundTrip,
        returnDateTime: formData.roundTrip && formData.returnDate ? `${formData.returnDate}T${formData.returnTime}` : null
      });
      
      if (response.data && response.data.success) {
        setPriceEstimate(response.data.data.estimate);
        setCurrentStep(2); // Passer directement à l'étape des informations client
      } else {
        setError(response.data?.error || "Erreur lors du calcul du prix.");
      }
    } catch (err) {
      console.error('Erreur lors du calcul du prix:', err);
      
      if (err.response) {
        setError(`Erreur ${err.response.status}: ${err.response.data.error || 'Erreur serveur'}`);
      } else if (err.request) {
        setError('Pas de réponse du serveur. Vérifiez que le serveur backend est en cours d\'exécution.');
      } else {
        setError(`Erreur: ${err.message}`);
      }
    } finally {
      setIsCalculating(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      calculatePrice();
    } else if (currentStep === 2) {
      // Validation des informations client
      if (!formData.customerInfo.name || !formData.customerInfo.email || !formData.customerInfo.phone) {
        setError('Veuillez remplir tous les champs obligatoires');
        return;
      }
      
      // Simuler une réservation réussie pour la démo
      const bookingData = {
        ...formData,
        id: 'BK' + Math.floor(Math.random() * 10000),
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        vehicleType: 'van',  // Classe V par défaut
        price: {
          amount: priceEstimate.exactPrice,
          currency: 'EUR'
        },
        pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}`,
        returnDateTime: formData.roundTrip ? `${formData.returnDate}T${formData.returnTime}` : null
      };
      
      setBookingResult(bookingData);
      setBookingSuccess(true);
    }
  };
  
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Formatage du prix pour l'affichage
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  // Afficher le composant de confirmation de réservation
  if (bookingSuccess && bookingResult) {
    return <BookingSuccess bookingData={bookingResult} />;
  }
  
  return (
    <div className="booking-form-container">
      <div className="booking-form-header">
        <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Détails du trajet</span>
        </div>
        <div className="step-line"></div>
        <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Confirmation</span>
        </div>
      </div>

      {error && <div className="booking-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Étape 1: Détails du trajet */}
        {currentStep === 1 && (
          <div className="booking-step">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pickupAddress">Adresse de départ <span className="required">*</span></label>
                <AddressInput 
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={value => handleInputChange('pickupAddress', value)}
                  onSelect={(address, placeId) => handleAddressSelect('pickupAddress', address, placeId)}
                  placeholder="Entrez l'adresse de départ"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dropoffAddress">Adresse d'arrivée <span className="required">*</span></label>
                <AddressInput 
                  id="dropoffAddress"
                  value={formData.dropoffAddress}
                  onChange={value => handleInputChange('dropoffAddress', value)}
                  onSelect={(address, placeId) => handleAddressSelect('dropoffAddress', address, placeId)}
                  placeholder="Entrez l'adresse d'arrivée"
                />
              </div>
            </div>
            
            {/* Champ conditionnel pour le numéro de vol */}
            {isAirport && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="flightNumber">Numéro de vol</label>
                  <input
                    type="text"
                    id="flightNumber"
                    value={formData.flightNumber}
                    onChange={(e) => handleInputChange('flightNumber', e.target.value)}
                    placeholder="Ex: AF1234"
                    className="text-input"
                  />
                  <small className="field-info">Ce numéro nous permettra de suivre votre vol et d'ajuster notre service en cas de retard</small>
                </div>
              </div>
            )}
            
            {/* Champ conditionnel pour le numéro de train */}
            {isTrainStation && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="trainNumber">Numéro de train</label>
                  <input
                    type="text"
                    id="trainNumber"
                    value={formData.trainNumber}
                    onChange={(e) => handleInputChange('trainNumber', e.target.value)}
                    placeholder="Ex: TGV6214"
                    className="text-input"
                  />
                  <small className="field-info">Ce numéro nous permettra de suivre votre train et d'ajuster notre service en cas de retard</small>
                </div>
              </div>
            )}
            
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="pickupDate">Date et heure de départ <span className="required">*</span></label>
                <DateTimePicker 
                  dateId="pickupDate"
                  timeId="pickupTime"
                  dateValue={formData.pickupDate}
                  timeValue={formData.pickupTime}
                  onDateChange={value => handleInputChange('pickupDate', value)}
                  onTimeChange={value => handleInputChange('pickupTime', value)}
                />
              </div>
              
              <div className="form-group checkbox-group">
                <div className="switch-container">
                  <label className="switch">
                    <input 
                      type="checkbox"
                      checked={formData.roundTrip}
                      onChange={e => handleInputChange('roundTrip', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className="switch-label">Aller-retour</span>
                </div>
                
                {formData.roundTrip && (
                  <div className="return-datetime">
                    <label htmlFor="returnDate">Date et heure de retour <span className="required">*</span></label>
                    <DateTimePicker 
                      dateId="returnDate"
                      timeId="returnTime"
                      dateValue={formData.returnDate}
                      timeValue={formData.returnTime}
                      onDateChange={value => handleInputChange('returnDate', value)}
                      onTimeChange={value => handleInputChange('returnTime', value)}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="passengers">Nombre de passagers <span className="required">*</span></label>
                <div className="counter-input">
                  <button 
                    type="button" 
                    className="counter-btn"
                    onClick={() => formData.passengers > 1 && handleInputChange('passengers', formData.passengers - 1)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="counter-value">{formData.passengers}</span>
                  <button 
                    type="button" 
                    className="counter-btn"
                    onClick={() => formData.passengers < 7 && handleInputChange('passengers', formData.passengers + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <small className="field-info">Maximum 7 passagers</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="luggage">Nombre de bagages <span className="required">*</span></label>
                <div className="counter-input">
                  <button 
                    type="button" 
                    className="counter-btn"
                    onClick={() => formData.luggage > 0 && handleInputChange('luggage', formData.luggage - 1)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="counter-value">{formData.luggage}</span>
                  <button 
                    type="button" 
                    className="counter-btn"
                    onClick={() => formData.luggage < 7 && handleInputChange('luggage', formData.luggage + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <small className="field-info">Maximum 7 bagages</small>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="specialRequests">Demandes spéciales</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Indiquez-nous toute demande particulière pour votre trajet"
                  rows="3"
                  className="text-input"
                ></textarea>
              </div>
            </div>
            
            <div className="form-row">
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <span className="spinner"></span>
                    Calcul du prix en cours...
                  </>
                ) : 'Obtenir un devis'}
              </button>
            </div>

            <div className="vehicle-info-box">
              <h3>Notre véhicule</h3>
              <div className="vehicle-info-content">
                <div className="vehicle-icon">
                  <i className="fas fa-shuttle-van"></i>
                </div>
                <div className="vehicle-details">
                  <h4>Mercedes-Benz Classe V</h4>
                  <p>Van VIP spacieux et confortable</p>
                  <ul className="vehicle-features-list">
                    <li><i className="fas fa-check"></i> Jusqu'à 7 passagers</li>
                    <li><i className="fas fa-check"></i> Espace pour 7 bagages</li>
                    <li><i className="fas fa-check"></i> Wifi gratuit à bord</li>
                    <li><i className="fas fa-check"></i> Boissons fraîches</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Étape 2: Informations client et confirmation */}
        {currentStep === 2 && (
          <div className="booking-step">
            <h3 className="step-title">Vos informations</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Nom complet <span className="required">*</span></label>
                <input
                  type="text"
                  id="customerName"
                  value={formData.customerInfo.name}
                  onChange={(e) => handleInputChange('customerInfo.name', e.target.value)}
                  placeholder="Entrez votre nom complet"
                  className="text-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="customerEmail">Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="customerEmail"
                  value={formData.customerInfo.email}
                  onChange={(e) => handleInputChange('customerInfo.email', e.target.value)}
                  placeholder="Entrez votre adresse email"
                  className="text-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="customerPhone">Téléphone <span className="required">*</span></label>
                <input
                  type="tel"
                  id="customerPhone"
                  value={formData.customerInfo.phone}
                  onChange={(e) => handleInputChange('customerInfo.phone', e.target.value)}
                  placeholder="Entrez votre numéro de téléphone"
                  className="text-input"
                  required
                />
              </div>
            </div>
            
            {/* Résumé de la réservation */}
            {priceEstimate && (
              <div className="booking-summary">
                <h4>Résumé de votre réservation</h4>
                
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="label">Départ:</span>
                    <span className="value">{formData.pickupAddress}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span className="label">Arrivée:</span>
                    <span className="value">{formData.dropoffAddress}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span className="label">Date et heure:</span>
                    <span className="value">
                      {new Date(`${formData.pickupDate}T${formData.pickupTime}`).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  {formData.roundTrip && (
                    <div className="summary-item">
                      <span className="label">Retour:</span>
                      <span className="value">
                        {new Date(`${formData.returnDate}T${formData.returnTime}`).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}
                  
                  <div className="summary-item">
                    <span className="label">Véhicule:</span>
                    <span className="value">Mercedes-Benz Classe V</span>
                  </div>
                  
                  <div className="summary-item">
                    <span className="label">Passagers:</span>
                    <span className="value">{formData.passengers}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span className="label">Bagages:</span>
                    <span className="value">{formData.luggage}</span>
                  </div>
                  
                  {formData.flightNumber && (
                    <div className="summary-item">
                      <span className="label">N° de vol:</span>
                      <span className="value">{formData.flightNumber}</span>
                    </div>
                  )}
                  
                  {formData.trainNumber && (
                    <div className="summary-item">
                      <span className="label">N° de train:</span>
                      <span className="value">{formData.trainNumber}</span>
                    </div>
                  )}
                  
                  <div className="summary-item price">
                    <span className="label">Prix total:</span>
                    <span className="value">{formatPrice(priceEstimate?.exactPrice || 0)}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="form-row actions-row">
              <button 
                type="button" 
                className="btn-back"
                onClick={goBack}
              >
                <i className="fas fa-arrow-left"></i>
                Retour
              </button>
              
              <button 
                type="submit" 
                className="btn-submit"
              >
                Confirmer la réservation
                <i className="fas fa-check"></i>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;