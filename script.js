"use strict";

// declare variable
const btnSubmit = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableEl = document.querySelector("#tbody");
const btnHealthy = document.getElementById("healthy-btn");
const btncalcBMI = document.getElementById("bmi-btn");
// assignment2
const nav = document.querySelector("#sidebar");
const option = document.createElement("option");

// validate function
const validate = arr => {
  if (arr.id == "") {
    alert("Please input for ID");
    return false;
  }
  //  tạo validate  tránh trùng ID
  if (arrId.indexOf(arr.id) !== -1) {
    alert("ID must be unique");
    return false;
  }

  if (arr.name == "") {
    alert("Please input for Pet's name");
    return false;
  } else if (typeInput.value == "Select Type") {
    alert("Please input for Pet's type");
    return false;
  } else if (
    ageInput.value == "" ||
    parseInt(ageInput.value) < 1 ||
    parseInt(ageInput.value) > 15
  ) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (
    weightInput.value == "" ||
    parseInt(ageInput.value) < 1 ||
    parseInt(ageInput.value) > 15
  ) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (
    lengthInput.value == "" ||
    parseInt(ageInput.value) < 1 ||
    parseInt(ageInput.value) > 100
  ) {
    alert("Length must be between 1 and 15!");
    return false;
  } else if (breedInput.value == "Select Breed") {
    alert("Please input for Pet's breed");
    return false;
  } else {
    return true;
  }
};

// array list pet
let arrPet = JSON.parse(getFromStorage("arrPet", null) ?? "[]");

// tạo mảng chứa id của từng pet
let arrId = arrPet.map(el => Number(el.id));

// render list Pet valid form localstorage
renderTableData(arrPet);

// reset inputs form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  lengthInput.value = "";
  weightInput.value = "";
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  vaccinatedInput.checked = false;
  colorInput.value = "#000000";
  ageInput.value = "";
};

// delete Pet function
const deletePet = petId => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    // tìm vị trí object trong mảng
    let index = arrPet.findIndex(function checkId(arr) {
      return arr.id == petId;
    });
    // xoá 1 object tại vị trí cần xoá
    arrPet.splice(index, 1);
    localStorage.setItem("arrPet", JSON.stringify(arrPet));
    arrId.splice(index, 1);
    renderTableData(arrPet);
  }
};

// render list pet function
function renderTableData(petArr) {
  // delete the table before render
  tableEl.innerHTML = "";
  let html = ``;
  // dùng forEach để render các object trong mảng ra
  petArr.forEach(element => {
    html += `
    <tr>
      <th scope="row">${element.id}</th>
      <td>${element.name}</td>
      <td>${element.age}</td>
      <td>${element.type}</td>
      <td>${element.weight} kg</td>
      <td>${element.lengthPet} cm</td>
      <td>${element.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${element.color}"></i>
      </td>
      <td>${
        element.vaccinated
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${
        element.dewormed
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${
        element.sterilized
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${element.date}/
      ${element.month}/
      ${element.year}</td>
      <td>
        <button type="button" class="btn btn-danger" onclick="deletePet('${
          element.id
        }')">Delete</button>
      </td>
    </tr>
    `;
  });
  tableEl.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Type</th>
        <th>Weight</th>
        <th>Length</th>
        <th>Breed</th>
        <th>Color</th>
        <th>Vaccinated</th>
        <th>Dewormed</th>
        <th>Sterilized</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${html}
    </tbody>
  `;
}
// render option breed
function optionBreed(breedArr) {
  let html = ``;
  breedArr.forEach(el => {
    html += `
   
    <option>${el.breed}</option>
    `;
  });
  breedInput.innerHTML = `
   <option>Select Breed</option>
  ${html}`;
}
let breedArr = JSON.parse(getFromStorage("breedArr", null) ?? "[]");
optionBreed(breedArr);

// option breed theo type
typeInput.onchange = () => {
  let typeArr = breedArr.filter(el => el.type === typeInput.value);
  if (typeInput.value !== "Select Type") {
    optionBreed(typeArr);
  } else {
    optionBreed(breedArr);
  }
};

// press submit button
const KEY = "arrPet";
btnSubmit.addEventListener("click", function () {
  // data
  let newDate = new Date();
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    lengthPet: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: newDate.getDate(),
    month: newDate.getMonth(),
    year: newDate.getFullYear(),
  };
  console.log(data);
  if (validate(data)) {
    arrId.push(data.id);
    // push list pet to arrPet
    arrPet.push(data);
    saveToStorage(KEY, JSON.stringify(arrPet));
    clearInput();
    renderTableData(arrPet);
  }
});

// Show healthy pet function
let showHealthyPet = false;
btnHealthy.addEventListener("click", function () {
  let healthyPetArr = arrPet.filter(
    x => x.vaccinated == true && (x.dewormed == true) & (x.sterilized == true)
  );
  showHealthyPet = showHealthyPet == false ? true : false;
  if (showHealthyPet) {
    renderTableData(healthyPetArr);
    btnHealthy.textContent = "Show All Pets";
  } else {
    renderTableData(arrPet);
    btnHealthy.textContent = "Show Healthy Pet";
  }
});

// active sidebar
nav.addEventListener("click", function () {
  nav.classList.toggle("active");
});
