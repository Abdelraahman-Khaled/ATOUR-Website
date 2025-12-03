
import { useField } from "formik";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./InputField.css";

const InputFiled = ({ label, success, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && meta.error;
  const isSuccess = success && meta.touched && !meta.error;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`form-group input-field-info position-relative form-one ${
        meta.touched && meta.error ? "has-error" : ""
      }`}
    >
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <input
        {...field}
        {...props}
        type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
        value={field.value || ""}
        onChange={(e) => {
          helpers.setValue(e.target.value);
        }}
        className={`input-field form-control ${
          meta.touched && meta.error
            ? "is-invalid"
            : isSuccess
            ? "active-border"
            : ""
        }`}
        required
      />
      {props.type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="password-toggle-btn position-absolute end-0 "
          style={{top:"55%"}}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      )}

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputFiled;
