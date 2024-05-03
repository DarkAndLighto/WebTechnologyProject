<?php
    $name = $_POST['name'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm Submission</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <link href="styling.css" rel="stylesheet" />
  <link href="Contact.css" rel="stylesheet">
</head>

<body>


    <div class="container" style="max-width: 40%; padding: 0;"> 
        <div class="blurry-box form-confirm">
            <form action="https://formspree.io/f/xyyroprg" method="post" id="myForm" enctype="multipart/form-data">
                <div class="row title-control">
                    Confirm email send?
                </div>
    
                <div class="row row-control">
                        <label>Name: </label>
                        <textarea readonly name="name" id="name"><?php echo $name; ?></textarea>
                        <label>Last name: </label>
                        <textarea readonly name="lastname" id="lastname"><?php echo $lastname; ?></textarea>
                        <label>Email: </label>
                        <textarea readonly name="email" id="email"><?php echo $email; ?></textarea>
                        <label>Phone: </label>
                        <textarea readonly name="phone" id="phone"><?php echo $phone; ?></textarea>
                        <label>Message: </label>
                        <textarea readonly name="message" id="message" style="height: 200px;"><?php echo $message; ?></textarea>
                        <button type="submit">Confirm</button>
                        
                        <button type="button" onclick="ReturnHome()">Return</button>
                </div>
            </form>
        </div>
    </div>
  
  <script src="https://kit.fontawesome.com/41752380dd.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
</body>

</html>

<script>
    function ReturnHome()
    {
        window.location.href = "Contact.html";
    }
</script>