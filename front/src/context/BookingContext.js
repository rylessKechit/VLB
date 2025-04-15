import { createContext, useState, useContext } from 'react';
import { bookingService, priceService } from '../services/api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Calculate price estimate
  const calculatePrice = async (bookingData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await priceService.calculateEstimate(bookingData);
      setPriceEstimate(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Une erreur est survenue lors du calcul du prix';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create booking
  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    setBookingSuccess(false);
    
    try {
      const response = await bookingService.createBooking(bookingData);
      setCurrentBooking(response.data.data);
      setBookingSuccess(true);
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Une erreur est survenue lors de la réservation';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get booking by ID
  const getBookingById = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getBookingById(id);
      setCurrentBooking(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Une erreur est survenue lors de la récupération de la réservation';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Cancel booking
  const cancelBooking = async (id, data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.cancelBooking(id, data);
      setCurrentBooking(null);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Une erreur est survenue lors de l'annulation";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Reset booking state
  const resetBookingState = () => {
    setCurrentBooking(null);
    setPriceEstimate(null);
    setError(null);
    setBookingSuccess(false);
  };

  return (
    <BookingContext.Provider
      value={{
        currentBooking,
        priceEstimate,
        loading,
        error,
        bookingSuccess,
        calculatePrice,
        createBooking,
        getBookingById,
        cancelBooking,
        resetBookingState,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);

export default BookingContext;