// alertService.js

import Swal from 'sweetalert2';

export const mostrarAlertaExito = (mensaje) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  
    Toast.fire({
      icon: 'success',
      title: mensaje
    });
  };

export const mostrarAlertaError = (mensaje) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: mensaje,
  });
};

// Otros tipos de alertas...
