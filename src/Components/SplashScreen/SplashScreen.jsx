import React, { useState, useEffect } from 'react';
import { useHome } from '../../context/HomeContext';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { loading } = useHome();

  // Keep splash screen visible until loading is complete
  useEffect(() => {
    // Show splash screen when loading starts
    if (loading) {
      setShowSplash(true);
      const splashElement = document.querySelector(".splash-overlay");
      if (splashElement) {
        splashElement.style.animation = "none"; // Reset animation
        splashElement.style.opacity = "1";
      }
    }

    // Hide splash screen when loading is complete
    if (!loading && showSplash) {
      // Wait a bit after loading completes to ensure everything is ready
      const timer = setTimeout(() => {
        // Add fade-out animation before hiding
        const splashElement = document.querySelector(".splash-overlay");
        if (splashElement) {
          splashElement.style.animation = "fadeOutSplash 0.4s forwards";

          setTimeout(() => {
            setShowSplash(false);
          }, 400); // Match the animation duration
        }
      }, 100); // Reduced delay after loading completes

      return () => clearTimeout(timer);
    }
  }, [loading, showSplash]);

  // Fallback timer to hide splash screen after 15 seconds even if loading doesn't complete
  // This ensures the splash screen doesn't stay forever if there's a loading issue
  useEffect(() => {
    const timer = setTimeout(() => {
      // Add fade-out animation before hiding
      const splashElement = document.querySelector(".splash-overlay");
      if (splashElement && showSplash) {
        splashElement.style.animation = "fadeOutSplash 0.5s forwards";

        setTimeout(() => {
          setShowSplash(false);
        }, 500); // Match the animation duration
      }
    }, 15000); // Extended maximum time to show splash screen

    return () => clearTimeout(timer);
  }, [showSplash]);

  if (!showSplash) return null;

  return (
    <div className="splash-overlay">
      <div className="splash-logo">
        <img src="/icon/ico.svg" alt="Logo" className='splash-logo' />
      </div>
    </div>
  );
};

export default SplashScreen;