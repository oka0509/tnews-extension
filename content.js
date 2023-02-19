let prefecturesDiv = document.getElementById('baito');
let prefecturesList = prefecturesDiv.children;

let prefecturesListLength = prefecturesList.length;
console.log(prefecturesListLength);

for(let i = 0; i< prefecturesListLength; i++) {
  if(prefecturesList[i].tagName == 'SPAN' &&
  prefecturesList[i].firstChild.textContent != '東京都' && 
  prefecturesList[i].firstChild.textContent != '過去の求人' ) {
    console.log(prefecturesList[i].firstChild.textContent);
    prefecturesList[i].style.visibility = 'hidden';
  }
}
