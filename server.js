const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

let latestLocation = null;

// İstifadəçinin icazə verdikdən sonra göndərdiyi konum
app.post("/api/location", (req, res) => {

    const { latitude, longitude } = req.body;

    if (
        typeof latitude !== "number" ||
        typeof longitude !== "number"
    ) {
        return res.status(400).json({
            error: "Yanlış konum məlumatı"
        });
    }

    latestLocation = {
        latitude,
        longitude,
        time: new Date().toISOString()
    };

    res.json({
        success: true
    });
});

// Admin panel üçün son konum
app.get("/api/location", (req, res) => {
    res.json(latestLocation);
});

app.listen(PORT, () => {
    console.log(`Server işləyir: http://localhost:${PORT}`);
});