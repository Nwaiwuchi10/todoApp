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
  getTodoWithComments,
  getTodosByDueDate,
  addCommentToTodo,
} from "../controller/Todo";

const router = Router();

router.post("/", createTodo);
router.get("/", getAllTodos);
router.get("/:id/data", getTodoById);
router.get("/slug/:slug", getTodoBySlug);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/status", updateStatus);
router.patch("/:id/comment", updateComment);
router.get("/:id/", getTodoWithComments);

// Filter projects by due dates (?from=2025-08-01&to=2025-08-30)
router.get("/filter/due-dates", getTodosByDueDate);

// Add a new comment to a project
router.post("/:id/comments", addCommentToTodo);

export default router;
