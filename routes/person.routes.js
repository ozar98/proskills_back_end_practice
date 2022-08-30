let Router = require('express');
const PersonController = require('../controller/controller');
const router= new Router();

router.get('/user:id', PersonController.getPerson);
router.get('/person:login',PersonController.getPersonByLogin)
router.get('/people',PersonController.getPersons);
router.post('/user',PersonController.createPerson);
router.delete('/user/:id',PersonController.deletePerson);
router.put('/user',PersonController.updatePerson);
router.put('/userBalance', PersonController.updateBalance);

router.get('/phone:number', PersonController.getPersonByNumber);

router.get('/card/:id', PersonController.getCard);
router.get('/cards',PersonController.getCards);
router.post('/card',PersonController.createCard);
router.get('/card:Number',PersonController.getCardByNumber);

router.get('/transaction:id', PersonController.getTransaction);
router.get('/listtrans',PersonController.getTransactions);
//router.post('/transaction',PersonController.postTransaction);
router.get('/lastfivetr', PersonController.getTransactionsFive);



router.get('/cashbacks/', PersonController.getCashbacks);
router.post('/cashback', PersonController.createCashback);





module.exports = router;