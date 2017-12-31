<?php
include "db.php";

$db = Db::getInstance();

$pass = $_POST['pass'];
$id = $_POST['id'];
$game = $_POST['game'];

// $id = '1';
// $game = 'game_2';
//
// echo getFullInfo ($id, $game, $db);
// echo $_POST['id'] . $_POST['game'];
// exit();

if($pass == $db->getPass()){
  echo getFullInfo($id, $game, $db);
}


function getFullInfo ($id_user, $game, $db) {
    $result = [];
    if($game == 'game_1'){
      $result['user_score'] = $db->fetchOne("SELECT score, stars FROM  {$game} WHERE id = :id_user", [':id_user' => $id_user]);
      $user_name = $db->fetchOne("SELECT name FROM  users WHERE id = :id_user", [':id_user' => $id_user]);
      $result['user_score']['name'] = $user_name['name'];

      $result['total_score'] = $db->fetchAll("SELECT id_user, score, stars FROM  {$game} ORDER BY score DESC LIMIT 10");
      foreach ($result['total_score'] as $key => $value) {
        $id_user_all = $value['id_user'];
        $name = $db->fetchOne("SELECT name FROM users WHERE id = :id",  [':id' => $id_user_all]);
        $result['total_score'][$key]['name'] = $name['name'];

      }
      // $result['total_score'] = $db->fetchOne("SELECT score, stars FROM  {$game} ORDER BY stars DESC LIMIT 10", [':id_user' => $id_user]);
    }else if ($game == 'game_2'){
        //результат юзера
        // $result['user_score'] = $db->fetchOne("SELECT score, stars FROM  {$game} WHERE id = :id_user", [':id_user' => $id_user]);
          $result['user_score'] = [];
        for ($i = 1; $i < 11; $i++){
          $table = 'game_2' . $i;
          $user_score[] = $db->fetchAll("SELECT  score, stars FROM {$table} WHERE id = :id_user", [':id_user' => $id_user]);
        }
          // $user_score_temp = 0;
          // $user_stars_temp = 0;
            $result['user_score']['score'] = 0;
            $result['user_score']['stars'] = 0;

        foreach ($user_score as $value) {
          // print_r($value);
          if($result['user_score']['score'] < $value[0]['score']){
            $result['user_score']['score'] = $value[0]['score'];
            $result['user_score']['stars'] = $value[0]['stars'];
          }
        }
          // print_r($user_score);
          // print_r($result['user_score']);
          // $result['user_score']['score'] = $user_score_temp;
          // $result['user_score']['stars'] = $user_stars_temp;
        $user_name = $db->fetchOne("SELECT name FROM  users WHERE id = :id_user", [':id_user' => $id_user]);
        $result['user_score']['name'] = $user_name['name'];
        // print_r($result['user_score']);
        //=======================================

        for ($l = 1; $l < 11; $l++){
          $table = 'game_2' . $l;
          $score [] = $db->fetchAll("SELECT id_user, score, stars FROM {$table} ORDER BY score DESC LIMIT 10");
        }
        // print_r(   $score);
      // print_r(chooseBest($score)) ;
      $resultArray = chooseBest($score);
      // print_r($resultArray);
      // $l = 0;
      // $result = [];
      foreach ($resultArray as $key => $value) {
        $user_name = $db->fetchOne("SELECT name FROM  users WHERE id = :id_user", [':id_user' => $key]);
        $result['total_score'][] = ['name' => $user_name['name'], 'score' => $value[0], 'stars' => $value[1]];
        // $l++;
      }
      // print_r($result);
    }





    return json_encode($result);
    // return $result;
}

function chooseBest ($arr){
    $whole = [];
    $scoreTable = [];
    // print_r( $arr);
    foreach ($arr as $game_name => $game) {
      // print_r($arr);
        foreach ($game as $user) {
            // echo $value['score'];
            if(!isset($user['id_user'])){
              $whole[$user['id_user']] = [$user['score'],  $user['stars']];
              // $whole['stars'] = $user['stars'];
            }else{
              if($whole[$user['id_user']][0] < $user['score']){
                    $whole[$user['id_user']] = [$user['score'],  $user['stars']];
                  // $whole['stars'] = $user['stars'];
              }else if ($whole[$user['id_user']] == $user['score'] && $whole[$user['id_user']][0] <  $user['stars']){
                    $whole[$user['id_user']] = [$user['score'],  $user['stars']];
              }
            }
            // $scoreTable[] = $user['score'];
        }
    }
    //
    arsort($whole);
    // print_r($whole);
    //
    // arsort($scoreTable);
    // $amount = $scoreTable[9];
    //
    // $result = [];
    //
    // foreach ($whole as $key => $value) {
    //   if($value['score'] >= $amount){
    //       $result[$key] = $value['score'];
    //   }
    // }

    return $whole;
}

 ?>
