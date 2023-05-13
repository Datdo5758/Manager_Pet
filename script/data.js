"use strict";

const btnImport = document.querySelector("#import-btn");
const btnExport = document.querySelector("#export-btn");
const inputFile = document.getElementById("input-file");

// export
btnExport.addEventListener("click", function () {
  let arrPet = getFromStorage("arrPet", null) ?? "[]";
  var blob = new Blob([arrPet], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "Pet.json");
});

// import
btnImport.addEventListener("click", function () {
  const file = inputFile.files[0];

  if (!file || !file.name.endsWith(".json")) {
    alert("Please select a valid JSON file");
    return;
  }

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const data = JSON.parse(reader.result);
    // Do something with the imported data
    console.log(data);
    localStorage.setItem("arrPet", JSON.stringify(data));
  };
});
