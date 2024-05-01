<?php
    $email = $_POST['email'];
    $password = $_POST['password'];

    $con = new mysqli("localhost", "id22019662_ammar", "Greenberrypie1!", "id22019662_projectdatabase");
    if ($con->connect_error) {
        die("Failed to connect: " . $con->connect_error);
    }

    $stmt = $con->prepare("SELECT email, password FROM `ProjectDatabase` WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($db_email, $db_password);
    $stmt->fetch();

    if ($db_email === $email) {
        if ($db_password === $password) {
            $message = "CORRECT password. Welcome back $email!";
        } else {
            $message = "INCORRECT password. Please try again.";
        }
    } else {
        $message = "User '$email' not found.";
    }

    $stmt->close();
    $con->close();
?>



<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <link href="styling.css" rel="stylesheet" />
  <link href="login.css" rel="stylesheet">
</head>

<body>


    <div class="container"> 
        <div class="blurry-box return-home">
            <div class="row">
                <div class="col-12" id="message-box">
                    <h1> <?php echo $message; ?> </h1>
                </div>
                <div class="col-12">
                    <a href="login.html">
                        <button>
                            Return to login
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
  
  <script src="https://kit.fontawesome.com/41752380dd.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
</body>

</html>
