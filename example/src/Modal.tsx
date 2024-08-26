// Modal.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onSubmit }) => {
  const [textareaValue, setTextareaValue] = useState('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => setIsFocused(true);

  if (!show) return null;

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit();
    setTextareaValue(''); // Clear the textarea after submission
  };

  const textareaStyle = {
  width: '100%',
  height: '100px',
  padding: '10px',
  fontSize: '16px',
  boxSizing: 'border-box' as 'border-box',
  borderRadius: '5px',
  border: '1px solid #dee2e6',
  outline: isFocused ? 'none' : undefined,
};

const modalBackdropStyle = {
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  zIndex: '999'
};

const modalContentStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '50%',
  maxWidth: '500px',
  textAlign: 'center' as 'center',
  marginTop: '10rem',
};

const buttonContainerStyle = {
  padding: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
  borderTop: '1px solid #dee2e6',
  paddingTop: '10px'
  
};

const submitButtonStyle = {
  margin: '5px',
  padding: '0.575rem 0.95rem',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#f46b22',
  color: '#fffF',
  borderRadius: '0.375rem',
  border: 'none',
};

const cancelButtonStyle = {
  margin: '5px',
  padding: '0.575rem 0.95rem',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#6c757d',
  color: '#fffF',
  borderRadius: '0.375rem',
  border: 'none',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  paddingBottom: '8px',
  paddingTop: '3px',
  borderBottom: '1px solid #dee2e6',
}

const h1Style = {
  fontSize: '1.25rem',
  fontWeight: '500'
}

const closeBtnStyle = {
    cursor: 'pointer',
    fontSsize: '24px',
    color: '#aaaaaa'
}

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle}>
      <div style={modalHeaderStyle}>
        <h1 style={h1Style}>Quick Proof</h1>
        <FontAwesomeIcon icon={faClose} style={closeBtnStyle} onClick={onClose}  />
      </div>
      <div style={{padding: '1.5rem', paddingTop: '1.5rem'}}>
        <label style={{fontSize: '13px', fontWeight: '700', float: 'left', padding: '0 0 10px 0'}}>Comment</label>
        <textarea
          value={textareaValue}
          onChange={handleTextareaChange}
          style={textareaStyle}
          onFocus={handleFocus}
          />
          </div>
        <div style={buttonContainerStyle}>
          <button onClick={onClose} style={cancelButtonStyle}>Cancel</button>
          <button onClick={handleSubmit} style={submitButtonStyle}>OK</button>
        </div>
      </div>
    </div>
  );
};



export default Modal;
