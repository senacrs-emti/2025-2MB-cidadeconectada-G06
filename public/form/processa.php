<?php
require_once 'conexao.php';

// Verificar se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // PARTE 1: Processar dados do aluno (formulário inicial)
    if (isset($_POST['parte']) && $_POST['parte'] == '1') {
        
        // Coletar dados
        $nome = isset($_POST['nome']) ? limparDados($_POST['nome']) : '';
        $escola = isset($_POST['escola']) ? limparDados($_POST['escola']) : '';
        $email = isset($_POST['email']) ? limparDados($_POST['email']) : '';
        $nivel_ensino = isset($_POST['estudo']) ? limparDados($_POST['estudo']) : '';
        
        // DEBUG: Ver o que está chegando
        error_log("=== DEBUG PARTE 1 ===");
        error_log("Nome: $nome");
        error_log("Escola: $escola");
        error_log("Email: $email");
        error_log("Nível: $nivel_ensino");
        error_log("POST completo: " . json_encode($_POST));
        
        // Validações básicas
        if (empty($nome) || empty($email) || empty($nivel_ensino)) {
            jsonResponse(false, 'Nome, email e nível de ensino são obrigatórios.');
        }
        
        // Validar email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonResponse(false, 'Por favor, insira um email válido (ex: aluno@escola.com).');
        }
        
        // Validar nível de ensino
        if (!in_array($nivel_ensino, ['Ensino Médio', 'Ensino Superior'])) {
            jsonResponse(false, 'Nível de ensino inválido. Selecione Ensino Médio ou Superior.');
        }
        
        // Tratamento especial para escola "outra"
        if ($escola === "outra") {
            // Se veio o campo outra_escola, usa ele
            if (isset($_POST['outra_escola']) && !empty($_POST['outra_escola'])) {
                $escola = limparDados($_POST['outra_escola']);
            } 
            // Se não veio, mas escola é "outra", pede para preencher
            else if (empty($escola) || $escola === "outra") {
                jsonResponse(false, 'Por favor, digite o nome da sua escola quando selecionar "Outra".');
            }
        }
        
        // Se escola ainda estiver vazia ou for "outra"
        if (empty($escola) || $escola === "outra") {
            jsonResponse(false, 'Por favor, selecione ou digite o nome da sua escola.');
        }
        
        try {
            // Verificar se email já foi usado (OPCIONAL - pode comentar se quiser permitir)
            /*
            $stmt = $conn->prepare("SELECT id FROM alunos WHERE email_matricula = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0) {
                jsonResponse(false, 'Este email já foi utilizado. Use outro email ou aguarde alguns minutos.');
            }
            */
            
            // Salvar na sessão (não no banco ainda)
            $_SESSION['aluno_temp'] = [
                'nome_completo' => $nome,
                'escola' => $escola,
                'email_matricula' => $email,
                'nivel_ensino' => $nivel_ensino
            ];
            
            error_log("Dados salvos na sessão: " . json_encode($_SESSION['aluno_temp']));
            
            jsonResponse(true, 'Dados validados! Agora responda as perguntas.', [
                'redirect' => true,
                'debug' => [
                    'nome' => $nome,
                    'escola' => $escola,
                    'email' => $email
                ]
            ]);
            
        } catch (Exception $e) {
            error_log("ERRO na Parte 1: " . $e->getMessage());
            jsonResponse(false, 'Erro no servidor: ' . $e->getMessage());
        }
    }
    
    // PARTE 2: Processar respostas e salvar no banco
    if (isset($_POST['parte']) && $_POST['parte'] == '2') {
        
        error_log("=== INICIANDO PARTE 2 ===");
        
        // Verificar se temos dados do aluno na sessão
        if (!isset($_SESSION['aluno_temp'])) {
            error_log("ERRO: Sessão expirada - aluno_temp não existe");
            jsonResponse(false, 'Sessão expirada. Por favor, volte e preencha seus dados novamente.');
        }
        
        $aluno_temp = $_SESSION['aluno_temp'];
        error_log("Dados da sessão: " . json_encode($aluno_temp));
        
        try {
            // Iniciar transação
            $conn->begin_transaction();
            
            // 1. Inserir aluno no banco
            $stmt = $conn->prepare("INSERT INTO alunos (nome_completo, escola, email_matricula, nivel_ensino) VALUES (?, ?, ?, ?)");
            if (!$stmt) {
                throw new Exception("Erro ao preparar query: " . $conn->error);
            }
            
            $stmt->bind_param("ssss", 
                $aluno_temp['nome_completo'],
                $aluno_temp['escola'],
                $aluno_temp['email_matricula'],
                $aluno_temp['nivel_ensino']
            );
            
            if (!$stmt->execute()) {
                throw new Exception("Erro ao salvar aluno: " . $stmt->error);
            }
            
            $aluno_id = $conn->insert_id;
            error_log("Aluno inserido com ID: $aluno_id");
            
            // 2. Preparar query para respostas
            $stmt = $conn->prepare("INSERT INTO respostas (aluno_id, pergunta_num, nota, comentario) VALUES (?, ?, ?, ?)");
            if (!$stmt) {
                throw new Exception("Erro ao preparar query de respostas: " . $conn->error);
            }
            
            $respostas_salvas = 0;
            $respostas_com_erro = 0;
            
            // Processar cada pergunta (1 a 16)
            error_log("Processando respostas...");
            for ($i = 1; $i <= 16; $i++) {
                $pergunta_key = 'q' . $i;
                $comentario_key = 'comments-' . ($i - 1);
                
                if (isset($_POST[$pergunta_key])) {
                    $nota = intval($_POST[$pergunta_key]);
                    $comentario = isset($_POST[$comentario_key]) ? limparDados($_POST[$comentario_key]) : '';
                    
                    error_log("Pergunta $i: nota=$nota, comentario=" . substr($comentario, 0, 50));
                    
                    // Validar nota (0-5)
                    if ($nota >= 0 && $nota <= 5) {
                        $stmt->bind_param("iiis", $aluno_id, $i, $nota, $comentario);
                        if ($stmt->execute()) {
                            $respostas_salvas++;
                        } else {
                            $respostas_com_erro++;
                            error_log("Erro ao salvar resposta $i: " . $stmt->error);
                        }
                    } else {
                        error_log("Nota inválida para pergunta $i: $nota");
                    }
                } else {
                    error_log("Pergunta $i não foi respondida");
                }
            }
            
            error_log("Total respostas salvas: $respostas_salvas, com erro: $respostas_com_erro");
            
            // Verificar se pelo menos 7 respostas foram salvas
            if ($respostas_salvas < 7) {
                throw new Exception("É necessário responder no mínimo 7 perguntas. Você respondeu $respostas_salvas.");
            }
            
            // Commit da transação
            $conn->commit();
            error_log("Transação commitada com sucesso!");
            
            // Limpar sessão
            unset($_SESSION['aluno_temp']);
            
            // Retornar sucesso
            jsonResponse(true, "Formulário enviado com sucesso! Obrigado por participar.", [
                'respostas_salvas' => $respostas_salvas,
                'aluno_id' => $aluno_id,
                'redirect' => '../sucesso.html'
            ]);
            
        } catch (Exception $e) {
            // Rollback em caso de erro
            if ($conn) {
                $conn->rollback();
            }
            error_log("ERRO NA PARTE 2: " . $e->getMessage());
            jsonResponse(false, 'Erro ao salvar: ' . $e->getMessage());
        }
    }
    
    // Se não for parte 1 nem 2
    jsonResponse(false, 'Dados inválidos enviados.');
    
} else {
    // Se não for POST
    jsonResponse(false, 'Método não permitido. Use o formulário.');
}

// Fechar conexão
if (isset($conn) && $conn) {
    $conn->close();
}
?>