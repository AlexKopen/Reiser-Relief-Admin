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
        while($r = $result->fetch_assoc()) {
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

    public function getEvents()
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $result = $conn->query("SELECT * FROM events");
        $rows = array();
        while($r = $result->fetch_assoc()) {
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
}
