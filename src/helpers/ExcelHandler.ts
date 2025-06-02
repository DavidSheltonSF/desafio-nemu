import readXlsxFile from "read-excel-file/node";


export class ExcelHandler {
  private readonly filePath: string;

  constructor(filePath: string){
    this.filePath = filePath;
  }

  async readLines(): Promise<any> {
    const result: any = [];

    await readXlsxFile(this.filePath).then(row => result.push(row));

    return result
  }
}