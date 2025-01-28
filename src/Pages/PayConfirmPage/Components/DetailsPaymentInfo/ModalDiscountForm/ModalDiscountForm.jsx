import CustomModal from "Components/CustomModal/CustomModal";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import "./ModalDiscountForm.css";
import { toast } from "react-toastify";

const ModalDiscountForm = ({
  showModalDiscountForm,
  hideModalDiscountForm
}) => {
  const validationSchema = Yup.object().shape({
    discountCode: Yup.string()
      .required("كود الخصم مطلوب")
      .matches(/^[a-zA-Z0-9]*$/, "يجب أن يحتوي كود الخصم على أحرف أو أرقام فقط")
  });

  const initialValues = {
    discountCode: ""
  };
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    if (values) {
      hideModalDiscountForm();
      toast.success("تم تفعيل الكود بنجاح.");
    }
  };

  return (
    <CustomModal
      show={showModalDiscountForm}
      onHide={hideModalDiscountForm}
      title={"كود الخصم"}
      newClass={"modal-discount-info"}
    >
      {/* ================= START ALL FORM MODAL DISOCUNT ================ */}
      <div className="all-modal-form-discount">
        <h2 className="title">من فضلك , قم بإدخال كود الخصم</h2>
        <div className="form-discount">
          {/* ========== START FORM FIELD ========= */}
          <FormField
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <InputFiled
              label="كود الخصم"
              name="discountCode"
              type="text"
              placeholder="كود الخصم"
              success
            />
            <button className="btn-main w-100 mt-3">تفعيل</button>
          </FormField>
          {/* ========== END FORM FIELD ========= */}
        </div>
      </div>
      {/* ================= END ALL FORM MODAL DISOCUNT ================ */}
    </CustomModal>
  );
};

export default ModalDiscountForm;
