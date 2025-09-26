import React from 'react';

const BootstrapDropdownFilter = ({ label, options, onSelect, selectedValue }) => {
  const handleChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = options.find(option => option.id === selectedOptionId);
    onSelect(selectedOption);
  };

  return (
    <div className="mb-3">
      <label htmlFor={label.toLowerCase()} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        id={label.toLowerCase()}
        onChange={handleChange}
        value={selectedValue}
      >
        <option value="" > {label}</option >
        {options.map((option) => (
          <option key={option.id} value={option.id} >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BootstrapDropdownFilter;