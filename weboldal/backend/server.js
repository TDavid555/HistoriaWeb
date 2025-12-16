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

//Kiolvasások

app.get("/api/tortenetek", (req, res) => {
    db.query("SELECT * FROM tortenetek ORDER BY keletkezes_datum", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get("/api/terkep",(req,res)=>{
    db.query("SELECT DISTINCT telepules,megye,latitude,longitude FROM tortenet_telepules JOIN telepulesek ON telepulesek.id=telepules_id",(err,results)=>
    {
        if (err) throw err;
        res.json(results);
    });
});

app.get("/api/fiokok", (req, res) => {
    const{felhasznalonev,jelszo} = req.body;
    db.query("SELECT * FROM fiokok WHERE felhasznalonev=? AND jelszo=?",[felhasznalonev,jelszo], (err, results) => {
        if (err) throw err;
        if(results.length>0)
        {
            db.query("SELECT * FROM fiokok JOIN likes ON fiok_id=?",[results[0].id],(err,results2)=>
            {
                if(err) throw err;
                if(results2.length>0)
                {
                    res.json(Object.assign(results[0],{like:true}));
                }
                else
                {
                    res.json(Object.assign(results[0],{like:false}));
                }
            });
        }
        else
        {
            res.json(results[0]);
        }
    });
});

//Feltöltések

app.post("/api/fiokok", (req, res) => {
    const{felhasznalonev, email, jelszo} = req.body;
    db.query("INSERT INTO fiokok (felhasznalonev, email, jelszo) VALUES (?, ?, ?)", [felhasznalonev, email, jelszo], (err, results) => {
        if (err) throw err;
        res.json({id: results.insertId, felhasznalonev, email, jelszo});
    });
});

app.post("/api/tortenetek/:id", (req, res) => {
    const id=req.params.id;
    const{cim,tortenet,tortenet_datum,kep_url,megyek} = req.body;
    db.query("INSERT INTO tortenetek(cim,tortenet,tortenet_datum,kep_url,fiok_id) VALUES (?,?,?,?,?)", [cim, tortenet, tortenet_datum,kep_url,id], (err, results) => {
        if (err) throw err;
        for(var i in megyek)
        {
            megyek[i].forEach(j => 
            {
                db.query("INSERT INTO tortenet_telepules(tortenet_id,telepules_id)VALUES(?,(SELECT id FROM telepulesek WHERE telepules=? AND megye=?))",[results.insertId,j,i],(err)=>
                {
                    if(err) throw err;
                });       
            });
        }
        res.json({id: results.insertId, cim,tortenet,tortenet_datum,kep_url,fiok_id:id,megyek});
    });
});

//Frissítések

app.put("/api/fiokok/:id", (req, res) => {
    const id=req.params.id;
    const{felhasznalonev, email, jelszo} = req.body;
    db.query("UPDATE fiokok SET felhasznalonev=?,email=?,jelszo=? WHERE id=?", [felhasznalonev, email, jelszo,id], (err) => {
        if (err) throw err;
        res.json({message:"Fiók frissült."});
    });
});

app.put("/api/tortenetek/:id", (req, res) => {
    const id=req.params.id;
    const{cim, tortenet, tortenet_datum,kep_url,megyek} = req.body;
    db.query("UPDATE tortenetek SET cim=?,tortenet=?,tortenet_datum=?,kep_url=? WHERE id=?", [cim, tortenet, tortenet_datum,kep_url,id], (err) => {
        if (err) throw err;
        db.query("DELETE FROM tortenet_telepules WHERE tortenet_id=?",[id],(err)=>
        {
            if(err) throw err;
            for(var i in megyek)
            {
                megyek[i].forEach(j => 
                {
                    db.query("INSERT INTO tortenet_telepules(tortenet_id,telepules_id)VALUES(?,(SELECT id FROM telepulesek WHERE telepules=? AND megye=?))",[id,j,i],(err)=>
                    {
                        if(err) throw err;
                    });       
                });
            }
            res.json({message:"Történet frissült."});
        })
    });
});

app.put("/api/like/:fiok_id/:tortenet_id",(req,res)=>{
    const fiok_id=req.params.fiok_id;
    const tortenet_id=req.params.tortenet_id;
    const {like}=req.body;
    if(like)
    {
        db.query("UPDATE tortenetek SET likes=likes+1 WHERE id=? AND NOT EXISTS(SELECT 1 FROM likes WHERE fiok_id=? AND tortenet_id=?)",[tortenet_id,fiok_id,tortenet_id],(err)=>
        {
            if(err) throw err;
            db.query("INSERT INTO likes(fiok_id,tortenet_id) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM likes WHERE fiok_id=? AND tortenet_id=?);",[fiok_id,tortenet_id,fiok_id,tortenet_id],(err)=>
            {
                if(err) throw err;
                res.json({message:"Történet like-olva."});
            });
        });
    }
    else
    {
        db.query("UPDATE tortenetek SET likes=likes-1 WHERE id=? AND EXISTS(SELECT 1 FROM likes WHERE fiok_id=? AND tortenet_id=?)",[tortenet_id,fiok_id,tortenet_id],(err)=>
        {
            if(err) throw err;
            db.query("DELETE FROM likes WHERE fiok_id=? AND tortenet_id=?",[fiok_id,tortenet_id],(err)=>
            {
                if(err) throw err;
                res.json({message:"Történet like visszavonva."});
            });
        });
    }
});

//Törlések

app.delete("/api/fiokok/:id", (req, res) => {
    const id=req.params.id;
    db.query("DELETE FROM fiokok WHERE id=?", [id], (err) => {
        if (err) throw err;
        res.json({message:"Fiók törölve."});
    });
});

app.delete("/api/tortenetek/:id",(req,res)=>
{
    const id=req.params.id;
    db.query("DELETE FROM tortenet_telepules WHERE tortenet_id=?",[id],(err)=>
    {
        if(err) throw err;
        db.query("DELETE FROM tortenetek WHERE id=?",[id],(err)=>
        {
            if(err) throw err;
            res.json({message:"Történet törölve!"});
        });
    });
});

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});