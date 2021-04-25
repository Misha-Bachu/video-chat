const Router = require('express');

const router = Router();

router.get('/live', (req, res, next) => {
    const jwtGenerator = require('../scripts/jwtGenerator');
    const { userName, roomId } = req.query;

    res.render('videoCall', {
        userName,
        roomId,
        token: jwtGenerator.generateJWT(userName, roomId)
    });
    next();
});

module.exports = router;
