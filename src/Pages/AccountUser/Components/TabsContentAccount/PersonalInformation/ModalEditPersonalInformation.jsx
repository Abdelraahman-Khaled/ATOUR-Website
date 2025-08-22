import CustomModal from "Components/CustomModal/CustomModal";
import { useEffect, useRef, useState } from "react";
import image_1 from "../../../../../assets/images/users/user.png";
import EditIconUser from "assets/images/AccountUser/EditIconUser";
import InputField from "Components/Forms/InputField";
import FormField from "Components/Forms/FormFiled";
import { toast } from "react-toastify";
import { useProfile } from "context/ProfileContext";

const ModalEditPersonalInformation = ({
  showModalEditInformation,
  hideModalEditInformation,
  onSubmitProfileUpdate,
  initialProfile,
  currentLanguage, // Inject current language
  setRefresh, // Function to trigger refresh
}) => {

  const [image, setImage] = useState(initialProfile?.image || image_1);
  const [name, setName] = useState(initialProfile?.name || "");
  const [nationality, setNationality] = useState(initialProfile?.nationality || "");

  const translations = {
    name: { ar: "الإسم", en: "Name" },
    nationality: { ar: "الجنسية", en: "Nationality" },
    save: { ar: " حفظ", en: "Save" },
    saveData: { ar: " جاري الحفظ", en: "Saving data..." },
    editTitle: { ar: "تعديل المعلومات الشخصية", en: "Edit Personal Information" },
    enterName: { ar: "أدخل اسمك", en: "Enter your name" },
    enterNationality: { ar: "ادخل جنسيتك", en: "Enter your Nationality" },
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {


      onSubmitProfileUpdate({
        name: values.name,
        nationality: values.nationality,
        image: image !== image_1 ? fileInputRef.current.files[0] : null,
      });

      toast.success(translations.saveData[currentLanguage]);
      hideModalEditInformation();
      setRefresh(prev => !prev); // toggle instead of just true
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء التحديث");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <CustomModal
      show={showModalEditInformation}
      onHide={hideModalEditInformation}
      title={translations.editTitle[currentLanguage]}
      newClass={"modal-edit-information"}
    >
      <div className="all-content-edit-info">
        <div className="image-user-edit position-relative overlay-bg">
          <img src={image} alt="User" className="image-edit" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button
            className="edit-btn--1"
            onClick={() => fileInputRef.current.click()}
          >
            <EditIconUser />
          </button>
        </div>

        <div className="form-edit-content">
          <FormField
            initialValues={{ name, nationality }}
            onSubmit={handleSubmit}
          >
            <div className="row g-3">
              <div className="col-6">
                <InputField
                  label={translations.name[currentLanguage]}
                  name="name"
                  type="text"
                  placeholder={translations.enterName[currentLanguage]}
                  value={name}
                  success
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-6">
                <InputField
                  label={translations.nationality[currentLanguage]}
                  name="nationality"
                  type="text"
                  placeholder={translations.enterNationality[currentLanguage]}
                  value={nationality}
                  success
                  onChange={(e) => setNationality(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn-main btn-save mt-5 btn-height">
                {translations.save[currentLanguage]}
              </button>
            </div>
          </FormField>
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalEditPersonalInformation;

