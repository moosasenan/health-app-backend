const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Route الأساسية
app.get('/', (req, res) => {
  res.json({
    message: 'Hello! Health app working successfully',
    status: 'running'
  });
});

// جلب جميع المرضى
app.get('/api/patients', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// إضافة مريض جديد
app.post('/api/patients', async (req, res) => {
  try {
    const { user_id, full_name } = req.body;
    
    const { data, error } = await supabase
      .from('patients')
      .insert([{ user_id, full_name }])
      .select();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// بدء الخادم
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
