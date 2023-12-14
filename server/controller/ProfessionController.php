<?php
header("Content-Type: application/json");
class ProfessionController
{
    public function generatedProfissionID($db)
    {
        $id = '';
        $message = [];
        $query = "SELECT * FROM professions order by professions.id desc limit 1";
        $result = $db->query($query);
        if ($result) {

            $num_rows = $result->num_rows;
            if ($num_rows > 0) {
                $row = $result->fetch_assoc();
                $id = ++$row['id'];
            } else {
                $id = 'PRO001';
            }
        } else {
            $message = ['status' => false, 'data' => 'failed to generate id'];
        }

        return $id;
    }

    public function createProfession($db)
    {
        $id = $this->generatedProfissionID($db);
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if (!empty($requestData->name) && !empty($requestData->description) && !empty($requestData->doc_id)) {
            $name = trim($requestData->name);
            $description = trim($requestData->description);
            $doc_id = trim($requestData->doc_id);
            $query = "INSERT INTO professions (`id`, `name`, `description`, doc_id) 
            VALUES ('$id', '$name', '$description', '$doc_id')";
            $result = $db->query($query);
            if ($result) {
                $message = ["status" => true, "data" => "successfully inserted"];
            } else {
                $message = ["status" => false, "data" => "failed to insert"];
            }
        } else {
            $message = ['status' => false, 'data' => 'name and description are required'];
        }

        echo json_encode($message);
    }

    public function getProfessions($db)
    {
        $message = [];
        $data = [];
        $query = "SELECT * FROM professions";
        $result = $db->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $message = ["status" => true, "data" => $data];
        } else {
            $message = ['status' => false, 'data' => 'failed to get professions'];
        }

        echo json_encode($message);
    }

    public function getProfession($db, $params)
    {
        $message = [];
        $data = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "SELECT * FROM professions WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                $message = ["status" => true, "data" => $data];
            } else {
                $message = ['status' => false, 'data' => 'failed to get professions'];
            }
        } else {
            $message = ['status' => false, 'data' => 'params is required'];
        }

        echo json_encode($message);
    }

    public function deleteProfession($db, $params)
    {
        $message = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "DELETE FROM professions WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                $message = ["status" => true, "data" => 'successfully deleted'];
            } else {
                $message = ['status' => false, 'data' => 'failed to get professions'];
            }
        } else {
            $message = ['status' => false, 'data' => 'params is required'];
        }

        echo json_encode($message);
    }

    public function updateProfession($db, $params)
    {
        $id = $this->generatedProfissionID($db);
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if (
            !empty($requestData->name) && !empty($requestData->description)
            && !empty($requestData->doc_id) && !empty($params)
        ) {
            $id = trim($params);
            $name = trim($requestData->name);
            $description = trim($requestData->description);
            $doc_id = trim($requestData->doc_id);
            $query = "UPDATE professions set `name` = '$name',`description` = '$description' , 
            `doc_id` = '$doc_id' WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                $message = ["status" => true, "data" => "successfully updated"];
            } else {
                $message = ["status" => false, "data" => "failed to insert"];
            }
        } else {
            $message = ['status' => false, 'data' => 'name and description are required'];
        }

        echo json_encode($message);
    }
}
