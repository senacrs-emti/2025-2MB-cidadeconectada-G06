<?php
session_start(); // Inicia sessão para guardar dados temporários

// Configurações do banco de dados
$host = 'localhost';
$user = 'root';
$password = ''; // Senha vazia padrão do XAMPP
$database = 'mapoa_formulario';

// Criar conexão
$conn = new mysqli($host, $user, $password, $database);

// Verificar conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Definir charset para utf8 (suporte a caracteres especiais)
$conn->set_charset("utf8mb4");

// Função para limpar dados de entrada
function limparDados($dados) {
    $dados = trim($dados);
    $dados = stripslashes($dados);
    $dados = htmlspecialchars($dados);
    return $dados;
}

// Função para validar email
function validarEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Mensagens de resposta padrão
function jsonResponse($success, $message, $data = null) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}
?>