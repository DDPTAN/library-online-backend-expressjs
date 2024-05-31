const router = require("express").Router();

const categoryController = require("../controllers/categoryController");
const { userAuth, adminAuth } = require("../pkg/middlewares/auth");

router.get("/categories", userAuth, categoryController.getCategories);
router.get("/category/:id", userAuth, categoryController.getCategory);
router.post("/category", adminAuth, categoryController.createCategory);
router.patch("/category/:id", adminAuth, categoryController.updateCategory);
router.delete("/category/:id", adminAuth, categoryController.deleteCategory);

module.exports = router;
