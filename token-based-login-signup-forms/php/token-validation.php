<?php
    // PHP Redis driver and including required packages
    require '../libraries/composer/vendor/predis/predis/autoload.php';
    Predis\Autoloader::register();

    // Extracting data from post method 
    $token = $_POST["token"];

    // Establishing connection to redis
    $redis = new Predis\Client(array(
        "scheme" => "tcp",
        "host" => "127.0.0.1",
        "port" => "6379",
        "password" => "guvi-2023"
    ));

    $response = new stdClass();

    // Check token existance in Redis
    if($redis->exists($token)){
        $response->res = "success";
        $response->email = $redis->get("$token");
    }
    else
        $response->res = "not found";

    // Sending back response in JSON
    echo json_encode($response);
?>