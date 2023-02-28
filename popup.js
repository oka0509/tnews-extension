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

function clearLocalStorage() {
  return new Promise( (resolve) => {
    chrome.storage.local.clear(() => {
      resolve();
    })
  });
}

let init = async (arr) => {
  await clearLocalStorage();
  for(let i = 0; i< arr.length; i++) {
    await setLocalStorage({[arr[i].defaultValue]: true});
  }
  // let aaa = await getLocalStorage("北海道");
  // console.log(aaa);
  //content.jsに対して変更処理を送る
};
submitButton.addEventListener("click", ()=> {
  let checkboxes = document.getElementsByName("prefecture");
  let checkedPrefectures = Array.from(checkboxes).filter(element => element.checked == true);
  console.log(checkedPrefectures[0].defaultValue);
  init(checkedPrefectures);
});
