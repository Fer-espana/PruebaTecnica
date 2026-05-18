const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root1234',
    database: 'empleados_crud'
});

db.connect((err) => {
    if (err) {
        console.log("Error de conexión");
        console.log(err);
        return;
    }
    console.log("Conexión exitosa a MYSQL");
});

app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES(?,?,?,?,?)', [nombre, edad, pais, cargo, anios],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Empleado registrado exitosamente");
            }
        }
    )

});

app.get("/empleados", (req, res) => {

    db.query('SELECT * FROM empleados',
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    )

});

app.put("/Update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?', [nombre, edad, pais, cargo, anios, id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Empleado actualizado exitosamente");
            }
        }
    )
});


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM empleados WHERE id=?', id,
        (err, result) => {
            if (err) {
                console.log(err);
                console.log("Error al eliminar el empleado");
                res.status(500).send("Error al eliminar el empleado");
            }
            else {
                res.send("Empleado eliminado con exito!!");
            }
        }
    )
});


app.listen(3001, () => {
    console.log('Corriendo en el puerto 3001');
})