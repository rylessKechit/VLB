import { useState } from 'react';
import '../../styles/components/VehicleSelector.css';

const VehicleSelector = ({ vehicles, selectedVehicle, onSelect, passengers, luggage }) => {
  const [showDetails, setShowDetails] = useState(null);

  // Fonction pour formater le prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Fonction pour vérifier si un véhicule a une capacité suffisante
  const hasCapacity = (vehicle) => {
    const capacity = parseInt(vehicle.capacity.match(/\d+/)[0]);
    return capacity >= passengers;
  };

  // Filtrer les véhicules qui ont une capacité suffisante
  const suitableVehicles = vehicles.filter(hasCapacity);

  // Trier par prix croissant
  const sortedVehicles = [...suitableVehicles].sort((a, b) => a.price - b.price);

  // Véhicule recommandé (2ème ou 3ème option si disponible)
  const recommendedVehicle = sortedVehicles.length > 2 ? sortedVehicles[1].id : 
                            sortedVehicles.length > 0 ? sortedVehicles[0].id : null;

  const toggleDetails = (vehicleId) => {
    if (showDetails === vehicleId) {
      setShowDetails(null);
    } else {
      setShowDetails(vehicleId);
    }
  };

  return (
    <div className="vehicle-selector">
      {sortedVehicles.length === 0 ? (
        <div className="no-vehicles">
          <p>Aucun véhicule disponible pour {passengers} passagers et {luggage} bagages.</p>
        </div>
      ) : (
        <>
          <div className="vehicles-list">
            {sortedVehicles.map((vehicle) => (
              <div 
                key={vehicle.id}
                className={`vehicle-option ${selectedVehicle === vehicle.id ? 'selected' : ''} ${vehicle.id === recommendedVehicle ? 'recommended' : ''}`}
                onClick={() => onSelect(vehicle.id, vehicle.estimate)}
              >
                {vehicle.id === recommendedVehicle && (
                  <div className="vehicle-badge">Recommandé</div>
                )}
                <div className="vehicle-icon">
                  {vehicle.id === 'sedan' && <i className="fas fa-car-side"></i>}
                  {vehicle.id === 'premium' && <i className="fas fa-car"></i>}
                  {vehicle.id === 'green' && <i className="fas fa-leaf"></i>}
                  {vehicle.id === 'suv' && <i className="fas fa-truck"></i>}
                  {vehicle.id === 'van' && <i className="fas fa-shuttle-van"></i>}
                </div>
                <div className="vehicle-info">
                  <h4>{vehicle.name}</h4>
                  <p className="vehicle-desc">{vehicle.desc}</p>
                  <div className="vehicle-capacity">
                    <span><i className="fas fa-users"></i> {vehicle.capacity}</span>
                    <span><i className="fas fa-suitcase"></i> Jusqu'à {luggage > 5 ? 'nombreux' : luggage} bagages</span>
                  </div>
                </div>
                <div className="vehicle-price">
                  <span className="price-value">{formatPrice(vehicle.price)}</span>
                  <button 
                    type="button" 
                    className="details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDetails(vehicle.id);
                    }}
                  >
                    Détails
                    <i className={`fas fa-chevron-${showDetails === vehicle.id ? 'up' : 'down'}`}></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sortedVehicles.map((vehicle) => (
            showDetails === vehicle.id && (
              <div key={`details-${vehicle.id}`} className="vehicle-details">
                <h4>Détails du prix</h4>
                <div className="price-details">
                  <div className="price-row">
                    <span>Prix de base</span>
                    <span>{formatPrice(vehicle.estimate.breakdown?.baseFare || 0)}</span>
                  </div>
                  
                  <div className="price-row">
                    <span>Distance</span>
                    <span>{formatPrice(vehicle.estimate.breakdown?.distanceCharge || 0)}</span>
                  </div>
                  
                  <div className="price-row">
                    <span>Service et taxes</span>
                    <span>{formatPrice(vehicle.estimate.breakdown?.timeCharge || 0)}</span>
                  </div>
                  
                  {vehicle.estimate.breakdown?.luggageCharge > 0 && (
                    <div className="price-row">
                      <span>Supplément bagages ({luggage})</span>
                      <span>{formatPrice(vehicle.estimate.breakdown.luggageCharge)}</span>
                    </div>
                  )}
                  
                  {vehicle.id === 'green' && (
                    <div className="price-row eco">
                      <span>Supplément véhicule électrique</span>
                      <span>{formatPrice(vehicle.estimate.breakdown.greenSupplement || 0)}</span>
                    </div>
                  )}
                  
                  {vehicle.id === 'premium' && (
                    <div className="price-row premium">
                      <span>Supplément premium</span>
                      <span>{formatPrice(vehicle.estimate.breakdown.premiumSupplement || 0)}</span>
                    </div>
                  )}
                  
                  {vehicle.id === 'suv' && (
                    <div className="price-row suv">
                      <span>Supplément SUV</span>
                      <span>{formatPrice(vehicle.estimate.breakdown.suvSupplement || 0)}</span>
                    </div>
                  )}
                  
                  {vehicle.id === 'van' && (
                    <div className="price-row van">
                      <span>Supplément Van</span>
                      <span>{formatPrice(vehicle.estimate.breakdown.vanSupplement || 0)}</span>
                    </div>
                  )}
                  
                  <div className="price-row total">
                    <span>Prix total</span>
                    <span>{formatPrice(vehicle.estimate.exactPrice)}</span>
                  </div>
                </div>
                
                <div className="vehicle-features">
                  <h4>Caractéristiques du véhicule</h4>
                  <ul>
                    <li><i className="fas fa-check"></i> {vehicle.capacity}</li>
                    <li><i className="fas fa-check"></i> Wifi gratuit à bord</li>
                    <li><i className="fas fa-check"></i> Bouteille d'eau offerte</li>
                    <li><i className="fas fa-check"></i> Sièges en cuir</li>
                    <li><i className="fas fa-check"></i> Chargeurs pour téléphone</li>
                    {vehicle.id === 'green' && (
                      <>
                        <li><i className="fas fa-check"></i> 100% électrique</li>
                        <li><i className="fas fa-check"></i> Zéro émission CO2</li>
                        <li><i className="fas fa-check"></i> Écran tactile</li>
                      </>
                    )}
                    {vehicle.id === 'premium' && (
                      <>
                        <li><i className="fas fa-check"></i> Intérieur haut de gamme</li>
                        <li><i className="fas fa-check"></i> Minibar</li>
                        <li><i className="fas fa-check"></i> Sièges massants</li>
                      </>
                    )}
                    {vehicle.id === 'suv' && (
                      <>
                        <li><i className="fas fa-check"></i> Espace bagages généreux</li>
                        <li><i className="fas fa-check"></i> Vue surélevée</li>
                      </>
                    )}
                    {vehicle.id === 'van' && (
                      <>
                        <li><i className="fas fa-check"></i> Espace intérieur spacieux</li>
                        <li><i className="fas fa-check"></i> Configuration salon privé</li>
                        <li><i className="fas fa-check"></i> Séparation chauffeur</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )
          ))}
        </>
      )}
    </div>
  );
};

export default VehicleSelector;