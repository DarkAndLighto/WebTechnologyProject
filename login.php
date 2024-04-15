<?php
    $email = $_POST['email'];
    $password = $_POST['password'];

    //echo $email;
    //echo $password;
    /* THIS WILL --NOT-- WORK WITH WAMP */
    $con = new mysqli("localhost", "id22019662_ammar", "Greenberrypie1!", "id22019662_projectdatabase");
    if ($con->connect_error)
    {
        die("Failed to connect: " .$con->connect_error);
    } else
    {
        $stmt = $con->prepare("select * from ProjectDatabase where email = ?");
        $stmt -> bind_param("s", $email);
        $stmt -> execute();
        $stmt_result = $stmt->get_result();
        if ($stmt_result -> num_rows > 0)
        {
            $data = $stmt_result->fetch_assoc();
            if ($data['password'] === $password)
            {
                echo "Password is CORRECT and it is $password";
                echo "<script>alert('Login Successful. Welcome $email!');</script>";
            } else
            {
                echo "Password is WRONG and it is $password";
                echo "<script>alert('Login Failed! Please try again.');</script>";
                header("Location: login.html");
            }
        }
    }
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
            <a href="index.html">
                <button>
                    Return home
                </button>
            </a>
        </div>
    </div>
  
  <script src="https://kit.fontawesome.com/41752380dd.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
</body>

</html>
