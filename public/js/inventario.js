document.addEventListener('DOMContentLoaded', () => {
  // Obtención de botones y modales
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtnE = document.getElementById('closeModalBtnE');
  const modal = document.getElementById('AgregarCat');
  const openModalBtnProd = document.getElementById('openModalBtnProd');
  const closeModalBtnP = document.getElementById('closeModalBtnP');
  const modalP = document.getElementById('agregarProd');

  // Solo agregar event listener si el modal de categoría existe
  if (openModalBtn && modal && closeModalBtnE) {
    // Abrir modal de categoría
    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });

    // Cerrar modal de categoría
    closeModalBtnE.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Solo agregar event listener si el modal de producto existe
  if (openModalBtnProd && modalP && closeModalBtnP) {
    // Abrir modal de producto
    openModalBtnProd.addEventListener('click', () => {
      modalP.style.display = 'block';
    });

    // Cerrar modal de producto
    closeModalBtnP.addEventListener('click', () => {
      modalP.style.display = 'none';
    });
  }

  // Cerrar modales si se hace clic fuera de ellos
  window.addEventListener('click', (event) => {
    if (modal && event.target === modal) {
      modal.style.display = 'none';
    }
    if (modalP && event.target === modalP) {
      modalP.style.display = 'none';
    }
  });
});

// Función de vista previa de imagen para el modal de categoría
function previewImageE(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('previewE');
  const uploadBtn = document.getElementById('uploadButtonContainer');

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
      uploadBtn.style.display = 'block'; // Mostrar botón de cargar imagen
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
    preview.style.display = 'none';
    uploadBtn.style.display = 'none'; // Ocultar botón si se cancela selección
  }
}

// Función de vista previa de imagen para el modal de producto
function previewImageP(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('previewP');
  const uploadBtn = document.getElementById('uploadButtonContainer');

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
      uploadBtn.style.display = 'block'; // Mostrar botón de cargar imagen
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
    preview.style.display = 'none';
    uploadBtn.style.display = 'none'; // Ocultar botón si se cancela selección
  }
}

// Función para abrir modales de imagen (si es necesario)
function abrirModal(id) {
  var modal = document.getElementById("modal-img-" + id);
  modal.style.display = "block";
}

function cerrarModal(id) {
  var modal = document.getElementById("modal-img-" + id);
  modal.style.display = "none";
}
