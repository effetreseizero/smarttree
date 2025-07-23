<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'SmartTree.tablepianta_create.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'SmartTree');

    $idnodo = $_POST['idnodo'];

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);

            $resultdb   = array();

            $query = "INSERT INTO pianta (rfid, idnodo, idmartellata, specie, classe, altezza, tariffa, qualita, gps_lon, gps_lat, accuracy, `timestamp`, note),the_geom"
                    ."VALUES ('$rfid', '$idnodo', '$idmartellata', '$specie', $classe, $altezza, $tariffa, '$qualita', $gps_lon, $gps_lat, $accuracy, '$timestamp', '$note',POINT($gps_lon, $gps_lat));";

            $handler->debug($query, 'SmartTree');

            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'SmartTree');
            array_push($result,$resultdb);
        }
    }



    echo json_encode($result);

?>
