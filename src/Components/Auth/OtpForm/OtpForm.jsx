import React, { useState, useEffect, useRef } from "react";
import CustomModal from "Components/CustomModal/CustomModal";
import "./OtpForm.css";
import EmailIcon from "assets/images/footerIcons/EmailIcon";
import AuthAPI from "api/authApi";
import { useTranslation } from "react-i18next"; // Import Translation Hook
import { toast } from "react-toastify";

const OtpForm = ({ showOtpForm, hideOtpForm, successSendButton, emailOrPhone }) => {
  const [otpTimer, setOTPTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);
  const [timerRunning, setTimerRunning] = useState(false);

  const { t } = useTranslation(); // Get translation function

  useEffect(() => {
    if (showOtpForm) {
      startTimer();
    } else {
      resetTimer();
    }
  }, [showOtpForm]);

  const startTimer = () => {
    setTimerRunning(true);
    const interval = setInterval(() => {
      setOTPTimer((prevTimer) => {
        if (prevTimer > 0) return prevTimer - 1;
        clearInterval(interval);
        setTimerRunning(false);
        return 0;
      });
    }, 1000);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setOTPTimer(60);
  };

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const updatedOtp = otp.split("");
    updatedOtp[index] = value;
    setOtp(updatedOtp.join(""));

    if (value.length === 1 && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      focusInput(index - 1);
    }
  };

  // handle copied otp 
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const otpArray = pastedData.split('').slice(0, 6); // Ensure only 6 characters are taken

    otpArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });

    setOtp(otpArray.join(''));
    focusInput(otpArray.length - 1);
  };

  const focusInput = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const handleVerifyOtp = async () => {
    // Ensure OTP is fully entered
    if (!otp || otp.length !== 6 || otp.includes(" ")) {
      toast.error(t('auth.otp.validation.fullOtp'));
      return;
    }
    try {
      const response = await AuthAPI.verifyOtp(emailOrPhone, otp);
      if (response.success === true) { // Ensure API response indicates success
        successSendButton(); // Only proceed if OTP is correct
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(t('auth.otp.validation.wrongOtp'));
      // Optionally, show an error message
    }
  };

  const handleResendOTP = async () => {
    resetTimer();
    startTimer();
    try {
      await AuthAPI.sendOtp(emailOrPhone);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      // Optionally, show an error message
    }
  };

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <CustomModal
      show={showOtpForm}
      onHide={hideOtpForm}
      title={t('auth.otp.title')}
      newClass="otp-form-modal"
    >
      <div className="info-otp-form">
        <div className="icon-email">
          <EmailIcon />
        </div>
        <div className="info-header-otp mt-3">
          <h2 className="title">{t('auth.otp.title')}</h2>
          <p className="text">
            {t('auth.otp.description')} <span>{emailOrPhone}</span>
          </p>
          {timerRunning ? (
            <div className="timer-down-otp">
              {t('auth.otp.resendIn')}{" "}
              <span className="timer-otp">{formatTimer(otpTimer)}</span>{" "}
              {t('auth.otp.seconds')}
            </div>
          ) : (
            <div className="resend-otp-link timer-down-otp" onClick={handleResendOTP}>
              {t('auth.otp.resendOtp')}
            </div>
          )}
        </div>
        <div className="otp-form">
          <form>
            <div className="all-input-otp d-flex align-items-center justify-content-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="form-control"
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)} // Assign ref to input
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="btn-main btn-page-otp w-100"
            >
              {t('auth.otp.confirmOtp')}
            </button>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default OtpForm;
