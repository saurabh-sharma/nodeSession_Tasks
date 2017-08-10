const args = require('yargs').argv;
const os = require('os');
const fs = require('fs');
const debug = true;
const fileName = 'library.json';
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


const checkFile = fs.existsSync(fileName);

let add = args.add || false, del = args.del || false, viewAll = args.viewAll || false, viewSpecific = args.viewSpecific || false
console.log(add, del, viewAll, viewSpecific);

//CHECKING IF OPERATION PROVIDED
if (!(add || del || viewAll || viewSpecific)) {
    console.log("Please specify an operation");
}
else {
    if (checkFile) {
        debug ? console.log("File Found -- Skipping File creation operations") : '';
    }
    else {
        debug ? console.log("File Not Found -- Creating File") : '';
        fs.writeFileSync(fileName, '[]')
    }

    // Perform Tasks

    //Trying to read from file
    const fileObj = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf-8' }));
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
                let existingBook = false;
                //Search for existing book Code
                fileObj.forEach(function (element) {
                    if (element.bookCode == bookCode) {
                        console.log(`A book with book code "${bookCode}" already exists\nHere are the details:`);
                        console.log(element);
                        existingBook = true;
                        return false;
                    }
                }, this);
                if (!existingBook) {
                    const tempObj = {};
                    tempObj.bookName = bookName;
                    tempObj.bookCode = bookCode;
                    tempObj.bookPrice = bookPrice;
                    tempObj.bookAuthor = bookAuthor;
                    //Add obj to file obj here
                    fileObj.push(tempObj);
                    fs.writeFileSync(fileName, JSON.stringify(fileObj));
                    //console.log(fileObj);
                    debug ? '' : console.clear();
                    console.log("Book Saved");
                }
            }
        }
    }
    if (del) {
        if (fileObj) {
            let bookCode = args.bookCode;
            if (!bookCode) {
                console.error("Required fields are missing. Please provide the following:\n----------------------------------------------------------");
                if (!bookCode) {
                    console.error("--bookCode");
                }
            }
            else {
                let index = fileObj.findIndex((element) => {
                    return element.bookCode === bookCode;
                })
                if (index !== -1) {
                    fileObj.splice(index, 1)
                    fs.writeFileSync(fileName, JSON.stringify(fileObj));
                    console.log(`Book with code "${bookCode}" deleted from inventory`);
                }
                else {
                    console.log(`No record found for "${bookCode}"`);
                }

            }

        }
    }
    if (viewSpecific) {
        if (fileObj) {
            let bookCode = args.bookCode;
            if (!bookCode) {
                console.error("Required fields are missing. Please provide the following:\n----------------------------------------------------------");
                console.error("--bookCode");
            }
            else {
                let existingBook = false;
                fileObj.forEach(function (element) {
                    if (element.bookCode == bookCode) {
                        existingBook = true;
                        console.log("Book Found! Here are the details:");
                        console.log(element);
                        return false;
                    }
                }, this);
                if (!existingBook) { console.log(`Book with code "${bookCode}" not found in inventory`); }
            }

            //Search Book and view
        }
    }
    if (viewAll) {
        console.log("Showing all books in inventory:");
        console.log(fileObj);
    }
}










