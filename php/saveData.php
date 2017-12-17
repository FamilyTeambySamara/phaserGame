<?php
include "db.php";

$id_user = $_POST['id'];
$pass = $_POST['pass'];
$info = $_POST['info'];
$db = Db::getInstance();

if($pass == db->getPass()){
    switch ($info['method']) {
      case 'saveNewGame':
        $table = $info['table'];
        $game_next = $info['game_next'];
        $stars = $info['currentStars'];
        $score = $info['currentScore'];
        $status = $info['status'];
        $totalStars = $info['totalStars'];

        //запрос к соответствующей таблице игры
        $db->execute("UPDATE :table SET stars = :stars, score = :score, status = :status WHERE id_user = :id_user",
        [':id_user' => $id_user, ':table' => $table, ':stars' => $stars, ':score' => $score, ':status' => $status]);
        //запрос к таблице users для обновления общего количества звезд
        $db->execute("UPDATE users SET totalstars = :totalstars WHERE id = :id",
        [':id' => $id_user, ':totalStars' => $totalStars]);
        //запрос к таблице следующей игры для открытия доступа
        if ($game_next == 'end'){
          //открыть доступ к третьему эпизоду
        } else {
            $db->execute("UPDATE :table SET access = :access WHERE id_user = :id_user", [':id_user' => $id_user,':table' => $game_next, ':access' => 1]);
        }
        //возвращаем обновленную информацию
        echo getFullInfo ($id_user, $db);
        break;
      case 'saveReplayGame_1':
        $stars = $info['currentStars'];
        $score = $info['currentScore'];
        $totalStars = $info['totalStars'];

        //обновить таблицу game_1
        $db->execute("UPDATE game_1 SET stars = :stars, score = :score WHERE id_user = :id_user",
        [':id_user' => $id_user, ':stars' => $stars, ':score' => $score]);
        //обновить таблицу users
        $db->execute("UPDATE users SET totalstars = :totalstars WHERE id = :id_user",
        [':id_user' => $id_user, ':totalstars' => $totalStars]);

        break;
      case 'saveReplayGame':

        $stars = $info['currentStars'];
        $score = $info['currentScore'];
        $totalStars = $info['totalStars'];
        $table = $info['table'];

        //обновляем игровую таблицу
        $db->execute("UPDATE :table SET stars = :stars, score = :score WHERE id_user = :id_user",
        [':id_user' => $id_user, ':table' => $table, ':stars' => $stars, ':score' => $score]);
        //обновляем таблицу юзер
        $db->execute("UPDATE users SET totalstars = :totalstars WHERE id = :id_user",
        [':id_user' => $id_user, ':totalstars' => $totalStars]);

        break;
    }
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

    return json_encode($result);

?>
