import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

const AboutSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    // EmailJS configuration - you would need to set up an EmailJS account
    // and replace these with your actual service ID, template ID and public key
    const serviceId = 'service_kpdnshd';
    const templateId = 'template_wt6rhst';
    const publicKey = 'Rpu0wwDRRW_8f47N7';
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'madangsnaik@gmail.com'
    };
    
    // Using EmailJS to send the email
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully:', response);
        setSubmitStatus('sent');
        // Reset form after successful submission
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus('');
        }, 3000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setSubmitStatus('error');
      });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100 py-4 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-mono text-blue-400 mb-4">Our Mission</h3>
            <p className="mb-6 text-gray-300">
              Founded in 2023, we are dedicated to documenting and analyzing the evolution 
              of internet technology and digital culture. We believe in making technology history 
              accessible to everyone while providing insights into how these innovations continue 
              to shape our collective future.
            </p>
            <h3 className="text-2xl font-mono text-blue-400 mb-4">What We Do</h3>
            <p className="mb-6 text-gray-300">
              We curate comprehensive timelines of internet history, from the earliest ARPANET 
              connections to the latest innovations in AI, blockchain, and decentralized technologies.
              Our team works together to provide accurate and engaging content for tech enthusiasts, 
              students, and professionals.
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-mono text-blue-400 mb-4">Our Team</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl text-blue-300">Madan G S</h4>
                <p className="text-gray-400">
                  Specializes in system architecture and backend integration with expertise
                  in creating robust and scalable applications.
                </p>
              </div>
              <div>
                <h4 className="text-xl text-blue-300">Goutham R</h4>
                <p className="text-gray-400">
                  Expert in user experience design with a focus on creating intuitive
                  interfaces that enhance digital storytelling.
                </p>
              </div>
              <div>
                <h4 className="text-xl text-blue-300">Manish S</h4>
                <p className="text-gray-400">
                  Focuses on data visualization and frontend development to bring
                  complex technical concepts to life through interactive elements.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800">
          <h3 className="text-2xl font-mono text-blue-400 mb-4 text-center">Join Us On Our Journey</h3>
          <p className="text-gray-300 text-center mb-6">
            We're constantly exploring new ways to document and visualize the fascinating history 
            of the internet. Whether you're a tech historian, developer, or simply passionate about 
            digital evolution, we'd love to hear from you.
          </p>
          
          {!showForm ? (
            <div className="flex justify-center">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-mono transition duration-300"
              >
                Contact Our Team
              </button>
            </div>
          ) : (
            <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-mono text-blue-300 mb-4">Send Us a Message</h4>
              
              {submitStatus === 'sent' ? (
                <div className="text-green-400 text-center p-4">
                  Your message has been sent successfully!
                </div>
              ) : submitStatus === 'error' ? (
                <div className="text-red-400 text-center p-4">
                  Error sending message. Please try again.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="overflow-hidden">
                  <div className="mb-4">
                    <label className="block text-blue-200 mb-2" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 text-white  outline-none border-none rounded p-2 "
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-blue-200 mb-2" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 text-white rounded p-2  outline-none border-none"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-blue-200 mb-2" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-gray-700 text-white rounded p-2  outline-none border-none"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-mono transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitStatus === 'sending'}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-mono transition duration-300 disabled:opacity-50"
                    >
                      {submitStatus === 'sending' ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;