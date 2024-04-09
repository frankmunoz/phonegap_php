<?php

class Rest {

    public $_allow = array();
    public $_content_type = "application/json";
    public $_request = array();
    private $_code = 200;

    const OK = 200;
    const CREATED = 201;
    const NO_CONTENT = 204;
    const NO_FOUND = 404;
    const NO_ACCEPTABLE = 406;
    const INTERNAL_SERVER_ERROR = 500;

    public function __construct() {
        $this->inputs();
    }

    public function getReferer() {
        return $_SERVER['HTTP_REFERER'];
    }

    public function response($data, $status) {
        $this->_code = ($status) ? $status : self::OK;
        $this->setHeaders();
        $response = [
            "success" => true,
            "data" => $data
        ];
        echo $this->json($response);
        exit;
    }

    private function getStatusMessage() {
        $status = array(
            200 => 'OK',
            201 => 'Created',
            204 => 'No Content',
            404 => 'Not Found',
            406 => 'Not Acceptable');
        return ($status[$this->_code]) ? $status[$this->_code] : $status[self::INTERNAL_SERVER_ERROR];
    }

    public function getRequestMethod() {
        return $_SERVER['REQUEST_METHOD'];
    }

    public function getUriSegment() {
        $uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri_segments = explode('/', $uri_path);
        return array_pop($uri_segments);
    }

    public function getInputDataStream() {
        return json_decode(file_get_contents("php://input"));
    }

    private function inputs() {
        switch ($this->getRequestMethod()) {
            case "POST":
                $this->_request = $this->cleanInputs($_POST);
                break;
            case "GET":
            case "DELETE":
                $this->_request = $this->cleanInputs($_GET);
                break;
            case "PUT":
                parse_str(file_get_contents("php://input"), $this->_request);
                $this->_request = $this->cleanInputs($this->_request);
                break;
            default:
                $this->response('', self::NO_ACCEPTABLE);
                break;
        }
    }

    private function cleanInputs($data) {
        $clean_input = array();
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $clean_input[$k] = $this->cleanInputs($v);
            }
        } else {
            if (get_magic_quotes_gpc()) {
                $data = trim(stripslashes($data));
            }
            $data = strip_tags($data);
            $clean_input = trim($data);
        }
        return $clean_input;
    }

    private function setHeaders() {
        header("HTTP/1.1 " . $this->_code . " " . $this->getStatusMessage());
        header("Content-Type:" . $this->_content_type);
    }

    public function json($data) {
        if (is_array($data)) {
            $json = new Json();
            return $json->encode($data);
        }
    }

    public function object2Array($data) {
        if (is_array($data) || is_object($data)) {
            $result = array();
            foreach ($data as $key => $value) {
                $result[$key] = $this->object2Array($value);
            }
            return $result;
        }
        return $data;
    }

}
