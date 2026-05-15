// backend/controllers/planController.js
const pool = require('../config/db');

exports.getAllPlans = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM membership_plans ORDER BY price ASC');
        res.json(rows);
    } catch (err) {
        console.error("Error fetching plans:", err);
        res.status(500).json({ error: "Server Error while fetching plans" });
    }
};