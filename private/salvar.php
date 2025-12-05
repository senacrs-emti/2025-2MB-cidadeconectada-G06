<?php
// private/salvar.php - TUDO EM UM SÓ!

// ===== CONFIGURAÇÃO =====
$host = 'localhost';
$user = 'root';
$pass = '';

// ===== CRIAR/CONECTAR BANCO =====
try {
    // Primeiro tenta conectar ao banco existente
    $pdo = new PDO("mysql:host=$host;dbname=mapa_avaliacoes", $user, $pass);
} catch(PDOException $e) {
    // Se não existir, cria o banco
    try {
        $temp_pdo = new PDO("mysql:host=$host", $user, $pass);
        $temp_pdo->exec("CREATE DATABASE IF NOT EXISTS mapa_avaliacoes");
        $temp_pdo->exec("USE mapa_avaliacoes");
        
        // Cria a tabela
        $temp_pdo->exec("
            CREATE TABLE IF NOT EXISTS avaliacoes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                nome VARCHAR(200) NOT NULL,
                email VARCHAR(150) NOT NULL,
                escola VARCHAR(100) NOT NULL,
                nivel VARCHAR(20) NOT NULL,
                q1 TINYINT, q2 TINYINT, q3 TINYINT, q4 TINYINT,
                q5 TINYINT, q6 TINYINT, q7 TINYINT, q8 TINYINT,
                q9 TINYINT, q10 TINYINT, q11 TINYINT, q12 TINYINT,
                q13 TINYINT, q14 TINYINT, q15 TINYINT, q16 TINYINT,
                status VARCHAR(20) DEFAULT 'incompleta'
            )
        ");
        
        // Agora conecta ao banco criado
        $pdo = new PDO("mysql:host=$host;dbname=mapa_avaliacoes", $user, $pass);
        
    } catch(PDOException $e2) {
        die("Erro ao criar banco: " . $e2->getMessage());
    }
}

// ===== PEGAR DADOS DO FORMULÁRIO =====
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../public/form.html');
    exit;
}

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$escola = $_POST['escola'] ?? '';
$nivel = $_POST['estudo'] ?? '';

// Escola "outra"
if ($escola === 'outra' && !empty($_POST['escola_customizada'])) {
    $escola = $_POST['escola_customizada'];
}

// ===== CONTAR RESPOSTAS =====
$total = 0;
for ($i = 1; $i <= 16; $i++) {
    if (!empty($_POST["q$i"]) && $_POST["q$i"] >= 0) {
        $total++;
    }
}

$status = ($total >= 7) ? 'completa' : 'incompleta';

// ===== SALVAR NO BANCO =====
$sql = "INSERT INTO avaliacoes (
    nome, email, escola, nivel, status,
    q1, q2, q3, q4, q5, q6, q7, q8,
    q9, q10, q11, q12, q13, q14, q15, q16
) VALUES (?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?
)";

$valores = [$nome, $email, $escola, $nivel, $status];

for ($i = 1; $i <= 16; $i++) {
    $nota = $_POST["q$i"] ?? null;
    $valores[] = ($nota !== null && $nota !== '') ? (int)$nota : null;
}

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($valores);
    
    // Redirecionar
    header('Location: ../public/obrigado.html');
    exit;
    
} catch(PDOException $e) {
    echo "Erro ao salvar: " . $e->getMessage();
}
?>