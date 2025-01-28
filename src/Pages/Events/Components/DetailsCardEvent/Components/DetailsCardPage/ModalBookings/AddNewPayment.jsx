import CustomModal from "Components/CustomModal/CustomModal";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";
import LoaderSvg from "assets/Icons/LoaderSvg";
import React, { useState } from "react";
import * as Yup from "yup";

const AddNewPayment = ({ showModalAddNewPayment, hideModalAddNewPayment }) => {
  const validationSchema = Yup.object().shape({
    creditCardNumber: Yup.string()
      .required("ادخل رقم بطاقة الائتمان")
      .matches(/^\d{16}$/, "رقم بطاقة ائتمان غير صحيح"),
    name: Yup.string().required("ادخل الاسم"),
    expirationDate: Yup.string()
      .required("ادخل تاريخ انتهاء الصلاحية")
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
        "تاريخ انتهاء الصلاحية غير صحيح"
      ),
    cvv: Yup.string()
      .required("ادخل رمز CVV")
      .matches(/^\d{3,4}$/, "رمز CVV غير صحيح")
  });

  const initialValues = {
    creditCardNumber: "",
    name: "",
    expirationDate: "",
    cvv: ""
  };

  //   MODAL CONFIRM SUCCESS
  const [showModalConfirmSucces, setShowModalConfirmSucces] = useState(false);

  const hideModalConfirmSucces = () => {
    setShowModalConfirmSucces(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    if (values) {
      setShowModalConfirmSucces(true);
      hideModalAddNewPayment();
    }
  };

  //   BUTTON CONFIRM PAYMENT
  const [isActiveButton, setIsActiveButton] = useState(false);
  const handleBookingButtonClick = () => {
    setIsActiveButton(true);
    setTimeout(() => {
      setIsActiveButton(false);
    }, 800);
  };

  return (
    <>
      <SuccessSend
        showsuccessModalSend={showModalConfirmSucces}
        hideSuccessModalSend={hideModalConfirmSucces}
        titleModal={"تاكيد الدفع"}
        titleSend={"تم الدفع بنجاح!"}
        isTrueText={true}
        textSend={"لقد تم الدفع بنجاح يمكنك متابعة الطلب من هنا"}
        textButton={"تم"}
      />
      <CustomModal
        show={showModalAddNewPayment}
        onHide={hideModalAddNewPayment}
        title={"إضافة وسيلة دفع جديدة"}
        newClass={"add-new-payment"}
      >
        <div className="main-payment-bookings">
          <FormField
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <div className="row gx-3">
              {/* ============ START COL ============= */}
              <div className="col-12 col-md-6">
                <InputFiled
                  label="رقم البطاقة"
                  name="creditCardNumber"
                  type="text"
                  placeholder="رقم البطاقة"
                  success
                />
              </div>
              {/* ============ END COL ============= */}
              {/* ============ START COL ============= */}
              <div className="col-12 col-md-6">
                <InputFiled
                  label="الإسم على البطاقة (إختياري)"
                  name="name"
                  type="text"
                  placeholder="الإسم على البطاقة (إختياري)"
                  success
                />
              </div>
              {/* ============ END COL ============= */}
              {/* ============ START COL ============= */}
              <div className="col-12 col-md-6">
                <InputFiled
                  label="تاريخ إنتهاء البطاقة"
                  name="expirationDate"
                  type="text"
                  placeholder="MM/YYYY"
                  success
                />
              </div>
              {/* ============ END COL ============= */}
              {/* ============ START COL ============= */}
              <div className="col-12 col-md-6">
                <InputFiled
                  label="رمز CVV"
                  name="cvv"
                  type="text"
                  placeholder="رمز CVV"
                  success
                />
              </div>
              {/* ============ END COL ============= */}
            </div>

            <div className="form-check mt-3  d-flex  align-items-center  gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="defaultCheck1"
              />
              <label
                className="form-check-label cursor-pointer-event"
                htmlFor="defaultCheck1"
              >
                حفظ البطاقة
              </label>
            </div>
            {/* ============ START BOTTOM PAY CONTENT ========== */}
            <div className="bottom-pay-content d-flex  justify-content-between  align-items-center  flex-wrap  gap-3 pt-3 border-top mt-4">
              <div className="info-right-content">
                الإجمالي : <span className="fw-bold">750</span> ريال سعودي
              </div>
              <button
                onClick={handleBookingButtonClick}
                className="btn-main btn-height"
              >
                {!isActiveButton ? (
                  "تأكيد ودفع"
                ) : (
                  <>
                    <LoaderSvg />
                  </>
                )}
              </button>
            </div>
            {/* ============ END BOTTOM PAY CONTENT ========== */}
          </FormField>
        </div>
      </CustomModal>
    </>
  );
};

export default AddNewPayment;
