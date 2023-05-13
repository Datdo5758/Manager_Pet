"use strict";

const btnFind = document.querySelector("#find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableEl = document.querySelector("#tbody");
// array pet
let arrPet = JSON.parse(getFromStorage("arrPet", null) ?? "[]");

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

// press find button
btnFind.addEventListener("click", function () {
  let findArr = arrPet.filter(
    arr =>
      // filter for search pet
      arr.id.toLowerCase().includes(idInput.value.toLowerCase()) &&
      arr.name.toLowerCase().includes(nameInput.value.toLowerCase()) &&
      arr.type
        .toLowerCase()
        .includes(
          typeInput.value.toLowerCase() == "select type"
            ? ""
            : typeInput.value.toLowerCase()
        ) &&
      arr.breed
        .toLowerCase()
        .includes(
          breedInput.value.toLowerCase() == "select breed"
            ? ""
            : breedInput.value.toLowerCase()
        ) &&
      (vaccinatedInput.checked == true
        ? arr.vaccinated == true
        : arr.id.includes("")) &&
      (dewormedInput.checked == true
        ? arr.dewormed == true
        : arr.id.includes("")) &&
      (sterilizedInput.checked == true
        ? arr.sterilized == true
        : arr.id.includes(""))
  );
  renderTableData(findArr);
});

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
