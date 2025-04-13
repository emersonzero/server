import express from 'express';

const app = express()

app.get('/users', (req, res) => {
    res.send("H")
})

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
})
