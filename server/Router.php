<?php

require './controller/UserController.php';

$url = $_SERVER['REQUEST_URI'];
$routes = [
    "/doctor-appointment/server/getUsers" => "UserController@getUsers",
    "/doctor-appointment/server/registerUser" => "UserController@RegisterUser",
    "/doctor-appointment/server/getUser/(\w+)" => "UserController@getUser",
    "/doctor-appointment/server/deleteUser/(\w+)" => "UserController@deleteUser",
];

foreach($routes as $key => $value){
    $pattern = "~^" . str_replace("/", "\\/", $key) . "$~";
    if(preg_match($pattern, $url, $matches)){
        $dividedRoutes = explode("@",$value);
        $controllerName = $dividedRoutes[0];
        $methodName = $dividedRoutes[1];
        $controller = new $controllerName();
        if(isset($matches[1])){
            $controller->$methodName($matches[1]);
        }else{
            $controller->$methodName();
        }
        exit();
    }
}

echo "404 Page Not Found";