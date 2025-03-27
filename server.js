const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the School Management API!");
});

app.post('/addschool', async (req, res)=>{
    try{
        const {name, address, latitude, longitude} = req.body;

        if(!name || !address || !latitude || !longitude){
            res.status(400).json({error : "All fields are required"});
        }

        const [result] = await pool.query( "INSERT INTO school(name, address, latitude, longitude) VALUES (?, ?, ?, ?)", [name, address, latitude, longitude]);

        res.status(201).json({message:"School added successfully", schoolId: result.insertId})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/listSchools', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and Longitude are required' });
        }

        const query = `
            SELECT id, name, address, latitude, longitude,
            ( 6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
            COS(RADIANS(longitude) - RADIANS(?)) + SIN(RADIANS(?)) * 
            SIN(RADIANS(latitude))) ) AS distance
            FROM school
            ORDER BY distance ASC;
        `;

        const [schools] = await pool.query(query, [latitude, longitude, latitude]);

        res.json({ schools });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
