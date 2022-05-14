const mainMenuToggle = document.querySelector('.mobile_header .mobile_menu_opener');
const mainMenu = document.querySelector('.mobile-menu');
const mainMenuList = document.querySelector('.mobile-menu__list');
const mainMenuClose = document.querySelector('.mobile-menu__close');
const mainMenuParent = document.querySelectorAll('.has-child > a');
const mainMenuBack = document.querySelectorAll('.mobile-menu__back');
let resizeTimer;
/// Search container show/hide function

const container = document.querySelector(".search-container");
const openSearch = document.querySelectorAll(".openSearchBox");
let openSearchItem;
const input = document.querySelector("#searchInput");
let height = "208px";
let menu = $('.menu');

const isHidden = (el) => {
    return (el.offsetParent === null);
}

if ($(window).width() > 568) {
    openSearchItem = 0
} else {
    openSearchItem = 1
    height = '72px'
}

openSearch[openSearchItem].addEventListener("click", () => {
    container.classList.add("active");

    setTimeout(() => {
        container.style.height = height;
    }, 0);

});


document.addEventListener('click', (e) => {
    let isClickedOutside = (container.contains(e.target) || openSearch[openSearchItem].contains(e.target));
    console.log(isClickedOutside)
    if (!isClickedOutside) {
        container.style.height = "0px";
    }

})
if ($(window).width() > 568) {
    $(document).on('click', '.menu_opener:not(".deactive")', function(e) {
        const xPos = e.pageX;
        yPos = e.pageY - $(window).scrollTop();
        if (!xPos) xPos = parseInt($(window).width() - 80);
        if (!yPos) yPos = 50;


        const xP = xPos * 100 / $(window).width()
        yP = yPos * 100 / $(window).height()
        t = $(this);


        t.addClass("deactive")

        if (t.hasClass("active")) {
            t.removeClass("active");


            $("body").removeClass("hide_content")

            setTimeout(function() {
                menu.addClass("animated")

                setTimeout(function() {
                    menu.attr("style", "display:block; -webkit-clip-path: circle(0% at " + xP + "% " + yP + "%);  clip-path: circle(0% at " + xP + "% " + yP + "%); ")
                    $("body").removeClass("open_menu");
                    setTimeout(function() {
                        $("header").removeClass("animated")
                        menu.removeAttr("style").removeClass("animated")
                        t.removeClass("deactive")

                    }, 1000)
                }, 100)
            }, 1)

        } else {
            t.addClass("active")
            $("header").removeClass("white_header");


            menu.addClass("animated")
            setTimeout(function() {
                menu.attr("style", "-webkit-clip-path: circle(0% at " + xP + "% " + yP + "%); clip-path: circle(0% at " + xP + "% " + yP + "%); ").show();
                setTimeout(function() {
                    $("header").addClass("animated")
                    menu.attr("style", "display:block; -webkit-clip-path: circle(150% at " + xP + "% " + yP + "%); clip-path: circle(150% at " + xP + "% " + yP + "%); ")
                    $("body").addClass("open_menu")
                    setTimeout(function() {
                        menu.removeClass("animated")
                        t.removeClass("deactive")
                        $("body").addClass("hide_content")
                    }, 1000)
                }, 25)
            }, 1)
        }
    })

}

$(".owl-carousel").owlCarousel({
    autoplay: true,
    loop: true,
    margin: 32,
    autoWidth: true,
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 7000,
    nav: false,
    responsive: {
        0: {
            items: 1
        },

        600: {
            items: 3
        },

        1024: {
            items: 4
        },

        1366: {
            items: 4
        }
    }
});

// Encapsulate resizing
const menuTransition = () => {
    // Add and remove menu active (transition) class
    if (!isHidden(mainMenuToggle)) {
        mainMenu.classList.add('active');
    } else {
        mainMenu.classList.remove('active');
    }
}

// Run menuTransition() on resize
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(menuTransition, 250);

});

// Run menuTransition() on load
menuTransition();
// Menu Button Toggle
mainMenuToggle.addEventListener('click', function(e) {
    mainMenu.classList.toggle('is-visible');
    e.preventDefault();
});

// Menu Close Toggle
mainMenuClose.addEventListener('click', function(e) {
    mainMenu.classList.toggle('is-visible');
    mainMenuList.className = ('mobile-menu__list');
    e.preventDefault();
});

// Mobile Click Menu Transition
for (let i = 0; i < mainMenuParent.length; i++) {
    mainMenuParent[i].addEventListener('click', function(e) {
        const level = this.getAttribute('data-childLevel');
        const parent = this.parentNode;
        // Make parent active
        if (level === '1') {
            const openItems = document.querySelectorAll('.open');
            if (openItems.length) {
                openItems[0].classList.remove('open');
            }
            if (parent.classList) {
                parent.classList.add('open');
            } else {
                parent.className += ' ' + 'open';
            }
        }
        // Reset open items
        mainMenuList.className = ('mobile-menu__list');
        // Add is-active-LEVEL class for each section
        mainMenuList.classList ? mainMenuList.classList.add('is-active-' + level) :
            mainMenuList.className += ' ' + 'is-active-' + level

        e.preventDefault();
    });
}

// Mobile Menu Back button
for (let r = 0; r < mainMenuBack.length; r++) {
    mainMenuBack[r].addEventListener('click', function(e) {
        const level = this.getAttribute('data-childLevel');
        mainMenuList.className = ('mobile-menu__list');
        // Add is-active-LEVEL class for each section
        mainMenuList.classList ? mainMenuList.classList.add('is-active-' + level) :
            mainMenuList.className += ' ' + 'is-active-' + level;
        e.preventDefault();
    });
}


function toggleClass(elem, className) {
    if (elem.className.indexOf(className) !== -1) {
        elem.className = elem.className.replace(className, '');
    } else {
        elem.className = elem.className.replace(/\s+/g, ' ') + ' ' + className;
    }

    return elem;
}

function toggleDisplay(elem) {
    const curDisplayStyle = elem.style.display;

    if (curDisplayStyle === 'none' || curDisplayStyle === '') {
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }

}

function toggleMenuDisplay(e) {
    const dropdown = e.currentTarget.parentNode;
    const menu = dropdown.querySelector('.menu');

    toggleClass(menu, 'hide');
}

$(window).on('load', function() {
    $("#loading").fadeOut(1500)
});

$("#partners").owlCarousel({
    loop: true,
    margin: 32,
    autoplayTimeout: 5000,
    items: 6,
    slideBy: 1,
    nav: false,
    responsive: {
        0: {
            items: 2,

        },

        600: {
            items: 2,

        },
        992: {
            items: 3,

        },

        1024: {
            items: 4,

        },

        1366: {
            items: 6,

        }
    }
});

$("#media_partners").owlCarousel({
    loop: true,
    margin: 32,
    autoplayTimeout: 5000,
    items: 6,
    slideBy: 1,
    nav: false,
    responsive: {
        0: {
            items: 2,

        },

        600: {
            items: 2,

        },
        992: {
            items: 3,

        },

        1024: {
            items: 4,

        },

        1366: {
            items: 6,

        }
    }

});
