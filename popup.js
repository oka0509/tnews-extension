let submitButton = document.getElementById("addPrefectures");
submitButton.addEventListener("click", ()=> {
  let checkboxes = document.getElementsByName("prefecture");
  checkboxes.forEach((element) => {
    console.log(element.value);
  });
});


