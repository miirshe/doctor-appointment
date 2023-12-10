<?php
header("Content-Type: application/json");
require './model/Database.php';

class UserController
{
    public $db;

    public function __construct()
    {
        $this->db = Database::db();
    }

    function generateIdentity()
    {
        $id = '';

        $data = array();

        $query = "select * from users order by users.id desc limit 1";

        $result = $this->db->query($query);

        if ($result) {

            $num_row = $result->num_rows;

            if ($num_row > 0) {

                $row = $result->fetch_assoc();

                $id = ++$row['id'];
            } else {

                $id = 'USR001';
            }
        } else {

            $data = ["status" => false, "data" => $this->db->error];
        }

        return $id;
    }



    public function getUsers()
    {

        $data = array();

        $message = array();

        $query = "SELECT * FROM users";

        $result = $this->db->query($query);

        if ($result) {

            while ($row = $result->fetch_assoc()) {

                $data[] = $row;
            }

            $message = ["status" => true, "data" => $data];
        } else {

            $message = ["status" => false, "data" => $this->db->error];
        }

        echo json_encode($message);
    }



    public function registerUser()
    {

        $id = $this->generateIdentity();

        $requestData = json_decode(file_get_contents('php://input'));

        extract($_POST);

        $message = array();

        if (!empty($requestData->name) && !empty($requestData->email) && !empty($requestData->password) && !empty($requestData->role)) {

            $hashed_password = md5($requestData->password);

            $query = "insert into users(`id`,`name`, `email`, `password`, `role`) values('$id','$requestData->name', '$requestData->email', '$hashed_password', '$requestData->role')";

            $result = $this->db->query($query);

            if ($result) {

                $message = ["status" => true, "data" => 'successfully registered'];
            } else {

                $message = ["status" => false, "data" => $this->db->error];
            }
        } else {
            $message = ["status" => false, "data" => 'Please fill all the fields'];
        }

        echo json_encode($message);
    }



    public function getUser($params)
    {
        if (!empty($params)) {

            $id = $params;

            $data = array();

            $message = array();

            $query = "select * from users where id = '$id'";

            $result = $this->db->query($query);
            if ($result) {

                while ($row = $result->fetch_assoc()) {

                    $data[] = $row;
                }

                $message = ["status" => true, "data" => $data];
            } else {

                $message = ["status" => false, "data" => $this->db->error];
            }
        } else {

            $message = ["status" => false, "data" => 'Params is missing'];
        }
        echo json_encode($message);
    }




    public function deleteUser($params)
    {

        if (!empty($params)) {

            $message = array();

            $id = $params;

            $query = "delete from users where id = '$id'";

            $result = $this->db->query($query);

            if ($result) {

                $message = ["status" => true, "data" => 'Successfully deleted'];
            } else {

                $message = ["status" => false, "data" => $this->db->error];
            }
        } else {
            $message = ["status" => false, "data" => 'Params is missing'];
        }

        echo json_encode($message);
    }


    public function updateUser($params)
    {
        $message = [];
        $id = $params;
        if (!empty($params)) {
            $requestData = json_decode(file_get_contents('php://input'));

            if (
                !empty($requestData->name) && !empty($requestData->email) && !empty($requestData->role)
            ) {
                $query = "UPDATE users SET `name` = '$requestData->name', `email` = '$requestData->email',`role` = '$requestData->role' WHERE `id` = '$id'";

                $result = $this->db->query($query);

                if ($result) {
                    $message = ["status" => true, "data" => 'Successfully updated'];
                } else {
                    $message = ["status" => false, "data" => $this->db->error];
                }
            } else {
                $message = ["status" => false, "data" => 'Required fields are missing'];
            }
        } else {
            $message = ["status" => false, "data" => 'Params are missing'];
        }

        echo json_encode($message);
    }
}
