$(() => {

    // Initial state of alert
    $("#alert").hide();

    // Extracting value from local storage
    var token = localStorage.getItem("token");

    // Token existance check
    if(token){
        validateToken(token);
    }else
        invalidToken();

    // function to validate token
    function validateToken(token){

        $.ajax({

            async: false,

            type: "POST",

                url: "../php/token-validation.php",

                data: {
                    token: token
                },

                timeout: 5000,

                dataType: "json",

                success: (data) => {
                    
                    console.log(JSON.stringify(data));

                    // Successfull authetication
                    if(data["res"] === "success"){

                        $("#email").text(data["email"]);

                        // Code to load page here ---------------- 

                    }
                    else
                        invalidToken();
                },

                error: (e) => {
                    invalidToken();
                    console.log("status code : "+e.status+" staus : "+e.statusText+" response: ", e.responseText);
                }

        });
    }

    // Handle invalid token
    function invalidToken(){

        // Alert box to display the alert
        $("#alert").show();
        $("#alert").text("Authentication failed, Sign in again to continue");

        // Clearing the existing token
        localStorage.removeItem("token");
        $("#load").attr("hidden","true");

        // Timeout for redirecting to login page
        setTimeout(()=>{
            window.location.href = "../index.html";
        }, 4000);
    }

    // Sign out function
    $("#btn-sign-out").click(() => {
        localStorage.removeItem("token");
        window.location.href = "../index.html";
    })

});