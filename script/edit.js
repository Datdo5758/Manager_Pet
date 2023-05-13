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
const containerForm = document.querySelector("#container-form");

// validate function
const validate = arr => {
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
        <button type="button" class="btn btn-warning" onclick="editPet('${
          element.id
        }')">Edit</button>
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
// remove hide form function
function editPet(id) {
  let index = arrPet.findIndex(function checkId(arr) {
    return arr.id == id;
  });
  // show value of input form of pet
  idInput.value = arrPet[index].id;
  nameInput.value = arrPet[index].name;
  typeInput.value = arrPet[index].type;
  breedInput.value = arrPet[index].breed;
  lengthInput.value = arrPet[index].lengthPet;
  weightInput.value = arrPet[index].weight;
  dewormedInput.checked = arrPet[index].dewormed;
  sterilizedInput.checked = arrPet[index].sterilized;
  vaccinatedInput.checked = arrPet[index].vaccinated;
  colorInput.value = arrPet[index].color;
  ageInput.value = arrPet[index].age;
  containerForm.classList.remove("hide");
  idInput.readOnly = true;
}

// press submit button
const KEY = "arrPet";
btnSubmit.addEventListener("click", function () {
  let index = arrPet.findIndex(function checkId(arr) {
    return arr.id == idInput.value;
  });
  // new data after edit
  const newData = {
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
  };

  // edit data
  arrPet[index] = { ...arrPet[index], ...newData };
  if (validate(arrPet[index])) {
    // push newdata pet list to arrPet
    saveToStorage(KEY, JSON.stringify(arrPet));
    containerForm.classList.add("hide");
    renderTableData(arrPet);
  }
});
