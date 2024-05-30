import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Alerta.css';

const ConfirmAlert = ({ title, message, onConfirm, onCancel }) => {
  confirmAlert({
    customUI: ({ onClose }) => (
      <div className='custom-ui'>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className='button-group'>
          <button className='button-yes'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Sí
          </button>
          <button className='button-no'
            onClick={() => {
              onCancel();
              onClose();
            }}
          >
            No
          </button>
        </div>
      </div>
    )
  });

  return null;
};

export default ConfirmAlert;
