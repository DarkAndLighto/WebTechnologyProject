<?php
    $email = $_POST['email'];
    $password = $_POST['password'];

    $con = new mysqli("localhost", "root", "", "webproject");
    if ($con->connect_error)
    {
        die("Failed to connect: " .$con->connect_error);
    } else
    {
        $stmt = $con->prepare("select * from projectdatabase where email = ?");
        $stmt -> bind_param("s", $email);
        $stmt -> execute();
        $stmt_result = $stmt->get_result();
        if ($stmt_result -> num_rows > 0)
        {
            $data = $stmt_result->fetch_assoc();
            if ($data['password'] === $password)
            {
                echo "<script>alert('Login Successful');</script>";
            } else
            {
                echo '<h2>Login Failed</h2>';
            }
        }
    }
?>