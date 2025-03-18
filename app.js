var items = JSON.parse(localStorage.getItem("items") || "[]");
var itemList = document.getElementById("itemList");
var itemInput = document.getElementById("itemInput");
var addBtn = document.getElementById("addBtn");
function renderItems() {
    itemList.innerHTML = "";
    items.forEach(function (item) {
        var li = document.createElement("li");
        li.innerHTML = "".concat(item.text, " <button onclick=\"editItem(").concat(item.id, ")\">Edit</button> <button onclick=\"deleteItem(").concat(item.id, ")\">Delete</button>");
        itemList.appendChild(li);
    });
}
function addItem() {
    if (itemInput.value.trim()) {
        var newItem = { id: Date.now(), text: itemInput.value };
        items.push(newItem);
        localStorage.setItem("items", JSON.stringify(items));
        itemInput.value = "";
        renderItems();
    }
}
function editItem(id) {
    var item = items.filter(function (i) { return i.id === id; })[0] || null;
    if (item) {
        var newText = prompt("Edit item:", item.text);
        if (newText !== null) {
            item.text = newText;
            localStorage.setItem("items", JSON.stringify(items));
            renderItems();
        }
    }
}
function deleteItem(id) {
    items = items.filter(function (i) { return i.id !== id; });
    localStorage.setItem("items", JSON.stringify(items));
    renderItems();
}
addBtn.addEventListener("click", addItem);
renderItems();
