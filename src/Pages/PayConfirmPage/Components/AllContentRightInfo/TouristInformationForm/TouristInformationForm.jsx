import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import "react-intl-tel-input/dist/components/utils.js";
import { useState } from "react";

const TouristInformationForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("الإسم مطلوب")
      .min(2, "يجب أن يكون الإسم على الأقل 2 أحرف"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب")
  });

  const initialValues = {
    name: "",
    email: ""
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handlePhoneNumberChange = (value, country) => {
    setPhoneNumber(value);
    setSelectedCountry(country.iso2);
  };

  return (
    <div className="tourist-information-form--1">
      {/* ========== START FORM FIELD ========= */}
      <FormField
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <InputFiled
          label="الإسم"
          name="name"
          type="text"
          placeholder="الإسم"
          success
        />
        <InputFiled
          label="البريد الإلكتروني"
          name="email"
          type="text"
          placeholder="البريد الإلكتروني"
          success
        />
        <div className="form-input-one-control">
          <label htmlFor="phoneControlInput_11" className="form-label">
            رقم الهاتف
          </label>
          <div className="input-control input-number-tel position-relative">
            <div>
              <IntlTelInput
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                defaultCountry="sa"
                defaultValue={phoneNumber}
                placeholder="رقم الهاتف"
                onChange={handlePhoneNumberChange}
                separateDialCode={true}
              />
            </div>
          </div>
        </div>
      </FormField>
      {/* ========== END FORM FIELD ========= */}
    </div>
  );
};

export default TouristInformationForm;
