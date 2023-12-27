<?php
header('Content-Type: application/json');

class SpecialitiesController
{
    public function getenerateSpecialitiesID($db)
    {
        $id = '';
        $message = [];
        $query = "SELECT * FROM Specialities ORDER BY id DESC LIMIT 1";
        $result = $db->query($query);
        if ($result) {
            $num_rows = $result->num_rows;
            if ($num_rows > 0) {
                $row = $result->fetch_assoc();
                $id = ++$row['id'];
            } else {
                $id = 'SP001';
            }
        } else {
            $message = ["status" => false, "data" => "failed to generate id"];
        }
        return $id;
    }

    public function createSpecialities($db)
    {
        $message = [];
        $id = $this->getenerateSpecialitiesID($db);
        $requestData = json_decode(file_get_contents('php://input'));
        if (!empty($requestData->speciality) && !empty($requestData->doc_id) && !empty($requestData->image)) {
            $speciality = trim($requestData->speciality);
            $doc_id = $requestData->doc_id;
            $image = trim($requestData->image);
            $query = "INSERT INTO Specialities (`id`,`speciality`,`doc_id`,`image`) VALUES('$id','$speciality','$doc_id','$image')";
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

    public function getSpecialities($db)
    {
        $message = [];
        $data = [];
        $query = "SELECT * FROM Specialities";
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

    public function getSpeciality($db, $params)
    {
        $message = [];
        $data = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "SELECT * FROM Specialities WHERE `id` = '$id'";
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

    public function deleteSpecialities($db, $params)
    {
        $message = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "DELETE FROM Specialities WHERE `id` = '$id'";
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

    public function updateSpecialities($db, $params)
    {
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if (!empty($requestData->speciality)  && !empty($requestData->doc_id) && !empty($requestData->image) && !empty($params)) {
            $id = trim($params);
            $speciality = trim($requestData->speciality);
            $doc_id = $requestData->doc_id;
            $image = trim($requestData->image);
            $query = "UPDATE Specialities SET `speciality` = '$speciality', `doc_id` = '$doc_id', `image` = '$image' WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                $message = ["status" => true, "data" => "successfully updated"];
            } else {
                $message = ["status" => false, "data" => "failed to update"];
            }
        } else {
            $message = ["status" => false, "data" => "missing reuired fields"];
        }

        echo json_encode($message);
    }
}
