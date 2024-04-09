<?php

class POVService extends MsSQL {

    public function get($data) {
        try {
            $arrayCustomers = $this->__getCustomers($data->vrn->code);
            $arrayProducts = $this->__getProducts($data->pov);
            if (count($arrayCustomers) && count($arrayProducts)) {
                return [
                    "customers" => $arrayCustomers,
                    "products" => $arrayProducts
                ];
            } else {
                throw new Exception("VRN no válida");
            }
        } catch (Exception $exc) {
            
        }
    }

    public function getCustomers($vrn) {
        try {
            $sql = "
            SELECT
                P.NUMEROIDENTIFICACION AS [Documento]
                , CONCAT(P.NOMBRE1, ' ', P.NOMBRE2, ' ', P.APELLIDO1, ' ', P.APELLIDO2) AS [Nombre]
                , R.VALORTOTAL * P.Beneficiarios [MontoAsignado]
            FROM
                Entregas E
                JOIN ProyectosEntregas PE ON PE.EntregaID = E.EntregaID
                JOIN RACIONES R ON R.RACIONID = PE.RacionID
                JOIN Proyectos_Personas PP ON PP.ProyectoID = PE.ProyectoID
                JOIN Personas P ON P.PERSONASID = PP.PersonasID
            WHERE
                E.codigo = ?
            ";
            return $this->execute($sql, [$vrn]);
        } catch (Exception $exc) {
            
        }
    }

    public function getProducts($pov) {
        try {
            $sql = "
            SELECT
                P.PRODUCTOID AS [Codigo]
                , P.NOMBRE [Nombre]
                , PS.PRECIOMAXIMO AS [PrecioCompra]
                , PS.IVA AS [Aumento]
                , PS.PRECIOMAXIMO AS [PrecioVenta]
                , POV.DESCRIPCION AS [Proveedor]
            FROM
                SITIOS POV
                JOIN PRODUCTO_SITIO PS ON PS.SITIOID = POV.SITIOID
                JOIN PRODUCTOS P ON P.PRODUCTOID = PS.PRODUCTOID
            WHERE
                POV.TIPOSITIOID = 'PV'
                AND POV.SITIOID = ?
            ";
            return $this->execute($sql, [$pov]);
        } catch (Exception $exc) {
            
        }
    }

}
