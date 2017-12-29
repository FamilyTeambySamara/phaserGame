
    window.showModalWin = function (users, photo) {
        var users = users;
        var olUser = document.querySelector('.media');
        getSpicok(users, olUser);
        var darkLayer = document.createElement('div'); // слой затемнения
        darkLayer.id = 'shadow'; // id чтобы подхватить стиль
        document.body.appendChild(darkLayer); // включаем затемнение

        var modalWin = document.getElementById('popupWin'); // находим наше "окно"
        modalWin.style.display = 'block'; // "включаем" его

        var cancelUser = document.querySelector('.cancelUs');
        var postPhotoUser =document.querySelector('.postPhoto');

        cancelUser.onclick = function () {  // при клике на слой затемнения все исчезнет
              darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
              olUser.innerHTML = "";
              modalWin.style.display = 'none'; // делаем окно невидимым
              return false;
                        };
        postPhotoUser.onclick = function () {
              //находим выбранного пользователя
              for (var n = 0; n < users.length; n++){
                  var chekUser = document.getElementById(users[n].id);
                  // console.log(chekUser);
                  if(chekUser.checked){
                    if(photo == "photo-159168333_456239017"){
                      post(users[n].id, photo, '-159168462');
                      break;
                    }else{
                      post(users[n].id, photo, '-159168482');
                    }

                  }
              }
              darkLayer.parentNode.removeChild(darkLayer);
              olUser.innerHTML = "";
              modalWin.style.display = 'none';
              return false;
        }

    }

    window.getSpicok = function (users, olUser) {
      for (var j = 0; j < users.length; j++) {

        var divUser = document.createElement('div');
        divUser.classList.add('checkbox');
        // var firstNamefriends = 'Вика';
        // var lastNamefriends = 'Цыман';
        // var fullNamefriends = firstNamefriends + " " + lastNamefriends;
        // var photofriends = "12.png"
        var idUser = users[j].id;
        var firstNamefriends = users[j].first_name;
        var lastNamefriends = users[j].last_name;
        var fullNamefriends = firstNamefriends + " " +  lastNamefriends;
        var photofriends = users[j].photo_50;

        divUser.innerHTML = '<label>' +  '<input type="checkbox" name="123" id =' + idUser + '>'
        + '<div class="media-body">' + '<h4 class="media-heading">' +  fullNamefriends + '</h4>' +
        '</div>' + '<div class="media-left">' +
          '<img class="media-object img-circle" src=' + photofriends + ' alt="..." width="50px">'+
          '</div>'+ '</label>';

      olUser.appendChild(divUser);
    }
    };
    // showModalWin();
