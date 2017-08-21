<?php

namespace App;

use Auth0\SDK\JWTVerifier;

class Main
{
    protected $token;
    protected $tokenInfo;
    protected $servername = "localhost";
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

    public function postNews($title, $content)
    {
        $conn = new \MySQLi($this->servername, $this->username, $this->password, $this->dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("INSERT INTO news (title, content) VALUES (?, ?)");
        $stmt->bind_param("ss", $title, $content);

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

        $result = $conn->query("SELECT * FROM news");
        $rows = array();
        while($r = $result->fetch_assoc()) {
            $rows[] = $r;
        }
        return json_encode($rows);
    }
}
