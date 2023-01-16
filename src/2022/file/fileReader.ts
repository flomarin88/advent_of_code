import * as fs from 'fs';

export async function readFile(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile('resources/' + fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
