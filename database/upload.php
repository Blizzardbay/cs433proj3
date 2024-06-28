<?php
// Database 
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'pokemon_data');
define('DB_HOST', 'localhost');

// Connect to the database server
$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create the database if it doesn't exist
$dbCreationQuery = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
if ($conn->query($dbCreationQuery) === FALSE) {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db(DB_NAME);

// Create the table if it doesn't exist
$tableCreationQuery = "
CREATE TABLE IF NOT EXISTS pokemonData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    type1 VARCHAR(255),
    type2 VARCHAR(255),
    total INT,
    hp INT,
    attack INT,
    defense INT,
    sp_atk INT,
    sp_def INT,
    speed INT,
    generation INT,
    legendary INT
)";
if ($conn->query($tableCreationQuery) === FALSE) {
    die("Error creating table: " . $conn->error);
}

// Get the JSON data 
$jsonData = json_decode($_POST['data'], true);

// Prepare an SQL statement for inserting data
// The ? symbols are placeholders for the actual values that will be bound later
$stmt = $conn->prepare("
INSERT INTO pokemonData (name, type1, type2, total, hp, attack, defense, sp_atk, sp_def, speed, generation, legendary) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

// 'sssiiiiiiiii' means:
// 's' for string (name)
// 's' for string (type1)
// 's' for string (type2)
// 'i' for integer (total)
// 'i' for integer (hp)
// 'i' for integer (attack)
// 'i' for integer (defense)
// 'i' for integer (sp_atk)
// 'i' for integer (sp_def)
// 'i' for integer (speed)
// 'i' for integer (generation)
// 'i' for integer (legendary)
$stmt->bind_param(
    'sssiiiiiiiii',
    $name, $type1, $type2, $total, $hp, $attack, $defense, $sp_atk, $sp_def, $speed, $generation, $legendary
);

// Skip the header row
foreach ($jsonData as $rowIndex => $rowData) {
    if ($rowIndex == 0) continue;

    list($num, $name, $type1, $type2, $total, $hp, $attack, $defense, $sp_atk, $sp_def, $speed, $generation, $legendary) = $rowData;

    // Execute the prepared statement
    $stmt->execute();
}

// Close the statement and the connection
$stmt->close();
$conn->close();

echo "Data inserted in table successfully.";
?>
