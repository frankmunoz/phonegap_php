<?php

class Json {

    public function encode($json) {
        try {
            $json = $this->prepareString($json);
            $result = json_encode($json);
            return $this->evalJsonError($result);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function decode($json) {
        try {
            $json = $this->prepareString($json);
            $result = json_decode($json);
            return $this->evalJsonError($result);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    private function prepareString($json) {
        if (is_array($json)) {
            return $this->JsonStringify($json);
        }
        return utf8_encode(trim($json));
    }

    private function evalJsonError($result) {
        if (json_last_error()) { // 4 (JSON_ERROR_SYNTAX)
            throw new Exception(json_last_error_msg(), 1);
        }
        return $result;
    }

    private function JsonStringify($data) {
        if (is_array($data) || is_object($data)) {
            $result = array();
            foreach ($data as $key => $value) {
                if (!is_array($value) && !is_object($value)) {
                    $value = utf8_encode(trim($value));
                }
                $result[$key] = $this->JsonStringify($value);
            }
            return $result;
        }
        return $data;
    }

}
