import React, { useState, useEffect, useRef } from 'react';
import audioFile from '../../assets/audio/audio.wav';
import './BackgroundAudio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const BackgroundAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume] = useState(30); // Set fixed volume to 30%
  const audioRef = useRef(null);
  const audioContext = useRef(null);
  const audioSource = useRef(null);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      try {
        // Create audio context if it doesn't existu
        if (!audioContext.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContext.current = new AudioContext();

          // Connect the HTML audio element to the audio context
          if (audioRef.current && audioContext.current) {
            audioSource.current = audioContext.current.createMediaElementSource(audioRef.current);
            const gainNode = audioContext.current.createGain();
            gainNode.gain.value = volume / 100;

            audioSource.current.connect(gainNode);
            gainNode.connect(audioContext.current.destination);

            // Set audio properties
            audioRef.current.loop = true;
            audioRef.current.volume = volume / 100;

            // Play audio
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                console.log('Audio started successfully');
              })
              .catch(error => {
                console.error('Error playing audio:', error);
              });
          }
        } else if (audioContext.current.state === 'suspended') {
          // Resume audio context if it was suspended
          audioContext.current.resume();
        }
      } catch (error) {
        console.error('Audio context error:', error);
      }
    };

    // Set up event listeners for user interaction
    const userInteractionEvents = ['click', 'touchstart', 'keydown', 'mousedown'];

    const handleUserInteraction = () => {
      initAudio();

      // Remove event listeners after first interaction
      userInteractionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };

    // Add event listeners
    userInteractionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction);
    });

    // Try to auto-start (will likely be blocked by browser)
    const attemptAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.volume = volume / 100;
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              console.log('Autoplay successful');

              // If autoplay works, initialize audio context
              initAudio();

              // Remove event listeners since we don't need them anymore
              userInteractionEvents.forEach(event => {
                document.removeEventListener(event, handleUserInteraction);
              });
            })
            .catch(error => {
              console.log('Autoplay prevented (expected):', error);
              // This is expected - we'll wait for user interaction
            });
        }
      }
    };

    // Try autoplay (will likely fail but worth trying)
    attemptAutoplay();

    // Cleanup function
    return () => {
      // Clean up event listeners
      userInteractionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });

      // Close audio context
      if (audioContext.current) {
        if (audioContext.current.state !== 'closed') {
          audioContext.current.close().catch(e => console.error('Error closing audio context:', e));
        }
      }

      // Pause audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // Pause audio
        audioRef.current.pause();
        if (audioContext.current && audioContext.current.state === 'running') {
          audioContext.current.suspend();
        }
      } else {
        // Resume/play audio
        if (audioContext.current && audioContext.current.state === 'suspended') {
          audioContext.current.resume();
        }
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Volume is now fixed at 30%

  // Volume control removed as requested

  return (
    <div className="background-audio-container">
      <audio
        ref={audioRef}
        src={audioFile}
        preload="auto"
        controlsList="nodownload"
      />
      <div className="audio-controls-wrapper">
        <button className="audio-control-btn" onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faVolumeUp : faVolumeMute} />
        </button>
      </div>
    </div>
  );
};

export default BackgroundAudio;