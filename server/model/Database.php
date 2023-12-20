<?php

class Database {

    public function db(){
        $host = "localhost";
        $user = "root";
        $pass = "";
        $dbname= "doctor_appointment";
        // $charset = "utf8mb4";

        $connection = mysqli_connect($host , $user , $pass , $dbname);
        if(!$connection){
            die("Connection failed: ". mysqli_connect_error());
        }
        return $connection;
    }
}