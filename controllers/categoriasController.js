import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";


export const registerCat = async (req, res) => {
  try {
    const { nombre } = req.body;
    const imagen = req.file ? req.file.filename : null;

    let erroresBack = [];

    if (nombre.trim() === "") {
      erroresBack.push({ mensaje: "El campo nombre está vacío" });
    } else if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/.test(nombre)) {
      erroresBack.push({ mensaje: "El nombre solo debe contener letras y espacios" });
    }

    if (!imagen) {
      erroresBack.push({ mensaje: "Debes subir una imagen" });
    }

    
    if (erroresBack.length) {
      console.log('Errores:', erroresBack); // Asegúrate de que los errores están llegando correctamente
      req.flash('errores', JSON.stringify(erroresBack));
      return res.redirect("/admin/inventario");
    }

    const categoriaExistente = await Categoria.findOne({
      where: { Nombre: nombre },
    });

    if (categoriaExistente) {
      console.log('Error: La categoría ya está registrada'); // Verifica que el error se pasa correctamente
      req.flash('errores', JSON.stringify([{ mensaje: "La categoría ya está registrada" }]));
      return res.redirect("/admin/inventario");
    }

    await Categoria.create({
      Nombre: nombre,
      Imagen: imagen,
    });

    console.log('Categoría agregada exitosamente');
    req.flash('successMessage', 'Categoría agregada exitosamente.');
    return res.redirect("/admin/inventario");
  } catch (error) {
    console.error("Error en registerCat:", error);
    res.status(500).send("Error en el registro");
  }
};


export const showCategorias = async (req, res) => {
  try {

    
    const categorias = await Categoria.findAll();
    const productos = await Producto.findAll();

    const erroresFlash = req.flash('errores');
    const successFlash = req.flash('successMessage');

    res.render("inventario", {
      title: "Inventario",
      categorias,
      productos,
      errores: erroresFlash.length ? JSON.parse(erroresFlash[0]) : [],
      successMessage: successFlash.length ? successFlash[0] : null,
      usuario: req.user,
    });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).send("Error al obtener categorías");
  }
};
