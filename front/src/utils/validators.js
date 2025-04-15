// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate phone number format (French format)
  export const isValidPhone = (phone) => {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
  };
  
  // Validate required fields
  export const validateRequired = (data, requiredFields) => {
    const errors = {};
    
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors[field] = 'Ce champ est requis';
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Validate booking form
  export const validateBookingForm = (formData) => {
    const errors = {};
    
    // Required fields
    const requiredFields = ['pickupAddress', 'dropoffAddress', 'pickupDate', 'pickupTime'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'Ce champ est requis';
      }
    });
    
    // Validate pickup datetime is in the future
    if (formData.pickupDate && formData.pickupTime) {
      const pickupDateTime = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
      const now = new Date();
      
      if (pickupDateTime <= now) {
        errors.pickupDateTime = "La date et l'heure de prise en charge doivent être dans le futur";
      }
    }
    
    // Validate return datetime for round trips
    if (formData.roundTrip && formData.returnDate && formData.returnTime) {
      const returnDateTime = new Date(`${formData.returnDate}T${formData.returnTime}`);
      const pickupDateTime = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
      
      if (returnDateTime <= pickupDateTime) {
        errors.returnDateTime = "La date et l'heure de retour doivent être après la prise en charge";
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Validate contact form
  export const validateContactForm = (formData) => {
    const errors = {};
    
    // Required fields
    const requiredFields = ['name', 'email', 'phone', 'message'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'Ce champ est requis';
      }
    });
    
    // Validate email
    if (formData.email && !isValidEmail(formData.email)) {
      errors.email = 'Adresse email invalide';
    }
    
    // Validate phone
    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = 'Numéro de téléphone invalide';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };