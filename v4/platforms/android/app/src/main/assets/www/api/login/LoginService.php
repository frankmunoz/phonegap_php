<?php

class LoginService extends MsSQL {

    public function login($data) {
        try {
            $sql = "
                SELECT 
                    CONCAT(Nombre1, ' ' ,Nombre2, ' ' ,Apellido1, ' ' ,Apellido2) AS [Usuario]
                    , SitioPOS 
                FROM 
                    Usuarios 
                WHERE
                    NombreUsuario = ? AND NombreUsuario = ?";
            return $this->execute($sql, [$data->email, $data->password]);
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

}
