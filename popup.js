let submitButton = document.getElementById("addPrefectures");

function setLocalStorage(obj) {
  return new Promise( (resolve) => {
      chrome.storage.local.set( obj, () => resolve() );
  });
}

function getLocalStorage(key = null) {
  return new Promise( (resolve) => {
      chrome.storage.local.get(key, (item) => {
          key ? resolve(item[key]) : resolve(item);
      });
  });
}

let init = async (arr) => {
  for(let i = 0; i< arr.length; i++) {
    await setLocalStorage({[arr[i].defaultValue]: true});
  }
  let aaa = await getLocalStorage("北海道");
  console.log(aaa);
};
submitButton.addEventListener("click", ()=> {
  let checkboxes = document.getElementsByName("prefecture");
  let checkedPrefectures = Array.from(checkboxes).filter(element => element.checked == true);
  console.log(checkedPrefectures[0].defaultValue);
  init(checkedPrefectures);
});
