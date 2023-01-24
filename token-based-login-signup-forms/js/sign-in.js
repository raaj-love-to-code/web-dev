$(() => {

    // Check for Token
    var token = localStorage.getItem("token");

    if(token){
        validateToken(token);
    }else{
        $("#load").attr("hidden","true");
    }

    // Setting maximum length for the input boxes
    $("#email").attr("maxlength","30");
    $("#password").attr("maxlength","30");

    // Login button on click function
    $("#btnLogin").click((e) => {
        e.preventDefault();

        // Extracting input from html
        var email = $("#email").val();
        var password = $("#password").val();
        
        // Regex for email
        var emailRegex = new RegExp("^[a-z0-9]{2,}\@[a-z0-9]{2,}\.[a-z0-9]{2,}$");

        // setting emppty string for Error spans
        $("#emailStatus").text("");
        $("#passwordStatus").text("");
        $("#status").text("");

        // Validating input fields
        if(email==="")
            $("#email").attr("placeholder","E-mail id is required");
        else if(password==="")
            $("#password").attr("placeholder","Passsword is required");
        else if(!emailRegex.test(email))
            $("#emailStatus").text("E-mail is Invalid");
        
        // Login submission 
        else{

            // using post method in AJAX
            $.ajax({

                async: true,

                type: "POST",

                url: "./php/sign-in.php",

                data: {
                    email: email,
                    password: password
                },

                timeout: 5000,

                dataType: "json",

                success: (data) => {
                    
                    // Extracting response 
                    var response = data["res"];

                    // Response validation
                    if(response==="success"){
                        localStorage.setItem("token",data["token"]);
                        window.location.href= "./html/dashboard.html";
                    }
                    else if(response==="passwordIncorrect")
                        $("#passwordStatus").text("Password Incorrect");
                    else 
                        $("#status").text("Account not found");

                    console.log("Response : "+JSON.stringify(data));
                },

                error: function(e){
                    console.log("status code : "+e.status+" staus : "+e.statusText+" response: ", e.responseText);
                    $("#status").text("Something went wrong! Try again");
                }

            });
            
        }
        
    });

    // Signup button on click function
    $("#btnSignUp").click(() => {
        window.location.href = "./html/sign-up.html";
    });

    // Forget password button on click function
    $("#btnForgetPassword").click(() => {
        alert("Reset passoword");
    });


    // function to validate token
    function validateToken(token){

        console.log(token+"sad");

        $.ajax({

            async: false,

            type: "POST",

                url: "./php/token-validation.php",

                data: {
                    token: token
                },

                timeout: 5000,

                dataType: "json",

                success: (data) => {

                    // hiding loading spinner
                    $("#load").attr("hidden","true");
                    console.log(JSON.stringify(data));

                    // Validating response
                    if(data["res"] === "success")
                        window.location.href = "./html/dashboard.html";
                    else    
                        $("#load").attr("hidden","true");
                },

                error: (e) => {
                    $("#load").attr("hidden","true");
                    console.log("status code : "+e.status+" staus : "+e.statusText+" response: ", e.responseText);
                }

        });
    }
});
