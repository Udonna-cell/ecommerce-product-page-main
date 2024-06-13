const addItem = document.querySelector("button.add");
const removeItem = document.querySelector("button.minuse");
const output = document.querySelector("div.output");

// usable data
let itemCount = 0;

function counter(data) {}

addItem.addEventListener("click", () => {
  itemCount++;
  output.textContent = itemCount;
});

removeItem.addEventListener("click", () => {
  if (itemCount > 0) {
    itemCount--;
    output.textContent = itemCount;
  }
});
