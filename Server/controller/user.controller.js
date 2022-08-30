const db = require('../db');

class PersonController {
	async createPerson(req, res) {
		try {
			const {id, name, age, phone} = req.body;
			await db.query('INSERT INTO person(id, name, age, phone) VALUES($1, $2, $3, $4)', [id, name, age, phone]);
			res.json('ok!');
		} catch(e) {
			throw new Error;
		}
	}

	async getPerson(req, res) {
		try {
			const id = parseInt(req.params.id);
			const person = await db.query('select * from person where id = $1', [id]);
			res.json(person.rows);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getPersons(req, res) {
		try {
			const listOfPersons = await db.query('SELECT * FROM person;');
			res.json(listOfPersons.rows);
		} catch(err) {
			throw new Error(err.message);
		}
	}

	async updatePerson(req, res) {
		try {
			const {id, name, age, phone} = req.body;
			await db.query('UPDATE person set name = $1, age = $2, phone = $3 where id = $4', [name, age, phone, id]);
			res.json('Updated!');
		} catch(e) {
			throw new Error(e.message);
		}
	}

	async deletePerson(req, res) {
		try {
			const id = parseInt(req.params.id);
			await db.query('DELETE from person where id = $1', [id]);
			res.json('Deleted!');
		} catch(e) {
			throw new Error(e.message);
		}
	}
}

module.exports = new PersonController();
