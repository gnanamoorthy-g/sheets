class Cell{
    constructor(row, column){
        this.id = `row_${row.id}::col_${column.id}`;
        this.isHeaderCell = row.id === 0;
        this.row = row;
        this.column = column;
        this.isEditable = this.setIsEditableOnInit()
        this.value = this.setDefaultValueToCell();
        this.style = { height : "calc(100% - 6px)", width : (this.column.width -6)};// -6 to offset for padding and border
        this.formula = {};
        this.initCellStyle();
    }

    setIsEditable(isEditable = true){
        this.isEditable = isEditable;
    }

    setIsEditableOnInit(){
        if(this.isHeaderCell) return false;
        if(this.column.name === 'sNo') return false;
        return true
    }

    setDefaultValueToCell(){
        if(this.isHeaderCell) return this.column.name;
        if(this.column.isSerialNumberColumn) return this.row.id;
        return null;
    }

    getDefaultStyle(){
        const centerAligned = { display :"flex", alignItems : "center", justifyContent : "center"};
        if(this.isHeaderCell) return centerAligned;
        if(this.column.isSerialNumberColumn) return centerAligned
    }

    initCellStyle(){
        let currentStyle = this.style;
        let defaultStyle = this.getDefaultStyle();
        this.style = Object.assign({},currentStyle,defaultStyle);
    }
}

export default Cell;