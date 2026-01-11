//Csomagok behívása

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

//Szerver létrehozása

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Adatbázis kapcsolata létrehozása 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "historiaweb"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL kapcsolódva!");
});

//Kiolvasások

app.get("/api/tortenetek/likes", (req, res) => {
    db.query("SELECT tortenetek.id, cim, tortenet, keletkezes_datum, tortenet_datum_kezdet,tortenet_datum_vege, kep_url, tortenetek.fiok_id, COUNT(likes.tortenet_id) AS likes,telepules FROM tortenetek LEFT JOIN likes ON likes.tortenet_id=id JOIN tortenet_telepules ON tortenet_telepules.tortenet_id=tortenetek.id JOIN telepulesek ON telepules_id=telepulesek.id GROUP BY tortenetek.id ORDER BY likes DESC LIMIT 10", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get("/api/tortenetek", (req, res) => {
    db.query("SELECT tortenetek.id, cim, tortenet, keletkezes_datum, tortenet_datum_kezdet,tortenet_datum_vege, kep_url, tortenetek.fiok_id,telepules FROM tortenetek JOIN tortenet_telepules ON tortenet_telepules.tortenet_id=tortenetek.id JOIN telepulesek ON telepules_id=telepulesek.id GROUP BY tortenetek.id ORDER BY keletkezes_datum DESC LIMIT 10", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get("/api/terkep",(req,res)=>{
    db.query("SELECT DISTINCT telepules,megye,latitude,longitude FROM tortenet_telepules JOIN telepulesek ON telepulesek.id=telepules_id",(err,results)=>{
        if (err) throw err;
        res.json(results);
    });
});

app.get("/api/fiokok", (req, res) => {
    const{felhasznalonev,jelszo} = req.query;
    db.query("SELECT * FROM fiokok WHERE felhasznalonev=? AND jelszo=?;",[felhasznalonev,jelszo], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.get("/api/felhasznalonev/:felhasznalonev", (req, res) => {
    const felhasznalonev = req.params.felhasznalonev;
    db.query("SELECT * FROM fiokok WHERE felhasznalonev=?;",[felhasznalonev], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get("/api/tortenet/:telepules",(req,res)=>{
    const telepules=req.params.telepules;
    db.query("SELECT *,COUNT(likes.tortenet_id) AS likes,GROUP_CONCAT(telepules) AS telepulesek FROM tortenetek LEFT JOIN likes ON tortenetek.id=likes.tortenet_id JOIN tortenet_telepules ON tortenet_telepules.tortenet_id=tortenetek.id JOIN telepulesek ON telepulesek.id=tortenet_telepules.telepules_id GROUP BY tortenetek.id HAVING telepulesek LIKE ? ;",[`%${telepules}%`],(err,results)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.get("/api/tortenetek/:id",(req,res)=>
{
    const id=req.params.id;
    db.query("SELECT * FROM tortenetek WHERE fiok_id=?",[id],(err,results)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.get("/api/tortenetek/:fiok_id/:id",(req,res)=>{
    const id=req.params.id;
    db.query("SELECT * FROM tortenetek JOIN tortenet_telepules ON tortenet_id=tortenetek.id JOIN telepulesek ON telepules_id=telepulesek.id WHERE tortenetek.id=?",[id],(err,results)=>{
        if(err) throw err;
        res.json(results[0]);
    });
});

app.get("/api/fiokok/:id",(req,res)=>{
    const id=req.params.id;
    db.query("SELECT * FROM fiokok WHERE id=?",[id],(err,results)=>{
        if(err) throw err;
        res.json(results[0]);
    });
});

app.get("/api/tortenet/telepules/:id",(req,res)=>{
    const id=req.params.id;
    db.query("SELECT *,GROUP_CONCAT(DISTINCT megye) AS megyek,GROUP_CONCAT(telepules) AS telepulesek FROM tortenetek JOIN tortenet_telepules ON tortenet_id=tortenetek.id JOIN telepulesek ON telepules_id=telepulesek.id WHERE tortenetek.id=?",[id],(err,results)=>{
        if(err) throw err;
        res.json(results[0]);
    });
});

app.get("/api/megyek",(req,res)=>{
    db.query("SELECT id,megye FROM telepulesek GROUP BY megye ORDER BY megye",(err,results)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.get("/api/telepulesek/:megye",(req,res)=>{
    const megye =req.params.megye;
    db.query("SELECT telepules,megye FROM telepulesek WHERE megye= ? ORDER BY telepules",[megye],(err,results)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.get("/api/tortenet/:cim/:id",(req,res)=>{
    const cim=req.params.cim;
    const id=req.params.id;
    db.query("SELECT * FROM tortenetek WHERE fiok_id=? AND cim=?",[id,cim],(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

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
    const{cim,tortenet,tortenet_datum_kezdet,tortenet_datum_vege,kep_url,telepulesek} = req.body;
    console.log(kep_url);
    db.query("INSERT INTO tortenetek(cim,tortenet,tortenet_datum_kezdet,tortenet_datum_vege,kep_url,fiok_id) VALUES (?, ?, ?, ?, ?, ?)", [cim, tortenet, tortenet_datum_kezdet,tortenet_datum_vege,kep_url,id], (err, results) => {
        if (err) throw err;
        telepulesek.forEach(i => {
            db.query("INSERT INTO tortenet_telepules(tortenet_id,telepules_id) VALUES(?,(SELECT id FROM telepulesek WHERE telepules=?))",[results.insertId,i],(err)=>
            {
                if(err) throw err;
            });       
        });
        res.json({id: results.insertId, cim, tortenet, tortenet_datum_kezdet,tortenet_datum_vege, kep_url, fiok_id:id, telepulesek});
    });
});

app.post("/api/like/:fiok_id/:tortenet_id",(req,res)=>{
    const fiok_id=req.params.fiok_id;
    const tortenet_id=req.params.tortenet_id;
    db.query("INSERT INTO likes(fiok_id,tortenet_id) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM likes WHERE fiok_id=? AND tortenet_id=?);",[fiok_id,tortenet_id,fiok_id,tortenet_id],(err)=>{
        if(err) throw err;
        res.json({message:"Történet like-olva."});
    });
});

app.post("/api/hozzaszolas/:fiok_id/:tortenet_id",(req,res)=>{
    const fiok_id=req.params.fiok_id;
    const tortenet_id=req.params.tortenet_id;
    const{hozzaszolas}=req.body;
    db.query("INSERT INTO hozzaszolasok(fiok_id,tortenet_id,hozzaszolas) VALUES(?, ?, ?)",[fiok_id,tortenet_id,hozzaszolas],(err,results)=>{
        if(err) throw err;
        res.json({id:results.insertId,fiok_id:fiok_id,tortenet_id:tortenet_id,hozzaszolas});
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
    const{cim, tortenet, tortenet_datum_kezdet,tortenet_datum_vege,kep_url,telepulesek} = req.body;
    console.log(kep_url);
    db.query("UPDATE tortenetek SET cim=?,tortenet=?,tortenet_datum_kezdet=?,tortenet_datum_vege=?,kep_url=? WHERE id=?", [cim, tortenet, tortenet_datum_kezdet,tortenet_datum_vege,kep_url,id], (err) => {
        if (err) throw err;
        db.query("DELETE FROM tortenet_telepules WHERE tortenet_id=?",[id],(err)=>
        {
            if(err) throw err;
            telepulesek.forEach(i => 
            {
                db.query("INSERT INTO tortenet_telepules(tortenet_id,telepules_id)VALUES(?,(SELECT id FROM telepulesek WHERE telepules=?))",[id,i],(err)=>
                {
                    if(err) throw err;
                });       
            });
            res.json({message:"Történet frissült."});
        })
    });
});

//Törlések

app.delete("/api/fiokok/:id", (req, res) => {
    const id=req.params.id;
    db.query("SELECT id FROM tortenetek WHERE fiok_id=?",[id],(err,results)=>{
        if(err) throw err;
        results.forEach(i=>{
            db.query("DELETE FROM tortenet_telepules WHERE tortenet_id=?",[i.id],(err)=>{
                if(err) throw err;
            });   
        });
        db.query("DELETE FROM tortenetek WHERE fiok_id=?",[id],(err)=>{
            if(err) throw err;
            db.query("DELETE FROM fiokok WHERE id=?",[id],(err)=>{
                if(err) throw err;
            });
            res.json({message:"Fiók törölve"});
        });
    });
});

app.delete("/api/tortenetek/:id",(req,res)=>
{
    const id=req.params.id;
    db.query("DELETE FROM tortenet_telepules WHERE tortenet_id=?",[id],(err)=>{
        if(err) throw err;
        db.query("DELETE FROM tortenetek WHERE id=?",[id],(err)=>{
            if(err) throw err;
            res.json({message:"Történet törölve!"});
        });
    });
});

app.delete("/api/like/:fiok_id/:tortenet_id",(req,res)=>
{
    const fiok_id=req.params.fiok_id;
    const tortenet_id=req.params.tortenet_id;
    db.query("DELETE FROM likes WHERE fiok_id=? AND tortenet_id=?",[fiok_id,tortenet_id],(err)=>
    {
        if(err) throw err;
        res.json({message:"Történet like visszavonva."});
    });
});

//Szerver indítása

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});