<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('start', 'SmartTree.login.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $login = stripslashes($_POST['login']);
    $password = stripslashes($_POST['password']);

    $saltedPW =  $password . "alforlab";

    $hashedPW = hash('sha256', $saltedPW);


    $sql = "SELECT * FROM utente WHERE login='$login' and password='$hashedPW'"; // #9
    $handler->debug($sql, 'SmartTree.login.php');
    $result = array(); // #10

    if ($resultdb = $db->query($sql)) { // #11

      //$result->setFetchMode(PDO::FETCH_ASSOC);


      $rowcount = $resultdb->rowCount() ; // #12


      if($rowcount==1){

        $result = $resultdb->fetch();


        $result['success'] = true; // #15
        $result['msg'] = 'User authenticated!'; // #16

      } else {

        $result['success'] = false; // #17
        $result['msg'] = 'Incorrect user or password.'; // #18
      }



    } else {
        die("Error executing the query login");
    }

    echo json_encode($result); // #21

    $handler->debug($result, 'SmartTree.login.php');
?>
