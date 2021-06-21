const express = require("express");
const router = express.Router();
const fs = require("fs");
const persons = require('../db/person.json');

const writeData = (res, path, message) => {
    fs.writeFile(path, JSON.stringify(persons), (err) => {
        if (err) return res.json({"message": err.message});
        res.json(message);
    });
}

router.get('/', (req, res) => {
    if (req.query.name || req.query.age) {
        let filteredData;
        const regexName = new RegExp(req.query.name, "i");

        if (typeof(req.query.name) === 'undefined') {
            filteredData = persons.filter(person => person.age === req.query.age);
        } else if (typeof(req.query.age) === 'undefined') {
            filteredData = persons.filter(person => regexName.test(person.name));
        } else {
            filteredData = persons.filter(person => regexName.test(person.name) && person.age === req.query.age)
        }

        res.json(filteredData);
    } else {
        res.json(persons);
    }
});

router.get("/:id", (req, res) => {
    const person = persons.find(person => person.id === req.params.id)

    if (person) {
        res.json(person)
    } else {
        res.json({"message": "Data not found."})
    }
});

router.post('/', (req, res) => {
    const {id, name, age, address} = req.body;
    const person = {
        "id": id,
        "name": name,
        "age": age,
        "address": address
    };

    persons.push(person);
    writeData(res, "db/person.json", person);
});

router.patch('/:id', (req, res) => {
    const index = persons.findIndex(person => person.id === req.params.id);

    if (req.body.name) persons[index].name = req.body.name;
    if (req.body.age) persons[index].age = req.body.age;
    if (req.body.address) persons[index].address = req.body.address;

    writeData(res, "db/person.json", {"message": "Data has been altered."});
});

router.delete('/:id', (req, res) => {
    const personIndex = persons.findIndex(person => person.id === req.params.id);
    persons.splice(personIndex, 1);
    writeData(res, "db/person.json", {"message": "Data has been deleted."});
});

module.exports = router;