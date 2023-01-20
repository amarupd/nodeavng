const empController = require('../controller/empcont')

const router = require('express').Router()


router.post('/addemp', empController.addEmp)

//*************************************************************************************************************************/



router.get('/getall', empController.getAll)



//***************************************************************************************************************************/

router.get('/getOne', empController.getOne)

router.put('/:id', empController.updateEmp)

module.exports = router;