const fs=require('fs');
const path=require('path').resolve();
const database_path=path+'/src/database/database.json';
const backup_path=path+'/src/database/backup.json';
module.exports={
    Reset:()=>{
        const content=fs.readFileSync(backup_path)
        const backup=JSON.parse(content);
        fs.writeFile(database_path,JSON.stringify(backup),'utf-8',(err,pass)=>{
            console.log("RESETANDO ARQUIVO");  
        });
    },
    Write:(data)=>{
        fs.writeFile(database_path,JSON.stringify(data),'utf-8',(err,pass)=>{
            if(err) console.log(err);
            else console.log("Salvando Arquivo");  
        });
    },
    Read:()=>{
        const content=fs.readFileSync(database_path)
        return JSON.parse(content);
    }    
}