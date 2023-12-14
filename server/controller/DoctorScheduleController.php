<?php
header("Content-Type: application/json");
class DoctorScheduleController
{
    function generateDoctorScheduleID($db)
    {
        $id = '';
        $message = [];
        $query = "SELECT * FROM doctor_schedules ORDER BY doctor_schedules.id  DESC LIMIT 1";
        $result = $db->query($query);
        if ($result) {
            $num_rows = $result->num_rows;
            if ($num_rows > 0) {
                $row = $result->fetch_assoc();
                $id = ++$row['id'];
            } else {
                $id = 'DSH001';
            }
        } else {
            $message = ['status' => false, "data" => "failed to generate params id"];
        }

        return $id;
    }

    public function createDoctorSchedule($db)
    {
        $message = [];
        $id = $this->generateDoctorScheduleID($db);
        $requestData = json_decode(file_get_contents('php://input'));
        if (
            !empty($requestData->date) && !empty($requestData->from_time)
            && !empty($requestData->to_time) && !empty($requestData->status)
            && !empty($requestData->doc_id)
        ) {
            $date = $requestData->date;
            $from_time = $requestData->from_time;
            $to_time = $requestData->to_time;
            $status = $requestData->status;
            $doc_id = trim($requestData->doc_id);
            $query = "INSERT INTO  doctor_schedules(`id`,`date`,`from_time`,`to_time`,`status`,`doc_id`) 
            VALUES ('$id','$date','$from_time','$to_time','$status','$doc_id')";
            $result = $db->query($query);
            if($result){
                $message = ['status' => true, "data" => "successfully inserted"];
            }else{
                $message = ['status' => false, "data" => "failed to create doctor schedule"];
            }
        } else {
            $message = ['status' => false, "data" => "missing required fields"];
        }

        echo json_encode($message);
    }

    public function getDoctorSchedules($db){
        $message = [];
        $data  = [];
        $query = "SELECT * FROM doctor_schedules";
        $result = $db->query($query);
        if($result){
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $message = ['status' => true, "data" => $data];
        }else{
            $message = ['status' => false, "data" => "failed to get doctor schedules"];
        }

        echo json_encode($message);
    }

    public function getDoctorSchedule($db,$params){
        $message = [];
        $data  = [];
        if(!empty($params)){
            $id = trim($params);
            $query = "SELECT * FROM doctor_schedules WHERE `id` = '$id'";
            $result = $db->query($query);
            if($result){
                while($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                $message = ['status' => true, "data" => $data];
            }else{
                $message = ['status' => false, "data" => "failed to get doctor schedules"];
            }
        }else{
            $message = ['status' => false, "data" => "missing params id"];
        }

        echo json_encode($message);
    }

    public function deleteDoctorSchedule($db,$params){
        $message = [];
        if(!empty($params)){
            $id = trim($params);
            $query = "DELETE FROM doctor_schedules WHERE `id` = '$id'";
            $result = $db->query($query);
            if($result){
                $message = ['status' => true, "data" => "successfully deleted"];
            }else{
                $message = ['status' => true, "data" => "failed to delete"];
            }
        }else{
            $message = ['status' => false, "data" => "missing params id"];
        }

        echo json_encode($message);
    }

    public function updateDoctorSchedule($db,$params)
    {
        $message = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if (
            !empty($requestData->date) && !empty($requestData->from_time)
            && !empty($requestData->to_time) && !empty($requestData->status)
            && !empty($requestData->doc_id)
        ) {
            $id = trim($params);
            $date = $requestData->date;
            $from_time = $requestData->from_time;
            $to_time = $requestData->to_time;
            $status = $requestData->status;
            $doc_id = trim($requestData->doc_id);
            $query = "UPDATE doctor_schedules SET `date` = '$date', `from_time` = '$from_time', 
            `to_time` = '$to_time' , `status` = '$status',`doc_id` = '$doc_id' WHERE `id` = '$id'";
            $result = $db->query($query);
            if($result){
                $message = ['status' => true, "data" => "successfully updated"];
            }else{
                $message = ['status' => false, "data" => "failed to create doctor schedule"];
            }
        } else {
            $message = ['status' => false, "data" => "missing required fields"];
        }

        echo json_encode($message);
    }


}
