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
import imgProfile from "../../../../../assets/images/defaultImg/default-profile.jpg"

const AccountInformationContent = () => {
  const { currentLanguage } = useLanguage(); // Get current language
  const { isAuthenticated } = useProfile(); // Get authentication status
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    email: "",
    phone: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [showModalEditAccount, setShowModalEditAccount] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+966 555 555 555");

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const translations = {
    accountInfo: { ar: "معلومات الحساب", en: "Account Information" },
    email: { ar: "البريد الإلكتروني", en: "Email Address" },
    phone: { ar: "رقم الهاتف", en: "Phone Number" },
    profilePhoto: { ar: "الصورة الشخصية", en: "Profile Photo" },
    loading: {
      ar: "جارٍ تحميل معلومات الحساب...",
      en: "Loading account information...",
    },
    fetchError: {
      ar: "حدث خطأ أثناء تحميل معلومات الحساب.",
      en: "An error occurred while fetching account information.",
    },
  };

  // Fetch account information
  useEffect(() => {
    // Don't fetch if not authenticated
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
        // Check if this is an authentication error
        if (error.response && error.response.status === 401) {
          // Redirect to home page if unauthorized
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

  const buttonShowEditModal = () => {
    setShowModalEditAccount(true);
  };

  const hideModalEditInfoAccount = () => {
    setShowModalEditAccount(false);
  };

  if (loading) {
    return <div className="loading-text">{translations.loading[currentLanguage]}</div>;
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
                <div className="icon-edit-input">
                  <EditIconUser />
                </div>
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
              {/* <div className="icon-edit-input">
                <EditIconUser />
              </div> */}
            </div>
          </div>

          {/* Profile Photo */}
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
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountInformationContent;
