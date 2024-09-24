let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let mood = "create";
let test;

// Get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}

// Create product
let saveData;
if (localStorage.product == null) {
  saveData = [];
} else {
  saveData = JSON.parse(localStorage.product);
}

create.onclick = function () {
  let newobject = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newobject.count < 100
  ) {
    if (mood === "create") {
      if (newobject.count > 1) {
        for (let i = 0; i < newobject.count; i++) {
          saveData.push({ ...newobject, count: 1 });
        }
      } else {
        saveData.push(newobject);
      }
    } else {
      saveData[test] = newobject;
      mood = "create";
      create.innerText = "create";
      count.style.display = "block";
    }
    clearData();
  } else {
    alert("Please fill in all required fields correctly."); // Added validation feedback
  }

  localStorage.setItem("product", JSON.stringify(saveData)); // Save the array
  showData();
};

// Clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read the data
function showData() {
  let table = "";
  for (let i = 0; i < saveData.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${saveData[i].title}</td>
        <td>${saveData[i].price}</td>
        <td>${saveData[i].taxes}</td>
        <td>${saveData[i].ads}</td>
        <td>${saveData[i].discount}</td>
        <td>${saveData[i].total}</td>
        <td>${saveData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (saveData.length > 0) {
    btnDelete.innerHTML = `<button onclick='deleteAll()' id="deleteA">delete All</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// Delete
function deleteData(i) {
  saveData.splice(i, 1);
  localStorage.product = JSON.stringify(saveData);
  showData();
}

// Delete all
function deleteAll() {
  localStorage.clear();
  saveData.splice(0);
  showData();
}

// Update data
function updateData(i) {
  title.value = saveData[i].title;
  price.value = saveData[i].price;
  taxes.value = saveData[i].taxes;
  ads.value = saveData[i].ads;
  discount.value = saveData[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = saveData[i].category;
  create.innerHTML = "Update";
  mood = "update";
  test = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let search = "title";
let searchIcon = document.getElementById("search");

function getSearchMethod(id) {
  if (id === "searchbytitle") {
    search = "title";
    searchIcon.placeholder = "search by title";
  } else {
    search = "category";
    searchIcon.placeholder = "search by category";
  }
  searchIcon.focus();
  searchIcon.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (search === "title") {
    for (let i = 0; i < saveData.length; i++) {
      if (saveData[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${saveData[i].title}</td>
          <td>${saveData[i].price}</td>
          <td>${saveData[i].taxes}</td>
          <td>${saveData[i].ads}</td>
          <td>${saveData[i].discount}</td>
          <td>${saveData[i].total}</td>
          <td>${saveData[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
      `;
      }
    }
  } else {
    for (let i = 0; i < saveData.length; i++) {
      if (saveData[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${saveData[i].title}</td>
          <td>${saveData[i].price}</td>
          <td>${saveData[i].taxes}</td>
          <td>${saveData[i].ads}</td>
          <td>${saveData[i].discount}</td>
          <td>${saveData[i].total}</td>
          <td>${saveData[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
