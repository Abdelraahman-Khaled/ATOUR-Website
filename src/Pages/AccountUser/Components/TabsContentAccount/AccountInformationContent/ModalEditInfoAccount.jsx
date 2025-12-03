import ProfileAPI from "api/profileApi";
import OtpForm from "Components/Auth/OtpForm/OtpForm";
import OtpFormUpdateEmail from "Components/Auth/OtpForm/OtpFormUpdateEmail";
import CustomModal from "Components/CustomModal/CustomModal";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import { useLanguage } from "Components/Languages/LanguageContext";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";
import { useProfile } from "context/ProfileContext";
import { useState } from "react";
import * as Yup from "yup";

const translate = {
  "editEmail": {
    "en": "Edit Email",
    "ar": "تعديل البريد الإلكتروني",
    "fr": "Modifier l'e-mail",
    "de": "E-Mail bearbeiten",
    "es": "Editar correo electrónico",
    "tr": "E-postayı düzenle",
    "ru": "Изменить электронную почту",
    "zh": "编辑电子邮件",
    "ko": "이메일 수정",
    "pt": "Editar e-mail",
    "ur": "ای میل میں ترمیم کریں",
    "ja": "メールを編集"
  },
  "emailOrPhone": {
    "en": "Email or Phone Number",
    "ar": "البريد الإلكتروني أو رقم الهاتف",
    "fr": "E-mail ou numéro de téléphone",
    "de": "E-Mail oder Telefonnummer",
    "es": "Correo electrónico o número de teléfono",
    "tr": "E-posta veya telefon numarası",
    "ru": "Электронная почта или номер телефона",
    "zh": "电子邮件或电话号码",
    "ko": "이메일 또는 전화번호",
    "pt": "E-mail ou número de telefone",
    "ur": "ای میل یا فون نمبر",
    "ja": "メールまたは電話番号"
  },
  "requiredEmailOrPhone": {
    "en": "Enter your email or phone number",
    "ar": "ادخل البريد الإلكتروني أو رقم الهاتف",
    "fr": "Entrez votre e-mail ou numéro de téléphone",
    "de": "Geben Sie Ihre E-Mail oder Telefonnummer ein",
    "es": "Ingrese su correo electrónico o número de teléfono",
    "tr": "E-posta veya telefon numaranızı girin",
    "ru": "Введите адрес электронной почты или номер телефона",
    "zh": "请输入您的电子邮件或电话号码",
    "ko": "이메일 또는 전화번호를 입력하세요",
    "pt": "Insira seu e-mail ou número de telefone",
    "ur": "اپنا ای میل یا فون نمبر درج کریں",
    "ja": "メールまたは電話番号を入力してください"
  },
  "invalidEmailOrPhone": {
    "en": "Invalid email or phone number",
    "ar": "رقم هاتف او الايميل خطأ",
    "fr": "E-mail ou numéro de téléphone invalide",
    "de": "Ungültige E-Mail oder Telefonnummer",
    "es": "Correo electrónico o número de teléfono no válido",
    "tr": "Geçersiz e-posta veya telefon numarası",
    "ru": "Неверный адрес электронной почты или номер телефона",
    "zh": "无效的电子邮件或电话号码",
    "ko": "잘못된 이메일 또는 전화번호",
    "pt": "E-mail ou número de telefone inválido",
    "ur": "غلط ای میل یا فون نمبر",
    "ja": "無効なメールまたは電話番号"
  },
  "successTitle": {
    "en": "Confirmed Successfully.",
    "ar": "تم التاكيد بنجاح.",
    "fr": "Confirmé avec succès.",
    "de": "Erfolgreich bestätigt.",
    "es": "Confirmado con éxito.",
    "tr": "Başarıyla onaylandı.",
    "ru": "Успешно подтверждено.",
    "zh": "确认成功。",
    "ko": "성공적으로 확인되었습니다.",
    "pt": "Confirmado com sucesso.",
    "ur": "کامیابی سے تصدیق ہو گئی۔",
    "ja": "正常に確認されました。"
  },
  "successChange": {
    "en": "Email changed successfully!",
    "ar": "تم تغيير البريد الإلكتروني بنجاح!",
    "fr": "E-mail modifié avec succès !",
    "de": "E-Mail erfolgreich geändert!",
    "es": "¡Correo electrónico cambiado con éxito!",
    "tr": "E-posta başarıyla değiştirildi!",
    "ru": "Электронная почта успешно изменена!",
    "zh": "电子邮件修改成功！",
    "ko": "이메일이 성공적으로 변경되었습니다!",
    "pt": "E-mail alterado com sucesso!",
    "ur": "ای میل کامیابی سے تبدیل ہو گئی!",
    "ja": "メールが正常に変更されました！"
  },
  "successButton": {
    "en": "Done",
    "ar": "تم",
    "fr": "Terminé",
    "de": "Fertig",
    "es": "Hecho",
    "tr": "Tamamlandı",
    "ru": "Готово",
    "zh": "完成",
    "ko": "완료",
    "pt": "Concluído",
    "ur": "ہو گیا",
    "ja": "完了"
  },
  "saveButton": {
    "en": "Save",
    "ar": "حفظ",
    "fr": "Enregistrer",
    "de": "Speichern",
    "es": "Guardar",
    "tr": "Kaydet",
    "ru": "Сохранить",
    "zh": "保存",
    "ko": "저장",
    "pt": "Salvar",
    "ur": "محفوظ کریں",
    "ja": "保存"
  },
  "loading": {
    "en": "Loading...",
    "ar": "جاري التحميل...",
    "fr": "Chargement...",
    "de": "Wird geladen...",
    "es": "Cargando...",
    "tr": "Yükleniyor...",
    "ru": "Загрузка...",
    "zh": "加载中...",
    "ko": "로딩 중...",
    "pt": "Carregando...",
    "ur": "لوڈ ہو رہا ہے...",
    "ja": "読み込み中..."
  }
}

const ModalEditInfoAccount = ({
  showModalEditInfoAccount,
  hideModalEditInfoAccount,
  initialValue
}) => {
  const {currentLanguage} = useLanguage()
  const validationSchema = Yup.object().shape({
    emailOrPhoneNumber: Yup.string()
      .required(translate.requiredEmailOrPhone[currentLanguage])
      .test(
        translate.emailOrPhone[currentLanguage],
        translate.invalidEmailOrPhone[currentLanguage],
        function (value) {
          return (
            Yup.string().email().isValidSync(value) ||
            Yup.string()
              .matches(/^[0-9]{10,14}$/, {
                message:translate.invalidEmailOrPhone[currentLanguage],
                excludeEmptyString: true
              })
              .isValidSync(value)
          );
        }
      )
  });
  
const {profile} =  useProfile()
  const initialValues = {
    emailOrPhoneNumber: initialValue
  };

  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState(initialValue);
  //   SHOW OTP
  const [showOtp, setShowOtp] = useState(false);
  const [ newMail,setNewMail] = useState()
  const [loading, setLoading] = useState(false);

  const hideOtp = () => {
    setShowOtp(false);
  };

  const handleSubmit =async (values, { resetForm }) => {
    // call sendCode api here
    try {
      setLoading(true);
    const repsonse =  await ProfileAPI.sendCode(profile.name);
      setNewMail(values.emailOrPhoneNumber)
      console.log(repsonse);
      
    } catch (error) {
      console.error("Failed to send code:", error);
      // Optionally handle error (e.g., show notification)
      return;
    } finally {
      setLoading(false);
    }
    resetForm();
    if (values) {
      setShowOtp(true);
      hideModalEditInfoAccount();
    }
  };

  // SUCCESS SEND MODAL
  const [successSend, setSuccessSend] = useState(false);
  const successSendButton = async (e) => {
    // call updateEmail api here
    try {
      await ProfileAPI.updateEmail(emailOrPhoneNumber);
      setSuccessSend(true);
      hideOtp();
    } catch (error) {
      console.error("Failed to update email:", error);
      // Optionally handle error (e.g., show notification)
      return;
    }
  };

  const hidesuccessSendButton = () => {
    setSuccessSend(false);
  };
  return (
    <>
      <SuccessSend
        showsuccessModalSend={successSend}
        hideSuccessModalSend={hidesuccessSendButton}
        titleModal={translate.successTitle[currentLanguage]}
        titleSend={translate.successChange[currentLanguage]}
        isTrueText={true}
        textSend={`${translate.successChange[currentLanguage]} ${newMail}`}
        textButton={translate.successButton[currentLanguage]}
      />
      <OtpFormUpdateEmail
        showOtpForm={showOtp}
        hideOtpForm={hideOtp}
        successSendButton={successSendButton}
        emailOrPhone={emailOrPhoneNumber}
        newMail = {newMail}
      />
      <CustomModal
        show={showModalEditInfoAccount}
        onHide={hideModalEditInfoAccount}
        title={translate.editEmail[currentLanguage]}
        newClass={"modal-edit-info-account"}
      >
        {/* =============== START ALL INFO EDIT ============== */}
        <div className="all-info-edit account-user-content">
          {/* ========== START FORM FIELD ========= */}
          <FormField
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <InputFiled
              label={translate.emailOrPhone[currentLanguage]}
              name="emailOrPhoneNumber"
              type="text"
              placeholder=""
              value={emailOrPhoneNumber}
              onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
              success
            />

            <button type="submit" className="btn-main btn-submit w-100 mt-3" disabled={loading}>
              {loading ? translate.loading[currentLanguage] : translate.saveButton[currentLanguage]}
            </button>
          </FormField>
          {/* ========== END FORM FIELD ========= */}
        </div>
        {/* =============== END ALL INFO EDIT ============== */}
      </CustomModal>
    </>
  );
};

export default ModalEditInfoAccount;
