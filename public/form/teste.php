<?php
echo "<h1>PHP Funcionando!</h1>";
echo "<p>Data: " . date('d/m/Y H:i:s') . "</p>";

// Testar conexão com MySQL
$conn = new mysqli('localhost', 'root', '', 'mapoa_formulario');
if ($conn->connect_error) {
    echo "<p style='color:red'>Erro MySQL: " . $conn->connect_error . "</p>";
} else {
    echo "<p style='color:green'>✅ Conexão MySQL OK!</p>";
    $conn->close();
}
?>