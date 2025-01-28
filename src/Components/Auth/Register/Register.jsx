import React from "react";
import ImageLogin from "../Components/ImageLogin/ImageLogin";
import HeaderLogin from "../Components/HeaderLogin/HeaderLogin";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import EndLoginInfo from "../Components/EndLoginInfo/EndLoginInfo";
import AuthAPI from "api/authApi";
import { useLanguage } from "Components/Languages/LanguageContext"; // Import Language Context

const Register = ({ buttonLogin, hideModalForm, onRegisterSubmit }) => {
  const { currentLanguage } = useLanguage(); // Get current language

  const content = {
    title: {
      ar: "تسجيل حساب جديد",
      en: "Create a New Account",
    },
    emailOrPhoneLabel: {
      ar: "البريد الإلكتروني أو رقم الهاتف",
      en: "Email or Phone Number",
    },
    emailOrPhonePlaceholder: {
      ar: "أدخل البريد الإلكتروني أو رقم الهاتف",
      en: "Enter your email or phone number",
    },
    submitButton: {
      ar: "إرسال رمز الامان",
      en: "Send OTP",
    },
    alreadyHaveAccount: {
      ar: "لديك حساب بالفعل؟",
      en: "Already have an account?",
    },
    loginLink: {
      ar: "تسجيل الدخول",
      en: "Log In",
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
    },
  };

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
      await AuthAPI.sendOtp(values.emailRegOrPhoneNumber); // Send OTP
      onRegisterSubmit(values.emailRegOrPhoneNumber); // Pass email/phone to parent
      hideModalForm(); // Close Register modal
      resetForm();
    } catch (error) {
      console.error("Error sending OTP:", error);
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
              label={content.emailOrPhoneLabel[currentLanguage]}
              name="emailRegOrPhoneNumber"
              type="text"
              placeholder={content.emailOrPhonePlaceholder[currentLanguage]}
              success
            />
            <button type="submit" className="btn-main btn-submit w-100 mt-3">
              {content.submitButton[currentLanguage]}
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
