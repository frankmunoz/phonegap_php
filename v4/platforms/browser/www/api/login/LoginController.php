<?php

class LoginController extends Rest {

    private $service;

    public function __construct() {
        $this->service = new LoginService();
    }

    public function login($usr, $pwd) {
        try {
            $data = new stdClass();
            $data->email = $usr;
            $data->password = $pwd;
            $response = $this->service->login($data);
            if (count($response)) {
                $_SESSION['user'] = $response[0]->Usuario;
                $_SESSION['pov'] = $response[0]->SitioPOS;
                $_SESSION['sessionActive'] = true;
                return true;
            } else {
                echo "Datos incorrectos";
                return false;
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            return false;
        }
    }

}
