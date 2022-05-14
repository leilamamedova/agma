const buttons = document.querySelectorAll('.photo-gallery .card');
const overlay = document.querySelector('.overlay__gallery');
const overlayImage = document.querySelector('.overlay__gallery__inner img');

function open(e) {
    overlay.classList.add('open');
    const src = e.currentTarget.querySelector('img').src;
    overlayImage.src = src;
}

function close() {
    overlay.classList.remove('open');
}

if (buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', open)
    });

}
if (overlay)
    overlay.addEventListener('click', close);
