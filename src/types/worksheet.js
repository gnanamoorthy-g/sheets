import Column from "./column";
import Row from "./row";
import Cell from "./cell";

class WorkSheet {
    static initialColumns = 26;
    static initialRows = 100;
    static PREFIX = 'sheet';
    static generateSheetId() {
        let docID = crypto.randomUUID().replace("-", "").substring(0, 12);
        return WorkSheet.PREFIX + docID;
    }
    constructor(sheetIndex) {
        this.id = WorkSheet.generateSheetId();
        this.columns = this.getDefaultColumns();
        this.rows = this.getDefaultRows();
        this.cells = this.createCellsOnInit();
        this.activeCell = this.setActiveCell(this.cells[1][1]);
        this.activeRange = null;
        this.worksheetIndex = sheetIndex;
        this.worksheetName = `Sheet ${sheetIndex+1}`;
        this.isActive = false;
    }

    getDefaultColumns() {
        const columns = new Array(WorkSheet.initialColumns)
            .fill({})
            .map((col, idx) => new Column(idx));
        columns.unshift(new Column("sNo"));
        return columns;
    }

    getDefaultRows() {
        const rows = new Array(WorkSheet.initialRows + 1)
            .fill({})
            .map((col, idx) => new Row(idx, this.columns));
        return rows;
    }

    createCellsOnInit() {
        let cellMatrix = [];
        this.rows.forEach((row, rowIdx) => {
            let rowCells = [];
            this.columns.forEach((col, colIdx) => {
                rowCells.push(new Cell(row, col));
            });
            cellMatrix.push(rowCells);
        });
        return cellMatrix;
    }

    setActiveCell(cell = null) {
        if (!cell) return;
        this.activeCell = cell;
        return this.activeCell;
    }

    setWorksheetName(name){
        if(!name) return;
        this.worksheetName = name;
    }

    excelColumnToIndex(columnName) {
        let index = 0;
        for (let i = 0; i < columnName.length; i++) {
            const charCode = columnName.charCodeAt(i) - 64; // 'A' is 65 in ASCII, so subtract 64
            index = index * 26 + charCode;
        }
        return index;
    }

    checkIfAddressIsValid(address = ''){
        let addressTestRegex =  new RegExp(/^[A-Z]+[0-9]+$/);
        let addressSplitRegex =  new RegExp(/^([A-Z]+)(\d+)$/);
        let isValidAddress = addressTestRegex.test(address);
        const match = address.match(addressSplitRegex);
        return { isValidAddress, match };
    }

    getCellByAddress(address = ''){
        let { isValidAddress, match } = this.checkIfAddressIsValid(address);
        if(!isValidAddress) throw new Error("Invalid cell address :: "+address);
        const columnIdx = this.excelColumnToIndex(match[1]);
        const rowIdx = match[2];
        const cell = this.cells[rowIdx][columnIdx];
        if(!cell) throw new Error("Cell Not found :: "+address +"; check if cell is within range");
        return cell;
    }

    setActiveStatus(status){
        if(!status) return this.isActive;
        this.isActive = status;
        return this.isActive;
    }
}
export default WorkSheet;