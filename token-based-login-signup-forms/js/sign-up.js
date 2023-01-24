$(()=>{

    // Setting maximum length for the input boxes
    $("#name").attr("maxlength","30");
    $("#mobile").attr("maxlength","10");
    $("#email").attr("maxlength","30");
    $("#password").attr("maxlength","30");
    $("#confirm-password").attr("maxlength","30");

    // Sign-up button on click function
    $("#btn-signup").click((e) => {
        e.preventDefault();

        // Extracting input from html
        var name = $("#name").val();
        var mobile = $("#mobile").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirm-password").val();
        
        // Regex for email and password
        var emailRegex = new RegExp("^[a-z0-9]{2,}\@[a-z0-9]{2,}\.[a-z0-9]{2,}$");
        var passwordRegex = new RegExp("(?=.*[a-z]{1,})(?=.*[A-Z]{1,})(?=.*[0-9]{1,})(?=.*[^[a-zA-Z0-9]{1,}).{7,15}");
        var mobileRegex = new RegExp("^[9876][0-9]{9}$");

        // setting emppty string for Error spans
        $("#name-status").text("");
        $("#mobile-status").text("");
        $("#email-status").text("");
        $("#password-status").text("");
        $("#confirm-password-status").text("");
        $("#status").text("");

        // Validating input fields
        if(name==="")
            $("#name").attr("placeholder","Name is required");
        else if(mobile==="")
            $("#mobile").attr("placeholder","Mobile Number is required");
        else if(email==="")
            $("#email").attr("placeholder","E-mail id is required");
        else if(password==="")
            $("#password").attr("placeholder","Passsword is required");
        else if(confirmPassword==="")
            $("#confirm-password").attr("placeholder","Confirm Passsword is required");
        else if(!mobileRegex.test(mobile))
            $("#mobile-status").text("Invalid Mobile Number");
        else if(!emailRegex.test(email))
            $("#email-status").text("E-mail is Invalid");
        else if(!passwordRegex.test(password))
            $("#password-status").text("Password should atleast have one lower case, one upper case, one number, one special character \n With a length between 7-15 characters");
        else if(password!==confirmPassword)
            $("#confirm-password-status").text("Confirm passoword does not match")
        
        // Sign-up submission
        else{

            // using post method in AJAX
            $.ajax({

                async: true,

                type: "POST",
                
                url: "../php/sign-up.php",

                data: {
                    name: name,
                    mobile: mobile,
                    email: email,
                    password: password
                },

                timeout: 5000,

                dataType: "json",

                success: (data) => {

                    // Extracting response data
                    var response = data["res"];

                    // Validating response data
                    if(response==="success"){
                        $("#status").css("color","green !important");
                        $("#status").text("Registered successfully");

                        // Timeout to show the Registration status is successful
                        setTimeout(()=>{
                            window.location.href = "../index.html";
                        },3000);
                    }
                    else if(response==="already found")
                        $("#status").text("Account already exist");
                    
                },

                error: function(e){
                    console.log("status code : "+e.status+" staus : "+e.statusText+" response: ", e.responseText);
                    $("#status").text("Something went wrong! Try again");
                }

            });
        }

    });

    // Signin button on click function
    $("#btn-login").click(() => {
        window.location.href = "../index.html";
    });
});