<?php
    require("../db_con.php"); // #1

    session_start(); // #2

    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'SmartTree.tablenodo_read.php');

    $idutente = $_POST['idutente'];

    $sql = "SELECT"
            ." nf.idnodo,"
            ." nf.nome,"
            ." nf.localita"
            ." FROM nodo_filiera nf"
            ." LEFT JOIN utente_nodo_filiera unf"
            ." ON nf.idnodo = unf.idnodo"
            ." WHERE idutente='$idutente'"
            ." ORDER BY nf.nome ASC;";

    $handler->debug($sql, 'SmartTree');

    $result = array(); // #10

    if ($resultdb = $db->query($sql)) { // #11

        while($record = $resultdb->fetch()){
            $result[]= $record;
        }

    } else {
        die("Error executing the query");
    }

    $handler->debug($result, 'SmartTree');

    echo json_encode($result);


?>
