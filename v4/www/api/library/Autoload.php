<?php

spl_autoload_register('autoload');

function autoload($className) {
    $folder = "library/";
    if ($className === "LoginController") {
        $folder = "login/";
    }
    if ($className === "LoginService") {
        $folder = "login/";
    }
    if ($className === "POVController") {
        $folder = "pov/";
    }
    if ($className === "POVService") {
        $folder = "pov/";
    }
    $fileName = $folder . $className . ".php";
    if (is_file($fileName)) {
        require $fileName;
    }
}
