<?php

class MsSQL {

    protected $connection = null;
    private $instance = null;

    public function MsSQL($database = 'Db') {
        // we don't need to connect twice
        if ($this->connection) {
            return;
        }

        $db = 'CSMARTColombia';
        $user = 'pmacolombia';
        $password = 'PM45IILC02016';
        $mssql_server = '10.48.78.2\SQLEXPRESS';
        $mssql_data = array(
            "Database" => $db,
            "UID" => $user,
            "PWD" => $password
        );
        $this->connection = sqlsrv_connect($mssql_server, $mssql_data);
        if (!$this->connection) {
            return 'Failed to connect to host';
        }
    }

    public function execute($query, $params = null) {
        $this->result = array();
        $result = $this->query($query, $params);
        while ($row = sqlsrv_fetch_object($result)) {
            $this->result[] = $row;
        }
        return $this->result;
    }

    public function query($query, $params = null) {
        $result = sqlsrv_query($this->connection, $query, $params);
        if (!$result) {
            echo 'Error in statement execution.\n';
            die(print_r(sqlsrv_errors(), true));
        }
        return $result;
    }

}
