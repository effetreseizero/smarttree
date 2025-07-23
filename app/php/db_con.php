<?php

    //$dsn = 'mysql:host=localhost port=3306 dbname=a4l_smarttree user=a4l_admin password=alforlab';

    $servername = "127.0.0.1";
    //$servername = "79.7.177.89";
    $databasename = "a4l_smarttree";
    $username = "a4l_admin";
    $password = "alforlab";

    try{
     // create a PostgreSQL database connection
     $db = new PDO("mysql:host=$servername;dbname=$databasename", $username, $password);

     // display a message if connected to the PostgreSQL successfully
     if($db){
        $db->exec('SET search_path TO SmartTree');
     }
    }catch (PDOException $e){
     // report error message
     echo $e->getMessage();
    }


?>
