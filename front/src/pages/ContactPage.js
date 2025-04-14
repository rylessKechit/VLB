import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Schéma de validation du formulaire
  const validationSchema = Yup.object({
    name: Yup.string().required('Votre nom est requis'),
    email: Yup.string().email('Email invalide').required('Votre email est requis'),
    phone: Yup.string().required('Votre téléphone est requis'),
    subject: Yup.string().required('Le sujet est requis'),
    message: Yup.string().required('Votre message est requis').min(10, 'Votre message est trop court')
  });

  // Configuration du formulaire avec Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        // Simuler l'envoi du formulaire (à remplacer par votre API réelle)
        // await axios.post('/api/contact', values);
        
        // Simuler un délai
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSubmitSuccess(true);
        formik.resetForm();
      } catch (error) {
        setSubmitError(
          error.response?.data?.message || 
          'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">CONTACTEZ TAXI VLB À VERRIÈRES LE BUISSON</h1>
          <p className="text-xl max-w-3xl mx-auto">
            POSEZ-MOI VOS QUESTIONS
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="mb-6">
                N'hésitez pas à m'adresser vos demandes à l'aide de ce formulaire de contact. 
                Je vous répondrai dans les plus brefs délais.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Formulaire */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Envoyez-moi un message</h2>
                
                {submitSuccess ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <p>Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.</p>
                    <button 
                      className="mt-4 text-green-700 underline"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={formik.handleSubmit}>
                    {submitError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        <p>{submitError}</p>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-2 font-medium">
                        Votre nom *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          formik.touched.name && formik.errors.name
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-yellow-200'
                        }`}
                        placeholder="Prénom et nom"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="mt-1 text-red-500 text-sm">{formik.errors.name}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block mb-2 font-medium">
                        Votre email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          formik.touched.email && formik.errors.email
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-yellow-200'
                        }`}
                        placeholder="votre@email.com"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-red-500 text-sm">{formik.errors.email}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block mb-2 font-medium">
                        Votre téléphone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
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
                    
                    <div className="mb-4">
                      <label htmlFor="subject" className="block mb-2 font-medium">
                        Sujet *
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          formik.touched.subject && formik.errors.subject
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-yellow-200'
                        }`}
                        placeholder="Sujet de votre message"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subject}
                      />
                      {formik.touched.subject && formik.errors.subject && (
                        <p className="mt-1 text-red-500 text-sm">{formik.errors.subject}</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block mb-2 font-medium">
                        Votre message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          formik.touched.message && formik.errors.message
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-yellow-200'
                        }`}
                        placeholder="Votre message ici..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                      ></textarea>
                      {formik.touched.message && formik.errors.message && (
                        <p className="mt-1 text-red-500 text-sm">{formik.errors.message}</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          id="privacy"
                          name="privacy"
                          type="checkbox"
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                          required
                        />
                        <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                          En soumettant ce formulaire, j'accepte que mes données personnelles soient utilisées pour me recontacter. Elles ne seront pas utilisées à d'autres fins. <a href="/privacy" className="text-yellow-600 hover:underline">En savoir plus</a>
                        </label>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-yellow-600 text-white py-3 px-6 rounded-md font-medium hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </form>
                )}
              </div>
              
              {/* Informations de contact */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                  <p className="mb-1">Taxi VLB</p>
                  <p className="mb-1">92 rue d'Estienne d'Orves</p>
                  <p>91370 Verrières-le-Buisson</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
                  <p className="mb-1">
                    <a href="tel:+33601020304" className="text-yellow-600 hover:underline">+33 6 01 02 03 04</a>
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="mb-1">
                    <a href="mailto:contact@taxivlb.fr" className="text-yellow-600 hover:underline">contact@taxivlb.fr</a>
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">Horaires</h3>
                  <p className="mb-1">Disponible 7/7</p>
                  <p>24h/24</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-yellow-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-yellow-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Où nous trouver</h2>
            <div className="h-96 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21039.301026767765!2d2.2471227!3d48.748574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67ab033c7ad41%3A0x8be3f1bf68a9e1f9!2s91370%20Verri%C3%A8res-le-Buisson!5e0!3m2!1sfr!2sfr!4v1681900983450!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte Verrières-le-Buisson"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Comment réserver un taxi ?</h3>
                <p>
                  Vous pouvez réserver un taxi directement sur notre site web en utilisant notre formulaire de réservation, 
                  par téléphone au +33 6 01 02 03 04 ou par email à contact@taxivlb.fr.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Quels sont les modes de paiement acceptés ?</h3>
                <p>
                  Nous acceptons les paiements en espèces, par carte bancaire, et par virement bancaire pour les entreprises.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Puis-je annuler ma réservation ?</h3>
                <p>
                  Oui, vous pouvez annuler votre réservation sans frais jusqu'à 1 heure avant l'heure de prise en charge prévue. 
                  Pour les annulations tardives, des frais peuvent s'appliquer.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Proposez-vous des services pour les entreprises ?</h3>
                <p>
                  Oui, nous proposons des services spéciaux pour les entreprises avec possibilité de facturation mensuelle. 
                  Contactez-nous pour établir un devis personnalisé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;