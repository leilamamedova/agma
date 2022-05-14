const video_btns = document.querySelectorAll('.video-gallery .card');
const overlay = document.querySelector('.overlay__gallery');
const overlayVideo = document.querySelector('.overlay__gallery__inner');


function showVideo(e) {
    overlay.classList.add('open');
    const src = e.currentTarget.querySelector('video');
    console.log({src})
    // source.setAttribute('src', src);
    // source.setAttribute('type', 'video/mp4');
    // var video = document.getElementById('video');
// var source = document.createElement('source');

// source.setAttribute('src', 'http://www.tools4movies.com/trailers/1012/Kill%20Bill%20Vol.3.mp4');

// video.appendChild(source);
overlayVideo.appendChild( document.createElement('iframe').setAttribute('src',src))
   
    // $('<iframe width="100%" height="100%" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    // .attr("src", src)
    // .appendTo(overlayVideo)
    // overlayVideo.play();

}

function close() {
    overlay.classList.remove('open');
}

// if(video_btns){
    video_btns.forEach(button => {
        button.addEventListener('click', showVideo)
    });
    
// }
if(overlay)
    overlay.addEventListener('click', close);