const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getTODO() {
    let a = [];
    for (let file of files) {
        s = file.split("\n")
        for (const line of s)
        {
            let regex = /\/\/\sTODO\s(.+)/g;
            let match;
            while ((match = regex.exec(line)) !== null) {
                a.push(match[0]);
            }
        }
    } 
    return a;
}

function processCommand(command) {
    let c = command.split(" ")
    a = getTODO();
    switch (c[0]) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            for (const line of a)
            {
                console.log(line);
            }
            break;
        case 'user':
            let name = c[1];
            for (const line of a)
                {
                    if (line.toLowerCase().includes(name.toLowerCase()))
                        console.log(line);
                }
            break;
        case 'sort':
            switch (c[1]) {
                case 'importance':
                    let dict = {}
                    for (const line of a)
                        {
                            let cnt = (line.match(/!/g) || []).length;
                            dict[cnt] = line;
                        }
                    const sortedKeys = Object.keys(dict).sort();
                    const sortedDict = {};
                    sortedKeys.forEach(key => {
                        sortedDict[key] = dict[key];
                    });
                    let values = Object.values(sortedDict).reverse()
                    for (const str of values)
                    {
                        console.log(str);
                    }
                    break;
                case 'user':
                    let dictWithName = {}
                    let withoutNames = []
                    for (const line of a)
                        {
                            let nameIndex = line.indexOf(";");
                            if (nameIndex != -1)
                            {
                                if (!Object.keys(dictWithName).includes(line.slice(9, nameIndex).toLowerCase()))
                                    dictWithName[line.slice(9, nameIndex).toLowerCase()] = [];
                                dictWithName[line.slice(9, nameIndex).toLowerCase()].push(line);
                            }
                            else
                                withoutNames.push(line);
                        }
                    let valuesNames = Object.values(dictWithName)
                    for (const str of valuesNames)
                    {
                        for (const data of str)
                            console.log(data);
                    }
                    for (const str of withoutNames)
                        {
                            console.log(str);
                        }
                    break;
        
                case 'date':
                    let dictWithdate = {}
                    let withoutDates = []
                    for (const line of a)
                        {
                            let nameIndex = line.indexOf(";");
                            let dateIndex = line.indexOf(";", nameIndex + 1);
                            if (nameIndex != -1)
                            {
                                dictWithdate[line.slice(nameIndex + 2, dateIndex)] = line;
                            }
                            else
                            withoutDates.push(line);
                        }
                    const sortedKeysDates = Object.keys(dictWithdate).sort((a, b) => new Date(b) - new Date(a));
                    const sortedDictDates = {};
                    sortedKeysDates.forEach(key => {
                        sortedDictDates[key] = dictWithdate[key];
                    });
                    let v = Object.values(sortedDictDates)
                    for (const str of v)
                    {
                        console.log(str)
                    }
                    for (const str of withoutDates)
                        {
                            console.log(str);
                        }
                    break;
            }
            break;

        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
