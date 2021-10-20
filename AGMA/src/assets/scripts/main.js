// Carousel
$('#header__info__carousel').owlCarousel({
  margin: 20,
  loop: true,
  nav: true,
  dots: false,
  navText: ["<div class='nav-button owl-prev'><i class='arrow left'></div>", "<div class='nav-button owl-next'><i class='arrow right'></i></div>"],
  responsive: {
    0: {
      items: 1
    }
  }
});

$("#partners").owlCarousel({
  margin: 36,
  autoplay: true,
  loop: true,
  autoplayTimeout: 3000,
  nav: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3,
    },

    1000: {
      items: 5
    },

    1600: {
      items: 6,
      stagePadding: 20
    },

    1700: {
      items: 5,
      stagePadding: 10
    }
  }
});

$('#course-info-badge').owlCarousel({
  margin: 20,
  loop: true,
  nav: true,
  dots: false,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 3
    },
    1000: {
      items: 4
    }
  }
});

$('#news-info-carousel').owlCarousel({
  margin: 30,
  loop: true,
  nav: true,
  dots: false,
  navText: ["<div class='nav-button owl-prev'><i class='far fa-chevron-left'></i></div>", "<div class='nav-button owl-next'><i class='far fa-chevron-right'></i></div>"],
  items: 1,
});

$('#about-us-carousel').owlCarousel({
  loop:true,
  margin:10,
  center:true,
  autoplay:true,
  items: 1,
  dots: true
  });

$('#fam-courses-carousel').owlCarousel({
  margin: 28,
  autoplay: true,
  loop: true,
  autoplayTimeout: 3000,
  nav: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1000: {
      items: 5
    },

    1150: {
      items: 4,
      stagePadding: 50
    },

    1400: {
      items: 5,
      stagePadding: 40
    },

    1600: {
      items: 5,
      stagePadding: 120
    },

    1700: {
      items: 5,
      stagePadding: 180
    }
  }
});


$('#statistics-carousel').owlCarousel({
  margin: 28,
  autoplay: true,
  loop: true,
  autoplayTimeout: 3000,
  nav: false,
  stagePadding: 15,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 2
    },

    1000: {
      items: 2
    }
  }
});

$('#fam-category-carousel').owlCarousel({
  margin: 28,
  autoplay: true,
  loop: true,
  autoplayTimeout: 3000,
  nav: false,
  responsive: {
    0: {
      items: 2
    },

    600: {
      items: 3
    },

    1000: {
      items: 5
    },

    1150: {
      items: 6,
      stagePadding: 30
    },

    1400: {
      items: 8,
      stagePadding: 20
    },

    1600: {
      items: 8,
      stagePadding: 100
    },

    1700: {
      items: 8,
      stagePadding: 160
    }
  }
});


// Menu
const mainMenuToggle = document.querySelector('.mobile_header .mobile_menu_opener');
const mainMenu = document.querySelector('.mobile-menu');
const mainMenuList = document.querySelector('.mobile-menu__list');
const mainMenuClose = document.querySelector('.mobile-menu__close');
const mainMenuParent = document.querySelectorAll('.has-child > a');
const mainMenuBack = document.querySelectorAll('.mobile-menu__back');
let resizeTimer;
let menu = $('.menu');

const isHidden = (el) => {
  return (el.offsetParent === null);
}

if ($(window).width() > 568) {
  $(document).on('click', '.menu_opener:not(".deactive")', function (e) {
    xPos = e.pageX;
    yPos = e.pageY - $(window).scrollTop();
    if (!xPos) xPos = parseInt($(window).width() - 80);
    if (!yPos) yPos = 50;


    const xP = xPos * 100 / $(window).width()
    yP = yPos * 100 / $(window).height()
    t = $(this);
    $('html').css({overflowY: 'hidden'})


    if (t.hasClass("active")) {
      t.removeClass("active");
      $('.menu_before').addClass('d-none')
      t.addClass("deactive")  

      $("body").removeClass("hide_content")

      setTimeout(function () {
        menu.addClass("animated")

        setTimeout(function () {
          menu.attr("style", "display:block; -webkit-clip-path: circle(0% at " + xP + "% " + yP + "%);  clip-path: circle(0% at " + xP + "% " + yP + "%); ")
          $("body").removeClass("open_menu");
          setTimeout(function () {
            $('.menu_before').removeClass('d-none')
            $("header").removeClass("animated")
            menu.removeAttr("style").removeClass("animated")
            t.removeClass("deactive")
            $('html').css({overflowY: 'auto'})

          }, 800)
        }, 100)
      }, 1)

    } else {
      t.addClass("active")
      $("header").removeClass("white_header");


      menu.addClass("animated")
      setTimeout(function () {
        menu.attr("style", "-webkit-clip-path: circle(0% at " + xP + "% " + yP + "%); clip-path: circle(0% at " + xP + "% " + yP + "%); ").show();
        setTimeout(function () {
          $("header").addClass("animated")
          menu.attr("style", "display:block; -webkit-clip-path: circle(150% at " + xP + "% " + yP + "%); clip-path: circle(150% at " + xP + "% " + yP + "%); ")
          $("body").addClass("open_menu")
          setTimeout(function () {
            menu.removeClass("animated")
            t.removeClass("deactive")
            $("body").addClass("hide_content")
          }, 1000)
        }, 25)
      }, 1)
    }
  })

}

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
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(menuTransition, 250);

});

// Run menuTransition() on load
menuTransition();
// Menu Button Toggle
mainMenuToggle.addEventListener('click', function (e) {
  mainMenu.classList.toggle('is-visible');
  e.preventDefault();
});

// Menu Close Toggle
mainMenuClose.addEventListener('click', function (e) {
  mainMenu.classList.toggle('is-visible');
  mainMenuList.className = ('mobile-menu__list');
  e.preventDefault();
});

// Mobile Click Menu Transition
for (let i = 0; i < mainMenuParent.length; i++) {
  mainMenuParent[i].addEventListener('click', function (e) {
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
  mainMenuBack[r].addEventListener('click', function (e) {
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

$(window).on('load', function () {
  $("#loading").fadeOut(1500)
});

// Search
const container = document.querySelector(".search-container");
const openSearch = document.querySelectorAll(".openSearchBox");
let openSearchItem;
const input = document.querySelector("#searchInput");
let height = "136px";

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
  if (!isClickedOutside) {
    container.style.height = "0px";
  }

})

// Tabs
$('.nav li a').click(function () {
  $('.nav li a').removeClass("active");
  $(this).addClass("active");
});

// Password input
$(".toggle-password").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  let input = document.querySelector('.password_input')
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
});

// Date Picker
$("input[type='date']").css("color",'#ACB3B8');
$("input[type='date']").click(function () {
  $(this).css("color",'#2E3131');
})  

// Select Options
$(document).ready(function () {
  $('select').selectize({
      sortField: 'text'
  });
});

// Textarea Counter
let textarea = document.querySelector('.contact-content--form textarea');

textarea.addEventListener("input", event => {
  const target = event.currentTarget;
  const currentLength = target.value.length;
  document.querySelector('.textarea-counter span').innerHTML = currentLength;
});