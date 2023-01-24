<?php
    // PHP MonogoDb driver 
    require '../libraries/composer/vendor/autoload.php';

    // Extracting data from post method 
    $name = $_POST["name"];
    $mobile = $_POST["mobile"];
    $email = $_POST["email"]; 
    $password = $_POST["password"];

    // Establishing connection to mongoDb (Atlas) 
    $connectionString = "mongodb+srv://guvi-cluster:guvi-2023@guvi-cluster.pvikota.mongodb.net/?retryWrites=true&w=majority";
    $mongoDbCon = new MongoDB\Client($connectionString);

    // choosing Database and collection
    $db = $mongoDbCon->guviDb;
    $collection = $db->userLogin;

    // Finding existence
    $existResult = ($collection->find(array("email"=>$email)))->toArray();
    
    $response = new stdClass();

    if(count($existResult) > 0){
        $response->res  = "already found";
        echo json_encode($response);
        exit();
    }

    
    // Inserting data to mongoDb
    $result =  $collection->insertOne(["email"=>$email, "password"=>$password, "name"=>$name, "mobile"=>$mobile]);

    // Insertion confirmation
    if($result->getInsertedCount() > 0)
            $response->res  = "success";
    else
        $response->res  = "passwordIncorrect";

    // Sending back response in JSON
    echo json_encode($response); 
?>