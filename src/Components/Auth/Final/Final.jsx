import React from "react";
import CustomModal from "Components/CustomModal/CustomModal";
import ImageLogin from "../Components/ImageLogin/ImageLogin";
import HeaderLogin from "../Components/HeaderLogin/HeaderLogin";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import EndLoginInfo from "../Components/EndLoginInfo/EndLoginInfo";
import AuthAPI from "api/authApi";
import { useTranslation } from "react-i18next";

const Final = ({ showFinalForm, hideFinalForm, onFormSubmit, goToLogin, emailOrPhone }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('auth.final.validation.email'))
      .required(t('auth.final.validation.emailRequired')),
    name: Yup.string().required(t('auth.final.validation.nameRequired')),
    phone: Yup.string()
      .matches(/^[0-9]{10,14}$/, t('auth.final.validation.phoneInvalid'))
      .required(t('auth.final.validation.phoneRequired')),
    password: Yup.string()
      .min(8, t('auth.final.validation.passwordMin'))
      .required(t('auth.final.validation.passwordRequired')),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], t('auth.final.validation.passwordConfirmMatch'))
      .required(t('auth.final.validation.passwordConfirmRequired')),
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
      title={t('auth.final.title')}
      newClass={"login-modal"}
    >
      <div className="info-login-content">
        <div className="row g-4 g-md-3">
          <div className="col-12 col-md-6">
            <HeaderLogin titleTop={t('auth.final.title')} />
            <FormField
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              <InputFiled
                label={t('auth.final.email')}
                name="email"
                type="email"
                placeholder={t('auth.final.email')}
                success
                disabled
              />
              <InputFiled
                label={t('auth.final.name')}
                name="name"
                type="text"
                placeholder={t('auth.final.name')}
                success
              />
              <InputFiled
                label={t('auth.final.phone')}
                name="phone"
                type="number"
                placeholder={t('auth.final.phone')}
                success
              />
              <InputFiled
                label={t('auth.final.password')}
                name="password"
                type="password"
                placeholder={t('auth.final.password')}
                success
              />
              <InputFiled
                label={t('auth.final.passwordConfirm')}
                name="password_confirmation"
                type="password"
                placeholder={t('auth.final.passwordConfirm')}
                success
              />
              <button type="submit" className="btn-main btn-submit w-100 mt-3">
                {t('auth.final.submit')}
              </button>
            </FormField>
            <div className="bottom-info-not-accout gap-2 d-flex justify-content-center align-items-center">
              {t('auth.final.alreadyHaveAccount')}{" "}
              <div
                onClick={goToLogin}
                className="link-a cursor-pointer-event text-decoration-underline"
              >
                {t('auth.final.login')}
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
