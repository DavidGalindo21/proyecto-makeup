import express from "express";
import { registerCat, showCategorias,eliminarCategoria, showProductosPorCategoria} from "../controllers/categoriasController.js";

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
   
  router.get(
         "/product",
          authMiddleware,
          roleMiddleware(["admin"]),
          showCategorias,
    );

    router.get(
      "/productos/categoria/:categoriaId", // Aquí el `:categoriaId` es el parámetro de la ruta
      authMiddleware,
      roleMiddleware(["admin"]),
      showProductosPorCategoria
    );
    
    
router.post("/inventario/categorias", upload.single("fotoC"), registerCat);
router.post("/inventario/producto", upload.single("fotoP"), registerProd);
export default router;
