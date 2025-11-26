// hooks/useAlert.js
import { useState } from 'react';

export const useAlert = () => {
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info', // 'delete', 'success', 'error', 'info'
    onConfirm: () => {},
    showCancel: true,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  });

  const showAlert = (config: any) => {
    setAlertConfig({
      visible: true,
      showCancel: true,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      ...config,
    });
  };

  const hideAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };

  const showSuccess = (message:any, title = 'Success') => {
    showAlert({
      title,
      message,
      type: 'success',
      showCancel: false,
      confirmText: 'OK',
    });
  };

  const showError = (message:any, title = 'Error') => {
    showAlert({
      title,
      message,
      type: 'error',
      showCancel: false,
      confirmText: 'OK',
    });
  };

  const showDeleteConfirmation = (message:any, onConfirm: ()=> void, title = 'Delete Transaction') => {
    showAlert({
      title,
      message,
      type: 'delete',
      onConfirm,
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });
  };

  return {
    alertConfig,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showDeleteConfirmation,
  };
};