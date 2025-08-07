// src/routes/schoolroutes.js
import express from 'express';
import {createSchool,getAllSchools,updateSchool,deleteSchool } from '../controllers/SchoolController.js';

const router = express.Router();

router.get("/", getAllSchools);
router.post("/", createSchool);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);

export default router;