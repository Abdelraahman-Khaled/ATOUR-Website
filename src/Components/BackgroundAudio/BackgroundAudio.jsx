import React, { useEffect, useRef, useState } from 'react';
import audioFile from '../../assets/audio/ATOUR Full Sonic brand.wav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../Components/Languages/LanguageContext.js';
import './BackgroundAudio.css';

const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const { currentLanguage } = useLanguage(); // Get current language

  useEffect(() => {
    // Function to play audio
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          // Browser might block autoplay, we'll handle this gracefully
          console.log('Autoplay prevented:', error);
        });
      }
    };

    // Play audio when component mounts
    playAudio();

    // Add event listeners for user interaction to enable audio
    const handleUserInteraction = () => {
      playAudio();
      // Remove event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="background-audio-container">
      <button 
        className="audio-control-btn" 
        onClick={toggleMute}
        title={isMuted 
          ? (currentLanguage === 'ar' ? 'تشغيل الصوت' : 'Unmute') 
          : (currentLanguage === 'ar' ? 'كتم الصوت' : 'Mute')
        }
      >
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
      </button>
      <audio
        ref={audioRef}
        src={audioFile}
        loop
        preload="auto"
      />
    </div>
  );
};

export default BackgroundAudio;