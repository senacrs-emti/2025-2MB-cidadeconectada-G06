<?php
// private/ver_dados.php

// ===== SENHA =====
$SENHA = 'admin123';
session_start();

// ===== VERIFICAR LOGIN =====
if (!isset($_SESSION['logado'])) {
    if (isset($_POST['senha']) && $_POST['senha'] === $SENHA) {
        $_SESSION['logado'] = true;
    } else {
        if (isset($_POST['senha'])) {
            $erro = true;
        }
        ?>
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Login</title></head>
        <body style="
            font-family: Arial;
            background: #07405b;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 10px;
                text-align: center;
                width: 300px;
            ">
                <h2 style="color: #07405b;">🔐 Acesso</h2>
                <p>Digite a senha:</p>
                <form method="POST">
                    <input type="password" name="senha" placeholder="Senha" required
                        style="width: 100%; padding: 12px; margin: 15px 0; border: 2px solid #ddd; border-radius: 5px;">
                    <button type="submit" style="
                        background: #ff7f2a;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Entrar</button>
                    <?php if (isset($erro)) echo '<p style="color: red; margin-top: 15px;">Senha errada!</p>'; ?>
                </form>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// ===== SAIR =====
if (isset($_GET['sair'])) {
    session_destroy();
    header('Location: ver_dados.php');
    exit;
}

// ===== CONEXÃO =====
try {
    $pdo = new PDO("mysql:host=localhost;dbname=mapa_avaliacoes", "root", "");
} catch(PDOException $e) {
    die("Erro: " . $e->getMessage());
}

// ===== BUSCAR DADOS =====
$sql = "SELECT * FROM avaliacoes ORDER BY data_cadastro DESC";
$stmt = $pdo->query($sql);
$dados = $stmt->fetchAll();

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel - MaPOA</title>
    <link rel="stylesheet" href="ver_dados.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>📋 Avaliações</h1>
            <a href="?sair=1" class="btn-sair">Sair</a>
        </header>
        
        <div class="lista">
            <?php if (empty($dados)): ?>
                <p class="vazio">Nenhuma avaliação ainda.</p>
            <?php else: ?>
                <?php foreach ($dados as $item): ?>
                <div class="card">
                    <div class="card-header">
                        <span>#<?php echo $item['id']; ?></span>
                        <span><?php echo date('d/m H:i', strtotime($item['data_cadastro'])); ?></span>
                        <span class="status <?php echo $item['status']; ?>">
                            <?php echo $item['status']; ?>
                        </span>
                    </div>
                    
                    <div class="card-info">
                        <p><strong>Nome:</strong> <?php echo htmlspecialchars($item['nome']); ?></p>
                        <p><strong>Email:</strong> <?php echo htmlspecialchars($item['email']); ?></p>
                        <p><strong>Escola:</strong> <?php echo htmlspecialchars($item['escola']); ?></p>
                        <p><strong>Nível:</strong> <?php echo htmlspecialchars($item['nivel']); ?></p>
                    </div>
                    
                    <div class="card-notas">
                        <?php for ($i = 1; $i <= 16; $i++): ?>
                            <?php if ($item["q$i"] !== null): ?>
                                <span>Q<?php echo $i; ?>: <?php echo $item["q$i"]; ?>/5</span>
                            <?php endif; ?>
                        <?php endfor; ?>
                    </div>
                </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        
        <footer class="footer">
            <p>Total: <?php echo count($dados); ?> avaliações</p>
        </footer>
    </div>
</body>
</html>