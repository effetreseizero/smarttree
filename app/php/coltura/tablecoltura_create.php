
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'SmartTree.tablecoltura_create.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'SmartTree');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);

            $resultdb   = array();

            $query = "INSERT INTO coltura (n_piano,n_coltura,codice,nome,obiett1,obiett2,obiett3,obiett4,obiett5,indirizzo)"
                    ."VALUES ($n_piano,COALESCE((SELECT MAX(n_coltura) + 1 FROM coltura WHERE n_piano=$n_piano),0),'$codice','$nome',$obiett1,$obiett2,$obiett3,$obiett4,$obiett5,'$indirizzo');";
            $handler->debug($query, 'SmartTree');

            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'SmartTree');
            array_push($result,$resultdb);
        }
    }



    echo json_encode($result);

?>
