// Importo express js
const express = require('express');
// Creo un'istanza del server
const app = express();
// Assegno la porta 3000 al server
const PORT = 3000;

// Creo il progetto base con una rotta / che ritorna un testo semplice con scritto ”Server del mio blog”
app.get('/', (req, res) => {
    res.send("<h1>Server del mio blog</h1>");
});









// Metto il server in ascolto su localhost e sulla porta 3000
app.listen(PORT, ()=> {
    console.log(`Server avviato su http://localhost:${PORT}`);
    
});



