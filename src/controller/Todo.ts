import { Request, Response } from "express";
import { Todo, ITodo, TodoStatus } from "../models/Todo";

// Create a new todo
export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = new Todo(req.body);
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const createTodos = async (req: Request, res: Response) => {
  try {
    const todo = new Todo(req.body);
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
// Get all todos
export const getAllTodos = async (_: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a todo by slug
export const getTodoBySlug = async (req: any, res: any) => {
  try {
    const todo = await Todo.findOne({ slug: req.params.slug });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodoById = async (req: any, res: any) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a todo
export const updateTodo = async (req: any, res: any) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a todo
export const deleteTodo = async (req: any, res: any) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status of a todo
export const updateStatus = async (req: any, res: any) => {
  const { status } = req.body;
  if (!Object.values(TodoStatus).includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add or update comment on a todo
export const updateComment = async (req: any, res: any) => {
  const { comment } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { comment },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const addCommentToTodo = async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Project not found" });

    todo.comments.push({ text, date: new Date() });
    await todo.save();

    res.status(201).json({ message: "Comment added", comments: todo.comments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodoWithComments = async (
  req: any,
  res: any
): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).json({ message: "Project not found" });

    // sort comments by date (latest first)
    const sortedComments = todo.comments.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    res.json({ ...todo.toObject(), comments: sortedComments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodosByDueDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { from, to } = req.query;

    const filter: any = {};
    if (from || to) {
      filter.endDate = {};
      if (from) filter.endDate.$gte = new Date(from as string);
      if (to) filter.endDate.$lte = new Date(to as string);
    }

    const todos = await Todo.find(filter).sort({ endDate: 1 }); // earliest due first
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
