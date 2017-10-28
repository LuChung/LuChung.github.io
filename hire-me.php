<?php

	$site_owners_email = 'example@example.com'; // Replace this with your own email address
	$site_owners_name = 'Example'; // replace with your name

	$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
	$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
	$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

	$project_title = filter_var($_POST['project_title'], FILTER_SANITIZE_STRING);
	$category = filter_var($_POST['category'], FILTER_SANITIZE_STRING);
	$budget = filter_var($_POST['budget'], FILTER_SANITIZE_STRING);
	$date = filter_var($_POST['date'], FILTER_SANITIZE_STRING);
	$estimate = filter_var($_POST['estimate'], FILTER_SANITIZE_STRING);
    
    switch( $estimate ){
        case 'no' : $estimate = 'No'; 
            break;
        case 'yes': $estimate = 'Yes';
            break;
        default:
            $estimate = 'No';
            break;
    }
	
	// Check error
	$error = "";

	if (strlen($name) < 2) {
		$error['name'] = "Please enter your name";
	}

	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "Please enter a valid email address";
	}

	if (strlen($message) < 2) {
		$error['message'] = "Please leave a comment.";
	}

	if (!$error) {

		require_once('phpmailer/class.phpmailer.php');
		$mail = new PHPMailer();

		$mail->Subject = $project_title;

		$mail->FromName = $name;
		$mail->From = $email;

		$mail->AddAddress($site_owners_email, $site_owners_name);
		$mail->IsHTML(true);

		$mail->Body = '<b>Sender Name: </b>'.$name.'<br/><b>Sender E-mail: </b>'.$email.'<br/><br/><b>Category: </b>'.$category.'<br/><b>Budget: </b>'.$budget.'<br/><b>Estimate Date: </b>'.$date.'<br/><b>Estimate Required: </b>'.$estimate.'<br/><br/>'.$message;
		
		if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == UPLOAD_ERR_OK) {
			$mail->AddAttachment($_FILES['attachment']['tmp_name'], $_FILES['attachment']['name']);
		}

		$mail->Send();

		// Confirmation message
		echo "<div class='alert alert-success'  role='alert'>Thanks " . $name . ". Your message has been sent.</div>";

	} # end if no error
	else {

		$response = (isset($error['name'])) ? "<div class='alert alert-danger'  role='alert'>" . $error['name'] . "</div> \n" : null;
		$response .= (isset($error['email'])) ? "<div class='alert alert-danger'  role='alert'>" . $error['email'] . "</div> \n" : null;
		$response .= (isset($error['message'])) ? "<div class='alert alert-danger'  role='alert'>" . $error['message'] . "</div>" : null;

		echo $response;
	} # end if there was an error sending

?>