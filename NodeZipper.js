/**
 * Yuting Sha, c0842810
 */
const fs = require('fs'), path = require('path');
const args = process.argv; //pass cml arguments into js
const admZip = require('adm-zip'); //npm install adm-zip

/**
 * function crawl
 * @param  dir file path input from cml, which is the starting point of the recursion
 * read the directory, list sub-directories
 * if the sub-directory is 'node_modules', then zip under 'node_modules' using function zipTheFile()
 * if sub-direcotry is not 'node_modules', then go to its child dir, perform the same task, recursion till it`s folder
 */
function crawl(dir){
    fs.readdir(dir,function(err,list){ //read directory and store them into lists
        
        list.forEach(function(filename){
            var filePath = path.join(dir,filename); //form the file path using join function
            var isHidden = /^\./.test(filename); //check file type is hidden file or not
            if (!isHidden){
                if(fs.lstatSync(filePath).isDirectory() == true && filename == 'node_modules'){
                    zipTheFile(filePath,filePath);
                }
                else if (fs.lstatSync(filePath).isDirectory() == true){
                    crawl(filePath)
                }
                
            }
        });
    })
}

/**
 * 
 * @param {*} sourceDir the directory of 'node_modules'
 * @param {*} outPath the directory of 'node_modules'
 * generates a zip file under each 'node_modules'
 */
function zipTheFile(sourceDir,outPath){
    try{
        const zip = new admZip();
        const outputDir = path.join(outPath,"node.zip");
        zip.addLocalFolder(sourceDir);
        zip.writeZip(outputDir);
        console.log("zip succeed");
    }catch (e){
        console.log("error.");
    }
}

// driver code to run the function crawl
try{
    crawl(args[2]);
}catch(err){
    console.error(err);
}