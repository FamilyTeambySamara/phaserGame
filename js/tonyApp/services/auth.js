<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://vk.com/js/api/xd_connection.js?2"  type="text/javascript"></script> //подключение JS SDK

//Инициализация VK
<script type="text/javascript">
  VK.init(function() {
     // API initialization succeeded
     // Your code here
     VK.api("users.get", {"access_token": "DjUsoVJWogmtBEVzOa5R"}, function (data) {
           //ajax запрос к checkUser.php
           var id = data.response[0].id;
           var name = data.response[0].first_name;
       $.ajax({
          type: "POST",
          url: "php/checkUser.php",
          data: "id=" + id + "&name=" + name,
          success: function(result){
            // alert( "Прибыли данные: " + msg );
          }
      });

 });
  }, function() {

     // API initialization failed
     // Can reload page here
}, '5.69');
var id = 11111;
var name = vkUser;
$.ajax({
          type: "POST",
          url: "php/checkUser.php",
          data: "id=" + id + "&name=" + name,
          success: function(result){
            alert(result);
            // alert( "Прибыли данные: " + msg );
          }
      });
</script>
//===========================
