import express from 'express';
const app = express();
const port = 8000;
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';


function readFile(filePath) {
    return new Promise((resolve,rejects )=> {
    fs.readFile(filePath, (err, data) => {
        if(err) returnrejects(err);
        resolve(data);
       
        
        })
    });
 }

    function writeFile(filePath) {
        return new Promise((resolve,rejects )=> {
        fs.writeFile(filePath, data, 'utf-8',(err) => {
            if(err) returnrejects(err);
            resolve(null);
           
            
        })
    })
 }

 const logPath = './logs.txt';
async function newLog(name){
    const date = Date.now();
    const uuid = uuidv4();
    const log = `${uuid} - ${name} - ${date}`;
    const allLogs = await readFile(logPath);
    writeFile(logPath, allLogs + "\n" +log);
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

