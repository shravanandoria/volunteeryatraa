import { Router } from "express";
import pool from "../config/db";

const router = Router();

// As of now only one route to apply at any opportunity
router.post("/", async (req, res) => {
  const { opportunity_id } = req.body;

  //   user has to provide an opportunity id to apply
  if (!opportunity_id) {
    return res.status(400).json({ error: "Please provide the opportunity_id" });
  }

  //   storing the application to the supabase
  try {
    const query =
      "INSERT INTO applications (opportunity_id, user_id) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [opportunity_id, 1]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "something went wrong, please try again later" });
  }
});

export default router;
