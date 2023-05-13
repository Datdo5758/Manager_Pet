"use strict";

// declare variable
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableEl = document.querySelector("#tbody");

// validate
const validate = arr => {
  if (arr.type == "Select Type") {
    alert("Please input for Pet's type");
    return false;
  }
  if (arr.breed == "") {
    alert("Please input for Pet's breed");
    return false;
  }
  return true;
};

// array list pet
let breedArr = JSON.parse(getFromStorage("breedArr", null) ?? "[]");

// render list Pet valid form localstorage
renderBreedTable(breedArr);

// reset inputs form
const clearInput = () => {
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
};

// delete Pet function
const deletePet = petId => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    // tìm vị trí object trong mảng
    let index = breedArr.findIndex(function checkId(arr, id) {
      return id === Number(petId);
    });
    // xoá 1 object tại vị trí cần xoá
    breedArr.splice(index, 1);
    // thay đổi dữ liệu trong localStorage
    localStorage.setItem("breedArr", JSON.stringify(breedArr));
    renderBreedTable(breedArr);
  }
};
// render function
function renderBreedTable(breedArr) {
  // delete the table before render
  tableEl.innerHTML = "";
  let html = ``;
  // dùng forEach để render các object trong mảng ra
  breedArr.forEach((element, id) => {
    html += `
    <tr>
      <td>${id + 1}</td>
      <td>${element.type}</td>
      <td>${element.breed}</td>
      <td>
        <button type="button" class="btn btn-danger" onclick="deletePet('${id}')">Delete</button>
      </td>
    </tr>
    `;
  });
  tableEl.innerHTML = `
    <thead>
      <tr>
      <th>#</th>
        <th>Type</th>
        <th>Breed</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${html}
    </tbody>
  `;
}

// press submit button
const KEY = "breedArr";
btnSubmit.addEventListener("click", function () {
  // data

  const data = {
    type: typeInput.value,
    breed: breedInput.value,
  };
  if (validate(data)) {
    // push list pet to arrPet
    breedArr.push(data);
    saveToStorage(KEY, JSON.stringify(breedArr));
    clearInput();
    renderBreedTable(breedArr);
  }
});
