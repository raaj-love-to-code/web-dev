<?php
    // PHP MonogoDb driver 
    require '../libraries/composer/vendor/autoload.php';

    // PHP Redis driver and including required packages
    require '../libraries/composer/vendor/predis/predis/autoload.php';
    Predis\Autoloader::register();

    // Extracting data from post method 
    $email = $_POST["email"]; 
    $password = $_POST["password"];

    // Establishing connection to mongoDb (Atlas) 
    $connectionString = "mongodb+srv://guvi-cluster:guvi-2023@guvi-cluster.pvikota.mongodb.net/?retryWrites=true&w=majority";
    $mongoDbCon = new MongoDB\Client($connectionString);

    // choosing Database and collection
    $db = $mongoDbCon->guviDb;
    $collection = $db->userLogin;

    // result from mongoDb
    $result = ($collection->find(array("email"=>$email)))->toArray();

    $response = new stdClass();

    // Validating email and passoword
    if(count($result) > 0){
        if($result[0]["password"]==$password)
            $response->res  = "success";
        else
            $response->res  = "passwordIncorrect";
    }else  
        $response->res = "Account not found";


    // Establishing connection to redis
    $redis = new Predis\Client(array(
        "scheme" => "tcp",
        "host" => "127.0.0.1",
        "port" => "6379",
        "password" => "guvi-2023"   
    ));

    $token = bin2hex(random_bytes(16));
    $response->token = $token."";

    $redis->set($token,$email);
    $redis->expire($token,3600);
    $response->rres = $redis->get($email);

    // Sending back response in JSON
    echo json_encode($response); 
?>