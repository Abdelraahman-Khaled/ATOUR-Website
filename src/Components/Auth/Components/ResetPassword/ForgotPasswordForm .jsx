import { useState } from "react";
import InputFiled from "Components/Forms/InputField";
import * as Yup from "yup";
import AuthAPI from "api/authApi";
import FormField from "Components/Forms/FormFiled";
import EndLoginInfo from "../EndLoginInfo/EndLoginInfo";
import OtpForm from "Components/Auth/OtpForm/OtpForm";
import { useLanguage } from "Components/Languages/LanguageContext";

const ForgotPasswordForm = ({ onClose }) => {
    const { currentLanguage } = useLanguage();
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [showOtpForm, setShowOtpForm] = useState(false);

    const content = {
        title: {
            ar: "إعادة تعيين كلمة المرور",
            en: "Reset Password",
        },
        emailOrPhoneLabel: {
            ar: "البريد الإلكتروني أو رقم الهاتف",
            en: "Email or Phone Number",
        },
        emailOrPhonePlaceholder: {
            ar: "أدخل البريد الإلكتروني أو رقم الهاتف",
            en: "Enter your email or phone number",
        },
        newPasswordLabel: {
            ar: "كلمة المرور الجديدة",
            en: "New Password",
        },
        newPasswordPlaceholder: {
            ar: "أدخل كلمة المرور الجديدة",
            en: "Enter new password",
        },
        confirmPasswordLabel: {
            ar: "تأكيد كلمة المرور",
            en: "Confirm Password",
        },
        confirmPasswordPlaceholder: {
            ar: "أدخل تأكيد كلمة المرور",
            en: "Confirm new password",
        },
        submitButton: {
            ar: "إرسال",
            en: "Submit",
        },
        validation: {
            emailOrPhoneRequired: {
                ar: "ادخل البريد الإلكتروني أو رقم الهاتف",
                en: "Enter your email or phone number",
            },
            emailOrPhoneInvalid: {
                ar: "رقم هاتف أو بريد إلكتروني غير صحيح",
                en: "Invalid email or phone number",
            },
            newPasswordRequired: {
                ar: "ادخل كلمة المرور الجديدة",
                en: "Enter new password",
            },
            confirmPasswordRequired: {
                ar: "ادخل تأكيد كلمة المرور",
                en: "Confirm new password",
            },
            passwordMismatch: {
                ar: "كلمة المرور غير متطابقة",
                en: "Passwords do not match",
            },
        },
    };

    const validationSchemaStep1 = Yup.object().shape({
        username: Yup.string()
            .required(content.validation.emailOrPhoneRequired[currentLanguage])
            .test(
                "emailOrPhoneNumber",
                content.validation.emailOrPhoneInvalid[currentLanguage],
                function (value) {
                    return (
                        Yup.string().email().isValidSync(value) ||
                        Yup.string()
                            .matches(/^[0-9]{10,14}$/, {
                                message: content.validation.emailOrPhoneInvalid[currentLanguage],
                                excludeEmptyString: true,
                            })
                            .isValidSync(value)
                    );
                }
            ),
    });

    const validationSchemaStep3 = Yup.object().shape({
        newPassword: Yup.string().required(content.validation.newPasswordRequired[currentLanguage]),
        confirmPassword: Yup.string()
            .required(content.validation.confirmPasswordRequired[currentLanguage])
            .oneOf([Yup.ref("newPassword"), null], content.validation.passwordMismatch[currentLanguage]),
    });

    const handleStep1Submit = async (values) => {
        try {
            await AuthAPI.resetPassword(values.username);
            setUsername(values.username);
            setShowOtpForm(true); // Show OTP form
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    const handleOtpSuccess = () => {
        setShowOtpForm(false); // Hide OTP form
        setStep(3); // Move to step 3 (new password)
    };

    const handleStep3Submit = async (values) => {
        try {
            await AuthAPI.confirmReset(username, values.newPassword);
            onClose();
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    return (
        <div className="info-login-content">
            <div className="row g-4 g-md-3">
                <div className="col-12">
                    {step === 1 && (
                        <FormField
                            initialValues={{ username: "" }}
                            validationSchema={validationSchemaStep1}
                            onSubmit={handleStep1Submit}
                        >
                            <InputFiled
                                label={content.emailOrPhoneLabel[currentLanguage]}
                                name="username"
                                type="text"
                                placeholder={content.emailOrPhonePlaceholder[currentLanguage]}
                                success
                            />
                            <button type="submit" className="btn-main btn-submit w-100 mt-3">
                                {content.submitButton[currentLanguage]}
                            </button>
                        </FormField>
                    )}
                    {step === 3 && (
                        <FormField
                            initialValues={{ newPassword: "", confirmPassword: "" }}
                            validationSchema={validationSchemaStep3}
                            onSubmit={handleStep3Submit}
                        >
                            <InputFiled
                                label={content.newPasswordLabel[currentLanguage]}
                                name="newPassword"
                                type="password"
                                placeholder={content.newPasswordPlaceholder[currentLanguage]}
                                success
                            />
                            <InputFiled
                                label={content.confirmPasswordLabel[currentLanguage]}
                                name="confirmPassword"
                                type="password"
                                placeholder={content.confirmPasswordPlaceholder[currentLanguage]}
                                success
                            />
                            <button type="submit" className="btn-main btn-submit w-100 mt-3">
                                {content.submitButton[currentLanguage]}
                            </button>
                        </FormField>
                    )}
                    <EndLoginInfo />
                </div>
            </div>
            {showOtpForm && (
                <OtpForm
                    showOtpForm={showOtpForm}
                    hideOtpForm={() => setShowOtpForm(false)}
                    successSendButton={handleOtpSuccess}
                    emailOrPhone={username}
                />
            )}
        </div>
    );
};

export default ForgotPasswordForm;