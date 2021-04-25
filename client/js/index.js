const video = require('./video/video');

function initEvents() {
    const copyButtons = document.querySelectorAll('.js-copy-button');

    if (copyButtons) {
        copyButtons.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                var copyText = event.target.closest('.js-copy-block').querySelector('.js-copy-content');
                copyText.select();
                copyText.setSelectionRange(0, 99999);
                document.execCommand('copy');
            });
        });
    }
}

function init() {
    initEvents();

    video.init();
};

init();