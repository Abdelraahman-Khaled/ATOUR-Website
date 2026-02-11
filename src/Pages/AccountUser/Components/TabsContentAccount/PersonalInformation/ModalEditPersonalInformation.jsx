import CustomModal from "Components/CustomModal/CustomModal";
import { useEffect, useRef, useState } from "react";
import image_1 from "../../../../../assets/images/users/user.png";
import EditIconUser from "assets/images/AccountUser/EditIconUser";
import InputField from "Components/Forms/InputField";
import FormField from "Components/Forms/FormFiled";
import { toast } from "react-toastify";
import { useProfile } from "context/ProfileContext";
import translations from "./translations";
import ProfileAPI from "api/profileApi";
import SimpleDatePickerComponent from "Components/Ui/DatePickerComponent/SimpleDatePickerComponent";
const ModalEditPersonalInformation = ({
  showModalEditInformation,
  hideModalEditInformation,
  onSubmitProfileUpdate,
  initialProfile,
  currentLanguage, // Inject current language
  setRefresh, // Function to trigger refresh
  validationSchema, // Inject validation schema
}) => {


  const [image, setImage] = useState(initialProfile?.image || image_1);
  const [name, setName] = useState(initialProfile?.name || "");
  const [selectedNationalityId, setSelectedNationalityId] = useState(initialProfile?.nationality_id || null);
  const [phone, setPhone] = useState(initialProfile?.phone || "");

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return { year, month, day };
  };

  const formatDate = (dateObj) => {
    if (!dateObj) return "";
    const { year, month, day } = dateObj;
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  const [birthdate, setBirthdate] = useState(initialProfile?.birthdate ? parseDate(initialProfile.birthdate) : null);
  const [gender, setGender] = useState(initialProfile?.gender || null);
  const [nationalities, setNationalities] = useState([])

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
      const selectedNat = nationalities.find((nat) => nat.id === parseInt(selectedNationalityId));
      const formattedBirthdate = formatDate(birthdate);

      const profileUpdateEntities = {
        name: values.name,
        nationality_id: selectedNationalityId, // send id
        image: image !== image_1 ? fileInputRef.current.files[0] : null,
        nationality: selectedNat
          ? selectedNat.translations?.find((t) => t.locale === currentLanguage)?.name || selectedNat.name
          : initialProfile.nationality, // send readable name
        phone: values.phone,
        birthdate: formattedBirthdate,
        gender: gender,
      };

      console.log("Profile Update Entities:", profileUpdateEntities);

      onSubmitProfileUpdate(profileUpdateEntities);

      toast.success(translations.saveData[currentLanguage]);
      hideModalEditInformation();
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء التحديث");
    } finally {
      setSubmitting(false);
    }
  };


  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await ProfileAPI.getNationality();
        setNationalities(response.data);

      } catch (error) {
        console.error('Error fetching nationalities:', error);
        toast.error(translations.errorFetchingNationalities[currentLanguage]);
      }
    };

    fetchNationalities();
  }, [currentLanguage]);


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
            initialValues={{ name, selectedNationalityId, phone, birthdate, gender }}
            validationSchema={validationSchema}
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
              <div className="col-6 align-self-end d-flex flex-column">
                <label className="form-label">
                  {translations.nationality[currentLanguage]}
                </label>
                <select
                  className="form-control m-0"
                  name="nationality"
                  value={selectedNationalityId || ""}
                  onChange={(e) => setSelectedNationalityId(parseInt(e.target.value))}
                >
                  <option value="">
                    {initialProfile.nationality}
                  </option>
                  {nationalities.map((nat) => (
                    <option key={nat.id} value={nat.id}>
                      {
                        nat.translations?.find((t) => t.locale === currentLanguage)?.name ||
                        nat.name
                      }
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <InputField
                  label={translations.phone[currentLanguage]}
                  name="phone"
                  type="text"
                  placeholder={translations.phone[currentLanguage]}
                  value={phone}
                  success
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="col-6 align-self-end d-flex flex-column">
                <label className="form-label">
                  {translations.gender[currentLanguage]}
                </label>
                <select
                  className="form-control m-0"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">{translations.selectGender[currentLanguage]}</option>
                  <option value="male">{translations.male[currentLanguage]}</option>
                  <option value="female">{translations.female[currentLanguage]}</option>
                </select>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="birthdate">{translations.birthdate[currentLanguage]}</label>
                  <div className="main-add-place-date main-add-place-date--1 p-0 rounded-1 border mt-2">
                    <SimpleDatePickerComponent
                      value={birthdate}
                      onChange={setBirthdate}
                      addTextPlaceHolder={translations.enterBirthdate[currentLanguage]}
                    />
                  </div>
                </div>
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

