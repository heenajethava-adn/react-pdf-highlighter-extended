import React, { useState } from 'react';
import Modal from './Modal';

const ActionButtons = () => {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleButtonClick = (action: string) => {
    setShowModal(action);
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleSubmit = () => {
    // Handle the submit logic here
    console.log("Submitted:", showModal);
    handleCloseModal();
  };

  const needChangesButtonStyle = {
    margin: '5px',
    padding: '0.575rem 0.95rem',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: isHovered ? '#dc3545' : '#ffffff',
    color: isHovered ? '#ffffff' : '#dc3545',
    borderRadius: '0.375rem',
    border: '1px solid #dc3545',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };

  return (
    <div>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffff', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)' }}>
        <button
          onClick={() => handleButtonClick('approve')}
          style={approveButtonStyle}
        >
          Approve
        </button>
        <button
          onClick={() => handleButtonClick('needChanges')}
          style={needChangesButtonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Need Changes
        </button>
      </div>

      <Modal
        show={showModal !== null}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

const approveButtonStyle = {
  margin: '5px',
  padding: '0.65rem 0.95rem',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: 'rgba(25, 135, 84)',
  color: '#ffff',
  borderRadius: '0.375rem',
  border: 'None'
};

export default ActionButtons;
