class Column{
    static initialWidth = 120;
    constructor(columnIndex=null){
        this.id = columnIndex;
        this.isSerialNumberColumn = columnIndex == "sNo";
        this.name = this.indexToExcelColumnName(columnIndex);
        this.editable = true;
        this.resizable = true;
        this.width = this.isSerialNumberColumn ? 50 : Column.initialWidth;
        this.styles = {};
    }

    onResize(event){
        this.width = 200;
    }

    applyStylesToColumn(styles){
        if(!styles) return;
        this.styles = styles;
    }

    indexToExcelColumnName() {
        if (this.serialNumberColumn) return this.id;
        let name = "";
        let index = this.id;
        while (index >= 0) {
            name = String.fromCharCode((index % 26) + 65) + name;
            index = Math.floor(index / 26) - 1;
        }
        return name;
    }
}

export default Column;