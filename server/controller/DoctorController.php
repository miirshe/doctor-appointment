<?php

class DoctorController
{
    public function generateDoctorID($db)
    {
        $id = '';
        $message = [];
        $query = "SELECT * FROM doctors ORDER BY doctors.id DESC limit 1";
        $result = $db->query($query);
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
            !empty($requestData->fname) && !empty($requestData->lname) && !empty($requestData->email) && !empty($requestData->gender) && !empty($requestData->experience) && !empty($requestData->phone)
            && !empty($requestData->address) && !empty($requestData->password) && !empty($requestData->description)
            && !empty($requestData->hos_id) && !empty($requestData->status) && !empty($requestData->image) && !empty($id)
        ) {
            $fname = trim($requestData->fname);
            $lname = trim($requestData->lname);
            $email = trim($requestData->email);
            $gender = trim($requestData->gender);
            $experience = trim($requestData->experience);
            $phone = trim($requestData->phone);
            $address = trim($requestData->address);
            $password = md5($requestData->password);
            $description = trim($requestData->description);
            $hos_id = trim($requestData->hos_id);
            $status = trim($requestData->status);
            $image = trim($requestData->image);

            // Prepare and bind the query parameters to prevent SQL injection
            $query = "INSERT INTO doctors (`id`, `fname`, `lname`, `email`, `gender`, `experience`, `phone`, `address`, `hos_id`, `status`, `description`, `password`, `image`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param("sssssssssssss", $id, $fname, $lname, $email, $gender, $experience, $phone, $address, $hos_id, $status, $description, $password, $image);

            if ($stmt->execute()) {
                $message = ["status" => true, "data" => "Successfully inserted."];
            } else {
                $message = ["status" => false, "data" => "Failed to insert."];
            }
            $stmt->close();
        } else {
            $message = ["status" => false, "data" => "Missing required fields."];
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
            !empty($requestData->fname) && !empty($requestData->lname) && !empty($requestData->email)
            && !empty($requestData->gender) && !empty($requestData->experience) && !empty($requestData->phone)
            && !empty($requestData->address) && !empty($requestData->description)
            && !empty($requestData->hos_id) && !empty($requestData->image) &&
            !empty($requestData->hos_id) && !empty($id)
        ) {
            $fname = trim($requestData->fname);
            $lname = trim($requestData->lname);
            $email = trim($requestData->email);
            $gender = trim($requestData->gender);
            $experience = trim($requestData->experience);
            $phone = trim($requestData->phone);
            $address = trim($requestData->address);
            $description = trim($requestData->description);
            $hos_id = trim($requestData->hos_id);
            $status = trim($requestData->status);
            $image = $requestData->image;
            $query = "UPDATE doctors SET `fname` = '$fname', `lname` = '$lname', `email` = '$email',  `experience` = '$experience' , `gender` = '$gender',  `phone` = '$phone',
             `address` = '$address', `hos_id` = '$hos_id',  `status` = '$status', 
             `description` = '$description', `image` = '$image' WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                $message = ["status" => true, "data" => "successfully updated"];
            } else {
                $message = ["status" => false, "data" => "failed to update"];
            }
        } else {
            $message = ["status" => false, "data" => "missing required fields"];
        }

        echo json_encode($message);
    }

    public function deleteDoctor($db, $params)
    {
        $message = [];
        if (!empty($params)) {
            $id = trim($params);
            $query = "DELETE FROM doctors WHERE `id` = '$id'";
            $result = $db->query($query);
            if ($result) {
                $message = ["status" => true, "data" => "successfully deleted"];
            } else {
                $message = ["status" => false, "data" => "failed to delete"];
            }
        } else {
            $message = ["status" => false, "data" => "missing params"];
        }
        echo json_encode($message);
    }

    public function getDoctorsWithSchedule($db)
    {
        $message = [];
        $data = [];
        $query = "SELECT doctors.id, doctors.name, doctors.email, doctors.phone, doctors.address, doctors.hos_id, 
        doctors.status, doctors.description, doctors.password, doctors.image, doctors.created_at, 
        doctor_schedules.id AS schedule_id, doctor_schedules.date, doctor_schedules.day, 
        doctor_schedules.from_time, doctor_schedules.to_time, doctor_schedules.status 
        AS schedule_status, doctor_schedules.doc_id AS schedule_doc_id, 
        doctor_schedules.created_at AS schedule_created_at FROM doctors
        JOIN doctor_schedules ON doctors.id = doctor_schedules.doc_id";
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


    public function loginDoctor($db)
    {
        session_start();
        $message = [];
        $requestData = isset($_POST['name']) ? $_POST : json_decode(file_get_contents('php://input'), true);
        if (!empty($requestData['email']) && !empty($requestData['password'])) {
            $email = mysqli_real_escape_string($db, $requestData['email']);
            $password = mysqli_real_escape_string($db, $requestData['password']);
            $query = 'CALL login_doctor(?, ?)';
            $stmt = $db->prepare($query);
            $stmt->bind_param('ss', $email, $password);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $sessionToken = bin2hex(random_bytes(16));
                $_SESSION['session_token'] = $sessionToken;
                $message = ['status' => true, 'data' => 'Login successful','session_token' => $sessionToken, 'user' =>$user,"userType" => "doctor"];
            } else {
                $message = ['status' => false,'data' => 'Invalid email and password'];
            }
        } else {
            $message = ['status' => false, 'data' => 'Missing Required Fields'];
        }

        echo json_encode($message);
    }
}
