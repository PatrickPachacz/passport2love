import React from 'react';
import ReactFlagsSelect from 'react-flags-select';


const PopupModal = ({ isOpen, onClose, selectedCountry, onSelectCountry }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-modal">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <ReactFlagsSelect
          name="country"
          id="country"
          searchable={true}
          required
          className="select"
          selected={selectedCountry}
          onSelect={onSelectCountry}
        />
      </div>
    </div>
  );
};

export default PopupModal;
