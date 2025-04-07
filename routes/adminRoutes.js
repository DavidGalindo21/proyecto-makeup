import express from "express";
import { registerCat, showCategorias,eliminarCategoria,showCategoriasI} from "../controllers/categoriasController.js";

import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminDashboard, inventarioPage } from "../controllers/dashboardController.js";
import { registerProd,eliminarProducto } from "../controllers/productosController.js";
import upload from "../middlewares/multer.js"; 


const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminDashboard,
);

router.get(
  "/inventario",
  authMiddleware,
  roleMiddleware(["admin"]),
  showCategorias,
);

router.route("/inventario/eliminar/categoria/:id")
  .delete(
    authMiddleware,
    roleMiddleware(["admin"]),
    eliminarCategoria 
  );

router.route("/inventario/eliminar/producto/:id")
  .delete(
    authMiddleware,
    roleMiddleware(["admin"]),
    eliminarProducto // Función que maneja la eliminación de productos
  );


router.post("/inventario/categorias", upload.single("fotoC"), registerCat);
router.post("/inventario/producto", upload.single("fotoP"), registerProd);
export default router;
