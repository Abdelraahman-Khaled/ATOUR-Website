import React, { useState, useEffect, useRef } from "react";
import CustomModal from "Components/CustomModal/CustomModal";
import "./OtpForm.css";
import EmailIcon from "assets/images/footerIcons/EmailIcon";
import AuthAPI from "api/authApi";
import { useLanguage } from "Components/Languages/LanguageContext"; // Import Language Context

const OtpForm = ({ showOtpForm, hideOtpForm, successSendButton, emailOrPhone }) => {
  const [otpTimer, setOTPTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);
  const [timerRunning, setTimerRunning] = useState(false);

  const { currentLanguage } = useLanguage(); // Get current language

  const content = {
    title: {
      ar: "أدخل رمز الأمان",
      en: "Enter OTP",
    },
    description: {
      ar: "يرجى إدخال رمز الأمان المرسل إلى بريدك الإلكتروني",
      en: "Please enter the security code sent to your email",
    },
    resendIn: {
      ar: "إعادة الإرسال خلال",
      en: "Resend in",
    },
    seconds: {
      ar: "ثوانٍ",
      en: "seconds",
    },
    resendOtp: {
      ar: "إعادة إرسال رمز الأمان",
      en: "Resend OTP",
    },
    confirmOtp: {
      ar: "تأكيد رمز الأمان",
      en: "Confirm OTP",
    },
  };

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

  const focusInput = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await AuthAPI.verifyOtp(emailOrPhone, otp);
      successSendButton();
    } catch (error) {
      console.error("OTP verification failed:", error);
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
      title={content.title[currentLanguage]}
      newClass="otp-form-modal"
    >
      <div className="info-otp-form">
        <div className="icon-email">
          <EmailIcon />
        </div>
        <div className="info-header-otp mt-3">
          <h2 className="title">{content.title[currentLanguage]}</h2>
          <p className="text">
            {content.description[currentLanguage]} <span>{emailOrPhone}</span>
          </p>
          {timerRunning ? (
            <div className="timer-down-otp">
              {content.resendIn[currentLanguage]}{" "}
              <span className="timer-otp">{formatTimer(otpTimer)}</span>{" "}
              {content.seconds[currentLanguage]}
            </div>
          ) : (
            <div className="resend-otp-link timer-down-otp" onClick={handleResendOTP}>
              {content.resendOtp[currentLanguage]}
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
                  ref={(el) => (inputRefs.current[index] = el)} // Assign ref to input
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="btn-main btn-page-otp w-100"
            >
              {content.confirmOtp[currentLanguage]}
            </button>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default OtpForm;
