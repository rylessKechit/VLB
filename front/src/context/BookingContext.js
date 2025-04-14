import React, { createContext, useState } from 'react';
import axios from 'axios';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 1,
    luggage: 0,
    roundTrip: false,
    serviceType: 'standard', // standard, airport, longDistance, vip
    estimatedPrice: 0,
    distance: 0,
    duration: 0
  });
  
  const [bookingStep, setBookingStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Update booking form data
  const updateBookingData = (data) => {
    setBookingData(prevData => ({
      ...prevData,
      ...data
    }));
  };
  
  // Calculate price based on distance and service type
  const calculatePrice = async (origin, destination, serviceType) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post('/api/bookings/calculate-price', {
        origin,
        destination,
        serviceType
      });
      
      const { estimatedPrice, distance, duration } = response.data;
      
      updateBookingData({
        estimatedPrice,
        distance,
        duration
      });
      
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error calculating price');
      setIsLoading(false);
      throw err;
    }
  };
  
  // Create a new booking
  const createBooking = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post('/api/bookings', bookingData);
      
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating booking');
      setIsLoading(false);
      throw err;
    }
  };
  
  // Get user's bookings
  const getUserBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get('/api/bookings');
      
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching bookings');
      setIsLoading(false);
      throw err;
    }
  };
  
  // Reset booking form
  const resetBookingData = () => {
    setBookingData({
      pickupAddress: '',
      dropoffAddress: '',
      pickupDate: '',
      pickupTime: '',
      passengers: 1,
      luggage: 0,
      roundTrip: false,
      serviceType: 'standard',
      estimatedPrice: 0,
      distance: 0,
      duration: 0
    });
    setBookingStep(1);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        bookingStep,
        isLoading,
        error,
        updateBookingData,
        calculatePrice,
        createBooking,
        getUserBookings,
        resetBookingData,
        setBookingStep
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;