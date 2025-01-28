import React from "react";
import CustomModal from "Components/CustomModal/CustomModal";
import ImageLogin from "../Components/ImageLogin/ImageLogin";
import HeaderLogin from "../Components/HeaderLogin/HeaderLogin";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import EndLoginInfo from "../Components/EndLoginInfo/EndLoginInfo";
import AuthAPI from "api/authApi";

const Final = ({ showFinalForm, hideFinalForm, onFormSubmit, goToLogin }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("ادخل بريد إلكتروني صالح")
      .required("البريد الإلكتروني مطلوب"),
    name: Yup.string().required("الاسم مطلوب"),
    phone: Yup.string()
      .matches(/^[0-9]{10,14}$/, "رقم هاتف غير صالح")
      .required("رقم الهاتف مطلوب"),
    password: Yup.string()
      .min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف")
      .required("كلمة المرور مطلوبة"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "تأكيد كلمة المرور غير متطابق")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  const initialValues = {
    email: "faried.faried123@gmail.com",
    name: "customer name",
    phone: "0115272828655",
    password: "12345678",
    password_confirmation: "12345678",
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      await AuthAPI.register({
        email: values.email,
        name: values.name,
        phone: values.phone,
        password: values.password,
        // password_confirmation: values.password_confirmation,
      });
      resetForm();
      onFormSubmit(); // Trigger action to switch to login screen
    } catch (error) {
      console.error("Error in final registration:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <CustomModal
      show={showFinalForm}
      onHide={hideFinalForm}
      title={"الخطوة النهائية"}
      newClass={"login-modal"}
    >
      <div className="info-login-content">
        <div className="row g-4 g-md-3">
          <div className="col-12 col-md-6">
            <HeaderLogin titleTop={"الخطوة النهائية"} />
            <FormField
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              <InputFiled
                label="البريد الإلكتروني"
                name="email"
                type="email"
                placeholder="ادخل بريدك الإلكتروني"
                success
              />
              <InputFiled
                label="الاسم"
                name="name"
                type="text"
                placeholder="ادخل اسمك"
                success
              />
              <InputFiled
                label="رقم الهاتف"
                name="phone"
                type="text"
                placeholder="ادخل رقم هاتفك"
                success
              />
              <InputFiled
                label="كلمة المرور"
                name="password"
                type="password"
                placeholder="ادخل كلمة المرور"
                success
              />
              <InputFiled
                label="تأكيد كلمة المرور"
                name="password_confirmation"
                type="password"
                placeholder="تأكيد كلمة المرور"
                success
              />
              <button type="submit" className="btn-main btn-submit w-100 mt-3">
                إتمام التسجيل
              </button>
            </FormField>
            <div className="bottom-info-not-accout gap-2 d-flex justify-content-center align-items-center">
              لديك حساب بالفعل ؟{" "}
              <div
                onClick={goToLogin}
                className="link-a cursor-pointer-event text-decoration-underline"
              >
                تسجيل الدخول
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
