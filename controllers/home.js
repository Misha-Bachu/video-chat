const Router = require('express');
const router = Router();

router.get('^/$|/home', (req, res, next) => {
    const { roomId, userName } = req.query;

    res.render('homepage', {
        roomId,
        userName
    });
    next();
});

module.exports = router;
