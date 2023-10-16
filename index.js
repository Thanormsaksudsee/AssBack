const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/Animal.sqlite');

app.use(express.json());
// app.use(express.static(__dirname + '/Myproject'));

// สร้างตาราง Habitat of Animal
db.run(`CREATE TABLE IF NOT EXISTS HabitatOfAnimal (
    AnimalID TEXT PRIMARY KEY,
    HabitatID TEXT
)`);

// สร้างตาราง Animal
db.run(`CREATE TABLE IF NOT EXISTS Animal (
    ID INTEGER PRIMARY KEY,
    Name TEXT,
    Data TEXT,
    Pic TEXT
)`);

// สร้างตาราง Habitat
db.run(`CREATE TABLE IF NOT EXISTS Habitat (
    ID INTEGER PRIMARY KEY,
    Name TEXT,
    Data TEXT,
    Pic TEXT
)`);

// CRUD สำหรับ HabitatOfAnimal
app.get('/HabitatOfAnimal', (req, res) => {
    db.all('SELECT * FROM HabitatOfAnimal', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/HabitatOfAnimal/:id', (req, res) => {
    db.get('SELECT * FROM HabitatOfAnimal WHERE AnimalID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('HabitatOfAnimal Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/HabitatOfAnimal', (req, res) => {
    const habitatOfAnimal = req.body;
    db.run('INSERT INTO HabitatOfAnimal (AnimalID, HabitatID) VALUES (?, ?)', habitatOfAnimal.AnimalID, habitatOfAnimal.HabitatID, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            habitatOfAnimal.AnimalID = this.lastID;
            res.send(habitatOfAnimal);
        }
    });
});

app.put('/HabitatOfAnimal/:id', (req, res) => {
    const habitatOfAnimal = req.body;
    db.run('UPDATE HabitatOfAnimal SET AnimalID = ?, HabitatID = ? WHERE AnimalID = ?', habitatOfAnimal.AnimalID, habitatOfAnimal.HabitatID, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(habitatOfAnimal);
        }
    });
});

app.delete('/HabitatOfAnimal/:id', (req, res) => {
    db.run('DELETE FROM HabitatOfAnimal WHERE AnimalID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

// CRUD สำหรับ Animal
app.get('/Animal', (req, res) => {
    db.all('SELECT * FROM Animal', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Animal/:id', (req, res) => {
    db.get('SELECT * FROM Animal WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Animal Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Animal', (req, res) => {
    const animal = req.body;
    db.run('INSERT INTO Animal (Name, Data, Pic) VALUES (?, ?, ?)', animal.Name, animal.Data, animal.Pic, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            animal.ID = this.lastID;
            res.send(animal);
        }
    });

});

app.put('/Animal/:id', (req, res) => {
    const animal = req.body;
    db.run('UPDATE Animal SET Name = ?, Data = ?, Pic = ? WHERE ID = ?', animal.Name, animal.Data, animal.Pic, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(animal);
        }
    });
});

app.delete('/Animal/:id', (req, res) => {
    db.run('DELETE FROM Animal WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

// CRUD สำหรับ Habitat
app.get('/Habitat', (req, res) => {
    db.all('SELECT * FROM Habitat', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Habitat/:id', (req, res) => {
    db.get('SELECT * FROM Habitat WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Habitat Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Habitat', (req, res) => {
    const habitat = req.body;
    db.run('INSERT INTO Habitat (Name, Data, Pic) VALUES (?, ?, ?)', habitat.Name, habitat.Data, habitat.Pic, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            habitat.ID = this.lastID;
            res.send(habitat);
        }
    });
});

app.put('/Habitat/:id', (req, res) => {
    const habitat = req.body;
    db.run('UPDATE Habitat SET Name = ?, Data = ?, Pic = ? WHERE ID = ?', habitat.Name, habitat.Data, habitat.Pic, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(habitat);
        }
    });
});

app.delete('/Habitat/:id', (req, res) => {
    db.run('DELETE FROM Habitat WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

