const fileService=require('./utils/fileService');
console.log("Reset src/database/database.json...")
fileService.Reset();
console.log("Reset src/database/database.json[OK]")
