<?php
header('Content-type: application/json');

$data = '{
  "socios" :[
    { "id":1, "nombre":"PASTORAL SOCIAL"}
    , { "id":2, "nombre":"MISIONEROS DE SAN CARLOS SCALABRINIANOS"}
    , { "id":3, "nombre":"WORLD VISION"}
  ],
  "nacionalidades" :[
    { "id":1, "nombre":"COLOMBIANO"}
    , { "id":2, "nombre":"VENEZOLANO"}
    , { "id":3, "nombre":"COLOMBO-VENEZOLANO"}
    , { "id":4, "nombre":"WAYUU"}
  ],
  "estadosMigratorio" :[
    { "id":1, "nombre":"MIGRANTE"}
    , { "id":2, "nombre":"RESIDENTE"}
    , { "id":3, "nombre":"RERTORNADO"}
  ],
  "tiposDocumento" :[
    { "id":1, "nombre":"CEDULA"},
    { "id":2, "nombre":"TARJETA DE IDENTIDAD"},
    { "id":3, "nombre":"NO DISPONIBLE (SIN DOCUMENTO)"},
    { "id":4, "nombre":"NUMERO DE IDENTIFICACION TRIBUTARIA"},
    { "id":5, "nombre":"CEDULA DE EXTRANJERIA"},
    { "id":6, "nombre":"REGISTRO CIVIL DE NACIMIENTO"},
    { "id":7, "nombre":"CEDULA VENEZOLANA"},
    { "id":8, "nombre":"PASAPORTE VENEZOLANO"},
    { "id":9, "nombre":"PERMISO ESPECIAL DE PERMANENCIA (PEP)"},
    { "id":10, "nombre":"TARJETA DE MOVILIDAD FRONTERIZA (TMF)"},
    { "id":11, "nombre":"NIT"},
    { "id":12, "nombre":"ACTA DE NACIMIENTO"},
    { "id":13, "nombre":"OTRO"}
  ],
  "generos" :[
    { "id":1, "nombre": "FEMENINO" },
    { "id":2, "nombre": "MASCULINO" }
  ],
  "gestantesLactante" : [
    { "id":1, "nombre": "GESTANTE" },
    { "id":2, "nombre": "LACTANTE" },
    { "id":3, "nombre": "NO APLICA" }
  ],
  "municipios" :[
    { "id":1, "nombre": "PASTO", "departamento": "NARIÑO" },
    { "id":2, "nombre": "IPIALES", "departamento": "NARIÑO" },
    { "id":3, "nombre": "YACUANQUER", "departamento": "NARIÑO" },
    { "id":4, "nombre": "RIOHACHA", "departamento": "LA GUAJIRA" },
    { "id":5, "nombre": "MAICAO", "departamento": "LA GUAJIRA" },
    { "id":6, "nombre": "MANAURE", "departamento": "LA GUAJIRA" },
    { "id":7, "nombre": "URIBIA", "departamento": "LA GUAJIRA" },
    { "id":8, "nombre": "ARAUCA", "departamento": "ARAUCA" },
    { "id":9, "nombre": "TAME", "departamento": "ARAUCA" },
    { "id":10, "nombre": "FORTUL", "departamento": "ARAUCA" },
    { "id":11, "nombre": "SARAVENA", "departamento": "ARAUCA" },
    { "id":12, "nombre": "CUCUTA", "departamento": "NORTE DE SANTANDER" },
    { "id":13, "nombre": "PATIOS", "departamento": "NORTE DE SANTANDER" },
    { "id":14, "nombre": "VILLA DEL ROSARIO", "departamento": "NORTE DE SANTANDER" }
  ],
  "beneficiarios" :[
    {
      "id": 1
      ,"socio":1
      ,"institucion":1
      ,"departamento":1
      ,"municipio":1
      ,"tipo_documento":1
      ,"numero_documento":8005455
      ,"nacionalidad":1
      ,"estado_migratorio":1
      ,"primer_nombre":"Francisco"
      ,"segundo_nombre":"Antonio"
      ,"primer_apellido":"Muñoz"
      ,"segundo_apellido":"García"
      ,"genero":1
      ,"fecha_nacimiento":1
      ,"numero_telefono":1
      ,"gestante_lactante":1
      ,"creado":1
      ,"editado":1
    },
    {
      "id": 2
      ,"socio":2
      ,"institucion":2
      ,"departamento":2
      ,"municipio":2
      ,"tipo_documento":2
      ,"numero_documento":2
      ,"nacionalidad":2
      ,"estado_migratorio":2
      ,"primer_nombre":2
      ,"segundo_nombre":2
      ,"primer_apellido":2
      ,"segundo_apellido":2
      ,"genero":2
      ,"fecha_nacimiento":2
      ,"numero_telefono":2
      ,"gestante_lactante":2
      ,"creado":2
      ,"editado":2
    },
    {
      "id": 3
      ,"socio":3
      ,"institucion":3
      ,"departamento":3
      ,"municipio":3
      ,"tipo_documento":3
      ,"numero_documento":3
      ,"nacionalidad":3
      ,"estado_migratorio":3
      ,"primer_nombre":3
      ,"segundo_nombre":3
      ,"primer_apellido":3
      ,"segundo_apellido":3
      ,"genero":1
      ,"fecha_nacimiento":3
      ,"numero_telefono":3
      ,"gestante_lactante":3
      ,"creado":3
      ,"editado":3
    },
    {
      "id": 4
      ,"socio":2
      ,"institucion":1
      ,"departamento":2
      ,"municipio":2
      ,"tipo_documento":2
      ,"numero_documento":4
      ,"nacionalidad":2
      ,"estado_migratorio":2
      ,"primer_nombre":2
      ,"segundo_nombre":2
      ,"primer_apellido":2
      ,"segundo_apellido":2
      ,"genero":2
      ,"fecha_nacimiento":2
      ,"numero_telefono":2
      ,"gestante_lactante":2
      ,"creado":2
      ,"editado":2
    },
    {
      "id": 5
      ,"socio":3
      ,"institucion":2
      ,"departamento":3
      ,"municipio":3
      ,"tipo_documento":3
      ,"numero_documento":5
      ,"nacionalidad":3
      ,"estado_migratorio":3
      ,"primer_nombre":3
      ,"segundo_nombre":3
      ,"primer_apellido":3
      ,"segundo_apellido":3
      ,"genero":1
      ,"fecha_nacimiento":3
      ,"numero_telefono":3
      ,"gestante_lactante":3
      ,"creado":3
      ,"editado":3
    },
    {
      "id": 6
      ,"socio":3
      ,"institucion":3
      ,"departamento":3
      ,"municipio":3
      ,"tipo_documento":3
      ,"numero_documento":6
      ,"nacionalidad":3
      ,"estado_migratorio":3
      ,"primer_nombre":3
      ,"segundo_nombre":3
      ,"primer_apellido":3
      ,"segundo_apellido":3
      ,"genero":1
      ,"fecha_nacimiento":3
      ,"numero_telefono":3
      ,"gestante_lactante":3
      ,"creado":3
      ,"editado":3
    }
  ],
  "instituciones" :[
    { "id":1, "nombre": "COMEDOR 1" },
    { "id":2, "nombre": "COMEDOR 2" },
    { "id":3, "nombre": "INSTITUCION 3" },
    { "id":4, "nombre": "INSTITUCION 4" }
  ],
  "complementos" :[
    { "id":1, "nombre": "DESAYUNO" },
    { "id":2, "nombre": "ALMUERZO" },
    { "id":3, "nombre": "CENA" }
  ],
  "asistencias" :[]
}';
echo $data; // json_encode( $data );
