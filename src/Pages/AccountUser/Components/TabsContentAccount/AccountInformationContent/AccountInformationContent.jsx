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
import { useNavigate } from "react-router-dom";
import imgProfile from "../../../../../assets/images/defaultImg/default-profile.jpg";

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

  useEffect(() => {
    if (!isAuthenticated()) navigate("/");
  }, [isAuthenticated, navigate]);

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
  };

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
      </div>
    </>
  );
};

export default AccountInformationContent;
