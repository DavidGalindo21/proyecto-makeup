import User from "../models/Users.js";

export const adminDashboard = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("indexAdmin", {
      usuario: users,
      title: "Inicio Admin",
      successMessage: null,
    });
  } catch (error) {
    res.status(500).send("Error al cargar dashboard");
  }
};

export const clientDashboard = async (req, res) => {
  try {
    console.log("Datos del usuario:", req.user); // Para depuración
    const user = await User.findByPk(req.user.id);
    res.render("index", {
      usuario: user,
      title: "Inicio",
      successMessage: null,
    });
  } catch (error) {
    res.status(500).send("Error al cargar dashboard");
  }
};
