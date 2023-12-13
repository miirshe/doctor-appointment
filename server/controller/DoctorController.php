<?php

class DoctorController
{
    public function generateDoctorID($db)
    {
        $id = '';
        $message = [];
        $qeury = "SELECT * FROM doctors order by  doctors.id desc limit 1";
        $result = $db->query($qeury);
        if ($result) {
            $num_rows = $result->num_rows;
            if ($num_rows > 0) {
                $row = $result->fetch_assoc();
                $id = ++$row['id'];
            } else {
                $id = 'DOC001';
            }
        } else {
            $message = ["status" => false, "data" => $db->error];
        }

        return $id;
    }

    public function createDoctor($db)
    {
        $id = $this->generateDoctorID($db);
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if (
            !empty($requestData->name) && !empty($requestData->email) && !empty($requestData->phone)
            && !empty($requestData->address) && !empty($requestData->password) && !empty($requestData->description)
            && !empty($requestData->hos_id) && !empty($requestData->hos_name) && !empty($requestData->avatar_url) && !empty($id)
        ) {
            $name = trim($requestData->name);
            $email = trim($requestData->email);
            $phone = trim($requestData->phone);
            $address = trim($requestData->address);
            $password = md5($requestData->password);
            $description = trim($requestData->description);
            $hos_id = trim($requestData->hos_id);
            $hos_name = trim($requestData->hos_name);
            $query = "INSERT INTO doctors (`id`,`name`,`email`,`phone`,`address`,`hos_id`,`hos_name`,`description`,`password`,`image`)
                VALUES('$id','$name','$email','$phone','$address','$hos_id','$hos_name','$description','$password','$requestData->image')";

            $result = $db->query($query);

            if ($result) {
                $message = ["status" => true, "data" => "successfully inserted"];
            } else {
                $message = ["status" => false, "data" => 'failled to insert'];
            }
        } else {
            $message = ["status" => false, "data" => "missing required fields"];
        }

        echo json_encode($message);
    }


    public function getDoctors($db)
    {
        $message = [];
        $data = [];
        $query = "SELECT * FROM doctors";
        $result = $db->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $message = ["status" => true, "data" => $data];
        } else {
            $message = ["status" => false, "data" => "failed to retrieve data"];
        }

        echo json_encode($message);
    }


    public function getDoctor($db, $params)
    {
        $message = [];
        $data = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "SELECT * FROM doctors WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                $message = ["status" => true, "data" => $data];
            } else {
                $message = ["status" => false, "data" => "failed to retrieve data"];
            }
        }

        echo json_encode($message);
    }

    public function updateDoctor($db, $params)
    {
        $id = trim($params);
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if (
            !empty($requestData->name) && !empty($requestData->email) && !empty($requestData->phone)
            && !empty($requestData->address) && !empty($requestData->description)
            && !empty($requestData->hos_id) && !empty($requestData->hos_name)
            && !empty($requestData->avatar_url) && !empty($id)
        ) {
            $name = trim($requestData->name);
            $email = trim($requestData->email);
            $phone = trim($requestData->phone);
            $address = trim($requestData->address);
            $description = trim($requestData->description);
            $hos_id = trim($requestData->hos_id);
            $hos_name = trim($requestData->hos_name);
            $verified = trim($requestData->verified);
            $image = $requestData->image;
            $query = "UPDATE doctors SET `name` = '$name', `email` = '$email', `phone` = '$phone',
             `address` = '$address', `hos_id` = '$hos_id', `hos_name` = '$hos_name', 
             `verified` = '$verified', `description` = '$description', `image` = '$image' WHERE `id` = '$id'";
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

    public function deleteDoctor($db, $params){
        $message = [];
        if(!empty($params)){
            $id = trim($params);
            $query = "DELETE FROM doctors WHERE `id` = '$id'";
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
