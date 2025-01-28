
import { useField } from "formik";
import PropTypes from "prop-types";

const TextAreaInput = ({ label, success, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  const isSuccess = success && meta.touched && !meta.error;

  // Add a comment to explain the custom styles
  const inputStyles = {
    borderColor: isError ? "#dc3545" : isSuccess ? "green" : "",
    height: "160px",
    // Add other styles as needed
  };

  return (
    <div
      className={`input-field-info d-flex flex-column gap-1 mt-3 form-one  ${meta.touched &&
        meta.error ? "is-invalid" : ""}`}
    >
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <textarea
        {...field}
        {...props}
        style={inputStyles}
        className={`input-field form-control ${meta.touched && meta.error
          ? "is-invalid"
          : ""}`}
      />

      {meta.touched && meta.error && (
        <div className="error">
          {meta.error}
        </div>
      )}
    </div>
  );
};

// PropTypes for type checking
TextAreaInput.propTypes = {
  label: PropTypes.string.isRequired,
  success: PropTypes.bool,
};

export default TextAreaInput;
