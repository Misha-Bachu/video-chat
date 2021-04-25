const Router = require('express');

const router = Router();

router.get('/live', (req, res, next) => {
    const jwtGenerator = require('../scripts/jwtGenerator');
    const { userName, roomId } = req.query;
    const inviteLink = `${req.get('host')}/home?roomId=${roomId}`;

    res.render('videoCall', {
        userName,
        roomId,
        inviteLink,
        token: jwtGenerator.generateJWT(userName, roomId)
    });
    next();
});

module.exports = router;
