<?php
include "php/db.php";

//Проверка пользователя в БД
//В библиотеке ПДо посмотреть функции для обработки данных
$id_vk = $_POST['id_vk'];
$name = $_POST['name'];

if ($_SESSION['start'] == 1){
  $pass = $_POST['pass'];
}


// $id_vk = 909001;
// $name = 'Ivanov';


$db = Db::getInstance();
// if ($pass == db->getPass()){}

$result = getUser ($id_vk, $db);
if ($result){
    $id_user = $result['id'];
    $fullInfo = getFullInfo ($id_user, $db);
    echo $fullInfo;
} else {
    $id_user = addUser($id_vk, $name, $db);
    $fullInfo = getFullInfo ($id_user, $db);
    echo $fullInfo;
}


function addUser ($id_vk, $name, $db) {

      $db->execute("INSERT INTO users(id_vk, name, totalstars, totalscore) VALUES(:id_vk, :name, 0, 0)", [':id_vk' => $id_vk, ':name' => $name]);

      $id_user = getUserId($id_vk, $db)['id'];
      //добавляем пользователя во все игры
      $db->execute("INSERT INTO game_1(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      $db->execute("INSERT INTO game_21(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      $db->execute("INSERT INTO game_22(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      $db->execute("INSERT INTO game_23(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      $db->execute("INSERT INTO game_24(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      $db->execute("INSERT INTO game_25(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      $db->execute("INSERT INTO game_26(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      $db->execute("INSERT INTO game_27(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      $db->execute("INSERT INTO game_28(id_user) VALUES(:id_user)", [':id_user' => $id_user]);
      return $id_user;
}

function getUser ($id_vk, $db){
    return $db->fetchOne("SELECT * FROM  users WHERE id_vk = :id_vk", [':id_vk' => $id_vk]);
}

function getUserId ($id_vk, $db){
    return $db->fetchOne("SELECT id FROM  users WHERE id_vk = :id_vk", [':id_vk' => $id_vk]);
}

function getFullInfo ($id_user, $db) {
    $result = [];
    $result['user'] = $db->fetchOne("SELECT * FROM  users WHERE id = :id_user", [':id_user' => $id_user]);
    $result['game_1'] = $db->fetchOne("SELECT * FROM game_1 WHERE id_user = :id_user", [":id_user" => $id_user]);
    $result['game_2'] = [];
    $result['game_2']['g_1'] = $db->fetchOne("SELECT * FROM game_21 WHERE id_user = :id", [":id" => $id_user]);
    $result['game_2']['g_2'] = $db->fetchOne("SELECT * FROM game_22 WHERE id_user = :id", [":id" => $id_user]);
    $result['game_2']['g_3'] = $db->fetchOne("SELECT * FROM game_23 WHERE id_user = :id", [":id" => $id_user]);
    $result['game_2']['g_4'] = $db->fetchOne("SELECT * FROM game_24 WHERE id_user = :id", [":id" => $id_user]);
    $result['game_2']['g_5'] = $db->fetchOne("SELECT * FROM game_25 WHERE id_user = :id", [":id" => $id_user]);
    $result['game_2']['g_6'] = $db->fetchOne("SELECT * FROM game_26 WHERE id_user = :id", [":id" => $id_user]);
    $result['game_2']['g_7'] = $db->fetchOne("SELECT * FROM game_27 WHERE id_user = :id", [":id" => $id_user]);
    $result['game_2']['g_8'] = $db->fetchOne("SELECT * FROM game_28 WHERE id_user = :id", [":id" => $id_user]);
    if ($_SESSION['start'] == 0){
      $result['pass'] = $db->getPass();
      $_SESSION['start'] = 1;
    }
    return json_encode($result);
}
 ?>
