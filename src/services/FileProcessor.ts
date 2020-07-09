import fs from 'fs';
import path from 'path';

export class FileProcessor {

  private readonly _filePath: string;

  constructor(filePath: string) {
    this._filePath = filePath;
  }

  processFileToArray(): string[] {
    // read file
    const data = fs.readFileSync(this._filePath, 'utf8');

    // Split by newline for either Windows or Linux file
    let matchArrayRow: string[];
    if (data.includes('\r\n')) {
      matchArrayRow = data.split('\r\n');
    } else  {
      matchArrayRow = data.split('\n');
    }

    // Remove empty line and return array
    return matchArrayRow.filter(data => data.length >= 1);
  }
}