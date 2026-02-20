// @ts-nocheck
import React, { useState, useEffect } from "react";
import EditIconUser from "assets/images/AccountUser/EditIconUser";
import "./AccountInfo.css";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import ModalEditInfoAccount from "./ModalEditInfoAccount";
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
  title: {
    en: "Account Security",
    ar: "أمان الحساب",
    fr: "Sécurité du compte",
    de: "Kontosicherheit",
    es: "Seguridad de la cuenta",
    tr: "Hesap Güvenliği",
    ru: "Безопасность аккаунта",
    zh: "账户安全",
    ko: "계정 보안",
    pt: "Segurança da conta",
    ur: "اکاؤنٹ کی حفاظت",
    ja: "アカウントのセキュリティ",
  },
  password: {
    en: "Password",
    ar: "كلمة السر",
    fr: "Mot de passe",
    de: "Passwort",
    es: "Contraseña",
    tr: "Şifre",
    ru: "Пароль",
    zh: "密码",
    ko: "비밀번호",
    pt: "Senha",
    ur: "پاس ورڈ",
    ja: "パスワード",
  },
  choosePassword: {
    en: "Choose a strong password to keep your account safe.",
    ar: "اختار كلمة سر قوية عشان تحمي حسابك.",
    fr: "Choisissez un mot de passe fort pour sécuriser votre compte.",
    de: "Wählen Sie ein starkes Passwort, um Ihr Konto zu schützen.",
    es: "Elige una contraseña segura para mantener tu cuenta protegida.",
    tr: "Hesabınızı güvende tutmak için güçlü bir şifre seçin.",
    ru: "Выберите надежный пароль, чтобы защитить свою учетную запись.",
    zh: "选择一个强密码以确保您的账户安全。",
    ko: "계정을 안전하게 유지하려면 강력한 비밀번호를 선택하세요.",
    pt: "Escolha uma senha forte para manter sua conta segura.",
    ur: "اپنے اکاؤنٹ کو محفوظ رکھنے کے لیے ایک مضبوط پاس ورڈ منتخب کریں۔",
    ja: "アカウントを安全に保つために強力なパスワードを選択してください。",
  },
  makePassword: {
    en: "Change Password",
    ar: "تغير كلمة السر",
    fr: "Changer le mot de passe",
    de: "Passwort ändern",
    es: "Cambiar la contraseña",
    tr: "Şifreyi değiştir",
    ru: "Изменить пароль",
    zh: "更改密码",
    ko: "비밀번호 변경",
    pt: "Alterar senha",
    ur: "پاس ورڈ تبدیل کریں",
    ja: "パスワードを変更",
  },
  currentPassword: {
    en: "Current Password",
    ar: "الرقم السري الحالي",
    fr: "Mot de passe actuel",
    de: "Aktuelles Passwort",
    es: "Contraseña actual",
    tr: "Mevcut şifre",
    ru: "Текущий пароль",
    zh: "当前密码",
    ko: "현재 비밀번호",
    pt: "Senha atual",
    ur: "موجودہ پاس ورڈ",
    ja: "現在のパスワード",
  },
  newPassword: {
    en: "New Password",
    ar: "الرقم السري الجديد",
    fr: "Nouveau mot de passe",
    de: "Neues Passwort",
    es: "Nueva contraseña",
    tr: "Yeni şifre",
    ru: "Новый пароль",
    zh: "新密码",
    ko: "새 비밀번호",
    pt: "Nova senha",
    ur: "نیا پاس ورڈ",
    ja: "新しいパスワード",
  },
  confirmNewPassword: {
    en: "Confirm New Password",
    ar: "تأكيد الرقم السري الجديد",
    fr: "Confirmer le nouveau mot de passe",
    de: "Neues Passwort bestätigen",
    es: "Confirmar nueva contraseña",
    tr: "Yeni şifreyi onayla",
    ru: "Подтвердите новый пароль",
    zh: "确认新密码",
    ko: "새 비밀번호 확인",
    pt: "Confirmar nova senha",
    ur: "نیا پاس ورڈ کی تصدیق کریں",
    ja: "新しいパスワードを確認",
  },
  changingPassword: {
    en: "Changing Password...",
    ar: "جاري تغيير كلمة المرور...",
    fr: "Changement du mot de passe...",
    de: "Passwort wird geändert...",
    es: "Cambiando la contraseña...",
    tr: "Şifre değiştiriliyor...",
    ru: "Изменение пароля...",
    zh: "正在更改密码...",
    ko: "비밀번호 변경 중...",
    pt: "Alterando senha...",
    ur: "پاس ورڈ تبدیل کیا جا رہا ہے...",
    ja: "パスワードを変更しています...",
  },
  changePasswordBtn: {
    en: "Change Password",
    ar: "تغيير كلمة السر",
    fr: "Changer le mot de passe",
    de: "Passwort ändern",
    es: "Cambiar la contraseña",
    tr: "Şifreyi değiştir",
    ru: "Изменить пароль",
    zh: "更改密码",
    ko: "비밀번호 변경",
    pt: "Alterar senha",
    ur: "پاس ورڈ تبدیل کریں",
    ja: "パスワードを変更",
  },
};
const validationMessages = {
  required: {
    en: "This field is required",
    ar: "هذا الحقل مطلوب",
    fr: "Ce champ est requis",
    de: "Dieses Feld ist erforderlich",
    es: "Este campo es obligatorio",
    tr: "Bu alan gereklidir",
    ru: "Это поле обязательно для заполнения",
    zh: "此字段为必填项",
    ko: "이 필드는 필수입니다",
    pt: "Este campo é obrigatório",
    ur: "یہ خانہ ضروری ہے",
    ja: "このフィールドは必須です",
  },
  shortPassword: {
    en: "Password is too short",
    ar: "كلمة السر قصيرة",
    fr: "Le mot de passe est trop court",
    de: "Das Passwort ist zu kurz",
    es: "La contraseña es demasiado corta",
    tr: "Şifre çok kısa",
    ru: "Пароль слишком короткий",
    zh: "密码太短",
    ko: "비밀번호가 너무 짧습니다",
    pt: "A senha é muito curta",
    ur: "پاس ورڈ بہت چھوٹا ہے",
    ja: "パスワードが短すぎます",
  },
  mismatch: {
    en: "Passwords do not match",
    ar: "كلمة السر غير متطابقة",
    fr: "Les mots de passe ne correspondent pas",
    de: "Passwörter stimmen nicht überein",
    es: "Las contraseñas no coinciden",
    tr: "Şifreler eşleşmiyor",
    ru: "Пароли не совпадают",
    zh: "密码不匹配",
    ko: "비밀번호가 일치하지 않습니다",
    pt: "As senhas não correspondem",
    ur: "پاس ورڈز مماثل نہیں ہیں",
    ja: "パスワードが一致しません",
  },
};


const AccountInformationContent = () => {
  const { currentLanguage } = useLanguage();
  const { profile, isAuthenticated } = useProfile();
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
    if (profile) {
      setProfileData({
        email: profile.email || "name@example.com",
        phone: profile.phone || "+966 555 555 555",
        image: profile.photo || "",
      });
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [profile, currentLanguage]);

  const handlePhoneNumberChange = (isValid, value) => {
    setPhoneNumber(String(value));
  };

  const buttonShowEditModal = () => setShowModalEditAccount(true);
  const hideModalEditInfoAccount = () => setShowModalEditAccount(false);

  // change pasword api 
  const handleChangePassword = async (values) => {
    setIsLoading(true);
    try {
      await AuthAPI.changePassword(
        values.current_password,
        values.password,
        values.password_confirmation
      );
      // Logout and redirect
      await AuthAPI.logout();
      window.dispatchEvent(new Event("storage")); // Trigger storage event to update auth state
      navigate("/"); // Redirect to home or login
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = () =>
    Yup.object({
      current_password: Yup.string().required(validationMessages.required[currentLanguage]),
      password: Yup.string()
        .min(6, validationMessages.shortPassword[currentLanguage])
        .required(validationMessages.required[currentLanguage]),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], validationMessages.mismatch[currentLanguage])
        .required(validationMessages.required[currentLanguage]),
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
      <div className="account-information-content ">
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
          {/* <div className="mb-3 form-input-one-control">
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
          </div> */}



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
            <div className="personal-information-content border rounded-2 d-flex gap-2 p-4 row m-0 justify-content-between align-items-center space-2">
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
                    {translations.currentPassword[currentLanguage]} <span className="error">*</span>
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
                    {translations.newPassword[currentLanguage]} <span className="error">*</span>
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
                    {translations.confirmNewPassword[currentLanguage]} <span className="error">*</span>
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
                      {translations.changingPassword[currentLanguage]}
                    </>
                  ) : (
                    translations.changePasswordBtn[currentLanguage]
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
