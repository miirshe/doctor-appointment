<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include './controller/UserController.php';
include './controller/PatientController.php';
include './controller/HospitalController.php';
include './controller/DoctorController.php';
include './controller/ProfessionController.php';
include './controller/DiagnosesController.php';
include './model/Database.php';
$connection = new Database();
$db = $connection->db();
$url = $_SERVER['REQUEST_URI'];
$routes = [
    "/doctor-appointment/server/getUsers" => "UserController@getUsers",
    "/doctor-appointment/server/registerUser" => "UserController@registerUser",
    "/doctor-appointment/server/getUser/(\w+)" => "UserController@getUser",
    "/doctor-appointment/server/deleteUser/(\w+)" => "UserController@deleteUser",
    "/doctor-appointment/server/updateUser/(\w+)" => "UserController@updateUser",
    "/doctor-appointment/server/getPatients" => "PatientController@getPatients",
    "/doctor-appointment/server/registerPatient" => "PatientController@registerPatient",
    "/doctor-appointment/server/updatePatient/(\w+)" => "PatientController@updatePatient",
    "/doctor-appointment/server/deletePatient/(\w+)" => "PatientController@deletePatient",
    "/doctor-appointment/server/getPatient/(\w+)" => "PatientController@getPatient",
    "/doctor-appointment/server/createHospital" => "HospitalController@createHospital",
    "/doctor-appointment/server/getHospitals" => "HospitalController@getHospitals",
    "/doctor-appointment/server/getHospitals/(\w+)" => "HospitalController@getHospital",
    "/doctor-appointment/server/updateHospital/(\w+)" => "HospitalController@updateHospital",
    "/doctor-appointment/server/deleteHospital/(\w+)" => "HospitalController@deleteHospital",
    "/doctor-appointment/server/createDoctor" => "DoctorController@createDoctor",
    "/doctor-appointment/server/getDoctors" => "DoctorController@getDoctors",
    "/doctor-appointment/server/getDoctor/(\w+)" => "DoctorController@getDoctor",
    "/doctor-appointment/server/updateDoctor/(\w+)" => "DoctorController@updateDoctor",
    "/doctor-appointment/server/deleteDoctor/(\w+)" => "DoctorController@deleteDoctor",
    "/doctor-appointment/server/getProfessions" => "ProfessionController@getProfessions",
    "/doctor-appointment/server/createProfession" => "ProfessionController@createProfession",
    "/doctor-appointment/server/getProfession/(\w+)" => "ProfessionController@getProfession",
    "/doctor-appointment/server/updateProfession/(\w+)" => "ProfessionController@updateProfession",
    "/doctor-appointment/server/deleteProfession/(\w+)" => "ProfessionController@deleteProfession",
    "/doctor-appointment/server/createDiagnoses" => "DiagnosesController@createDiagnoses",
    "/doctor-appointment/server/getDiagnoses" => "DiagnosesController@getDiagnoses",
    "/doctor-appointment/server/getDiagnose/(\w+)" => "DiagnosesController@getDiagnose",
    "/doctor-appointment/server/deleteDiagnose/(\w+)" => "DiagnosesController@deleteDiagnose",
    "/doctor-appointment/server/updateDiagnose/(\w+)" => "DiagnosesController@updateDiagnose",
];

foreach($routes as $key => $value){
    $pattern = "~^" . str_replace("/", "\\/", $key) . "$~";
    if(preg_match($pattern, $url, $matches)){
        $dividedRoutes = explode("@",$value);
        $controllerName = $dividedRoutes[0];
        $methodName = $dividedRoutes[1];
        $controller = new $controllerName();
        if(isset($matches[1])){
            $controller->$methodName($db,$matches[1]);
        }else{
            $controller->$methodName($db);
        }
        exit();
    }
}

echo "404 Page Not Found";