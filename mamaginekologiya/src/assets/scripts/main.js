// Mobile menu variables
const mainMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainMenu = document.querySelector('.mobile-menu');
const mainMenuList = document.querySelector('.mobile-menu__list');
const mainMenuClose = document.querySelector('.mobile-menu__close');
const mainMenuParent = document.querySelectorAll('.has-child > a');
const mainMenuBack = document.querySelectorAll('.mobile-menu__back');
let resizeTimer;
/// Search container show/hide function

const container = document.querySelector(".search-container");
let input = document.querySelector("#searchBox");
const height = "80px";

const isHidden = (el) => {
    return (el.offsetParent === null);
}

if (!isHidden(mainMenuToggle)) {
    input = document.querySelector('#mobileSearchBtn')
}

input.addEventListener("click", () => {
    console.log('tst')
    container.classList.add("active");
    container.style.height = "auto";

    container.style.height = "0px";

    setTimeout(() => {
        container.style.height = height;
    }, 0);

});

document.addEventListener('click', (e) => {
    let isClickedOutside = (container.contains(e.target) || input.contains(e.target));

    if (!isClickedOutside) {
        container.style.height = "0px";
    }

})



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

function handleOptionSelected(e) {
    toggleClass(menu, 'hide');

    const shortName = e.target.getAttribute('data-lang');
    const newValue = shortName + ' ';
    const titleElem = document.querySelector('.lang-dropdown .title');
    const icon = document.querySelector('.lang-dropdown .title .far');
    e.target.classList.add('active')



    titleElem.textContent = newValue;
    titleElem.appendChild(icon);

    //trigger custom event
    document.querySelector('.lang-dropdown .title').dispatchEvent(new Event('change'));
    //setTimeout is used so transition is properly shown
}


//get elements
const dropdownTitle = document.querySelector('.lang-dropdown .title');
const dropdownOptions = document.querySelectorAll('.lang-dropdown .option');
const dropdownLink = document.querySelectorAll('.lang-dropdown .option a');
const menu = document.querySelector('.menu')

//bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click', handleOptionSelected));