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
        this.numOfWorksheets++;
        if(this.worksheets.length === 1){
            this.setActiveSheet(newWorksheet);
        };
        return newWorksheet;
    }

    setActiveSheet(sheet){
        if(!sheet) return null;
        this.activeSheet = sheet;
        sheet.setActiveStatus(true);
        this.worksheets.forEach(worksheet => {
            if(sheet.id !== worksheet.id) worksheet.setActiveStatus(false);
        })
    }
}

export default Spreadsheet;