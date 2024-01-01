<?php
header('Content-Type: application/json');
class PatientController
{

    public function generatePatientIdentity($db)
    {
        $id = '';
        $data = [];
        $query = "SELECT * FROM patients ORDER BY patients.id DESC limit 1";
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
        $requestData = isset($_POST['name']) ? $_POST : json_decode(file_get_contents('php://input'), true);
        $id = $this->generatePatientIdentity($db);
        $message = [];

        if (
            !empty($requestData['name']) && !empty($requestData['email']) &&
            !empty($requestData['phone']) && !empty($requestData['address']) &&
            !empty($requestData['image']) && !empty($requestData['password'])
        ) {
            $name = trim($requestData['name']);
            $email = trim($requestData['email']);
            $phone = trim($requestData['phone']);
            $address = trim($requestData['address']);
            $image = $requestData['image'];
            $hashed_password = md5($requestData['password']);

            $query = "INSERT INTO patients (`id`, `name`, `email`, `phone`, `address`, `image`, `password`) 
                      VALUES ('$id', '$name', '$email', '$phone', '$address', '$image', '$hashed_password')";
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


    public function updatePatient($db, $params)
    {
        $id = $params;
        $requestData = json_decode(file_get_contents('php://input'));
        $message = [];
        if (
            !empty($requestData->name) && !empty($requestData->email) &&
            !empty($requestData->phone) && !empty($requestData->address) &&
            !empty($requestData->image)
        ) {
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


    public function deletePatient($db, $params)
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


    public function getPatient($db, $params)
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


    public function loginPatient($db)
    {
        session_start();
        $requestData = isset($_POST['email']) ? $_POST : json_decode(file_get_contents('php://input'), true);
        $message = [];
        if (!empty($requestData['email']) && !empty($requestData['password'])) {
            $email = mysqli_real_escape_string($db, $requestData['email']);
            $password = mysqli_real_escape_string($db, $requestData['password']);
            $query = "CALL login_patient(?, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param('ss', $email, $password);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $sessionToken = bin2hex(random_bytes(16));
                $_SESSION['session_token'] = $sessionToken;
                $user = $result->fetch_assoc();
                $message = ['status' => true, 'data' => 'Login successful', 'session_token' => $sessionToken, "user" => $user, "userType" => "patient"];
            } else {
                $message = ['status' => false, 'data' => 'Invalid email or password'];
            }
        } else {
            $message = ['status' => false, 'data' => 'Required missing values'];
        }

        echo json_encode($message);
    }

    public function getUserData($db)
    {
        session_start();
        $requestData = isset($_POST['session_token']) ? $_POST : json_decode(file_get_contents('php://input'), true);
        $message = [];

        if (!empty($requestData['session_token'])) {
            $sessionToken = $requestData['session_token'];
            if ($_SESSION['session_token'] === $sessionToken) {
                // Session token is valid, retrieve user data
                $query = "SELECT * FROM patients WHERE session_token = ?";
                $stmt = $db->prepare($query);
                $stmt->bind_param('s', $sessionToken);
                $stmt->execute();
                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    $user = $result->fetch_assoc();
                    $message = ['status' => true, 'data' => 'User data retrieved successfully', 'user' => $user];
                } else {
                    $message = ['status' => false, 'data' => 'Invalid session token'];
                }
            } else {
                $message = ['status' => false, 'data' => 'Invalid session token'];
            }
        } else {
            $message = ['status' => false, 'data' => 'Required missing values'];
        }

        echo json_encode($message);
    }
}
