let submitButton = document.getElementById("addPrefectures");

chrome.storage.local.get(null, (items) => {
  let registeredPrefectures = Object.keys(items);
  console.log(registeredPrefectures);
  let checkboxes = document.getElementsByName("prefecture");
  checkboxes.forEach((e) => {
    if(registeredPrefectures.includes(e.value)) {
      e.checked = true;
    }
  });
});

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
  //content.jsに対して変更処理を送る
  chrome.tabs.query( {active:true, currentWindow:true}, (tabs) => {
    // 取得したタブid(tabs[0].id)を利用してsendMessageする
    chrome.tabs.sendMessage(tabs[0].id, {message: 'prefecturesRegistered'}, (item) => {
      console.log(item);
    });
  });
};

submitButton.addEventListener("click", ()=> {
  let checkboxes = document.getElementsByName("prefecture");
  let checkedPrefectures = Array.from(checkboxes).filter(element => element.checked == true);
  console.log(checkedPrefectures[0].defaultValue);
  init(checkedPrefectures);
});
