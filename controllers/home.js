const Router = require('express');
const router = Router();

router.get('^/$|/home', (req, res, next) => {
    console.log(process.env.TWILIO_ACCOUNT_SID);

    const { roomId, userName } = req.query;

    res.render('homepage', {
        roomId,
        userName
    });
    next();
});

module.exports = router;
