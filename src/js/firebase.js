import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// Asegura que exista una URL de Realtime Database. Si no está presente
// en las variables de entorno, construimos un fallback usando el projectId.
const dbURL = firebaseConfig.databaseURL || (firebaseConfig.projectId ? `https://${firebaseConfig.projectId}.firebaseio.com` : undefined);

// Pasa la URL explícita a getDatabase(app, url) para evitar el error
// "Can't determine Firebase Database URL" cuando falta la configuración.
const database = dbURL ? getDatabase(app, dbURL) : getDatabase(app);

const saveVote = async (productID) => {

    let votesRef = ref(database, 'votes');
    let newVoteRef = push(votesRef);

    let response = set(newVoteRef, {
        productID: productID,
        timestamp: Date.now()
    });

    return response
        .then(() => {
            return { status: true, message: "Voto guardado exitosamente" };
        })
        .catch((error) => {
            return { status: false, message: error.message };
        });

};

export {getDatabase, ref, set, push, get, child, saveVote};