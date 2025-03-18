interface Item {
  id: number;
  text: string;
}

let items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");
const itemList = document.getElementById("itemList") as HTMLUListElement;
const itemInput = document.getElementById("itemInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;

function renderItems() {
  itemList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.text} <button onclick="editItem(${item.id})">Edit</button> <button onclick="deleteItem(${item.id})">Delete</button>`;
    itemList.appendChild(li);
  });
}

function addItem() {
  if (itemInput.value.trim()) {
    const newItem: Item = { id: Date.now(), text: itemInput.value };
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
    itemInput.value = "";
    renderItems();
  }
}

function editItem(id: number) {
  const item = items.filter((i) => i.id === id)[0] || null;

  if (item) {
    const newText = prompt("Edit item:", item.text);
    if (newText !== null) {
      item.text = newText;
      localStorage.setItem("items", JSON.stringify(items));
      renderItems();
    }
  }
}

function deleteItem(id: number) {
  items = items.filter((i) => i.id !== id);
  localStorage.setItem("items", JSON.stringify(items));
  renderItems();
}

addBtn.addEventListener("click", addItem);
renderItems();
