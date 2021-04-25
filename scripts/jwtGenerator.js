const Twilio = require('twilio');

function generateJWT(userName, roomId) {
    const AccessToken = Twilio.jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;

    // Substitute your Twilio AccountSid and ApiKey details
    const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
    const API_KEY_SID = process.env.TWILIO_API_KEY_SID;
    const API_KEY_SECRET = process.env.TWILIO_API_KEY_SECRET;

    // Create an Access Token
    const accessToken = new AccessToken(
        ACCOUNT_SID,
        API_KEY_SID,
        API_KEY_SECRET
    );

    // Set the Identity of this token
    accessToken.identity = userName;

    // Grant access to Video
    const grant = new VideoGrant();
    grant.room = roomId;
    accessToken.addGrant(grant);

    // Serialize the token as a JWT
    const jwt = accessToken.toJwt();
    return jwt;
}

module.exports = {
    generateJWT
}