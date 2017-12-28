<?php

namespace App;

use Auth0\SDK\JWTVerifier;

class Main
{
    protected $token;
    protected $tokenInfo;
    protected $servername = "127.0.0.1";
    protected $username = "root";
    protected $password = "";
    protected $dbname = "reiserrelief";

    public function setCurrentToken($token)
    {
        try {
            $verifier = new JWTVerifier([
                'supported_algs' => ['RS256'],
                'valid_audiences' => [getenv('AUTH0_AUDIENCE')],
                'authorized_iss' => ['https://' . getenv('AUTH0_DOMAIN') . '/']
            ]);

            $this->token = $token;
            $this->tokenInfo = $verifier->verifyAndDecode($token);
        } catch (\Auth0\SDK\Exception\CoreException $e) {
            throw $e;
        }
    }

    public function postNews($id, $title, $content, $date)
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Pass in date on duplicate key to avoid mysql from updating time stamp
        $stmt = $conn->prepare("INSERT INTO news (id, title, content) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE title=?, content=?, date=?");
        $stmt->bind_param("isssss", $id, $title, $content, $title, $content, $date);

        $stmt->execute();

        $stmt->close();
        $conn->close();

        return array(
            "status" => 'ok'
        );
    }

    public function getNews()
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $result = $conn->query("SELECT * FROM news ORDER BY date DESC");
        $rows = array();
        while ($r = $result->fetch_assoc()) {
            $rows[] = $r;
        }
        return json_encode($rows);
    }

    public function deleteNews($id)
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("DELETE FROM news WHERE id = ?");
        $stmt->bind_param("i", $id);

        $stmt->execute();

        $stmt->close();
        $conn->close();

        return array(
            "status" => 'ok'
        );
    }

    public function getEvents($event)
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        switch ($event) {
            case 'gttmd':
                $result = $conn->query("SELECT * FROM events WHERE title = 'Give to the Max Day'");
                break;
            case 'ktwt':
                $result = $conn->query("SELECT * FROM events WHERE title = 'Keep the Wheel Turning'");
                break;
            default:
                $result = $conn->query("SELECT * FROM events");
                break;
        }


        $rows = array();
        while ($r = $result->fetch_assoc()) {
            $rows[] = $r;
        }
        return json_encode($rows);
    }

    public function postEvents($allEvents)
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $contentKTWT = "";
        $contentGTTMD = "";

        foreach ($allEvents as $currentEvent) {
            switch (strtolower($currentEvent['title'])) {
                case 'keep the wheel turning':
                    $contentKTWT = $currentEvent['content'];
                    break;
                case 'give to the max day':
                    $contentGTTMD = $currentEvent['content'];
                    break;
            }
        }

        $stmt = $conn->prepare("UPDATE events SET content=? WHERE title='Give to the Max Day'");
        $stmt->bind_param("s", $contentGTTMD);
        $stmt->execute();

        $stmt = $conn->prepare("UPDATE events SET content=? WHERE title='Keep the Wheel Turning'");
        $stmt->bind_param("s", $contentKTWT);
        $stmt->execute();

        $stmt->close();
        $conn->close();

        return array(
            "status" => 'ok'
        );
    }

    public function postTripDate($id, $date, $leader, $status)
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("INSERT INTO trip_dates (id, date, tripLeader, status) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE date=?, tripLeader=?, status=?");
        $stmt->bind_param("issssss", $id, $date, $leader, $status, $date, $leader, $status);

        $stmt->execute();

        $stmt->close();
        $conn->close();

        return array(
            "status" => 'ok'
        );
    }

    public function deleteTripDate($id)
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("DELETE FROM trip_dates WHERE id = ?");
        $stmt->bind_param("i", $id);

        $stmt->execute();

        $stmt->close();
        $conn->close();

        return array(
            "status" => 'ok'
        );
    }

    public function getTripDates()
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $result = $conn->query("SELECT * FROM trip_dates");
        $rows = array();
        while ($r = $result->fetch_assoc()) {
            $rows[] = $r;
        }
        return json_encode($rows);
    }

    public function getApplications()
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $result = $conn->query("SELECT * FROM applications");
        $rows = array();
        while ($r = $result->fetch_assoc()) {
            $rows[] = $r;
        }
        return json_encode($rows);
    }

    public function postApplication($first, $middle, $last, $addressLine1, $addressLine2, $city, $state, $zip, $homePhone, $cellPhone, $email, $month, $day, $year, $nationality, $birthPlace, $maidenName, $maritalStatus, $gender, $passportNumber, $passportIssueDateMonth, $passportIssueDateDay, $passportIssueDateYear, $passportExpirationDateMonth, $passportExpirationDateDay, $passportExpirationDateYear, $question1, $question2, $question3, $question4, $question5, $question6, $person1Name, $person1Relationship, $person1Phone, $person1Email, $person2Name, $person2Relationship, $person2Phone, $person2Email)
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("INSERT INTO applications (tripId, first, middle, last, addressLine1, addressLine2, city, state, zip, homePhone, cellPhone, email, month, day, year, nationality, birthPlace, maidenName, maritalStatus, gender, passportNumber, passportIssueDateMonth, passportIssueDateDay, passportIssueDateYear, passportExpirationDateMonth, passportExpirationDateDay, passportExpirationDateYear, question1, question2, question3, question4, question5, question6, person1Name, person1Relationship, person1Phone, person1Email, person2Name, person2Relationship, person2Phone, person2Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");


        $stmt->bind_param("issssssssssssssssssssssssssssssssssssssss", $first, $middle, $last, $addressLine1, $addressLine2, $city, $state, $zip, $homePhone, $cellPhone, $email, $month, $day, $year, $nationality, $birthPlace, $maidenName, $maritalStatus, $gender, $passportNumber, $passportIssueDateMonth, $passportIssueDateDay, $passportIssueDateYear, $passportExpirationDateMonth, $passportExpirationDateDay, $passportExpirationDateYear, $question1, $question2, $question3, $question4, $question5, $question6, $person1Name, $person1Relationship, $person1Phone, $person1Email, $person2Name, $person2Relationship, $person2Phone, $person2Email);

        $stmt->execute();

        $stmt->close();
        $conn->close();

        return array(
            "status" => 'ok'
        );
    }
}
