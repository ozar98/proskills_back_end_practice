const Router = require('express')
const router = new Router();

// .. in last folder
const personController = require('../controller/user.controller');


router.get('/user/:id', personController.getPerson);

router.get('/users', personController.getPersons);

router.post('/user', personController.createPerson);

router.delete('/user/:id', personController.deletePerson);
router.put('/user', personController.updatePerson);

module.exports = router