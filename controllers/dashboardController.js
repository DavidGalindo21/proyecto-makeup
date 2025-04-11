import User from "../models/Users.js";
import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";

export const adminDashboard = async (req, res) => {
  try {
    const users = await User.findAll();
    const categorias = await Categoria.findAll();  
    const productos = await Producto.findAll();   

    res.render("indexAdmin", {
      categorias,
      productos,
      usuario: users,
      title: "Inicio Admin",
      successMessage: null,
    });
  } catch (error) {
    res.status(500).send("Error al cargar dashboard");
  }
};

// Página de inventario
export const inventarioPage = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();  // Obtener categorías
    const productos = await Producto.findAll();   // Obtener productos

    res.render("inventario", {
      title: "Inventario",
      categorias,
      productos,
      usuario: req.user || null, 
      errores: [],
      successMessage: "", 
    });
  } catch (error) {
    console.error("Error en inventarioPage:", error);
    res.status(500).send("Error al cargar inventario");
  }
};



export const clientDashboard = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();  
    const productos = await Producto.findAll();   
    const users = await User.findAll();
    res.render("index", {
      usuario: users,
      categorias,
      productos,
      title: "Inicio",
      successMessage: null,
    });
  } catch (error) {
    res.status(500).send("Error al cargar dashboard");
  }
};


export const productDashboard = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();  
    const productos = await Producto.findAll();   
    const users = await User.findAll();
    res.render("product", {
      usuario: users,
      categorias,
      productos,
      title: "Productos",
      successMessage: null,
    });
  } catch (error) {
    res.status(500).send("Error al cargar dashboard");
  }
};



export const showProductosPorCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params; // Obtén el ID de la categoría de los parámetros de la URL

    // Verifica si el ID de la categoría fue proporcionado
    if (!categoriaId) {
      return res.status(400).send("ID de categoría no proporcionado");
    }

    // Encuentra la categoría específica
    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).send("Categoría no encontrada");
    }

    // Obtén los productos que pertenecen a la categoría
    const productos = await Producto.findAll({
      where: { categoriaId },
    });

    // Renderiza la vista con los productos filtrados
    res.render("product", {
      title: `Productos de ${categoria.nombre}`, // Suponiendo que la categoría tiene un campo `nombre`
      productos,
      categoria,
    });
  } catch (error) {
    console.error("Error al mostrar productos por categoría:", error);
    res.status(500).send("Error al cargar los productos");
  }
};
