import readXlsxFile from 'read-excel-file/node';

export class ExcelFileHandler {
  private readonly filePath: string | undefined;

  constructor(filePath: string | undefined) {
    this.filePath = filePath;
  }

  async readLines(): Promise<Array<any>> {
    const data: Array<any> = [];

    if (!this.filePath) {
      throw new Error('File path is undefined');
    }

    await readXlsxFile(this.filePath).then((row) => data.push(row));

    return data;
  }
}
