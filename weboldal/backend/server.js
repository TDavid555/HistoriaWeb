const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "historiaweb"
});

db.connect(err => {
    if (err) throw err;
    console.log("Sikeeer!");
});

app.get("/api/tortenetek", (req, res) => {
    db.query("SELECT * FROM tortenetek ORDER BY keletkezes_datum", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/api/fiokok", (req, res) => {
    const{felhasznalonev, email, jelszo} = req.body;
    db.query("INSERT INTO fiokok (felhasznalonev, email, jelszo) VALUES (?, ?, ?)", [felhasznalonev, email, jelszo], (err, results) => {
        if (err) throw err;
        res.json({id: results.insertId, felhasznalonev, email, jelszo});
    });
});

app.put("/api/fiokok/:id", (req, res) => {
    const id=req.params.id;
})

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});