import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  getTodoBySlug,
  updateTodo,
  deleteTodo,
  updateStatus,
  updateComment,
  getTodoById,
} from "../controller/Todo";

const router = Router();

router.post("/", createTodo);
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.get("/slug/:slug", getTodoBySlug);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/status", updateStatus);
router.patch("/:id/comment", updateComment);

export default router;
