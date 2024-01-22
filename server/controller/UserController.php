<?php
header("Content-Type: application/json");
class UserController
{
    function generateIdentity($db)
    {
        $id = '';

        $data = array();

        $query = "select * from users order by users.id desc limit 1";

        $result = $db->query($query);

        if ($result) {

            $num_row = $result->num_rows;

            if ($num_row > 0) {

                $row = $result->fetch_assoc();

                $id = ++$row['id'];
            } else {

                $id = 'USR001';
            }
        } else {

            $data = ["status" => false, "data" => $db->error];
        }

        return $id;
    }



    public function getUsers($db)
    {

        $data = array();

        $message = array();

        $query = "SELECT * FROM users";

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



    public function registerUser($db)
    {

        $id = $this->generateIdentity($db);

        $requestData = json_decode(file_get_contents('php://input'));

        extract($_POST);

        $message = array();

        if (!empty($requestData->name) && !empty($requestData->email) && !empty($requestData->password) && !empty($requestData->role)) {
            $name = trim($requestData->name);
            $email = trim($requestData->email);
            $role = trim($requestData->role);
            $hashed_password = md5($requestData->password);

            $query = "INSERT INTO users(`id`,`name`, `email`, `password`, `role`) 
            VALUES ('$id','$name', '$email', '$hashed_password', '$role')";

            $result = $db->query($query);

            if ($result) {

                $message = ["status" => true, "data" => 'successfully registered'];
            } else {

                $message = ["status" => false, "data" => $db->error];
            }
        } else {
            $message = ["status" => false, "data" => 'Please fill all the fields'];
        }

        echo json_encode($message);
    }



    public function getUser($db,$params)
    {
        if (!empty($params)) {

            $id = $params;

            $data = array();

            $message = array();

            $query = "SELECT * FROM users WHERE `id` = '$id'";

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

            $message = ["status" => false, "data" => 'Params is missing'];
        }
        echo json_encode($message);
    }




    public function deleteUser($db,$params)
    {

        if (!empty($params)) {

            $message = array();

            $id = $params;

            $query = "DELETE FROM users WHERE `id` = '$id'";

            $result = $db->query($query);

            if ($result) {

                $message = ["status" => true, "data" => 'Successfully deleted'];
            } else {

                $message = ["status" => false, "data" => $db->error];
            }
        } else {
            $message = ["status" => false, "data" => 'Params is missing'];
        }

        echo json_encode($message);
    }


    public function updateUser($db,$params)
    {
        $message = [];
        $id = $params;
        if (!empty($params)) {
            $requestData = json_decode(file_get_contents('php://input'));

            if (
                !empty($requestData->name) && !empty($requestData->email) && !empty($requestData->role)
            ) {
                $name = trim($requestData->name);
                $email = trim($requestData->email);
                $role = trim($requestData->role);
                $query = "UPDATE users SET `name` = '$name', `email` = '$email',`role` = '$role' WHERE `id` = '$id'";

                $result = $db->query($query);

                if ($result) {
                    $message = ["status" => true, "data" => 'Successfully updated'];
                } else {
                    $message = ["status" => false, "data" => $db->error];
                }
            } else {
                $message = ["status" => false, "data" => 'Required fields are missing'];
            }
        } else {
            $message = ["status" => false, "data" => 'Params are missing'];
        }

        echo json_encode($message);
    }


    public function loginUser($db)
    {
        $message = [];
        $requestData = isset($_POST['name']) ? $_POST : json_decode(file_get_contents('php://input'), true);
        if (!empty($requestData['email']) && !empty($requestData['password'])) {
            $email = mysqli_real_escape_string($db, $requestData['email']);
            $password = mysqli_real_escape_string($db, $requestData['password']);
            $query = 'CALL login_user(?, ?)';
            $stmt = $db->prepare($query);
            $stmt->bind_param('ss', $email, $password);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $message = ['status' => true, 'data' => 'Login successful','user' =>$user['id'],"userType" => "user"];
            } else {
                $message = ['status' => false,'data' => 'Invalid email and password'];
            }
        } else {
            $message = ['status' => false, 'data' => 'Missing Required Fields'];
        }

        echo json_encode($message);
    }


    public function getCurrentUser($db)
    {
        $message = [];
        $token = apache_request_headers();
        if ( isset($token['authorization'])) {
            $userId = $token['authorization'];
            $query = "SELECT * FROM users WHERE id = ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param('s', $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $message = [
                    'status' => true,
                    'data' => 'User data retrieved successfully',
                    'user' => $user
                ];
            } else {
                $message = ['status' => false, 'data' => 'Invalid session token'];
            }
        } else {
            $message = ['status' => false, 'data' => 'Invalid session or session expired'];
        }

        echo json_encode($message);
    }
}
