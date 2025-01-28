import CustomModal from "Components/CustomModal/CustomModal";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import TextAreaInput from "Components/Forms/TextArea";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";
import { useState } from "react";
import * as Yup from "yup";

const SubmitTicketProblem = ({ showSubmitTicket, hideSubmitTicket }) => {
  const validationSchema = Yup.object().shape({
    titleProblem: Yup.string().required("يرجى إدخال عنوان المشكلة"),
    detailsProblem: Yup.string().required("يرجى إدخال التفاصيل")
  });

  const initialValues = {
    titleProblem: "",
    detailsProblem: ""
  };

  // SUCCESS SEND MODAL
  const [successSend, setSuccessSend] = useState(false);
  const successSendButton = () => {
    setSuccessSend(true);
    hideSubmitTicket();
  };
  const hidesuccessSendButton = () => {
    setSuccessSend(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    if (values) {
      hideSubmitTicket();
      successSendButton();
    }
  };

  return (
    <>
      <SuccessSend
        showsuccessModalSend={successSend}
        hideSuccessModalSend={hidesuccessSendButton}
        titleModal={"إرسال التذكرة"}
        titleSend={"تم إرسال التذكرة بنجاح!"}
        isTrueText={true}
        textSend={"لقد تم إرسال التذكرة بنجاح وسيتم التواصل معك في أقرب وقت"}
        textButton={"حجوزاتي"}
      />
      <CustomModal
        show={showSubmitTicket}
        onHide={hideSubmitTicket}
        title={"إرسال تذكرة"}
        newClass={"modal-sumbit-ticket"}
      >
        <div className="all-info-ticket-submit">
          <h2 className="title">هل تواجه أي مشكلة في الحجز ؟</h2>
          <p className="text">
            يمكنك إرسال تذكرة وسنقوم بالتواصل معك في أقرب وقت
          </p>
          <div className="form-sumbit-ticket">
            {/* ========== START FORM FIELD ========= */}
            <FormField
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <InputFiled
                label="عنوان المشكلة"
                name="titleProblem"
                type="text"
                placeholder="عنوان المشكلة"
                success
              />

              <TextAreaInput
                label={"التفاصيل"}
                name="detailsProblem"
                type="text"
                placeholder="التفاصيل"
                success
              />

              <button type="submit" className="btn-main btn-submit  mt-3">
                إرسال
              </button>
            </FormField>
            {/* ========== END FORM FIELD ========= */}
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default SubmitTicketProblem;
