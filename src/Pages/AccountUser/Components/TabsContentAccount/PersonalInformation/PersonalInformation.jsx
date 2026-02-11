import React, { useEffect, useState } from "react";
import FormField from "Components/Forms/FormFiled";
import InputField from "Components/Forms/InputField";
import ProfileAPI from "api/profileApi";
import { toast } from "react-toastify";
import ModalEditPersonalInformation from "./ModalEditPersonalInformation";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useProfile } from "context/ProfileContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import translations from "./translations";
import Loader from "Components/Auth/Components/Loader/Loader";
const PersonalInformation = () => {
  const { profile, setProfile, isAuthenticated } = useProfile();
  const navigate = useNavigate();

  const { currentLanguage } = useLanguage(); // Get the current language
  const [refresh, setRefresh] = useState(false); // State to trigger refresh
  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
    birthdate: "",
    gender: "",
    image: "",
    nationality_id: 0, // ✅ store the id
    phone: "",
  });

  const validation = Yup.object().shape({
    name: Yup.string(),
    nationality: Yup.string(),
    birthdate: Yup.string(),
    gender: Yup.string(),
    image: Yup.string()
  })
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const showEditInfoButton = () => {
    setShowEditModal(true);
  };

  const hideEditInfoButton = () => {
    setShowEditModal(false);
  };

  // Sync profile data from context to local state
  useEffect(() => {
    if (profile) {
      const nationality =
        profile?.nationality?.translations?.find(
          (item) => item.locale === currentLanguage
        )?.name || translations.notAvailable[currentLanguage];

      setFormData({
        name: profile.name || translations.notAvailable[currentLanguage],
        nationality: nationality || translations.notAvailable[currentLanguage],
        nationality_id: profile.nationality_id || 0,
        birthdate: profile.birthdate || null,
        gender: profile.gender || null,
        image: profile.photo,
        phone: profile.phone || translations.notAvailable[currentLanguage],
      });
      setLoading(false);
    }
  }, [profile, currentLanguage]);

  // Handle profile update
  const handleProfileUpdate = async (updatedProfile) => {

    try {
      const response = await ProfileAPI.updateProfile(
        updatedProfile.name,
        updatedProfile.image,
        updatedProfile.nationality_id,
        updatedProfile.phone,
        updatedProfile.birthdate,
        updatedProfile.gender,
      );

      if (response.success) {
        // Update the profile state with the new data
        setFormData((prev) => ({
          ...prev,
          name: updatedProfile.name,
          image: updatedProfile.image,
          nationality: updatedProfile.nationality, // ✅ now will have translated name
          nationality_id: updatedProfile.nationality_id,
          phone: updatedProfile.phone,
          birthdate: updatedProfile.birthdate,
          gender: updatedProfile.gender,
        }));

        // update localstorage data
        const userData = JSON.parse(localStorage.getItem("user"));
        // Update the user object with the new name and image
        const updatedUser = {
          ...userData,
          name: updatedProfile.name,
          birthdate: updatedProfile.birthdate,
          gender: updatedProfile.gender,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Update profile in context (which updates cache)
        setProfile({ ...profile, ...updatedProfile });

        toast.success(translations.profileUpdateSuccess[currentLanguage]);
        hideEditInfoButton(); // Close the modal
      } else {
        toast.error(translations.profileUpdateFailed[currentLanguage]);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(translations.profileUpdateError[currentLanguage]);
    }
  };
  if (loading) {
    return <div style={{ margin: "200px 0px" }}>  <Loader /> </div>;
  }

  return (
    <>
      <ModalEditPersonalInformation
        key={formData.name + refresh}   // أو أي مفتاح unique يتغير مع البيانات
        showModalEditInformation={showEditModal}
        hideModalEditInformation={hideEditInfoButton}
        onSubmitProfileUpdate={handleProfileUpdate} // Pass the update handler
        initialProfile={formData}
        currentLanguage={currentLanguage} // Pass language
        setRefresh={setRefresh} // Pass setRefresh to trigger refresh
        validationSchema={validation} // Pass validation schema to fix lint error
      />
      <div className="personal-information-content">
        <h2 className="title title-info-top-account pb-1">
          {translations.name[currentLanguage]}
        </h2>

        <FormField
          key={refresh ? "refresh-1" : "refresh-0"}
          initialValues={formData}
          validationSchema={validation}
          onSubmit={() => { }}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <InputField
                label={translations.name[currentLanguage]}
                name="name"
                type="text"
                placeholder={translations.name[currentLanguage]}
                value={formData.name}
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
                value={formData.nationality}
                success
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField
                label={translations.phone[currentLanguage]}
                name="phone"
                type="text"
                placeholder={translations.phone[currentLanguage]}
                value={formData.phone}
                success
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField
                label={translations.birthdate[currentLanguage]}
                name="birthdate"
                type="text"
                placeholder={translations.birthdate[currentLanguage]}
                value={formData.birthdate || translations.notAvailable[currentLanguage]}
                success
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField
                label={translations.gender[currentLanguage]}
                name="gender"
                type="text"
                placeholder={translations.gender[currentLanguage]}
                value={formData.gender || translations.notAvailable[currentLanguage]}
                success
                readOnly
              />
            </div>
          </div>
        </FormField>

        {/* <div className="interested-content mt-3">
          <h2 className="title title-info-top-account py-3">
            {translations.interests[currentLanguage]}
          </h2>
          <div className="buttons-inter change-scroll d-flex align-items-center gap-3">
            <button className="main-btn-filter">{translations.trips[currentLanguage]}</button>
            <button className="main-btn-filter">
              {translations.souvenirs[currentLanguage]}
            </button>
            <button className="main-btn-filter">
              {translations.events[currentLanguage]}
            </button>
          </div>
        </div> */}

        <button onClick={showEditInfoButton} className="btn-main mt-5 edit-information-btn">
          {translations.edit[currentLanguage]}
        </button>
      </div>
    </>
  );
};

export default PersonalInformation;