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
            !empty($requestData->date)  && !empty($requestData->day) && !empty($requestData->time)
            && !empty($requestData->symptom_desc)
            && !empty($requestData->doc_id) && !empty($requestData->pat_id) && !empty($requestData->status)
        ) {
            $date = $requestData->date;
            $day = $requestData->day;
            $time = $requestData->time;
            $symptom_desc = trim($requestData->symptom_desc);
            $doc_id = trim($requestData->doc_id);
            $pat_id = trim($requestData->pat_id);
            $status = trim($requestData->status);

            $query = "INSERT INTO appointments (`id`,`date`,`day`,`time`,`status`,`doc_id`,`pat_id`,`symptom_desc`)
            VALUES ('$id','$date','$day','$time','$status','$doc_id','$pat_id','$symptom_desc')";
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
            !empty($requestData->date) && !empty($requestData->day) && !empty($requestData->time)
            && !empty($requestData->symptom_desc)
            && !empty($requestData->doc_id) && !empty($requestData->pat_id)
            && !empty($requestData->status) && !empty($params)
        ) {
            $id = trim($params);
            $date = $requestData->date;
            $day = $requestData->day;
            $time = $requestData->time;
            $diagnose_id = trim($requestData->diagnose_id);
            $symptom_desc = trim($requestData->symptom_desc);
            $doc_id = trim($requestData->doc_id);
            $pat_id = trim($requestData->pat_id);
            $status = trim($requestData->status);

            $query = "UPDATE appointments SET `date` = '$date' , `day` = '$day', `time` = '$time' , `status` = '$status',
            `doc_id` = '$doc_id' ,`pat_id` = '$pat_id' , `symptom_desc` = '$symptom_desc' WHERE `id` = '$id'";
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


    public function GetAppointmentDetails($db)
    {
        $message = [];
        $data = [];
        $query = "SELECT 
        appointments.id AS appointment_id,
        appointments.time,
        appointments.day,
        appointments.date,
        appointments.status AS appointment_status,
        appointments.symptom_desc,
        appointments.created_at AS appointment_created_at,
        doctors.id AS doctor_id,
        doctors.fname AS doctor_fname,
        doctors.lname AS doctor_lname,
        doctors.email AS doctor_email,
        doctors.gender AS doctor_gender,
        doctors.experience AS doctor_experience,
        doctors.phone AS doctor_phone,
        doctors.address AS doctor_address,
        doctors.hos_id AS doctor_hos_id,
        doctors.speciality AS doctor_speciality,
        doctors.status AS doctor_status,
        doctors.description AS doctor_description,
        doctors.password AS doctor_password,
        doctors.image AS doctor_image,
        doctors.created_at AS doctor_created_at,
        patients.id AS patient_id,
        patients.name AS patient_name,
        patients.email AS patient_email,
        patients.phone AS patient_phone,
        patients.address AS patient_address,
        patients.password AS patient_password,
        patients.image AS patient_image,
        patients.created_at AS patient_created_at
    FROM appointments
    INNER JOIN doctors ON appointments.doc_id = doctors.id
    INNER JOIN patients ON appointments.pat_id = patients.id";
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
