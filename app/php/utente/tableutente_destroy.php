<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'SmartTree.tableutente_destroy.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'SmartTree');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);


            $resultdb   = array();

            $query = "DELETE FROM utente"
                    ." WHERE (idutente = '$idutente');";
            $handler->debug($query, 'SmartTree');

            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'SmartTree');
            array_push($result,$resultdb);
        }
    }



    echo json_encode($result);

?>
