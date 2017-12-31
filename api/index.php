<?php
// In case one is using PHP 5.4's built-in server
$filename = __DIR__ . preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']);
if (php_sapi_name() === 'cli-server' && is_file($filename)) {
    return false;
}

if (!function_exists('apache_request_headers')) {

    function apache_request_headers()
    {
        $arh = array();
        $rx_http = '/\AHTTP_/';
        foreach ($_SERVER as $key => $val) {
            if (preg_match($rx_http, $key)) {
                $arh_key = preg_replace($rx_http, '', $key);
                $rx_matches = array();
                // do some nasty string manipulations to restore the original letter case
                // this should work in most cases
                $rx_matches = explode('_', $arh_key);
                if (count($rx_matches) > 0 and strlen($arh_key) > 2) {
                    foreach ($rx_matches as $ak_key => $ak_val) $rx_matches[$ak_key] = ucfirst($ak_val);
                    $arh_key = implode('-', $rx_matches);
                }
                $arh[ucfirst(strtolower($arh_key))] = $val;
            }
        }
        return ($arh);
    }
}


require __DIR__ . '/vendor/autoload.php';

try {
    $dotenv = new Dotenv\Dotenv(__DIR__);
    $dotenv->load();
} catch (InvalidArgumentException $ex) {
    // Ignore if no dotenv
}

$app = new \App\Main();

$router = new \Bramus\Router\Router();

function sendCorsHeaders()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, Post-Id");
    header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");
}

$router->options('/.*', function () {
    sendCorsHeaders();
});

sendCorsHeaders();

// Check JWT on /secured routes
$router->before('GET|POST|DELETE', '/secured/.*', function () use ($app) {

    $requestHeaders = apache_request_headers();

    if (!isset($requestHeaders['Authorization'])) {
        header('HTTP/1.0 401 Unauthorized');
        echo "No token provided.";
        exit();
    }

    $authorizationHeader = $requestHeaders['Authorization'];

    if ($authorizationHeader == null) {
        header('HTTP/1.0 401 Unauthorized');
        echo "No authorization header sent";
        exit();
    }

    $token = str_replace('Bearer ', '', $authorizationHeader);

    try {
        $app->setCurrentToken($token);
    } catch (\Auth0\SDK\Exception\CoreException $e) {
        header('HTTP/1.0 401 Unauthorized');
        echo "Invalid token";
        exit();
    }

});

$router->get('/news', function () use ($app) {
    echo json_encode($app->getNews());
});

$router->delete('/secured/news', function () use ($app) {
    $requestHeaders = apache_request_headers();
    echo json_encode($app->deleteNews($requestHeaders['Post-Id']));
});

$router->post('/secured/news', function () use ($app) {
    $post = file_get_contents('php://input');
    $post = json_decode($post, TRUE); //convert JSON into array
    $id = $post['id'];
    $date = $post['date'];
    $title = $post['title'];
    $content = $post['content'];

    echo($app->postNews($id, $title, $content, $date));
});

$router->get('/events', function () use ($app) {
    echo json_encode($app->getEvents(''));
});

$router->get('/gttmd', function () use ($app) {
    echo json_encode($app->getEvents('gttmd'));
});

$router->get('/ktwt', function () use ($app) {
    echo json_encode($app->getEvents('ktwt'));
});

$router->post('/secured/events', function () use ($app) {
    $post = file_get_contents('php://input');
    $post = json_decode($post, TRUE); //convert JSON into array

    echo($app->postEvents($post));
});

$router->get('/trip-dates', function () use ($app) {
    echo json_encode($app->getTripDates());
});

$router->post('/secured/trip-dates', function () use ($app) {
    $post = file_get_contents('php://input');
    $post = json_decode($post, TRUE);
    $id = $post['id'];
    $date = $post['date'];
    $leader = $post['tripLeader'];
    $status = $post['status'];

    echo($app->postTripDate($id, $date, $leader, $status));
});

$router->delete('/secured/trip-dates', function () use ($app) {
    $requestHeaders = apache_request_headers();
    echo json_encode($app->deleteTripDate($requestHeaders['Post-Id']));
});

$router->get('/secured/applications', function () use ($app) {
    echo json_encode($app->getApplications());
});

$router->post('/apply', function () use ($app) {
    $post = file_get_contents('php://input');
    $post = json_decode($post, TRUE);

    $first = $post['first'];
    $middle = $post['middle'];
    $last = $post['last'];
    $addressLine1 = $post['address-line-1'];
    $addressLine2 = $post['address-line-2'];
    $city = $post['city'];
    $state = $post['state'];
    $zip = $post['zip'];
    $homePhone = $post['home-phone'];
    $cellPhone = $post['cell-phone'];
    $email = $post['email'];
    $month = $post['month'];
    $day = $post['day'];
    $year = $post['year'];
    $nationality = $post['nationality'];
    $birthPlace = $post['birth-place'];
    $maidenName = $post['maiden-name'];
    $maritalStatus = $post['marital-status'];
    $gender = $post['gender'];
    $passportNumber = $post['passport-number'];
    $passportIssueDateMonth = $post['passport-issue-date-month'];
    $passportIssueDateDay = $post['passport-issue-date-day'];
    $passportIssueDateYear = $post['passport-issue-date-year'];
    $passportExpirationDateMonth = $post['passport-expiration-date-month'];
    $passportExpirationDateDay = $post['passport-expiration-date-day'];
    $passportExpirationDateYear = $post['passport-expiration-date-year'];
    $question1 = $post['question-1'];
    $question2 = $post['question-2'];
    $question3 = $post['question-3'];
    $question4 = $post['question-4'];
    $question5 = $post['question-5'];
    $question6 = $post['question-6'];
    $person1Name = $post['person-1-name'];
    $person1Relationship = $post['person-1-relationship'];
    $person1Phone = $post['person-1-phone'];
    $person1Email = $post['person-1-email'];
    $person2Name = $post['person-2-name'];
    $person2Relationship = $post['person-2-relationship'];
    $person2Phone = $post['person-2-phone'];
    $person2Email = $post['person-2-email'];

    echo($app->postApplication($first, $middle, $last, $addressLine1, $addressLine2, $city, $state, $zip, $homePhone, $cellPhone, $email, $month, $day, $year, $nationality, $birthPlace, $maidenName, $maritalStatus, $gender, $passportNumber, $passportIssueDateMonth, $passportIssueDateDay, $passportIssueDateYear, $passportExpirationDateMonth, $passportExpirationDateDay, $passportExpirationDateYear, $question1, $question2, $question3, $question4, $question5, $question6, $person1Name, $person1Relationship, $person1Phone, $person1Email, $person2Name, $person2Relationship, $person2Phone, $person2Email));
});

$router->post('/contact-submit', function () use ($app) {
    $post = file_get_contents('php://input');
    $post = json_decode($post, TRUE);
    $name = $post['name'];
    $email = $post['email'];
    $subject = $post['subject'];
    $message = $post['message'];

    $app->postContact($name, $email, $subject, $message);
});


$router->set404(function () {
    header('HTTP/1.1 404 Not Found');
    echo "Page not found";
});

$router->run();
