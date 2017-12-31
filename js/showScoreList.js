var olUser1;
var olUser2;
window.showList = function (game) {
    // console.log(getInfo());
  // console.log( getScoreList(getInfo().user.id, "game_1"));

  getScoreList(getInfo().user.id, game);

  var darkLayer1 = document.createElement('div'); // слой затемнения
  darkLayer1.id = 'shadow'; // id чтобы подхватить стиль
  document.body.appendChild(darkLayer1); // включаем затемнение

  var modalWin1 = document.getElementById('popupWin1'); // находим наше "окно"
  modalWin1.style.display = 'block'; // "включаем" его

  var cancelUser1 =document.querySelector('.cancelUs1');

  cancelUser1.onclick = function () { // при клике на слой затемнения все исчезнет
  darkLayer1.parentNode.removeChild(darkLayer1); // удаляем затемнение
  modalWin1.style.display = 'none'; // делаем окно невидимым
  olUser1.innerHTML = "";
  olUser2.innerHTML = "";
  return false;
  };

  window.post1 = function (){
  var value = getElementById("choose").value;
  // alert(value);
  }

}


window.getSpicok1 = function (list) {

olUser1 = document.querySelector('.reit');


// var list = getScoreList(getInfo().user.id, "game_1");
var list = list.total_score;
// console.log(list);
for (var i = 0; i < list.length; i++){
  var divUser1 = document.createElement('div');
  var name = list[i].name;
  var score = list[i].score;
  var stars = list[i].stars;
  // var photofriends = users.foto[j];
  // var j=0;
var number1 = i+1;

  divUser1.innerHTML = '<table class="table1"> <tr>' +
  '<td class="stroka0 text-center">'+ number1 +' ' + '</td>' +
  '<td class="stroka1 text-center">' + name + '</td>' +
  '<td class="stroka2 text-center">' + score +
  '</td>'+
  '<td class="stroka3 text-center">' + stars+
  '</td> </tr> </table>'+ '<hr>';

  olUser1.appendChild(divUser1);
}

// console.log(olUser1);
// }
//отображение окна рейтинга
}

window.getUserScore = function (list) {

olUser2 = document.querySelector('.reitUser');
var divUser2 = document.createElement('div');
// divUser2.classList.add('text-primary');
// var list = getScoreList(getInfo().user.id, "game_1");

var name = list.user_score.name;
var score = list.user_score.score;
var stars = list.user_score.stars;
// var photofriends = users.foto[j];
// var j=0;

divUser2.innerHTML = '<table class="table1">' + '<tr> <td class="stroka0 text-primary text-center"> </td> <td class="stroka1 text-primary text-center">' +name + '</td>' +
'<td class="stroka2  text-primary text-center">' + score +
'</td>'+
'<td class="stroka3  text-primary text-center">' + stars+
'</td> </tr> </table>'+ '<hr>'

olUser2.appendChild(divUser2);
// console.log(olUser2);
// }
//отображение окна рейтинга
}
