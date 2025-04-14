import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BookingContext from '../../context/BookingContext';
import GoogleMapComponent from './GoogleMapComponent';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const { 
    bookingData, 
    updateBookingData, 
    calculatePrice, 
    createBooking, 
    isLoading 
  } = useContext(BookingContext);
  
  const [priceCalculated, setPriceCalculated] = useState(false);

  // Schéma de validation pour l'étape 1
  const validationSchema1 = Yup.object({
    pickupAddress: Yup.string().required('L\'adresse de départ est requise'),
    dropoffAddress: Yup.string().required('L\'adresse d\'arrivée est requise'),
    pickupDate: Yup.date().required('La date est requise').min(new Date(), 'La date doit être dans le futur'),
    pickupTime: Yup.string().required('L\'heure est requise'),
  });

  // Schéma de validation pour l'étape 2
  const validationSchema2 = Yup.object({
    firstName: Yup.string().required('Le prénom est requis'),
    lastName: Yup.string().required('Le nom est requis'),
    email: Yup.string().email('Email invalide').required('L\'email est requis'),
    phone: Yup.string().required('Le téléphone est requis'),
    passengers: Yup.number().min(1, 'Minimum 1 passager').max(7, 'Maximum 7 passagers').required('Le nombre de passagers est requis'),
    luggage: Yup.number().min(0, 'Minimum 0 bagage').max(10, 'Maximum 10 bagages').required('Le nombre de bagages est requis'),
    serviceType: Yup.string().required('Le type de service est requis'),
    termsAccepted: Yup.boolean().oneOf([true], 'Vous devez accepter les conditions générales')
  });

  // Configuration du formulaire avec Formik
  const formik = useFormik({
    initialValues: {
      pickupAddress: bookingData.pickupAddress || '',
      dropoffAddress: bookingData.dropoffAddress || '',
      pickupDate: bookingData.pickupDate || '',
      pickupTime: bookingData.pickupTime || '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passengers: bookingData.passengers || 1,
      luggage: bookingData.luggage || 0,
      serviceType: bookingData.serviceType || 'standard',
      roundTrip: bookingData.roundTrip || false,
      specialRequests: '',
      termsAccepted: false
    },
    validationSchema: step === 1 ? validationSchema1 : validationSchema2,
    onSubmit: async (values) => {
      if (step === 1) {
        // Mise à jour des données de réservation
        updateBookingData({
          pickupAddress: values.pickupAddress,
          dropoffAddress: values.dropoffAddress,
          pickupDate: values.pickupDate,
          pickupTime: values.pickupTime,
          roundTrip: values.roundTrip
        });

        try {
          // Calcul du prix
          await calculatePrice(values.pickupAddress, values.dropoffAddress, values.serviceType);
          setPriceCalculated(true);
          setStep(2);
        } catch (error) {
          console.error('Erreur lors du calcul du prix :', error);
        }
      } else {
        // Soumission finale du formulaire
        const fullBookingData = {
          ...bookingData,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          passengers: values.passengers,
          luggage: values.luggage,
          serviceType: values.serviceType,
          specialRequests: values.specialRequests
        };

        try {
          await createBooking(fullBookingData);
          // Redirection ou affichage d'un message de succès
          setStep(3);
        } catch (error) {
          console.error('Erreur lors de la création de la réservation :', error);
        }
      }
    }
  });

  // Mise à jour des valeurs du formulaire lors du changement de bookingData
  useEffect(() => {
    if (bookingData) {
      formik.setValues({
        ...formik.values,
        pickupAddress: bookingData.pickupAddress || formik.values.pickupAddress,
        dropoffAddress: bookingData.dropoffAddress || formik.values.dropoffAddress,
        pickupDate: bookingData.pickupDate || formik.values.pickupDate,
        pickupTime: bookingData.pickupTime || formik.values.pickupTime,
        passengers: bookingData.passengers || formik.values.passengers,
        luggage: bookingData.luggage || formik.values.luggage,
        serviceType: bookingData.serviceType || formik.values.serviceType,
        roundTrip: bookingData.roundTrip || formik.values.roundTrip
      });
    }
  }, [bookingData]);

  // Obtenir l'heure actuelle formatée pour le champ d'heure
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Obtenir la date actuelle formatée pour le champ de date
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className={`flex-1 text-center ${step >= 1 ? 'text-yellow-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <p className="mt-2 font-medium">Détails du trajet</p>
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div className={`h-1 ${step >= 2 ? 'bg-yellow-600' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
          </div>
          <div className={`flex-1 text-center ${step >= 2 ? 'text-yellow-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <p className="mt-2 font-medium">Vos coordonnées</p>
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div className={`h-1 ${step >= 3 ? 'bg-yellow-600' : 'bg-gray-200'}`} style={{ width: '100%' }}></div>
          </div>
          <div className={`flex-1 text-center ${step >= 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <p className="mt-2 font-medium">Confirmation</p>
          </div>
        </div>
      </div>

      {step === 3 ? (
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Réservation confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Votre réservation a été confirmée. Vous recevrez un email de confirmation avec tous les détails.
          </p>
          
          <div className="max-w-md mx-auto bg-gray-100 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Récapitulatif de votre réservation</h3>
            
            <div className="text-left">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Référence de réservation</p>
                <p className="font-medium">#{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Trajet</p>
                <p className="font-medium">{formik.values.pickupAddress} → {formik.values.dropoffAddress}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Date et heure</p>
                <p className="font-medium">
                  {new Date(formik.values.pickupDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}{' '}
                  à {formik.values.pickupTime}
                </p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Passagers / Bagages</p>
                <p className="font-medium">{formik.values.passengers} passagers / {formik.values.luggage} bagages</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Prix estimé</p>
                <p className="font-medium text-yellow-600">{bookingData.estimatedPrice} €</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/"
              className="bg-yellow-600 text-white py-2 px-6 rounded-md font-medium hover:bg-yellow-500 transition-colors"
            >
              Retour à l'accueil
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="border border-yellow-600 text-yellow-600 py-2 px-6 rounded-md font-medium hover:bg-yellow-50 transition-colors"
            >
              Imprimer le récapitulatif
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Détails de votre trajet</h2>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pickupAddress" className="block mb-2 font-medium">
                      Adresse de départ *
                    </label>
                    <input
                      id="pickupAddress"
                      name="pickupAddress"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.pickupAddress && formik.errors.pickupAddress
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      placeholder="Saisissez l'adresse de départ"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pickupAddress}
                    />
                    {formik.touched.pickupAddress && formik.errors.pickupAddress && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.pickupAddress}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="dropoffAddress" className="block mb-2 font-medium">
                      Adresse d'arrivée *
                    </label>
                    <input
                      id="dropoffAddress"
                      name="dropoffAddress"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.dropoffAddress && formik.errors.dropoffAddress
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      placeholder="Saisissez l'adresse d'arrivée"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dropoffAddress}
                    />
                    {formik.touched.dropoffAddress && formik.errors.dropoffAddress && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.dropoffAddress}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pickupDate" className="block mb-2 font-medium">
                      Date de départ *
                    </label>
                    <input
                      id="pickupDate"
                      name="pickupDate"
                      type="date"
                      min={getCurrentDate()}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.pickupDate && formik.errors.pickupDate
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pickupDate}
                    />
                    {formik.touched.pickupDate && formik.errors.pickupDate && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.pickupDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="pickupTime" className="block mb-2 font-medium">
                      Heure de départ *
                    </label>
                    <input
                      id="pickupTime"
                      name="pickupTime"
                      type="time"
                      min={getCurrentTime()}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.pickupTime && formik.errors.pickupTime
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pickupTime}
                    />
                    {formik.touched.pickupTime && formik.errors.pickupTime && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.pickupTime}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="roundTrip"
                    name="roundTrip"
                    type="checkbox"
                    className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    onChange={formik.handleChange}
                    checked={formik.values.roundTrip}
                  />
                  <label htmlFor="roundTrip" className="ml-2 font-medium">
                    Aller-retour ?
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="serviceType" className="block mb-2 font-medium">
                  Type de service
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  onChange={formik.handleChange}
                  value={formik.values.serviceType}
                >
                  <option value="standard">Service standard</option>
                  <option value="airport">Transfert aéroport</option>
                  <option value="longDistance">Longue distance</option>
                  <option value="vip">Service VIP</option>
                </select>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Carte du trajet</h3>
                <div className="h-64 bg-gray-100 rounded-lg">
                  <GoogleMapComponent 
                    origin={formik.values.pickupAddress} 
                    destination={formik.values.dropoffAddress} 
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-yellow-600 text-white py-2 px-6 rounded-md font-medium hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Calcul en cours...' : 'Calculer le prix et continuer'}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>
              
              {priceCalculated && (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-semibold mb-2">Détails de votre trajet</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Départ</p>
                      <p className="font-medium">{formik.values.pickupAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Arrivée</p>
                      <p className="font-medium">{formik.values.dropoffAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date et heure</p>
                      <p className="font-medium">
                        {new Date(formik.values.pickupDate).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}{' '}
                        à {formik.values.pickupTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimation du tarif</p>
                      <p className="font-medium text-yellow-600">{bookingData.estimatedPrice} €</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {bookingData.distance} km - Durée estimée: {bookingData.duration} min
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-2 font-medium">
                      Prénom *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.firstName && formik.errors.firstName
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      placeholder="Votre prénom"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block mb-2 font-medium">
                      Nom *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.lastName && formik.errors.lastName
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      placeholder="Votre nom"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.lastName}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.email && formik.errors.email
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      placeholder="Votre adresse email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">
                      Téléphone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.phone && formik.errors.phone
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      placeholder="Votre numéro de téléphone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="passengers" className="block mb-2 font-medium">
                      Nombre de passagers *
                    </label>
                    <input
                      id="passengers"
                      name="passengers"
                      type="number"
                      min="1"
                      max="7"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.passengers && formik.errors.passengers
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passengers}
                    />
                    {formik.touched.passengers && formik.errors.passengers && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.passengers}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="luggage" className="block mb-2 font-medium">
                      Nombre de bagages
                    </label>
                    <input
                      id="luggage"
                      name="luggage"
                      type="number"
                      min="0"
                      max="10"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        formik.touched.luggage && formik.errors.luggage
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-yellow-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.luggage}
                    />
                    {formik.touched.luggage && formik.errors.luggage && (
                      <p className="mt-1 text-red-500 text-sm">{formik.errors.luggage}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="specialRequests" className="block mb-2 font-medium">
                  Demandes spéciales (optionnel)
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  placeholder="Informations complémentaires pour votre chauffeur"
                  onChange={formik.handleChange}
                  value={formik.values.specialRequests}
                ></textarea>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    className={`w-5 h-5 rounded focus:ring-yellow-500 ${
                      formik.touched.termsAccepted && formik.errors.termsAccepted
                        ? 'border-red-500 text-red-500'
                        : 'border-gray-300 text-yellow-600'
                    }`}
                    onChange={formik.handleChange}
                    checked={formik.values.termsAccepted}
                  />
                  <label htmlFor="termsAccepted" className="ml-2">
                    J'accepte les <a href="/terms" target="_blank" className="text-yellow-600 hover:underline">conditions générales</a> *
                  </label>
                </div>
                {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                  <p className="mt-1 text-red-500 text-sm">{formik.errors.termsAccepted}</p>
                )}
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  className="border border-yellow-600 text-yellow-600 py-2 px-6 rounded-md font-medium hover:bg-yellow-50 transition-colors"
                  onClick={() => setStep(1)}
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 text-white py-2 px-6 rounded-md font-medium hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Traitement en cours...' : 'Confirmer la réservation'}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default BookingForm;