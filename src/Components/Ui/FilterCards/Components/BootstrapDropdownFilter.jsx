import React from 'react';

const BootstrapDropdownFilter = ({ label, options, onSelect, selectedValue }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    onSelect(options.find(option => option.id === parseInt(value)));
  };

  return (
    <div className="mb-3">
      <label htmlFor={label} className="form-label">{label}:</label>
      <select id={label} className="form-select" value={selectedValue || ''} onChange={handleChange}>
        <option value="">All {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name || option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BootstrapDropdownFilter;