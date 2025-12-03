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
  const { setProfile, isAuthenticated } = useProfile();
  const navigate = useNavigate();

  const { currentLanguage } = useLanguage(); // Get the current language
  const [refresh, setRefresh] = useState(false); // State to trigger refresh
  const [profile, setProfiles] = useState({
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

  // Fetch profile data
  useEffect(() => {
    // Don't fetch if not authenticated
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await ProfileAPI.getProfile();

        if (response.success && response.data) {
          const profileData = response.data;
          const nationality =
            profileData?.nationality?.translations?.find(
              (item) => item.locale === currentLanguage
            )?.name || translations.notAvailable[currentLanguage];

          setProfiles({
            name: profileData.name || translations.notAvailable[currentLanguage],
            nationality: nationality || translations.notAvailable[currentLanguage],
            nationality_id: profileData.nationality_id || 0, // ✅ store the id
            birthdate: profileData.birthdate || null,
            gender: profileData.gender || null,
            image: profileData.photo,
            phone: profileData.phone || translations.notAvailable[currentLanguage],
          });
          setProfile(profileData); // Update the context with the fetched profile

        } else {
          toast.error(translations.fetchError[currentLanguage]);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // Check if this is an authentication error
        if (error.response && error.response.status === 401) {
          // Redirect to home page if unauthorized
        } else {
          toast.error(translations.fetchError[currentLanguage]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentLanguage, refresh, isAuthenticated, navigate]);

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
        setProfiles((prev) => ({
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
        setRefresh(prev => !prev);
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
        key={profile.name + refresh}   // أو أي مفتاح unique يتغير مع البيانات
        showModalEditInformation={showEditModal}
        hideModalEditInformation={hideEditInfoButton}
        onSubmitProfileUpdate={handleProfileUpdate} // Pass the update handler
        initialProfile={profile}
        currentLanguage={currentLanguage} // Pass language
        setRefresh={setRefresh} // Pass setRefresh to trigger refresh
      />
      <div className="personal-information-content">
        <h2 className="title title-info-top-account pb-1">
          {translations.name[currentLanguage]}
        </h2>

        <FormField
          key={refresh ? "refresh-1" : "refresh-0"}
          initialValues={profile}
          onSubmit={() => { }}>
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
                label={translations.phone[currentLanguage]}
                name="phone"
                type="text"
                placeholder={translations.phone[currentLanguage]}
                value={profile.phone}
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
                value={profile.birthdate || translations.notAvailable[currentLanguage]}
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
                value={profile.gender || translations.notAvailable[currentLanguage]}
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