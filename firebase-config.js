/* =========================================================
   CONFIGURAÇÃO DO FIREBASE

   1. Acesse https://console.firebase.google.com/
   2. Crie um projeto e um aplicativo Web.
   3. Copie o objeto firebaseConfig mostrado pelo Firebase.
   4. Substitua os valores abaixo.

   A apiKey do Firebase pode ficar no código do navegador.
   A proteção real é feita pelo Authentication e pelas regras
   do Firestore incluídas no arquivo firestore.rules.
   ========================================================= */
   const firebaseConfig = {
    apiKey: "AIzaSyCcx3LDegnvG5EaDDoXTtI8jcVJkAImKAc",
    authDomain: "rota-de-aprova.firebaseapp.com",
    projectId: "rota-de-aprova",
    storageBucket: "rota-de-aprova.firebasestorage.app",
    messagingSenderId: "360752954425",
    appId: "1:360752954425:web:df84e0cea7602b06cde1e8",
    measurementId: "G-Y3LN9EM1ZV"
  };
  
/* Verifica se os valores de exemplo já foram substituídos. */
const firebaseConfigurado = !Object.values(firebaseConfig).some(valor =>
  String(valor).includes("COLE_") || String(valor).includes("SEU_")
);

/* Inicializa o Firebase somente quando a configuração estiver completa. */
if (firebaseConfigurado && window.firebase) {
  firebase.initializeApp(firebaseConfig);
}

/* Expõe um sinal simples para o script principal escolher entre
   Firestore e o banco demonstrativo que acompanha o projeto. */
window.ROTA_FIREBASE_ATIVO = firebaseConfigurado && Boolean(window.firebase);

