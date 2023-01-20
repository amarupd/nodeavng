const empController = require('../controller/empcont')

const router = require('express').Router()



//*************************************************************************************************************************/



router.get('/getall', empController.getAll)



//***************************************************************************************************************************/

router.get('/getOne', empController.getOne)


module.exports = router;