import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import CustomModal from "Components/CustomModal/CustomModal";
import OtpForm from "../OtpForm/OtpForm";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";
import Final from "../Final/Final";
import { useLanguage } from "Components/Languages/LanguageContext";

const FormAuth = ({ showModalForm, hideModalForm }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [isLogin, setIsLogin] = useState(false); // Switch between Login and Register
  const [otpFormOpen, setOtpFormOpen] = useState(false); // OTP form visibility
  const [successSend, setSuccessSend] = useState(false); // Success modal visibility
  const [emailOrPhone, setEmailOrPhone] = useState(""); // Email or phone from Register
  const [isFinalDestiny, setIsFinalDestiny] = useState(false);

  // Toggle between Login and Register
  const buttonLogin = () => {
    setIsLogin(!isLogin);
  };

  // Close OTP form
  const hideOtpForm = () => {
    setOtpFormOpen(false);
  };

  const hideFinalForm = () => {
    setIsFinalDestiny(false);
  };

  // Open OTP form with email or phone
  const handleRegisterSubmit = (emailOrPhone) => {
    setEmailOrPhone(emailOrPhone); // Save email/phone
    setOtpFormOpen(true); // Open OTP form
  };

  // Transition to success modal
  const successSendButton = () => {
    setIsFinalDestiny(true); // Open success modal
    hideOtpForm(); // Close OTP form
  };

  // Close success modal
  const hidesuccessSendButton = () => {
    setSuccessSend(false);
  };

  return (
    <>
      {/* Success Modal */}
      <SuccessSend
        showsuccessModalSend={successSend}
        hideSuccessModalSend={hidesuccessSendButton}
        titleModal={
          currentLanguage === "ar" ? "تم التاكيد بنجاح." : "Successfully Confirmed."
        }
        titleSend={
          currentLanguage === "ar" ? "تم الارسال بنجاح !" : "Successfully Sent!"
        }
        isTrueText={true}
        textSend={
          currentLanguage === "ar"
            ? "لقد تم تاكيد otp الخاص بك سجل الدخول الان !"
            : "Your OTP has been confirmed. Log in now!"
        }
        textButton={currentLanguage === "ar" ? "تم" : "Done"}
      />

      {/* OTP Form */}
      <OtpForm
        showOtpForm={otpFormOpen}
        hideOtpForm={hideOtpForm}
        successSendButton={successSendButton}
        emailOrPhone={emailOrPhone} // Pass email/phone to OtpForm
      />
      <Final
        showFinalForm={isFinalDestiny}
        hideFinalForm={hideFinalForm} // Navigate back to OTP if needed
        onFormSubmit={() => {
          setIsFinalDestiny(false); // Open success modal
          setIsLogin(true);
        }} // Transition to Login on successful submission
        goToLogin={() => setIsLogin(true)} // Directly navigate to Login
      />

      {/* Login/Register Modal */}
      <CustomModal
        show={showModalForm}
        onHide={hideModalForm}
        title={
          !isLogin
            ? currentLanguage === "ar"
              ? "تسجيل الدخول"
              : "Login"
            : currentLanguage === "ar"
            ? "تسجيل حساب جديد"
            : "Register a New Account"
        }
        newClass={"login-modal"}
      >
        {!isLogin ? (
          <Login
            buttonLogin={buttonLogin}
            setOtpFormOpen={setOtpFormOpen}
            hideModalForm={hideModalForm}
          />
        ) : (
          <Register
            buttonLogin={buttonLogin}
            hideModalForm={hideModalForm}
            onRegisterSubmit={handleRegisterSubmit} // Handle Register submission
          />
        )}
      </CustomModal>
    </>
  );
};

export default FormAuth;
