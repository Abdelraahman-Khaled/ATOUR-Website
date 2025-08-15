import React, { useEffect, useState } from "react";
import FormField from "Components/Forms/FormFiled";
import InputField from "Components/Forms/InputField";
import ProfileAPI from "api/profileApi";
import { toast } from "react-toastify";
import ModalEditPersonalInformation from "./ModalEditPersonalInformation";
import { useLanguage } from "Components/Languages/LanguageContext";

const PersonalInformation = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [profile, setProfile] = useState({
    name: "",
    nationality: "",
    dateOfBirth: "",
    userType: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const showEditInfoButton = () => {
    setShowEditModal(true);
  };

  const hideEditInfoButton = () => {
    setShowEditModal(false);
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ProfileAPI.getProfile();
        if (response.success && response.data) {
          const profileData = response.data;
          setProfile({
            name: profileData.name || translations.notAvailable[currentLanguage],
            nationality:
              profileData.nationality || translations.notAvailable[currentLanguage],
            dateOfBirth:
              profileData.birthdate || translations.notAvailable[currentLanguage],
            userType: profileData.gender || translations.notAvailable[currentLanguage],
            image: profileData.photo,
          });
        } else {
          toast.error(translations.fetchError[currentLanguage]);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error(translations.fetchError[currentLanguage]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentLanguage]);

  // Handle profile update
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const response = await ProfileAPI.updateProfile(
        updatedProfile.name,
        updatedProfile.image
      );
      if (response.success) {
        // Update the profile state with the new data
        setProfile((prev) => ({
          ...prev,
          name: updatedProfile.name,
          image: updatedProfile.image,
        }));
        // update localstorage data
        const userData = JSON.parse(localStorage.getItem("user"));
        // Update the user object with the new name and image
        const updatedUser = {
          ...userData,
          name: updatedProfile.name,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success(
          currentLanguage === "ar"
            ? "تم تحديث البيانات الشخصية بنجاح."
            : "Profile updated successfully."
        );
        hideEditInfoButton(); // Close the modal
      } else {
        toast.error(
          currentLanguage === "ar"
            ? "فشل تحديث البيانات الشخصية."
            : "Failed to update profile."
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        currentLanguage === "ar"
          ? "حدث خطأ أثناء تحديث البيانات الشخصية."
          : "An error occurred while updating the profile."
      );
    }
  };

  const translations = {
    name: { ar: "الإسم", en: "Name" },
    nationality: { ar: "الجنسية", en: "Nationality" },
    dateOfBirth: { ar: "تاريخ الميلاد", en: "Date of Birth" },
    userType: { ar: "الجنس", en: "Gender" },
    notAvailable: { ar: "غير متوفر", en: "Not Available" },
    fetchError: {
      ar: "حدث خطأ أثناء تحميل البيانات الشخصية.",
      en: "An error occurred while fetching personal data.",
    },
    edit: { ar: "تعديل", en: "Edit" },
    interests: { ar: "الإهتمامات", en: "Interests" },
    sea: { ar: "البحر", en: "Sea" },
    culture: { ar: "الثقافة", en: "Culture" },
    nature: { ar: "الطبيعة", en: "Nature" },
    adventure: { ar: "المغامرات", en: "Adventure" },
  };

  if (loading) {
    return <div className="loading-text">{translations.fetchError[currentLanguage]}</div>;
  }

  return (
    <>
      <ModalEditPersonalInformation
        showModalEditInformation={showEditModal}
        hideModalEditInformation={hideEditInfoButton}
        onSubmitProfileUpdate={handleProfileUpdate} // Pass the update handler
        initialProfile={profile}
        currentLanguage={currentLanguage} // Pass language
      />
      <div className="personal-information-content">
        <h2 className="title title-info-top-account pb-1">
          {translations.name[currentLanguage]}
        </h2>

        <FormField initialValues={profile} onSubmit={() => { }}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <InputField
                label={translations.name[currentLanguage]}
                name="name"
                type="text"
                placeholder={translations.name[currentLanguage]}
                value={profile.name}
                success
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField
                label={translations.nationality[currentLanguage]}
                name="nationality"
                type="text"
                placeholder={translations.nationality[currentLanguage]}
                value={profile.nationality}
                success
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField
                label={translations.dateOfBirth[currentLanguage]}
                name="dateOfBirth"
                type="text"
                placeholder={translations.dateOfBirth[currentLanguage]}
                value={profile.dateOfBirth}
                success
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField
                label={translations.userType[currentLanguage]}
                name="userType"
                type="text"
                placeholder={translations.userType[currentLanguage]}
                value={profile.userType}
                success
                readOnly
              />
            </div>
          </div>
        </FormField>

        <div className="interested-content mt-3">
          <h2 className="title title-info-top-account py-3">
            {translations.interests[currentLanguage]}
          </h2>
          <div className="buttons-inter change-scroll d-flex align-items-center gap-3">
            <button className="main-btn-filter">{translations.sea[currentLanguage]}</button>
            <button className="main-btn-filter">
              {translations.culture[currentLanguage]}
            </button>
            <button className="main-btn-filter">
              {translations.nature[currentLanguage]}
            </button>
            <button className="main-btn-filter">
              {translations.adventure[currentLanguage]}
            </button>
          </div>
        </div>

        <button onClick={showEditInfoButton} className="btn-main mt-5 edit-information-btn">
          {translations.edit[currentLanguage]}
        </button>
      </div>
    </>
  );
};

export default PersonalInformation;