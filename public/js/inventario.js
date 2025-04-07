document.addEventListener('DOMContentLoaded', () => {
  // Obtención de botones y modales
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtnE = document.getElementById('closeModalBtnE');
  const modal = document.getElementById('AgregarCat');
  const openModalBtnProd = document.getElementById('openModalBtnProd');
  const closeModalBtnP = document.getElementById('closeModalBtnP');
  const modalP = document.getElementById('agregarProd');
  const openModalBtnEC = document.getElementById('openME');
  const modalEC= document.getElementById('EditarCat')
  const closeModalBtnEc= document.getElementById('closeModalBtnEC')

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

  //modal editar categoria
  if (openModalBtnEC && modalEC) {
    // Abrir modal de categoría
    openModalBtnEC.addEventListener('click', () => {
      modalEC.style.display = 'block';
    });

    closeModalBtnEc.addEventListener('click', () => {
      modalEC.style.display = 'none';
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
    if (modalEC && event.target === modalEC) {
      modalEC.style.display = 'none';
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

function previewImageEc(event) {
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





function eliminarCategoria(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Esta acción no se puede deshacer!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/admin/inventario/eliminar/categoria/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if (data.mensaje === 'Categoría eliminada correctamente') {
          Swal.fire({
            title: 'Eliminado',
            text: data.mensaje,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            location.reload();
          });
        } else {
          Swal.fire('Error', data.mensaje || 'Ocurrió un error inesperado.', 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Error en la petición', 'error');
      });
    }
  });
}


function eliminarProducto (id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Esta acción no se puede deshacer!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/admin/inventario/eliminar/producto/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if (data.mensaje === 'Producto eliminado correctamente') {
          Swal.fire({
            title: 'Eliminado',
            text: data.mensaje,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            location.reload();
          });
        } else {
          Swal.fire('Error', data.mensaje || 'Ocurrió un error inesperado.', 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Error en la petición', 'error');
      });
    }
  });
}


function editarCategoria(id, nombre, imagen) {
  var modalEditar = document.getElementById("EditarCat");
  modalEditar.style.display = "block"; // Abre el modal de edición

  // Asigna los valores al formulario del modal
  document.getElementById("idc").value = id;
  document.getElementById("nombrec").value = nombre;

  // Si hay imagen, la muestra en el modal
  var previewImgc = document.getElementById("previewEc");
  if (imagen) {
    previewImgc.src = "/uploads/" + imagen;
    previewImgc.style.display = "block"; // Muestra la imagen
  } else {
    previewImgc.style.display = "none"; // Si no hay imagen, la oculta
  }
}

function cerrarModalEdicion() {
  var modalEditar = document.getElementById("EditarCat");
  modalEditar.style.display = "none"; // Cierra el modal de edición
}

function abrirModalEditar(idProd, categoriaP, nombre, imagen, cantidad, precioC, precioV) {
  const modal = document.getElementById("editarProd");
  modal.style.display = "block";

  // Asignar valores al formulario
  document.getElementById("idc").value = idProd;
  document.getElementById("nombrePr").value = nombre;
  document.getElementById("cantidadp").value = cantidad;
  document.getElementById("preciop").value = precioC;
  document.getElementById("precioVp").value = precioV;

  const categoriaSelect = document.getElementById("categoriaPr");
  for (let i = 0; i < categoriaSelect.options.length; i++) {
    if (categoriaSelect.options[i].value == categoriaP) {
      categoriaSelect.selectedIndex = i;
      break;
    }
  }
  

  // Mostrar vista previa de la imagen
  const preview = document.getElementById("previewPr");
  if (imagen) {
    preview.src = "/uploads/" + imagen;
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }
}

function cerrarModalEditar() {
  const modal = document.getElementById("editarProd");
  modal.style.display = "none";
}
