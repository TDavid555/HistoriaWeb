const mysql = require("mysql2");
function Adatbazis_kapcsolat(kapcsolat_adatok){
    const db=mysql.createConnection(kapcsolat_adatok);
    return db;
}

module.exports={Adatbazis_kapcsolat};