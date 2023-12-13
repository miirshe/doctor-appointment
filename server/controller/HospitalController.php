<?php
header('Content-Type: application/json');

class HospitalController {

    public function generateHospitalID($db){
        $id = '';
        $message = [];
        $query = "SELECT * FROM hospitals order by hospitals.id desc limit 1";
        $result = $db->query($query);
        if($result){
            $num_rows = $result->num_rows;
            if($num_rows > 0 ){
                $row = $result->fetch_assoc();
                $id = ++$row['id'];
            }else{
                $id = 'HOS001';
            }

        }else{
            $message = ["status" => true , "data" => $db->error];
        }
        return $id;
    }
    public function getHospitals($db){
        $message = [];
        $data = [];
        $query = "SELECT * FROM hospitals";
        $result = $db->query($query);
        if($result){
            while($row = $result->fetch_assoc()){
                $data[] = $row;
            }

            $message = ["status" => true , "data" => $data];

        }else{
            $message = ["status" => false, "data" => 'failed to retrieve'];
        }

        echo json_encode($message);
       
    }

    public function getHospital($db,$params){
        $message = [];
        $data = [];
        if(!empty($params)){
        $id = trim($params);
        $query = "SELECT * FROM hospitals WHERE `id` = '$id'";
        $result = $db->query($query);
        if($result){
            while($row = $result->fetch_assoc()){
                $data[] = $row;
            }

            $message = ["status" => true , "data" => $data];

        }else{
            $message = ["status" => false, "data" => 'failed to retrieve'];
        }
        }else{
            $message = ["status" => false, "data" => "missing params"];
        }

        echo json_encode($message);

    }

    public function createHospital($db){
        $id = $this->generateHospitalID($db);
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if(!empty($requestData->name) && !empty($requestData->email) && !empty($requestData->phone) && 
        !empty($requestData->location) && !empty($requestData->description)){
            $name = trim($requestData->name);
            $email = trim($requestData->email);
            $phone = trim($requestData->phone);
            $location = trim($requestData->location);
            $description = trim($requestData->description); 
            $query = "INSERT INTO hospitals (`id`,`name`, `email` ,`phone`, `location`, `description`)
            VALUES('$id','$name','$email','$phone','$location','$description')";
            $result = $db->query($query);
            if($result){
                $message = ["status" => true , "data" => "successfully created"];
            }else{
                $message = ["status" => false, "data" => "failed to insert"];
            }

        }else{
            $message = ["status" => false, "data" => "missing required fields"];
        }

        echo json_encode($message);

    }

    public function updateHospital($db,$params){
        $id = trim($params);
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if(!empty($requestData->name) &&!empty($requestData->email) &&!empty($requestData->phone) && 
       !empty($requestData->location) &&!empty($requestData->description) && !empty($params)){
        $name = trim($requestData->name);
        $email = trim($requestData->email);
        $phone = trim($requestData->phone);
        $location = trim($requestData->location);
        $description = trim($requestData->description); 
        $query = "UPDATE hospitals SET `name` = '$name', `email` = '$email', `phone` = '$phone', `location` = '$location', `description` = '$description' WHERE `id` = '$id'";
        $result = $db->query($query);
        if($result){
            $message = ["status" => true, "data" => "successfully updated"];
        }else{
            $message = ["status" => false, "data" => "failed to update"];
        }

       }else{
        $message = ["status" => false, "data" => "missing required fields"];
       }

       echo json_encode($message);

    }

    public function deleteHospital($db,$params){
        $message = [];
        if(!empty($params)){
            $id = trim($params);
            $query = "DELETE FROM hospitals WHERE `id` = '$id'";
            $result = $db->query($query);
            if($result){
                $message = ["status" => true, "data" => "successfully deleted"];
            }else{
                $message = ["status" => false, "data" => "failed to delete"];
            }
        }else{
            $message = ["status" => false,"data" => "missing params"];
        }
        echo json_encode($message);
    }
}
