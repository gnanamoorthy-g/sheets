import WorkSheet from "./worksheet";

class Spreadsheet{
    static PREFIX = 'doc';
    static generateDocId() {
        let docID = crypto.randomUUID().replace("-", "").substring(0, 12);
        return Spreadsheet.PREFIX + docID;
    }
    constructor(){
        this.id = Spreadsheet.generateDocId();
        this.numOfWorksheets = 0;
        this.worksheets = [];
        this.activeSheet = null;
        this.add_a_worksheet();
    }

    add_a_worksheet(){
        let newWorksheet = new WorkSheet(this.numOfWorksheets);
        this.worksheets.push(newWorksheet);
        this.activeSheet = newWorksheet;
        this.numOfWorksheets++;
    }
}

export default Spreadsheet;