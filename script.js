
import express from 'express'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';


const app = express()
const port = 8000

app.use(express.text());

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) return reject(err);
            resolve(data)
        })
    })
}

function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf-8', (err) => {
            if (err) return reject(err);
            resolve(null)
        })
    })
}
const logsPath = "./logs.txt"

async function newLog(name) {
    const date = Date.now();
    const uuid = uuidv4();
    const log = `${uuid} - ${date} - ${name}`;
    const allLogs = await readFile(logsPath);
    await writeFile(logsPath, allLogs + "\n" + log);
    return log;
}

app.post('/logs', (req,res) => {
    if (!req.body) return res.status(400).send('Você esqueceu o body');
    newLog(req.body).then(log => {
        res.status(201).send(log);
    }).catch(err => {
        res.status(500).send(err);
    });
})

app.get('/logs/:id', (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(404).send('O Id está correto');
    readFile(logsPath).then(data => {
        let log = undefined;
        String(data).split("\n").forEach(line => {
            if(line.substring(0,id.length) !== id) return;
            log = line; 
        })
        if (!log) return res.status(404).send('Id não encontrado');
        return res.status(200).send(log);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.listen(port,() => console.log('Server startado em porta ${PORT}'));