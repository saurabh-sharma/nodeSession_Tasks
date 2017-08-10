const args = require('yargs').argv;
const os = require('os');
const fs = require('fs');
const debug = true;
if (debug) {
    console.log("========FOR DEBUGGING========");
    console.log("Arguments: ", args);
    console.log("=============================");
}

// const read = fs.readFileSync('node_testfile.txt', {encoding:'utf-8'});
// fs.mkdirSync('abc/');
// fs.writeFileSync('abc/node_testfile.txt', "Node File write sync demo");
// console.log(read);

/* fs.writeFileSync('OS.json', JSON.stringify(os));
const read = fs.readFileSync('OS.json', {encoding:'utf-8'});
console.log(read); */

/* fs.stat('library.json', function (err, fileStat) {
    if (err) {
        if (err.code == 'ENOENT') {
            console.log('Does not exist.');
        }
    }
    else {
        if (fileStat.isFile()) {
            console.log('File found.');
        }
    }
});
 */


const checkFile = fs.existsSync('library.json');

let add = args.add || false, del = args.del || false, viewAll = args.viewAll || false, viewSpecific = args.viewSpecific || false
console.log(add,del,viewAll,viewSpecific);

//CHECKING IF OPERATION PROVIDED
if (!(add || del || viewAll || viewSpecific)) {
    console.log("Please specify an operation");
}
else {
    if (checkFile) {
        console.log("File Found -- Skipping File creation operations");
    }
    else {
        console.log("File Not Found -- Creating File");
        fs.writeFileSync('library.json', '[]')
    }

    // Perform Tasks

    //Trying to read from file
    const fileObj = JSON.parse(fs.readFileSync('library.json', { encoding: 'utf-8' }));
    //console.log(fileObj);
    if (add) {
        if (fileObj) {
            let bookName = args.bookName; let bookCode = args.bookCode; let bookPrice = args.bookPrice; let bookAuthor = args.bookAuthor;
            if (!bookCode || !bookName) {
                console.error("Required fields are missing. Please provide the following:\n----------------------------------------------------------");
                if (!bookCode) {
                    console.error("--bookCode");
                }
                if (!bookName) {
                    console.error("--bookName");
                }
            }
            else {
                const tempObj = {};
                tempObj.bookName = bookName;
                tempObj.bookCode = bookCode;
                tempObj.bookPrice = bookPrice;
                tempObj.bookAuthor = bookAuthor;
                //Add obj to file obj here
                fileObj.push(tempObj);
                fs.writeFileSync('library.json', JSON.stringify(fileObj));
                console.log(fileObj);
            }
        }
    }
    if (del) {
        if (fileObj) {
            let bookCode = args.bookCode;
            //Search Book and delete
        }
    }
    if (viewSpecific) {
        if (fileObj) {
            let bookCode = args.bookCode;
            //Search Book and view
        }
    }
    if (viewAll) {
        console.log(fileObj);
    }

}










