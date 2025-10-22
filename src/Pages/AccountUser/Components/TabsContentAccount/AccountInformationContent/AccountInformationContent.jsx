// @ts-nocheck
import React, { useState, useEffect } from "react";
import EditIconUser from "assets/images/AccountUser/EditIconUser";
import "./AccountInfo.css";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import ModalEditInfoAccount from "./ModalEditInfoAccount";
import ProfileAPI from "api/profileApi";
import { toast } from "react-toastify";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useProfile } from "context/ProfileContext";
import { Link, useNavigate } from "react-router-dom";
import imgProfile from "../../../../../assets/images/defaultImg/default-profile.jpg";
import FormField from "Components/Forms/FormFiled";
import AuthAPI from "api/authApi";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";

const translations = {
  accountInfo: {
    en: "Account Information",
    ar: "معلومات الحساب",
    fr: "Informations du compte",
    de: "Kontoinformationen",
    es: "Información de la cuenta",
    tr: "Hesap Bilgileri",
    ru: "Информация о аккаунте",
    zh: "账户信息",
    ko: "계정 정보",
    pt: "Informações da conta",
    ur: "اکاؤنٹ کی معلومات",
    ja: "アカウント情報",
  },
  email: {
    en: "Email Address",
    ar: "البريد الإلكتروني",
    fr: "Adresse e-mail",
    de: "E-Mail-Adresse",
    es: "Dirección de correo electrónico",
    tr: "E-posta adresi",
    ru: "Адрес электронной почты",
    zh: "电子邮件地址",
    ko: "이메일 주소",
    pt: "Endereço de e-mail",
    ur: "ای میل پتہ",
    ja: "メールアドレス",
  },
  phone: {
    en: "Phone Number",
    ar: "رقم الهاتف",
    fr: "Numéro de téléphone",
    de: "Telefonnummer",
    es: "Número de teléfono",
    tr: "Telefon numarası",
    ru: "Номер телефона",
    zh: "电话号码",
    ko: "전화번호",
    pt: "Número de telefone",
    ur: "فون نمبر",
    ja: "電話番号",
  },
  profilePhoto: {
    en: "Profile Photo",
    ar: "الصورة الشخصية",
    fr: "Photo de profil",
    de: "Profilbild",
    es: "Foto de perfil",
    tr: "Profil fotoğrafı",
    ru: "Фото профиля",
    zh: "个人照片",
    ko: "프로필 사진",
    pt: "Foto de perfil",
    ur: "پروفائل تصویر",
    ja: "プロフィール写真",
  },
  loading: {
    en: "Loading account information...",
    ar: "جارٍ تحميل معلومات الحساب...",
    fr: "Chargement des informations du compte...",
    de: "Kontoinformationen werden geladen...",
    es: "Cargando información de la cuenta...",
    tr: "Hesap bilgileri yükleniyor...",
    ru: "Загрузка информации об аккаунте...",
    zh: "正在加载账户信息...",
    ko: "계정 정보를 불러오는 중...",
    pt: "Carregando informações da conta...",
    ur: "اکاؤنٹ کی معلومات لوڈ ہو رہی ہیں...",
    ja: "アカウント情報を読み込んでいます...",
  },
  fetchError: {
    en: "An error occurred while fetching account information.",
    ar: "حدث خطأ أثناء تحميل معلومات الحساب.",
    fr: "Une erreur s'est produite lors de la récupération des informations du compte.",
    de: "Fehler beim Laden der Kontoinformationen.",
    es: "Se produjo un error al obtener la información de la cuenta.",
    tr: "Hesap bilgileri alınırken bir hata oluştu.",
    ru: "Произошла ошибка при получении информации об аккаунте.",
    zh: "获取账户信息时出错。",
    ko: "계정 정보를 가져오는 동안 오류가 발생했습니다.",
    pt: "Ocorreu um erro ao buscar as informações da conta.",
    ur: "اکاؤنٹ کی معلومات حاصل کرنے میں خرابی پیش آگئی۔",
    ja: "アカウント情報の取得中にエラーが発生しました。",
  },
  title: { ar: "امان الحساب", en: "Account security" },
  password: { ar: "كلمة السر", en: "Password" },
  choosePassword: { ar: "اختار كلمة سر قوية عشان تحمي حسابك. ", en: "Choose a strong password to keep your account safe." },
  makePassword: { ar: "تغير كلمة السر", en: "Make a password" },
  google: { ar: "  تسجيل بجوجل", en: "Log in with Google" },
  googleAccount: { ar: "إنت رابط حساب جوجل بـ Deal وبتستخدمه في تسجيل الدخول. إنت داخل بحساب hoss12345@gmail.com الخاص بك مع كلمة السر التي قمت بإعطاءها عند إنشاء حسابك. الرجاء تأكيد رقم هاتفك للمتابعة.", en: "You are linked to a Google account with Deal and you can log in with it. You are logged in to hoss12345@gmail.com account with the password you provided when you created your account. Please confirm your phone number to proceed." },
  cancelGoogle: { ar: "الغي ربط الحساب", en: "Cancel" },
  deleteAccount: { ar: "مسح الحساب", en: "Delete account" },
  deleteDetails: { ar: "لو حذفت حسابك، كل بياناتك هتتمسح ومش هتقدر تسترجعها تاني. لو متأكد، دوس على امسح حسابي.", en: "If you delete your account, all your data will be deleted and you will not be able to recover it. If you are sure, click Delete Account." },
  deleteBtn: { ar: "امسح حسابي ", en: "Delete account" },
};

const AccountInformationContent = () => {
  const { currentLanguage } = useLanguage();
  const { isAuthenticated } = useProfile();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    email: "",
    phone: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [showModalEditAccount, setShowModalEditAccount] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+966 555 555 555");
  const [password, setPassword] = useState(false);
  const [opacity, setOpacity] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  useEffect(() => {
    if (!isAuthenticated()) navigate("/");
  }, [isAuthenticated, navigate]);



  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    const fetchAccountInfo = async () => {
      try {
        const response = await ProfileAPI.getProfile();
        if (response.success && response.data) {
          setProfileData({
            email: response.data.email || "name@example.com",
            phone: response.data.phone || "+966 555 555 555",
            image: response.data.photo || "",
          });
        } else {
          toast.error(translations.fetchError[currentLanguage]);
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        } else {
          toast.error(translations.fetchError[currentLanguage]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, [currentLanguage, isAuthenticated, navigate]);

  const handlePhoneNumberChange = (isValid, value) => {
    setPhoneNumber(String(value));
  };

  const buttonShowEditModal = () => setShowModalEditAccount(true);
  const hideModalEditInfoAccount = () => setShowModalEditAccount(false);

  // change pasword api 
  const handleChangePassword = async (values) => {
    setIsLoading(true);
    try {
      const response = await AuthAPI.changePassword(values);
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    current_password: Yup.string().required("هذا الحقل مطلوب"),
    password: Yup.string()
      .min(6, "كلمة السر قصيرة")
      .required("هذا الحقل مطلوب"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "كلمة السر غير متطابقة")
      .required("هذا الحقل مطلوب"),
  });

  if (loading) {
    return (
      <div className="loading-text">
        {translations.loading[currentLanguage]}
      </div>
    );
  }

  return (
    <>
      <ModalEditInfoAccount
        showModalEditInfoAccount={showModalEditAccount}
        hideModalEditInfoAccount={hideModalEditInfoAccount}
        initialValue={profileData.email}
      />
      <div className="account-information-content">
        <h2 className="title title-info-top-account pb-3">
          {translations.accountInfo[currentLanguage]}
        </h2>
        <form>
          {/* Email Field */}
          <div className="mb-3 form-input-one-control">
            <label htmlFor="emailFormControlInput1" className="form-label">
              {translations.email[currentLanguage]}
            </label>
            <div className="input-control position-relative">
              <input
                type="email"
                className="form-control"
                id="emailFormControlInput1"
                placeholder="name@example.com"
                value={profileData.email}
                readOnly
              />
              <div className="icon-edit-input" onClick={buttonShowEditModal}>
                <EditIconUser />
              </div>
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="mb-3 form-input-one-control">
            <label htmlFor="phoneControlInput1" className="form-label">
              {translations.phone[currentLanguage]}
            </label>
            <div className="input-control input-number-tel position-relative">
              <IntlTelInput
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                defaultCountry="sa"
                value={profileData.phone}
                placeholder={translations.phone[currentLanguage]}
                onPhoneNumberChange={handlePhoneNumberChange}
                separateDialCode
              />
            </div>
          </div>



          {/* Profile Photo (optional)
          <div className="mb-3">
            <label htmlFor="profilePhoto" className="form-label">
              {translations.profilePhoto[currentLanguage]}
            </label>
            <div>
              <img
                src={profileData.image || imgProfile}
                alt="User Profile"
                className="profile-photo"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </div>
          </div> */}
        </form>
        {!password ? (
          <>
            <div className="personal-information-content border-account-user p-4 row m-0 justify-content-between align-items-center space-2">
              <div className="col-9">
                <p className="b-5 pb-1">{translations.password[currentLanguage]}</p>
                <p className="b-12 text-gray">{translations.choosePassword[currentLanguage]}</p>
              </div>
              <button
                className="btn-second btn-main p-2 col-1 min-w-max b-11 py-3"
                style={{ border: "1px solid var(--primary)", width: "fit-content" }}
                onClick={() => setPassword(!password)}
                type="button"
              >
                {translations.makePassword[currentLanguage]}
              </button>
            </div>
          </>
        ) : <>

          <FormField
            initialValues={initialValues}
            onSubmit={handleChangePassword}
            validationSchema={validationSchema}
            id="edit-profile-form"
          >
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex flex-column align-items-center p-4 form-container align-items-start gap-4 w-50">

                <div className="w-100 d-flex flex-column justify-content-between flex-wrap gap-1">
                  <label className="b-11 me-3 pb-2" style={{ minWidth: "150px" }}>
                    الرقم السري الحالي <span>*</span>
                  </label>
                  <InputFiled
                    name="current_password"
                    type={"password"}
                    placeholder={" • • • • • • • •"}
                    success
                  />
                </div>

                <div className="w-100 d-flex flex-column justify-content-between flex-wrap gap-1">
                  <label className="b-11 me-3 pb-2" style={{ minWidth: "150px" }}>
                    الرقم السري الجديد <span>*</span>
                  </label>
                  <InputFiled
                    name="password"
                    type={"password"}
                    placeholder={" • • • • • • • •"}
                    success
                  />
                </div>

                <div className="w-100 d-flex flex-column justify-content-between flex-wrap gap-1 mb-3">
                  <label className="b-11 me-3" style={{ minWidth: "150px" }}>
                    تأكيد الرقم السري الجديد <span>*</span>
                  </label>
                  <InputFiled
                    name="password_confirmation"
                    type={"password"}
                    placeholder={" • • • • • • • •"}
                    success
                  />
                </div>

                <button
                  type="submit"
                  className="btn-main btn-submit w-100 b-11 p-3 d-flex justify-content-center align-items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2 text-white" role="status" />
                      {currentLanguage === "ar" ? "جاري تغيير كلمة المرور..." : "Changing Password..."}
                    </>
                  ) : (
                    "تغيير كلمة السر"
                  )}
                </button>
              </div>
            </div>
          </FormField>
        </>}
      </div>
    </>
  );
};

export default AccountInformationContent;
