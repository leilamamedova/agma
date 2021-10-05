const video_btns = document.querySelectorAll('.video-gallery .card');
const overlay = document.querySelector('.overlay__gallery');
const overlayVideo = document.querySelector('.overlay__gallery__inner video');


function showVideo(e) {
    overlay.classList.add('open');
    const src = e.currentTarget.querySelector('video').src;
    const source = document.createElement('source');
    source.setAttribute('src', src);

    overlayVideo.append(source)
}

function close() {
    overlay.classList.remove('open');
}

video_btns.forEach(button => {
    button.addEventListener('click', showVideo)
});
overlay.addEventListener('click', close);