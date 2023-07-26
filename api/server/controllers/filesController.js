// Load config data
const config = require('../../config.json');
const fs = require('fs');
const { mkdir, rm } = require('fs/promises');
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require('path');

// Load config provider
const getConfigProvider = () => {
    if(config.providers.echoServ) {
        return config.providers.echoServ.data
    }
}

// Set base path to save files;
const folderName = 'downloads';
const folderPath = `./${folderName}`;

// Set URL and custom header
const url = `${getConfigProvider().url}`;
const customHeader = {
    //TODO Check using of env file to save secret key
    'authorization': `Bearer aSuperSecretKey`,
};

// Create async function to get files list
const getFilesList = async (req, res, next) => {
    const filesList = await baseFileRequest(`${url}${getConfigProvider().actions.listFiles.path}`);
    // Validate response
    if (!filesList) {
        return res.status(404).send({
            success: false,
            message: 'File not found',
        });
    }
    return res.status(200).send({
        success: 'true',
        data: filesList,
    });
};

// Create async function to get file by name
const getFileByName = async (req, res, next) => {
    const fileName = req.params.fileName;
    const fileData = await downloadFile(`${url}${getConfigProvider().actions.file.path}/${fileName}`, fileName);
    let jsonFormat = null
    if (fileData) {
        jsonFormat = await csvToJson(fileData)
        console.log(jsonFormat);
        return res.status(200).send({
            success: true,
            file: fileName,
            lines: JSON.parse(jsonFormat),
        });
    }
    else {
        return res.status(404).send({
            success: false,
            file: fileName,
            message: 'File not found',
        });
    }
}

// Create async function to get files list
const getDataFiles = async (req, res, next) => {
    const filesList = await baseFileRequest(`${url}${getConfigProvider().actions.listFiles.path}`);
    // Validate filesList
    if (!filesList) {
        return await res.status(400).send({
            success: false,
            data: 'No files found',
        });
    }
    const getFileData = await generateFilesFromData(filesList);
    return await res.status(200).send({
        success: true,
        data: getFileData,
    });
};

// Generate files from array of files
const generateFilesFromData = async (filesList) => {
    let fileData = null;
    const response = [];
    await Promise.all(
        filesList.files.map(async (fileName) => {
            if (!fileName) {
                return res.status(404).send({
                    success: false,
                    message: 'File not found',
                });
            } else {
                fileData = await downloadFile(`${url}${getConfigProvider().actions.file.path}/${fileName}`, fileName);
                let jsonFormat = null
                if (fileData) {
                    jsonFormat = await csvToJson(fileData)
                    response.push({
                        file: fileName,
                        lines: JSON.parse(jsonFormat),
                    });
                }
            }
        })
    )
    return response;
}

// Download file using fetch
const downloadFile = async (url, fileName) => {
    const res = await fetch(url, {
        headers: customHeader
    });
    if (!fs.existsSync(folderName)) await mkdir(folderName, { recursive: true });
    const destination = path.resolve(folderPath, fileName);
    if(res.status===200){
        if(fs.existsSync(destination)) await rm(destination);
        const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
        await finished(Readable.fromWeb(res.body).pipe(fileStream));
        return fs.readFileSync(destination, 'utf8');
    } else {
        //TODO: ADD LOGGING
        console.log('Error downloading file =>', url, res.status);
    }
}

// Create async function with fetch to get files list
const baseFileRequest = async (baseUrl = url) => {
    const response = await fetch(baseUrl, {
        headers: customHeader
    });
    // Validate response
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
}

// Create function to convert csv to json
const csvToJson = async (csv) => {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            if(headers[j] !== 'file') {
                obj[headers[j]] = currentline[j];
            }
        }
        result.push(obj);
    }
    return JSON.stringify(result);
}

// Export modules to be used in other files
module.exports = {
    getFilesList,
    getFileByName,
    getDataFiles
};