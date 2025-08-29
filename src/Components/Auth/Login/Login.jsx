import React, { useState } from "react";
import ImageLogin from "../Components/ImageLogin/ImageLogin";
import HeaderLogin from "../Components/HeaderLogin/HeaderLogin";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import EndLoginInfo from "../Components/EndLoginInfo/EndLoginInfo";
import AuthAPI from "api/authApi"; // Import your API file
import useTranslation from "Components/Languages/useTranslation"; // Import Translation Hook
import "./Login.css";
import ForgotPasswordForm from "../Components/ResetPassword/ForgotPasswordForm ";

const Login = ({ buttonLogin, hideModalForm, setOtpFormOpen }) => {
  const { t, currentLanguage } = useTranslation(); // Get translation function and current language
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    emailOrPhoneNumber: Yup.string()
      .required(t('auth.login.validation.emailOrPhoneRequired'))
      .test(
        "emailOrPhoneNumber",
        t('auth.login.validation.emailOrPhoneInvalid'),
        function (value) {
          return (
            Yup.string().email().isValidSync(value) ||
            Yup.string()
              .matches(/^[0-9]{10,14}$/, {
                message: t('auth.login.validation.phoneInvalid'),
                excludeEmptyString: true,
              })
              .isValidSync(value)
          );
        }
      ),
    password: Yup.string()
      .min(6, t('auth.login.validation.passwordMinLength'))
      .required(t('auth.login.validation.passwordRequired')),
  });

  const initialValues = {
    emailOrPhoneNumber: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await AuthAPI.login(values.emailOrPhoneNumber, values.password);

      // Store token in localStorage
      localStorage.setItem("access_token", response.access_token);
      // Store user details if needed
      localStorage.setItem("user", JSON.stringify(response.user));
      // Notify other components of the change
      window.dispatchEvent(new Event("storage")); // Trigger the storage event

      hideModalForm(); // Hide login modal
      resetForm();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <div className="info-login-content">
        <div className="row g-4 g-md-3">
          <div className="col-12 col-md-6">
            <HeaderLogin titleTop={t('auth.login.title')} />
            {forgotPasswordOpen ? (
              <ForgotPasswordForm onClose={() => setForgotPasswordOpen(false)} />
            ) : (
              <FormField
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <InputFiled
                  label={t('auth.login.emailOrPhoneLabel')}
                  name="emailOrPhoneNumber"
                  type="text"
                  placeholder={t('auth.login.emailOrPhonePlaceholder')}
                  success
                />
                <InputFiled
                  label={t('auth.login.passwordLabel')}
                  name="password"
                  type="password"
                  placeholder={t('auth.login.passwordPlaceholder')}
                  success
                />
                <button type="submit" className="btn-main btn-submit w-100 mt-3">
                  {t('auth.login.submitButton')}
                </button>
              </FormField>
            )}
            <div className="bottom-info-not-accout gap-2 d-flex justify-content-center align-items-center">
              {t('auth.login.noAccount')}{" "}
              <div
                onClick={buttonLogin}
                className="cursor-pointer-event text-decoration-underline link-a"
              >
                {t('auth.login.registerLink')}
              </div>
            </div>
            {!forgotPasswordOpen && (
              <div
                onClick={() => setForgotPasswordOpen(true)}
                className="cursor-pointer-event mb-3 text-decoration-underline link-a text-center mt-2"
              >
                {t('auth.login.forgetPassword')}
              </div>
            )}
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
    </div>
  );
};

export default Login;