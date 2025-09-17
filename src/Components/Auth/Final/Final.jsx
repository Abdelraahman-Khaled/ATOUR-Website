import React from "react";
import CustomModal from "Components/CustomModal/CustomModal";
import ImageLogin from "../Components/ImageLogin/ImageLogin";
import HeaderLogin from "../Components/HeaderLogin/HeaderLogin";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import EndLoginInfo from "../Components/EndLoginInfo/EndLoginInfo";
import AuthAPI from "api/authApi";
// import { useTranslation } from "react-i18next";
import { useLanguage } from "Components/Languages/LanguageContext";
import finalContent from "./finalContent";

const Final = ({ showFinalForm, hideFinalForm, onFormSubmit, goToLogin, emailOrPhone }) => {
  const { currentLanguage } = useLanguage();
  const content = finalContent;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(content.validation.email[currentLanguage])
      .required(content.validation.emailRequired[currentLanguage]),
    name: Yup.string().required(content.validation.nameRequired[currentLanguage]),
    phone: Yup.string()
      .matches(/^[0-9]{10,14}$/, content.validation.phoneInvalid[currentLanguage])
      .required(content.validation.phoneRequired[currentLanguage]),
    password: Yup.string()
      .min(8, content.validation.passwordMin[currentLanguage])
      .required(content.validation.passwordRequired[currentLanguage]),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], content.validation.passwordConfirmMatch[currentLanguage])
      .required(content.validation.passwordConfirmRequired[currentLanguage]),
  });

  const initialValues = {
    email: emailOrPhone, // Pre-fill the email field
    name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      await AuthAPI.register({
        email: values.email,
        name: values.name,
        phone: values.phone,
        password: values.password,
      });
      resetForm();
      onFormSubmit(); // Switch to login screen
    } catch (error) {
      console.error("Error in final registration:", error);
    }
  };

  return (
    <CustomModal
      show={showFinalForm}
      onHide={hideFinalForm}
      title={content.title[currentLanguage]}
      newClass={"login-modal"}
    >
      <div className="info-login-content">
        <div className="row g-4 g-md-3">
          <div className="col-12 col-md-6">
            <HeaderLogin titleTop={content.title[currentLanguage]} />
            <FormField
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              <InputFiled
                label={content.email[currentLanguage]}
                name="email"
                type="email"
                placeholder={content.email[currentLanguage]}
                success
                disabled
              />
              <InputFiled
                label={content.name[currentLanguage]}
                name="name"
                type="text"
                placeholder={content.name[currentLanguage]}
                success
              />
              <InputFiled
                label={content.phone[currentLanguage]}
                name="phone"
                type="number"
                placeholder={content.phone[currentLanguage]}
                success
              />
              <InputFiled
                label={content.password[currentLanguage]}
                name="password"
                type="password"
                placeholder={content.password[currentLanguage]}
                success
              />
              <InputFiled
                label={content.passwordConfirm[currentLanguage]}
                name="password_confirmation"
                type="password"
                placeholder={content.passwordConfirm[currentLanguage]}
                success
              />
              <button type="submit" className="btn-main btn-submit w-100 mt-3">
                {content.submit[currentLanguage]}
              </button>
            </FormField>
            <div className="bottom-info-not-accout gap-2 d-flex justify-content-center align-items-center">
              {content.alreadyHaveAccount[currentLanguage]}{" "}
              <div
                onClick={goToLogin}
                className="link-a cursor-pointer-event text-decoration-underline"
              >
                {content.login[currentLanguage]}
              </div>
            </div>
            <EndLoginInfo />
          </div>
          <div className="col-12 col-md-6">
            <ImageLogin />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default Final;
