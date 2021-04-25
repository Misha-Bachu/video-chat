const Video = require('twilio-video');
const chatContainer = document.querySelector('.js-chat-container');
const videoContainer = document.querySelector('.js-video-container');

function participantConnected(participant) {
    chatContainer.insertAdjacentHTML('beforeend',
        `<div class="row"><div class="coll-auto">${participant.identity} joined.</div></div>`);

    console.log('Participant "%s" connected', participant.identity);


    participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
            const track = publication.track;
            videoContainer.appendChild(track.attach());
        }
    });

    participant.on('trackSubscribed', track => {
        videoContainer.appendChild(track.attach());
    });
}

function participantDisconnected(participant) {
    console.log('Participant "%s" disconnected', participant.identity);

    chatContainer.insertAdjacentHTML('beforeend',
        `<div class="row"><div class="coll-auto">${participant.identity} left the call.</div></div>`);
}

function trackSubscribed(div, track) {
    div.appendChild(track.attach());
}

function trackUnsubscribed(track) {
    track.detach().forEach(element => element.remove());
}

function initVideoCall(token, roomId) {
    Video.connect(token, {
        name: roomId,
        video: { width: 640 },
        audio: true
    }).then(room => {
        console.log('Connected to Room "%s"', room.name);

        room.participants.forEach(participantConnected);
        room.on('participantConnected', participantConnected);

        room.on('participantDisconnected', participantDisconnected);
        room.once('disconnected', error => room.participants.forEach(participantDisconnected));
    });
}

function init() {
    if (videoContainer) {
        const token = videoContainer.dataset.token;
        const roomId = videoContainer.dataset.roomId;

        initVideoCall(token, roomId);
    }
}

module.exports = {
    init
}