// Importo express js
const express = require('express');
// Creo un'istanza del server
const app = express();
// Assegno la porta 3000 al server
const PORT = 3000;

// Definisco la cartella in cui sono contenuti gli asset statici: "public"
app.use(express.static('public'));

// Importo l'oggetto posts dal file posts.js contenuto nella cartella "data"
const posts = require('./data/posts');

// Creo il progetto base con una rotta base "/" che ritorna un testo semplice con scritto ”Server del mio blog”
app.get('/', (req, res) => {
    res.send("<h1>Server del mio blog</h1>");
});

// Creo poi una rotta "/bacheca" che restituisce un oggetto json con tutti i post i il loro conteggio
// app.get('/bacheca', (req, res) => {
//     let arrayObject = {};
//     posts.forEach((post, index) => {
//         arrayObject[index] = {
//             count: index + 1,
//             post: [...posts],
//             /* Invece di post: [...posts], avrei potuto inserire tutte le chiavi come di seguito: 
//             titolo: post.titolo,
//             contenuto: post.contenuto,
//             immagine: post.immagine,
//             tags: post.tags,
//             */
//         }
//     });
//     // console.log(arrayObject);
//     // console.log(arrayObject.count);
//     res.json(arrayObject);
// });



/* VERSIONE SENZA FILTRI QUERY STRING:
// Creo poi una rotta "/bacheca" che restituisce dall'oggetto json una lista con tutti i post, le loro immagini e i il loro conteggio
app.get('/bacheca', (req, res) => {
    const arrayObject = {
        count: posts.length,
        post: [...posts],
    };
    // console.log(arrayObject);
    // console.log(arrayObject.count);
    res.json(arrayObject);
});
/* FINE VERSIONE SENZA FILTRI QUERY STRING: */



/* VERSIONE CON FILTRI QUERY STRING: */
// Creo poi una rotta "/bacheca" che restituisce dall'oggetto json una lista con tutti i post,
// e poi creo anche la relativa variabile collegata alle query string per un'eventuale ricerca di post specifici tramite appunto query string "titolo"
// come ad esempio: http://localhost:3000/bacheca?titolo=Il%20ciambellone%20classico:%20una%20ricetta%20semplice%20e%20deliziosa
app.get('/bacheca', (req, res) => {
    // Creo una variabile a cui passo l'oggetto query contenente il filtro di ricerca della query string, in questo caso filtra per "tags", quindi ricavo la chiave tags con la destrutturazione
    const { titolo } = req.query;
    let arrayObject = {
        count: posts.length,
        post: [...posts],
    };

    // Verifico che la query string non restituisca un risultato vuoto, o che almeno l'utente abbia digitato dei valori validi
    if (titolo) {
        // Se la query string è valida restituisco il valore uguale alla query string di titolo
        arrayObject = posts.filter((element) => {
            return titolo.toLowerCase() === element.titolo.toLowerCase();
        });
    }
    // Altrimento restituisco un messaggio di errore
    if ((arrayObject.length == 0) || (arrayObject == "")) {
        arrayObject = { error: "La ricerca non ha prodotto risultati" };
        res.json(arrayObject);
    }
    // Se invece non ho inserito nessuna query string restituisco l'intero oggetto dei post
    if (!titolo) {
        // res.json(posts);
        arrayObject = { error: "La ricerca non ha prodotto risultati" };
        res.json(posts);
    }
    else {
        // console.log(arrayObject);
        // console.log(arrayObject.count);
        res.json(arrayObject);
    }
});
/* FINE VERSIONE CON FILTRI QUERY STRING: */




// Rotta di fallback: se la pagina non è stata trovata restituisco un messaggio 404 personalizzato
app.get('*', (req, res) => {
    // Se lo stato della richiesta non è stato trovato (risponde con un error 404) allora rispondi con il seguente messaggio
    res.status(404).send("<h1>404 - Pagina non trovata</h1>");
});

// Metto il server in ascolto su localhost e sulla porta 3000
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});



