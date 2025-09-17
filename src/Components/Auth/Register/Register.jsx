import React, { useState } from "react";
import ImageLogin from "../Components/ImageLogin/ImageLogin";
import HeaderLogin from "../Components/HeaderLogin/HeaderLogin";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import EndLoginInfo from "../Components/EndLoginInfo/EndLoginInfo";
import AuthAPI from "api/authApi";
import { useLanguage } from "Components/Languages/LanguageContext"; // Import Language Context
import registerContent from "../registerContent"; // Import the content object

const Register = ({ buttonLogin, hideModalForm, onRegisterSubmit }) => {
  const { currentLanguage } = useLanguage(); // Get current language
  const [loading, setLoading] = useState(false);

  const content = registerContent; // Use the imported content object

  const validationSchema = Yup.object().shape({
    emailRegOrPhoneNumber: Yup.string()
      .required(content.validation.emailOrPhoneRequired[currentLanguage])
      .test(
        "emailOrPhoneNumber",
        content.validation.emailOrPhoneInvalid[currentLanguage],
        function (value) {
          return (
            Yup.string().email().isValidSync(value) ||
            Yup.string()
              .matches(/^[0-9]{10,14}$/, {
                message: content.validation.phoneInvalid[currentLanguage],
                excludeEmptyString: true,
              })
              .isValidSync(value)
          );
        }
      ),
  });

  const initialValues = {
    emailRegOrPhoneNumber: "",
  };

  const handleRegisterSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      await AuthAPI.sendOtp(values.emailRegOrPhoneNumber); // Send OTP
      onRegisterSubmit(values.emailRegOrPhoneNumber); // Pass email/phone to parent
      hideModalForm(); // Close Register modal
      resetForm();
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="info-login-content">
      <div className="row g-4 g-md-3">
        <div className="col-12 col-md-6">
          <HeaderLogin titleTop={content.title[currentLanguage]} />
          <FormField
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegisterSubmit}
          >
            <InputFiled
              label={content.email[currentLanguage]}
              name="emailRegOrPhoneNumber"
              type="text"
              placeholder={content.email[currentLanguage]}
              success
            />
            <button type="submit" className="btn-main btn-submit w-100 mt-3" disabled={loading}>
              {loading ? registerContent.loading[currentLanguage] : registerContent.submitButton[currentLanguage]}
            </button>
          </FormField>
          <div className="bottom-info-not-accout gap-2 d-flex justify-content-center align-items-center">
            {content.alreadyHaveAccount[currentLanguage]}{" "}
            <div
              onClick={buttonLogin}
              className="link-a cursor-pointer-event text-decoration-underline"
            >
              {content.loginLink[currentLanguage]}
            </div>
          </div>
          <div className="license-number text-center ">
            <span className="license-number-text text-success">{currentLanguage === "ar" ? "رقم الترخيص: " : "License Number: "}</span>
            73106456
          </div>
          <EndLoginInfo />
        </div>
        <div className="col-12 col-md-6">
          <ImageLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
