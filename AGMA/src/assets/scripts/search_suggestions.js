

const searchInput = document.querySelector("#course__search");
const suggestions = document.querySelector(".suggestions");
const fruits = [
  "Grape",
  "Watermelon",
  "Melon",
  "Apple",
  "Pear",
  "Peach",
  "Banana",
  "Tangerine",
  "Green apple",
  "Coconut"
];

searchInput.addEventListener("input", ({ target }) => {
  let items = filterItemsBySearchTerm(fruits, target.value);
  if (target.checkValidity() && items.length) {
    suggestions.classList.add("show");
    pushItemsToDOM(items, suggestions);
  } else {
    suggestions.classList.remove("show");
  }
});

function filterItemsBySearchTerm(items, searchTerm) {
  const regex = new RegExp(searchTerm, "i");
  const filteredItems = items.filter((item) => regex.test(item));
  return filteredItems;
}

function pushItemsToDOM(items, el) {
  removeChildElements(el);
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    setSuggestionClickAction(li);
    el.appendChild(li);
  });
}

function removeChildElements(el) {
  if (el) el.innerHTML = "";
}

function setSuggestionClickAction(el) {
  el.addEventListener("click", ({ target }) => {
    searchInput.value = target.innerText;
    suggestions.classList.remove("show");
  });
}