const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello! Health app working successfully',
        status: 'running'
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
