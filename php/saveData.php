<?php
include "db.php";

$db = Db::getInstance();

$id_user = $_POST['id'];
$pass = $_POST['pass'];


 $info['table'] = $_POST['table'];
 $info['game_next'] = $_POST['game_next'];
 $info['currentStars'] = $_POST['currentStars'];
 $info['currentScore'] = $_POST['currentScore'];
 $info['status'] = $_POST['status'];
 $info['totalStars'] = $_POST['totalStars'];
 $info['method'] = $_POST['method'];


if($pass == $db->getPass() ){
    switch ($info['method']) {
      case 'saveNewGame':
        $table = $info['table'];
        $game_next = $info['game_next'];
        $stars = $info['currentStars'];
        $score = $info['currentScore'];
        $status = $info['status'];
        $totalStars = $info['totalStars'];

        //запрос к соответствующей таблице игры
        $db->execute("UPDATE {$table} SET stars =:stars , score =:score , status =:status WHERE id_user =:id_user " , [':id_user' => $id_user, ':stars' => $stars, ':score' => $score, ':status' => $status]);

        //запрос к таблице users для обновления общего количества звезд
        $db->execute("UPDATE users SET totalstars = :totalstars WHERE id = :id",
        [':id' => $id_user, ':totalstars' => $totalStars]);
        //запрос к таблице следующей игры для открытия доступа
        if ($game_next == 'end'){
          //открыть доступ к третьему эпизоду
        } else {
            $db->execute("UPDATE {$game_next} SET access = :access WHERE id_user = :id_user", [':id_user' => $id_user, ':access' => 1]);
        }
        //возвращаем обновленную информацию
        $fullInfo = getFullInfo ($id_user, $db);
        echo $fullInfo;
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

        // echo 'звезды'. $info['currentStars'] . 'счет' . $info['currentScore'] . 'всего звезд' . $info['totalStars'];
        $fullInfo = getFullInfo ($id_user, $db);
        echo $fullInfo;
        break;
      case 'saveReplayGame':

        $stars = $info['currentStars'];
        $score = $info['currentScore'];
        $totalStars = $info['totalStars'];
        $table = $info['table'];

        //обновляем игровую таблицу
        $db->execute("UPDATE {$table} SET stars = :stars, score = :score WHERE id_user = :id_user",
        [':id_user' => $id_user, ':stars' => $stars, ':score' => $score]);
        //обновляем таблицу юзер
        $db->execute("UPDATE users SET totalstars = :totalstars WHERE id = :id_user",
        [':id_user' => $id_user, ':totalstars' => $totalStars]);
        $fullInfo = getFullInfo ($id_user, $db);
        echo $fullInfo;
        break;
    }
}else {
  // echo $pass. '  ' . $db->getPass();
  // echo 'пароль' . $pass . '  метод' . $_POST['method'];
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
    $result['game_2']['g_9'] = $db->fetchOne("SELECT * FROM game_29 WHERE id_user = :id", [":id" => $id_user]);
    $result['game_2']['g_10'] = $db->fetchOne("SELECT * FROM game_210 WHERE id_user = :id", [":id" => $id_user]);

    return json_encode($result);
}
?>
