<?php
function renderPage($title, $message, $isSuccess = true, $errors = []) {
    $statusClass = $isSuccess ? 'text-success' : 'text-danger';
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo htmlspecialchars($title); ?></title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="page-contact">
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card section-card p-4">
          <h1 class="section-heading"><?php echo htmlspecialchars($title); ?></h1>
          <p class="<?php echo $statusClass; ?>"><?php echo nl2br(htmlspecialchars($message)); ?></p>
          <?php if (!empty($errors)) : ?>
            <div class="alert alert-danger">
              <ul class="mb-0">
                <?php foreach ($errors as $error) : ?>
                  <li><?php echo htmlspecialchars($error); ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          <?php endif; ?>
          <a href="contact.html" class="btn btn-cta">Back to Contact</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
<?php
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];
if ($name === '') {
    $errors[] = 'Name is required.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if ($message === '') {
    $errors[] = 'Message cannot be empty.';
}

if (!empty($errors)) {
    renderPage('Contact Form Error', 'Please correct the errors below and try again.', false, $errors);
}

$recipient = 'rajeev@manit.ac.in';
$subject = 'Contact form submission from ' . $name;
$body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
$fromEmail = 'no-reply@manit.ac.in';
$fromName = 'CMET Website';

// SMTP configuration: update these values for your SMTP provider.
$smtpConfig = [
    'host' => 'smtp.gmail.com',
    'port' => 587,
    'encryption' => 'tls', // use 'ssl' for port 465 or 'tls' for port 587
    'username' => '',
    'password' => '',
    'from_email' => $fromEmail,
    'from_name' => $fromName,
];

function smtp_send($to, $subject, $body, $headers, $config) {
    $host = $config['host'];
    $port = $config['port'];
    $encryption = strtolower($config['encryption']);
    $username = $config['username'];
    $password = $config['password'];
    $timeout = 30;

    $transport = $host;
    if ($encryption === 'ssl') {
        $transport = 'ssl://' . $host;
    }

    $socket = fsockopen($transport, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        return false;
    }

    $read = function() use ($socket) {
        return fgets($socket, 515);
    };
    $expect = function ($code) use ($read) {
        $response = '';
        while ($line = $read()) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') {
                break;
            }
        }
        return substr($response, 0, 3) === (string)$code;
    };

    if (!expect(220)) {
        fclose($socket);
        return false;
    }

    fwrite($socket, "EHLO localhost\r\n");
    if (!expect(250)) {
        fclose($socket);
        return false;
    }

    if ($encryption === 'tls') {
        fwrite($socket, "STARTTLS\r\n");
        if (!expect(220)) {
            fclose($socket);
            return false;
        }
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        fwrite($socket, "EHLO localhost\r\n");
        if (!expect(250)) {
            fclose($socket);
            return false;
        }
    }

    fwrite($socket, "AUTH LOGIN\r\n");
    if (!expect(334)) {
        fclose($socket);
        return false;
    }

    fwrite($socket, base64_encode($username) . "\r\n");
    if (!expect(334)) {
        fclose($socket);
        return false;
    }

    fwrite($socket, base64_encode($password) . "\r\n");
    if (!expect(235)) {
        fclose($socket);
        return false;
    }

    $from = $config['from_email'];
    fwrite($socket, "MAIL FROM:<{$from}>\r\n");
    if (!expect(250)) {
        fclose($socket);
        return false;
    }

    fwrite($socket, "RCPT TO:<{$to}>\r\n");
    if (!expect(250)) {
        fclose($socket);
        return false;
    }

    fwrite($socket, "DATA\r\n");
    if (!expect(354)) {
        fclose($socket);
        return false;
    }

    $message = "Subject: {$subject}\r\n";
    $message .= "To: {$to}\r\n";
    $message .= "From: {$config['from_name']} <{$from}>\r\n";
    $message .= $headers . "\r\n\r\n";
    $message .= wordwrap($body, 70, "\r\n");
    $message .= "\r\n.\r\n";

    fwrite($socket, $message);
    if (!expect(250)) {
        fclose($socket);
        return false;
    }

    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return true;
}

$headers = "Reply-To: $email\r\n";

if (!empty($smtpConfig['username']) && !empty($smtpConfig['password'])) {
    $sent = smtp_send($recipient, $subject, $body, $headers, $smtpConfig);
} else {
    $headers = "From: $fromName <$fromEmail>\r\n" . $headers . "X-Mailer: PHP/" . phpversion();
    $sent = mail($recipient, $subject, $body, $headers);
}

if ($sent) {
    renderPage('Message Sent', "Your message has been sent to $recipient. Thank you for reaching out.");
}

renderPage('Message Failed', 'We could not send your message at this time. Please configure SMTP settings in contact-submit.php or set up a local mail server in php.ini. Contact us directly at ' . $recipient . '.', false);
