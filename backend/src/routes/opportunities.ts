import { Router } from "express";
import pool from "../config/db";

const router = Router();

router.get("/", async (req, res) => {
  const { search } = req.query;

  try {
    let result;
    if (search) {
      const query = `
            SELECT id, title, description, skills, images, created_at
            FROM opportunities
            WHERE title ILIKE $1 OR description ILIKE $1 OR skills ILIKE $1
            ORDER BY created_at DESC        
        `;
      result = await pool.query(query, [`%${search}%`]);
    } else {
      const query = `
            SELECT id, title, description, skills, images, created_at
            FROM opportunities
            ORDER BY created_at DESC
        `;
      result = await pool.query(query);
    }

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
});

router.get("/", async (req, res) => {
  const query =
    "SELECT id, title, description, skills, images created_at FROM opportunities ORDER BY created_at DESC";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
});

router.post("/", async (req, res) => {
  const { title, description, skills, images } = req.body;
  if (!title || !description || !skills || !images) {
    return res
      .status(400)
      .json({ error: "Please provide all of the required fields" });
  }

  try {
    const query =
      "INSERT INTO opportunities (title, description, skills, images, host_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await pool.query(query, [
      title,
      description,
      skills,
      images,
      1,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create opportunity, Please try again later" });
  }
});

export default router;
