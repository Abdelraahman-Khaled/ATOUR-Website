
import React from "react";
import { useField } from "formik";

const InputFiled = ({ label, success, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && meta.error;
  const isSuccess = success && meta.touched && !meta.error;

  return (
    <div
      className={`form-group input-field-info d-flex flex-column gap-1 mt-3 position-relative form-one ${
        meta.touched && meta.error ? "has-error" : ""
      }`}
    >
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <input
        {...field}
        {...props}
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

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputFiled;
