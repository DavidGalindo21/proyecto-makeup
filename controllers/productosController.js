import Producto from "../models/Producto.js";
import Categoria from "../models/Categoria.js";

export const registerProd = async (req, res) => {
  console.log('Controlador registerProd invocado');
    try {
    const { categoriaP, nombre, cantidad, precioC, precioV,  } = req.body;
    const imagen = req.file ? req.file.filename : null;
      console.log(req.body)
    let erroresBack = [];

    // Validaciones
    if (!nombre || nombre.trim() === "") {
      erroresBack.push({ mensaje: "El nombre del producto es obligatorio." });
    }

    if (!categoriaP || isNaN(categoriaP)) {
      erroresBack.push({ mensaje: "Debes seleccionar una categoría válida." });
    } else {
      const categoriaExiste = await Categoria.findByPk(categoriaP);
      if (!categoriaExiste) {
        erroresBack.push({ mensaje: "La categoría seleccionada no existe." });
      }
    }

    if (!imagen) {
      erroresBack.push({ mensaje: "Debes subir una imagen del producto." });
    }

    if (!cantidad || cantidad <= 0) {
      erroresBack.push({ mensaje: "La cantidad debe ser mayor a cero." });
    }

    if (!precioC || precioC <= 0) {
      erroresBack.push({ mensaje: "El precio de compra debe ser mayor a cero." });
    }

    if (!precioV || precioV <= 0) {
      erroresBack.push({ mensaje: "El precio de venta debe ser mayor a cero." });
    }

    // Si hay errores, redirigir con flash
    if (erroresBack.length > 0) {
      req.flash('errores', JSON.stringify(erroresBack));
      return res.redirect("/admin/inventario");
    }

    // Crear producto
    await Producto.create({
      nombre,
      precio_compra: precioC,
      precio_venta: precioV,
      ganancia: 0, 
      cantidad_vendida: 0,
      cantidad_actual: cantidad,
      total: 0,
      status: "disponible", 
      categoria_id: categoriaP, // Relación con la categoría
      imagen,
    });

    req.flash('successMessage', 'Producto agregado exitosamente.');
    res.redirect("/admin/inventario");

  } catch (error) {
    console.error("Error al registrar producto:", error);
    res.status(500).send("Error interno del servidor al registrar producto");
  }
};