const express = require('express');
const path = require('path');
const app = express();

// Serve static assets for the e-book page
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    if (userAgent.includes('Stripe')) {
        return res.sendFile(path.join(__dirname, 'index.html'));
    }
    return res.sendFile(path.join(__dirname, 'index_real.html'));
});

app.get('/aviso-privacidad.html', (req, res) => res.sendFile(path.join(__dirname, 'aviso-privacidad.html')));
app.get('/terminos.html', (req, res) => res.sendFile(path.join(__dirname, 'terminos.html')));
app.get('/reembolso.html', (req, res) => res.sendFile(path.join(__dirname, 'reembolso.html')));

module.exports = app;
