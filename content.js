chrome.storage.local.get(null, (items) => {
  let registeredPrefectures = Object.keys(items);
  let prefecturesDiv = document.getElementById('baito');
  let prefecturesList = prefecturesDiv.children;

  let prefecturesListLength = prefecturesList.length;
  for(let i = 0; i< prefecturesListLength; i++) {
    if(prefecturesList[i].tagName == 'SPAN' &&
    !registeredPrefectures.includes(prefecturesList[i].firstChild.textContent) && 
    prefecturesList[i].firstChild.textContent != '過去の求人' ) {
      prefecturesList[i].style.visibility = 'hidden';
    }
  }
});

chrome.runtime.onMessage.addListener((request, sendResponse) => {
  let resText = "visibility changed";

  chrome.storage.local.get(null, (items) => {
    let registeredPrefectures = Object.keys(items);

    let prefecturesDiv = document.getElementById('baito');
    let prefecturesList = prefecturesDiv.children;
  
    for(let i = 0; i< prefecturesList.length; i++) {
      if(prefecturesList[i].tagName == 'SPAN' &&
      prefecturesList[i].firstChild.textContent != '過去の求人') {
        if(!registeredPrefectures.includes(prefecturesList[i].firstChild.textContent)) {
          prefecturesList[i].style.visibility = 'hidden';
        }
        else {
          prefecturesList[i].style.visibility = 'visible';
        }
      }
    }
    sendResponse(resText);
  });
  return true;
});
