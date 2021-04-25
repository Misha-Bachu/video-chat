const urlUtils = require('../scripts/utils/urlUtils');

function validate(req, res, next) {
    const { roomId, userName } = req.query;

    if (roomId === undefined || roomId === '' || userName === undefined || userName === '') {
        const params = {};
        if (roomId) {
            params.roomId = roomId;
        }

        if (userName) {
            params.userName = userName;
        }

        let redirectUrl = '/';
        if (Object.keys(params).length) {
            redirectUrl = urlUtils.appendQueryParams(redirectUrl, params);
        }

        res.redirect(redirectUrl);
        return;
    }

    next();
}

module.exports = {
    validate
};