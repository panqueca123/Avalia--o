import express from 'express';
const app = express();
const port = 8000;

function readfile(filePath) {
    return new Promise((resolve,rejects )=> {
    fs.readfile(filePath, (err, data) => {
        if(err) returnrejects(err);
        resolve(data);
       
        
    })
    });
    }

    function writefile(filePath) {
        return new Promise((resolve,rejects )=> {
        fs.writefilefile(filePath, data, 'utf-8',(err) => {
            if(err) returnrejects(err);
            resolve(null);
           
            
        })
        });
        }
    

app.get()