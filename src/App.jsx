import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/Header/NavMenu';
import HeroSection from './components/HeroSection/HeroSection';
import VipSection from './components/VipSection/VipSection';
import ProductCard from './components/ProductCard/ProductCard';
import Footer from './components/Footer/Footer.jsx';
import { CartProvider } from './context/CartContext.jsx';
import MicrophonesPage from './components/ProductCard/MicrophonesPage.jsx';
import CartPage from './context/CartPage.jsx';
import AuthModal from './components/AuthModal/AuthModal.jsx';
import Loading from './components/Loading/Loading.jsx';
import AdminOrdersPage from './pages/AdminOrdersPage.jsx';


export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    progress: 0,
    isVisible: true
  });

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  useEffect(() => {
    const loadResources = async () => {
      // Этап 1: Загрузка шрифтов (20%)
      await document.fonts.ready;
      setLoadingState(prev => ({ ...prev, progress: 20 }));

      // Этап 2: Загрузка критических изображений (40%)
      const criticalImages = Array.from(document.querySelectorAll('img[data-critical]'));
      await Promise.all(
        criticalImages.map(img => 
          img.complete 
            ? Promise.resolve() 
            : new Promise(resolve => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve);
              })
        )
      );
      setLoadingState(prev => ({ ...prev, progress: 40 }));

      // Этап 3: Минимальное время показа (60%)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingState(prev => ({ ...prev, progress: 60 }));

      // Этап 4: Загрузка основных данных (100%)
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoadingState(prev => ({ ...prev, progress: 100 }));

      // Плавное скрытие
      setLoadingState(prev => ({ ...prev, isVisible: false }));
      setTimeout(() => {
        setLoadingState(prev => ({ ...prev, isLoading: false }));
      }, 500);
    };

    loadResources();
  }, []);

  if (loadingState.isLoading) {
    return (
      <Loading 
        progress={loadingState.progress}
        style={{
          opacity: loadingState.isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }} 
      />
    );
  }

  return (
    <CartProvider>
      <div className="desktop-section">
        <div className="container">
          <NavMenu onProfileClick={openAuth} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
                    <HeroSection />
                    <VipSection />
                    <ProductCard />
                    <Footer />
                  </>
                }
              />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/about" element={<h1>О нас</h1>} />
              <Route path="/blog" element={<h1>Блог</h1>} />
              <Route path="/contacts" element={<h1>Контакты</h1>} />
              <Route path="/delivery" element={<h1>Доставка</h1>} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category/микрофон" element={<MicrophonesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </CartProvider>
  );
}