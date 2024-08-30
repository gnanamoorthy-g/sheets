import Column from "./column";
import Row from "./row";
import Cell from "./cell";

class WorkSheet {
    static initialColumns = 26;
    static initialRows = 100;
    static PREFIX = 'sheet';
    static generateSheetId() {
        let docID = crypto.randomUUID().replace("-", "").substring(0, 12);
        return Spreadsheet.PREFIX + docID;
    }
    constructor(sheetIndex) {
        this.columns = this.getDefaultColumns();
        this.rows = this.getDefaultRows();
        this.cells = this.createCellsOnInit();
        this.activeCell = this.setActiveCell(this.cells[1][1]);
        this.activeRange = null;
        this.worksheetIndex = sheetIndex;
        this.worksheetName = `Sheet ${sheetIndex+1}`;
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
}
export default WorkSheet;