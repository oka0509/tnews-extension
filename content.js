chrome.storage.local.get(null, (items) => {
  let registeredPrefectures = Object.keys(items);
  console.log(registeredPrefectures);
  let prefecturesDiv = document.getElementById('baito');
  let prefecturesList = prefecturesDiv.children;

  let prefecturesListLength = prefecturesList.length;
  console.log(prefecturesListLength);
  for(let i = 0; i< prefecturesListLength; i++) {
    if(prefecturesList[i].tagName == 'SPAN' &&
    !registeredPrefectures.includes(prefecturesList[i].firstChild.textContent) && 
    prefecturesList[i].firstChild.textContent != '過去の求人' ) {
      console.log(prefecturesList[i].firstChild.textContent);
      prefecturesList[i].style.visibility = 'hidden';
    }
  }
});

chrome.runtime.onMessage.addListener((request, sendResponse) => {
  let resText = "visibility changed";
  console.log(request.message);

  chrome.storage.local.get(null, (items) => {
    let registeredPrefectures = Object.keys(items);
    console.log(registeredPrefectures);

    let prefecturesDiv = document.getElementById('baito');
    let prefecturesList = prefecturesDiv.children;
  
    let prefecturesListLength = prefecturesList.length;
    console.log(prefecturesListLength);
  
    for(let i = 0; i< prefecturesListLength; i++) {
      if(prefecturesList[i].tagName == 'SPAN' &&
      prefecturesList[i].firstChild.textContent != '過去の求人') {
        if(!registeredPrefectures.includes(prefecturesList[i].firstChild.textContent)) {
          console.log(prefecturesList[i].firstChild.textContent);
          prefecturesList[i].style.visibility = 'hidden';
        }
        else {
          prefecturesList[i].style.visibility = 'visible';
        }
      }
    }
  });
  sendResponse(resText);
  return;
});
