import React, { useState } from "react";
import ImageLogin from "../Components/ImageLogin/ImageLogin";
import HeaderLogin from "../Components/HeaderLogin/HeaderLogin";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import EndLoginInfo from "../Components/EndLoginInfo/EndLoginInfo";
import AuthAPI from "api/authApi"; // Import your API file
import { useLanguage } from "Components/Languages/LanguageContext"; // Import Language Context
import "./Login.css";
import ForgotPasswordForm from "../Components/ResetPassword/ForgotPasswordForm ";

const Login = ({ buttonLogin, hideModalForm, setOtpFormOpen }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const content = {
    title: {
      ar: "مرحبا بك في جولة",
      en: "Welcome to Tour",
    },
    emailOrPhoneLabel: {
      ar: "البريد الإلكتروني أو رقم الهاتف",
      en: "Email or Phone Number",
    },
    emailOrPhonePlaceholder: {
      ar: "أدخل البريد الإلكتروني أو رقم الهاتف",
      en: "Enter your email or phone",
    },
    passwordLabel: {
      ar: "كلمة المرور",
      en: "Password",
    },
    passwordPlaceholder: {
      ar: "أدخل كلمة المرور",
      en: "Enter your password",
    },
    submitButton: {
      ar: "تسجيل دخول",
      en: "Log In",
    },
    noAccount: {
      ar: "ليس لديك حساب؟",
      en: "Don't have an account?",
    },
    registerLink: {
      ar: "تسجيل حساب جديد",
      en: "Register Here",
    },
    forgetPassword: {
      ar: "نسيت كلمة المرور",
      en: "Forget Password",
    },
    validation: {
      emailOrPhoneRequired: {
        ar: "ادخل البريد الإلكتروني أو رقم الهاتف",
        en: "Enter your email or phone number",
      },
      emailOrPhoneInvalid: {
        ar: "رقم هاتف أو بريد إلكتروني غير صحيح",
        en: "Invalid email or phone number",
      },
      phoneInvalid: {
        ar: "رقم الهاتف غير صحيح",
        en: "Invalid phone number",
      },
      passwordMinLength: {
        ar: "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
        en: "Password must be at least 8 characters",
      },
      passwordRequired: {
        ar: "كلمة المرور مطلوبة",
        en: "Password is required",
      },
    },
  };

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
      .min(8, content.validation.passwordMinLength[currentLanguage])
      .required(content.validation.passwordRequired[currentLanguage]),
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
                <button type="submit" className="btn-main btn-submit w-100 mt-3">
                  {content.submitButton[currentLanguage]}
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
                className="cursor-pointer-event text-decoration-underline link-a text-center mt-2"
              >
                {content.forgetPassword[currentLanguage]}
              </div>
            )}
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