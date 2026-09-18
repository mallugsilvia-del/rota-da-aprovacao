# Banco de questões + importador Firebase/Firestore

Este pacote foi preparado para funcionar em **GitHub Pages + Firebase Firestore**, sem Node.js no computador da escola.

## O que há no pacote

- `banco-questoes/`: JSONs separados por prova e um `banco-questoes-completo.json`.
- `imagens/`: imagens WebP das páginas originais usadas pelas questões. O campo `imagemPagina` aponta para elas.
- `admin.html`, `admin.js`, `admin.css`: importador em massa no navegador.
- `firebase-config.example.js`: modelo para a configuração do seu Firebase.
- `firestore.rules`: regras com leitura pública das questões e escrita somente para administradores.
- `firestore.indexes.json`: índices iniciais.
- `relatorio-extracao.json`: contagem e conferência da extração.

## Importante sobre a extração

Os textos foram extraídos automaticamente dos PDFs enviados. Questões com gráficos, tabelas, fórmulas, imagens ou textos compartilhados podem depender da imagem da página original (`imagemPagina`). Não foi inventado conteúdo ausente.

Dois pontos ficaram deliberadamente pendentes para evitar gabarito errado:

1. **ENEM 2025 – 2º dia:** o arquivo de gabarito enviado identifica-se como **2ª Aplicação**, enquanto o caderno de prova enviado não foi confirmado como a mesma aplicação. Por isso as respostas desse JSON ficaram sem marcar como verificadas.
2. **UNICAMP 2024:** não foi identificado um gabarito oficial correspondente entre os arquivos enviados; as respostas ficaram pendentes.

Na UNICAMP 2025, o pacote usa a prova comentada enviada; a questão anulada é armazenada com `anulada: true`.

## Passo a passo no Firebase

1. Entre em `console.firebase.google.com` e crie/abra seu projeto.
2. Em **Build > Firestore Database**, clique em **Create database** e escolha uma região.
3. Em **Build > Authentication > Sign-in method**, ative **Google**.
4. Em **Project settings > General > Your apps**, crie/abra um aplicativo **Web** e copie o objeto `firebaseConfig`.
5. Copie `firebase-config.example.js` para `firebase-config.js` e substitua os valores pelo seu `firebaseConfig`.
6. Em **Firestore > Rules**, cole o conteúdo de `firestore.rules` e publique.
7. Abra `admin.html` pelo GitHub Pages (ou por um servidor local). Faça login com Google. A tela mostrará seu UID.
8. No Console do Firebase, em **Firestore Database**, crie a coleção `admins` e um documento cujo **ID seja exatamente o seu UID**. Pode colocar campos como `email` e `nome`.
9. Recarregue `admin.html`, faça login, selecione um JSON de `banco-questoes/`, clique em **Validar / pré-visualizar** e depois **Importar no Firestore**.
10. O importador usa até **400 gravações por lote** e grava cada questão em `questoes/{id}` com `merge: true`; reimportar um arquivo atualizado não cria duplicata.

## Estrutura do Firestore

```
questoes/
  enem-2024-d1-001-ingles
  enem-2024-d1-001-espanhol
  enem-2024-d2-091
  fuvest-2025-f1-001
  ...
admins/
  SEU_UID
materias/
  matematica
  portugues
  ...
```

## Publicar no GitHub Pages

Envie todo o conteúdo desta pasta para o repositório. **Não publique chaves privadas**. O `firebaseConfig` do app Web não é uma chave privada de administrador; a segurança real deve ficar nas regras do Firestore e no Authentication.

Em GitHub: **Settings > Pages > Deploy from a branch > main / root**. Depois abra `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/admin.html`.

## Quantidade gerada

Total de registros gerados: **874**. O ENEM possui registros separados para Inglês e Espanhol nas questões 1 a 5, por isso o total é maior do que contar apenas 180 itens por ano.
