<?php
header('Content-Type: application/json');
class PatientController
{

    public function generatePatientIdentity($db)
    {
        $id = '';
        $data = [];
        $query = "select * from patients order by patients.id desc limit 1";
        $result = $db->query($query);
        if ($result) {
            $num_rows = $result->num_rows;
            if ($num_rows > 0) {
                $row = $result->fetch_assoc();
                $id = ++$row['id'];
            } else {
                $id = 'PAT001';
            }
        } else {
            $data = ["status" => false, "data" => $db->error];
        }

        return $id;
    }

    public function getPatients($db)
    {
        $data = [];
        $message = [];
        $query = "SELECT * FROM patients";
        $result = $db->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $message = ["status" => true, "data" => $data];
        } else {
            $message = ["status" => false, "data" => $db->error];
        }

        echo json_encode($message);
    }


    public function registerPatient($db)
    {
        $requestData = json_decode(file_get_contents('php://input'));
        $id = $this->generatePatientIdentity($db);
        $message = [];
        if (!empty($requestData->name) && !empty($requestData->email) && 
        !empty($requestData->phone) && !empty($requestData->address) && 
        !empty($requestData->image) && !empty($requestData->password)) {
            $name = trim($requestData->name);
            $email = trim($requestData->email);
            $phone = trim($requestData->phone);
            $address = trim($requestData->address);
            $image = $requestData->image;
            $hashed_password = md5($requestData->password);

            $query = "INSERT INTO patients (`id`,`name`, `email`, `phone`,`address`,`image`,`password`) 
            VALUES ('$id','$name','$email','$phone','$address','$image','$hashed_password')";

            $result = $db->query($query);

            if ($result) {
                $message = ["status" => true, "data" => 'Successfully registered'];
            } else {
                $message = ["status" => false, "data" => $db->error];
            }
        } else {
            $message = ["status" => false, "data" => 'Required fields are missing'];
        }

        echo json_encode($message);
    }


    public function updatePatient($db,$params)
    {
        $id = $params;
        $requestData = json_decode(file_get_contents('php://input'));
        $message = [];
        if (!empty($requestData->name) && !empty($requestData->email) && 
        !empty($requestData->phone) && !empty($requestData->address) && 
        !empty($requestData->image)) {
            $name = trim($requestData->name);
            $email = trim($requestData->email);
            $phone = trim($requestData->phone);
            $address = trim($requestData->address);
            $image = $requestData->image;
            $query = " UPDATE patients set  `name` = '$name',`email` = '$email' , 
            `phone` = '$phone',`address` = '$address' , `image` = '$image' WHERE `id` = '$id'";
            $result = $db->query($query);

            if ($result) {
                $message = ["status" => true, "data" => 'Successfully updated'];
            } else {
                $message = ["status" => false, "data" => $db->error];
            }
        } else {
            $message = ["status" => false, "data" => 'Required fields are missing'];
        }

        echo json_encode($message);
    }


    public function deletePatient($db,$params)
    {
        $message = [];
        if (!empty($params)) {
            $id = $params;
            $query = "DELETE FROM patients WHERE `id` = '$id'";
            $result = $db->query($query);

            if ($result) {
                $message = ["status" => true, "data" => 'Successfully deleted'];
            } else {
                $message = ["status" => false, "data" => $db->error];
            }
        } else {
            $message = ["status" => false, "data" => 'params is missing'];
        }

        echo json_encode($message);
    }


    public function getPatient($db,$params)
    {
        if (!empty($params)) {
            $id = $params;
            $data = [];
            $message = [];
            $query = "SELECT * FROM patients WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                $message = ["status" => true, "data" => $data];
            } else {
                $message = ["status" => false, "data" => $db->error];
            }
        } else {
            $message = ["status" => false, "data" => 'params is missing'];
        }

        echo json_encode($message);
    }
}
