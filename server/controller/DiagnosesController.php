<?php
header('Content-Type: application/json');

class DiagnosesController
{
    public function getenerateDiagnoeseID($db)
    {
        $id = '';
        $message = [];
        $query = "SELECT * FROM diagnoses ORDER BY id DESC LIMIT 1";
        $result = $db->query($query);
        if ($result) {
            $num_rows = $result->num_rows;
            if ($num_rows > 0) {
                $row = $result->fetch_assoc();
                $id = ++$row['id'];
            } else {
                $id = 'DIA001';
            }
        } else {
            $message = ["status" => false, "data" => "failed to generate id"];
        }
        return $id;
    }

    public function createDiagnoses($db)
    {
        $message = [];
        $id = $this->getenerateDiagnoeseID($db);
        $requestData = json_decode(file_get_contents('php://input'));
        if (!empty($requestData->name) && !empty($requestData->description)) {
            $name = trim($requestData->name);
            $description = trim($requestData->description);
            $query = "INSERT INTO diagnoses (`id`,`name`,`description`) VALUES('$id','$name','$description')";
            $result = $db->query($query);
            if ($result) {
                $message = ["status" => true, "data" => "successfully inserted"];
            } else {
                $message = ["status" => false, "data" => "failed to insert"];
            }
        } else {
            $message = ["status" => false, "data" => "missing reuired fields"];
        }

        echo json_encode($message);
    }

    public function getDiagnoses($db)
    {
        $message = [];
        $data = [];
        $query = "SELECT * FROM diagnoses";
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

    public function getDiagnose($db, $params)
    {
        $message = [];
        $data = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "SELECT * FROM diagnoses WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                $message = ["status" => true, "data" => $data];
            } else {
                $message = ["status" => false, "data" => "failed to retrieve data"];
            }
        } else {
            $message = ["status" => false, "data" => 'missing params'];
        }

        echo json_encode($message);
    }

    public function deleteDiagnose($db, $params)
    {
        $message = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "DELETE FROM diagnoses WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                $message = ["status" => true, "data" => 'successfully deleted'];
            } else {
                $message = ["status" => false, "data" => "failed to delete"];
            }
        } else {
            $message = ["status" => false, "data" => 'missing params'];
        }

        echo json_encode($message);
    }

    public function updateDiagnose($db, $params){
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if (!empty($requestData->name) && !empty($requestData->description) && !empty($params)) {
            $id = trim($params);
            $name = trim($requestData->name);
            $description = trim($requestData->description);
            $query = "UPDATE diagnoses SET `name` = '$name', `description` = '$description' WHERE `id` = '$id'";
            $result = $db->query($query);
            if($result){
                $message = ["status" => true, "data" => "successfully updated"];
            }else{
                $message = ["status" => false, "data" => "failed to update"];
            }
        }else {
            $message = ["status" => false, "data" => "missing reuired fields"];
        }

        echo json_encode($message);
    }
}
