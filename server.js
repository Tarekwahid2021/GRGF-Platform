const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'healthy', timestamp: new Date() }));

// Records
app.get('/api/records', async (req, res) => {
  const result = await pool.query('SELECT * FROM records ORDER BY timestamp DESC');
  res.json(result.rows);
});

app.post('/api/records', async (req, res) => {
  const { title, status } = req.body;
  const result = await pool.query(
    'INSERT INTO records (title, status) VALUES ($1, $2) RETURNING *',
    [title, status || 'verified']
  );
  res.json(result.rows[0]);
});

// Audit log
app.get('/api/audit', async (req, res) => {
  const result = await pool.query('SELECT * FROM audit_log ORDER BY timestamp DESC LIMIT 50');
  res.json(result.rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
