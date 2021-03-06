const express=require('express');
const router=express.Router();

router.use(require('./candidateRoutes'));
router.use(require('./partiesRoutes'));
router.use(require('./votersRoutes'));
router.use(require('../apiRoutes/voteRoutes'));

module.exports=router;