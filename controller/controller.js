
const db = require('../db');
class PersonController {
    async createPerson(req, res) {
        try {
            const {login,fullName,password,phoneNumber,birthDate,amount,cashback} = req.body;
            const user=await db.query('INSERT INTO person( login,fullName,password,phoneNumber,birthDate,amount, cashBackAmount) values ($1, $2, $3, $4, $5, $6,$7);', [login,fullName,password,phoneNumber,birthDate,amount, cashback]);
            res.json("Added!");
        } catch(e) {
            throw new Error(e.message);
        }
    }
    async getPersonByLogin(req,res){
        try {
			const login = req.params.login;
        
            // await db.connect();
			const person = await db.query('select * from person where login = $1 ;', [login]);
			res.json(person.rows);
		} catch (err) {
			throw new Error(err.message);
		}
    }
  
    async getPerson(req, res) {
		try {
			const id = parseInt(req.params.id);
            
            // await db.connect();
			const person = await db.query('select * from person where id = $1', [id]);
			res.json(person.rows);
		} catch (err) {
			throw new Error(err.message);
		}
	}
  
    async getPersons(req, res) {
        // console.log(req);
        try {
			const listOfPersons = await db.query('SELECT * FROM Person;');
			res.json(listOfPersons.rows);
		} catch(err) {
			throw new Error(err.message);
		}
    }
  
    async updatePerson(req, res) {
        try {
			const user=await db.query('UPDATE person set  fullName = $1,  birthDate = $2 where id = $3 returning *', [req.body.fullname, req.body.birthDate, req.body.id]);
			res.json(user);
		} catch(e) {
			throw new Error(e.message);
		}
    }
    async updateBalance(req, res) {
        try {
			const {id,senderID,receiverID,senderType,receiverType,cardReceiverID,cardSenderID,amount,status,date,cashBackID} = req.body;
           if (req.body.sendertype=="phone" ){
                await db.query('INSERT INTO transaction(SenderID,ReceiverID,senderType,receiverType,cardReceiverID,amount,status,date) values ($1, $2, $3, $4, $5, $6, $7,$8);', [senderID, receiverID,senderType,receiverType,cardReceiverID,amount,status, date]);
                await db.query("UPDATE person set amount=amount-$1 where id=$2",[amount,senderID]);
            }else{
                await db.query('INSERT INTO transaction(SenderID,ReceiverID,senderType,receiverType,cardsenderID,amount,status,date) values ($1, $2, $3, $4, $5, $6, $7,$8);', [senderID, receiverID,senderType,receiverType,cardSenderID,amount,status, date]);
                await db.query("UPDATE cards set amount=amount-$1 where id=$2",[amount,cardSenderID]);
            }
            
            if (req.body.receivertype=="phone" ){
                console.log("asd")
                await db.query("UPDATE person set amount=amount+$1 where id=$2",[amount,receiverID]);
            }else{
                await db.query("UPDATE cards set amount=amount+$1 where id=$2",[amount,cardReceiverID]);
            }
            console.log("ok")
			res.json('Updated!');
		} catch(e) {
			throw new Error(e.message);
		}
    }


    async getPersonByNumber(req,res){
        try {
			const phoneNumber = req.params.number;
			const list=await db.query('SELECT * FROM Person where phoneNumber = $1', [phoneNumber]);
			res.json(list.rows);
		} catch(e) {
			throw new Error(e.message);
		}
    }

    async getCardByNumber(req,res){
        try {
			const number = parseInt(req.params.Number);
			const list=await db.query('SELECT * FROM Cards where cardNumber = $1', [number]);
			res.json(list.rows);
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

    async getCard(req,res){
        try {
			const id = parseInt(req.params.id);
			const card = await db.query('select * from cards where id = $1', [id]);
			res.json(card.rows);
		} catch (err) {
			throw new Error(err.message);
		}
    }
    async getCards(req,res){
        try {
			const listOfCards = await db.query('SELECT * FROM cards;');
			res.json(listOfCards.rows);
		} catch(err) {
			throw new Error(err.message);
		}

    }
    async createCard(req,res){
        try {
            const {id,cardType,cardNumber,validTo,amount,cardsOwnerID, bankName} = req.body;
            await db.query('INSERT INTO cards(CardType,cardNumber,validTo,Amount,CardsOwnerID, bankName) values ($1, $2, $3, $4, $5, $6);', [cardType,cardNumber,validTo,amount,cardsOwnerID, bankName]);
            res.json("Added!");
        } catch(e) {
            throw new Error(e.message);
        }
    }
    async createCashback(req,res){
        try {
            const {place, percent} = req.body;
            await db.query('INSERT INTO cashbacks( place, percent) values ($1, $2);', [place, percent]);
            res.json("Added!");
        } catch(e) {
            throw new Error(e.message);
        }
    }

    async getTransaction(req,res){
        try {
			const id = parseInt(req.params.id);
			const transaction = await db.query('SELECT t.id,p.fullname as senderName, p1.fullname as receiverName, t.sendertype, t.receivertype, t.amount,  t.date, t.cashbackid FROM transaction as t, person as p, person as p1 where t.senderid=p.id and t.receiverid=p1.id; and id=$1', [id]);
			res.json(transaction.rows);
		} catch (err) {
			throw new Error(err.message);
		}

    }
    async getTransactions(req,res){
        try {
			const listOfTransactions = await db.query('SELECT t.id,p.fullname as senderName, p1.fullname as receiverName, t.sendertype, t.receivertype, t.amount,  t.date, t.cashbackid FROM transaction as t, person as p, person as p1 where t.senderid=p.id and t.receiverid=p1.id;');
			res.json(listOfTransactions.rows);
		} catch(err) {
			throw new Error(err.message);
		}

    }
    async getTransactionsFive(req, res){
        try {
			const listOfTransactions = await db.query('SELECT t.id,p.fullname as senderName, p1.fullname as receiverName, t.sendertype, t.receivertype, t.amount,  t.date, t.cashbackid FROM transaction as t, person as p, person as p1 where t.senderid=p.id and t.receiverid=p1.id order by date desc limit 5;');
			res.json(listOfTransactions.rows);
		} catch(err) {
			throw new Error(err.message);
		}
    }

    async postTransaction(req,res){
        try {
            const {id,senderID, receiverID,senderType,receiverType,amount,status, date,bonus} = req.body;
            await db.query('INSERT INTO transaction(ID,SenderID,ReceiverID,senderType,receiverType,amount,status,date,Bonus) values ($1, $2, $3, $4, $5, $6, $7,$8,$9);', [id,senderID, receiverID,senderType,receiverType,amount,status, date,bonus]);
            res.json("Added!");
        } catch(e) {
            throw new Error(e.message);
        }

    }

    async getCashbacks(req,res){
        try {
			const listOfCashbacks = await db.query('SELECT * FROM cashbacks;');
			res.json(listOfCashbacks.rows);
		} catch(err) {
			throw new Error(err.message);
		}
    }
  }
  
  module.exports = new PersonController();