// backend/controllers/leadController.js
const pool = require('../config/db');

exports.createLead = async (req, res) => {
    const { name, email, phone, interested_plan } = req.body;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO leads (name, email, phone, interested_plan) VALUES (?, ?, ?, ?)',
            [name, email, phone, interested_plan || null]
        );
        
        res.status(201).json({ 
            message: "Lead captured successfully!", 
            leadId: result.insertId 
        });
    } catch (err) {
        console.error("Error capturing lead:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "This email is already registered." });
        }
        res.status(500).json({ error: "Failed to capture lead" });
    }
};