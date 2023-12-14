<?php
header("Content-Type: application/json");
class AppointmentController
{
    public function generateAppointmentID($db)
    {
        $id = '';
        $message = [];
        $query = "SELECT * FROM appointments ORDER BY appointments.id  DESC LIMIT 1";
        $result = $db->query($query);
        if ($result) {
            $num_rows = $result->num_rows;
            if ($num_rows > 0) {
                $row = $result->fetch_assoc();
                $id = ++$row['id'];
            } else {
                $id = 'APT001';
            }
        } else {
            $message = ['status' => false, "data" => "failed to generate params id"];
        }

        return $id;
    }

    public function createAppointment($db)
    {
        $message = [];
        $id = $this->generateAppointmentID($db);
        $requestData = json_decode(file_get_contents('php://input'));
        if (
            !empty($requestData->date) && !empty($requestData->time)
            && !empty($requestData->diagnose_id) && !empty($requestData->symptom_desc)
            && !empty($requestData->doc_id) && !empty($requestData->pat_id) && !empty($requestData->status)
        ) {
            $date = $requestData->date;
            $time = $requestData->time;
            $diagnose_id = trim($requestData->diagnose_id);
            $symptom_desc = trim($requestData->symptom_desc);
            $doc_id = trim($requestData->doc_id);
            $pat_id = trim($requestData->pat_id);
            $status = trim($requestData->status);

            $query = "INSERT INTO appointments (`id`,`date`,`time`,`status`,`diagnose_id`,`doc_id`,`pat_id`,`symptom_desc`)
            VALUES ('$id','$date','$time','$status','$diagnose_id','$doc_id','$pat_id','$symptom_desc')";
            $result = $db->query($query);
            if ($result) {
                $message = ['status' => true, "data" => "successfully inserted"];
            } else {
                $message = ['status' => false, "data" => "failed to create appointment"];
            }
        } else {
            $message = ['status' => false, "data" => "missing required fields"];
        }

        echo json_encode($message);
    }

    public function updateAppointment($db, $params)
    {
        $message = [];
        $id = trim($params);
        $requestData = json_decode(file_get_contents('php://input'));
        if (
            !empty($requestData->date) && !empty($requestData->time)
            && !empty($requestData->diagnose_id) && !empty($requestData->symptom_desc)
            && !empty($requestData->doc_id) && !empty($requestData->pat_id)
            && !empty($requestData->status) && !empty($params)
        ) {
            $id = trim($params);
            $date = $requestData->date;
            $time = $requestData->time;
            $diagnose_id = trim($requestData->diagnose_id);
            $symptom_desc = trim($requestData->symptom_desc);
            $doc_id = trim($requestData->doc_id);
            $pat_id = trim($requestData->pat_id);
            $status = trim($requestData->status);

            $query = "UPDATE appointments SET `date` = '$date' , `time` = '$time' , `status` = '$status',
            `diagnose_id` = '$diagnose_id' ,`doc_id` = '$doc_id' ,`pat_id` = '$pat_id' , `symptom_desc` = '$symptom_desc' WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                $message = ['status' => true, "data" => "successfully updated"];
            } else {
                $message = ['status' => false, "data" => "failed to update appointment"];
            }
        } else {
            $message = ['status' => false, "data" => "missing required fields"];
        }

        echo json_encode($message);
    }

    public function deleteAppointment($db, $params)
    {
        $message = [];
        $id = trim($params);
        if (!empty($params)) {
            $id = trim($params);

            $query = "DELETE FROM appointments WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                $message = ['status' => true, "data" => "successfully deleted"];
            } else {
                $message = ['status' => false, "data" => "failed to delete appointment"];
            }
        } else {
            $message = ['status' => false, "data" => "missing params id"];
        }

        echo json_encode($message);
    }

    public function getAppointment($db, $params)
    {
        $message = [];
        $data = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "SELECT * FROM appointments WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                $message = ['status' => true, "data" => $data];
            } else {
                $message = ['status' => false, "data" => "failed to retrieve appointment"];
            }
        } else {
            $message = ['status' => false, "data" => "missing params id"];
        }

        echo json_encode($message);
    }

    public function getAppointments($db)
    {
        $message = [];
        $data = [];
        $query = "SELECT * FROM appointments";
        $result = $db->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $message = ['status' => true, "data" => $data];
        } else {
            $message = ['status' => false, "data" => "failed to retrieve appointment"];
        }
        echo json_encode($message);
    }
}
