<?php

class POVController extends Rest {

    private $service;

    public function __construct() {
        $this->service = new POVService();
    }

    public function get() {
        try {
            $data = $_REQUEST;
            $response = new stdClass();
            $response->customers = $this->service->getCustomers($data['code']);
            $response->products = $this->service->getProducts($_SESSION['pov']);
            if (count($response)) {
                $array = $this->object2Array($response);
                return $array;
            }
            $this->response(["error" => "VRN no encontrada"], self::OK);
        } catch (Exception $exc) {
            $this->response($exc->getMessage(), self::NO_CONTENT);
        }
    }

}
