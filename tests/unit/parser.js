const fs = require('fs');
const path = require('path');

class Parser {
    constructor(filePath) {
        this.filePath = path.resolve(__dirname, filePath);
    }

    parseJSON() {
        try {
            const fileData = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(fileData);
        } catch (error) {
            console.error(`Error parsing JSON file: ${error.message}`);
            throw error;
        }
    }

    parseCSV() {
        try {
            const fileData = fs.readFileSync(this.filePath, 'utf8');
            const lines = fileData.split('\n');
            const headers = lines[0].split(',');
            const result = lines.slice(1).map(line => {
                const values = line.split(',');
                return headers.reduce((obj, header, index) => {
                    obj[header] = values[index];
                    return obj;
                }, {});
            });
            return result;
        } catch (error) {
            console.error(`Error parsing CSV file: ${error.message}`);
            throw error;
        }
    }

    parseFile() {
        const ext = path.extname(this.filePath).toLowerCase();
        switch (ext) {
            case '.json':
                return this.parseJSON();
            case '.csv':
                return this.parseCSV();
            default:
                throw new Error(`Unsupported file type: ${ext}`);
        }
    }
}

module.exports = Parser;