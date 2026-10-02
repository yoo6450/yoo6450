import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { Reviews } from './components/Reviews';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { ToastContainer } from './components/Toast';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0e0e0e] text-[#f0f0f0] font-sans pt-20 selection:bg-[#f91f0e] selection:text-white">
        <Header />
        <main>
          <Hero />
          <About />
          <Products />
          <Services />
          <Reviews />
          <Visit />
        </main>
        <Footer />

        {/* Interactive Modals and Floating Notifications */}
        <AuthModal />
        <ProfileModal />
        <SubscriptionModal />
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}
