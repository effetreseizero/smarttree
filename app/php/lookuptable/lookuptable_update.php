
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'SmartTree.lookuptable_update.php');

    require("../db_con.php"); // #1
    
    session_start(); // #2

    

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'SmartTree');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);
            
            $resultdb   = array();
            
            $query = "UPDATE lookuptable"
            ." SET text_v='$text_v'"
            ." WHERE (n_piano = $n_piano AND table_n='$table_n' AND field_n='$field_n' AND code_v=$code_v );";
            $handler->debug($query, 'SmartTree');
            
            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'SmartTree');
            array_push($result,$resultdb);
        }
    }

    echo json_encode($result);
?>