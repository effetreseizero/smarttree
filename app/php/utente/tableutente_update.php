<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'SmartTree.tableutente_update.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'SmartTree');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);

            $resultdb   = array();

            if($password_new!="" and ($password_new==$password_new_chk)){
                $password=hash('sha256', $password_new."alforlab");
            }

            $query = "UPDATE utente"
            ." SET "
                ." password='$password',"
                ." livello_sw='$livello_sw',"
                ." nome='$nome',"
                ." cognome='$cognome',"
                ." organizzazione='$organizzazione',"
                ." email='$email',"
                ." telefono='$telefono'"
            ." WHERE (idutente = '$idutente');";

            $handler->debug($query, 'SmartTree');
            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'SmartTree');
            array_push($result,$resultdb);
        }
    }

    echo json_encode($result);

?>
