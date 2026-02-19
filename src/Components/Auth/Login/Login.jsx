import React, { useState } from "react";
import ImageLogin from "../Components/ImageLogin/ImageLogin";
import HeaderLogin from "../Components/HeaderLogin/HeaderLogin";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import EndLoginInfo from "../Components/EndLoginInfo/EndLoginInfo";
import AuthAPI from "api/authApi"; // Import your API file
// import useTranslation from "Components/Languages/useTranslation"; // Import Translation Hook
import "./Login.css";
import ForgotPasswordForm from "../Components/ResetPassword/ForgotPasswordForm ";
import { useLanguage } from "Components/Languages/LanguageContext";
import loginContent from "./loginContent";

const Login = ({ buttonLogin, hideModalForm, setOtpFormOpen }) => {
  const { currentLanguage } = useLanguage();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const content = loginContent;

  const validationSchema = Yup.object().shape({
    emailOrPhoneNumber: Yup.string()
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
    password: Yup.string()
      .min(6, content.validation.passwordMinLength[currentLanguage])
      .required(content.validation.passwordRequired[currentLanguage]),
  });

  const initialValues = {
    emailOrPhoneNumber: "",
    password: "",
  };
console.log(initialValues);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="info-login-content">
        <div className="row g-4 g-md-3">
          <div className="col-12 col-xl-6">
            <HeaderLogin titleTop={content.title[currentLanguage]} />
            {forgotPasswordOpen ? (
              <ForgotPasswordForm onClose={() => setForgotPasswordOpen(false)} />
            ) : (
              <FormField
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <InputFiled
                  label={content.emailOrPhoneLabel[currentLanguage]}
                  name="emailOrPhoneNumber"
                  type="text"
                  placeholder={content.emailOrPhonePlaceholder[currentLanguage]}
                  success
                />
                <InputFiled
                  label={content.passwordLabel[currentLanguage]}
                  name="password"
                  type="password"
                  placeholder={content.passwordPlaceholder[currentLanguage]}
                  success
                />
                <button type="submit" className="btn-main btn-submit w-100 mt-3" disabled={loading}>
                  {loading ? content.loading[currentLanguage] : content.submitButton[currentLanguage]}
                </button>
              </FormField>
            )}
            <div className="bottom-info-not-accout gap-2 d-flex justify-content-center align-items-center">
              {content.noAccount[currentLanguage]}{" "}
              <div
                onClick={buttonLogin}
                className="cursor-pointer-event text-decoration-underline link-a"
              >
                {content.registerLink[currentLanguage]}
              </div>
            </div>
            {!forgotPasswordOpen && (
              <div
                onClick={() => setForgotPasswordOpen(true)}
                className="cursor-pointer-event mb-3 text-decoration-underline link-a text-center mt-2"
              >
                {content.forgetPassword[currentLanguage]}
              </div>
            )}
            <div className="license-number text-center ">
              <span className="license-number-text text-success">{currentLanguage === "ar" ? "رقم الترخيص: " : "License Number: "}</span>
              73106456
            </div>
            <EndLoginInfo />
          </div>
          <div className="col-12 col-xl-6">
            <ImageLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;