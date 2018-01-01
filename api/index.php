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

$router->post('/apply-submit', function () use ($app) {
    if (!isset($_POST['trip-id'])) {
        echo(json_encode(array(
            "status" => 'error'
        )));
    } else {
        $tripId = $_POST['trip-id'];
        $first = isset($_POST['first']) ? $_POST['first'] : '';
        $middle = isset($_POST['middle']) ? $_POST['middle'] : '';
        $last = isset($_POST['last']) ? $_POST['last'] : '';
        $addressLine1 = isset($_POST['address-line-1']) ? $_POST['address-line-1'] : '';
        $addressLine2 = isset($_POST['address-line-2']) ? $_POST['address-line-2'] : '';
        $city = isset($_POST['city']) ? $_POST['city'] : '';
        $state = isset($_POST['state']) ? $_POST['state'] : '';
        $zip = isset($_POST['zip']) ? $_POST['zip'] : '';
        $homePhone = isset($_POST['home-phone']) ? $_POST['home-phone'] : '';
        $cellPhone = isset($_POST['cell-phone']) ? $_POST['cell-phone'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';
        $month = isset($_POST['month']) ? $_POST['month'] : '';
        $day = isset($_POST['day']) ? $_POST['day'] : '';
        $year = isset($_POST['year']) ? $_POST['year'] : '';
        $nationality = isset($_POST['nationality']) ? $_POST['nationality'] : '';
        $birthPlace = isset($_POST['birth-place']) ? $_POST['birth-place'] : '';
        $maidenName = isset($_POST['maiden-name']) ? $_POST['maiden-name'] : '';
        $maritalStatus = isset($_POST['marital-status']) ? $_POST['marital-status'] : '';
        $gender = isset($_POST['gender']) ? $_POST['gender'] : '';
        $passportNumber = isset($_POST['passport-number']) ? $_POST['passport-number'] : '';
        $passportIssueDateMonth = isset($_POST['passport-issue-date-month']) ? $_POST['passport-issue-date-month'] : '';
        $passportIssueDateDay = isset($_POST['passport-issue-date-day']) ? $_POST['passport-issue-date-day'] : '';
        $passportIssueDateYear = isset($_POST['passport-issue-date-year']) ? $_POST['passport-issue-date-year'] : '';
        $passportExpirationDateMonth = isset($_POST['passport-expiration-date-month']) ? $_POST['passport-expiration-date-month'] : '';
        $passportExpirationDateDay = isset($_POST['passport-expiration-date-day']) ? $_POST['passport-expiration-date-day'] : '';
        $passportExpirationDateYear = isset($_POST['passport-expiration-date-year']) ? $_POST['passport-expiration-date-year'] : '';
        $question1 = isset($_POST['question-1']) ? $_POST['question-1'] : '';
        $question2 = isset($_POST['question-2']) ? $_POST['question-2'] : '';
        $question3 = isset($_POST['question-3']) ? $_POST['question-3'] : '';
        $question4 = isset($_POST['question-4']) ? $_POST['question-4'] : '';
        $question5 = isset($_POST['question-5']) ? $_POST['question-5'] : '';
        $question6 = isset($_POST['question-6']) ? $_POST['question-6'] : '';
        $person1Name = isset($_POST['person-1-name']) ? $_POST['person-1-name'] : '';
        $person1Relationship = isset($_POST['person-1-relationship']) ? $_POST['person-1-relationship'] : '';
        $person1Phone = isset($_POST['person-1-phone']) ? $_POST['person-1-phone'] : '';
        $person1Email = isset($_POST['person-1-email']) ? $_POST['person-1-email'] : '';
        $person2Name = isset($_POST['person-2-name']) ? $_POST['person-2-name'] : '';
        $person2Relationship = isset($_POST['person-2-relationship']) ? $_POST['person-2-relationship'] : '';
        $person2Phone = isset($_POST['person-2-phone']) ? $_POST['person-2-phone'] : '';
        $person2Email = isset($_POST['person-2-email']) ? $_POST['person-2-email'] : '';

        echo json_encode($app->postApplication($tripId, $first, $middle, $last, $addressLine1, $addressLine2, $city, $state, $zip, $homePhone, $cellPhone, $email, $month, $day, $year, $nationality, $birthPlace, $maidenName, $maritalStatus, $gender, $passportNumber, $passportIssueDateMonth, $passportIssueDateDay, $passportIssueDateYear, $passportExpirationDateMonth, $passportExpirationDateDay, $passportExpirationDateYear, $question1, $question2, $question3, $question4, $question5, $question6, $person1Name, $person1Relationship, $person1Phone, $person1Email, $person2Name, $person2Relationship, $person2Phone, $person2Email));
    }
});

$router->post('/contact-submit', function () use ($app) {
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $subject = isset($_POST['subject']) ? $_POST['subject'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    echo json_encode($app->postContact($name, $email, $subject, $message));
});


$router->set404(function () {
    header('HTTP/1.1 404 Not Found');
    echo "Page not found";
});

$router->run();
