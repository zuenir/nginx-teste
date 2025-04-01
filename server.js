const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const appName = process.env.APP_NAME || 'TestApp';  // Definir valor padrão caso o ambiente não esteja configurado

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log(`Request served by ${appName}`);
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`${appName} is listening on port ${port}`);
    });
  }
  
module.exports = app;  // Exportando a instância do app para ser usada nos testes