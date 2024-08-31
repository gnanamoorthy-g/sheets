class Cell{
    constructor(row, column){
        this.id = `row_${row.id}::col_${column.id}`;
        this.isHeaderCell = row.id === 0;
        this.row = row;
        this.column = column;
        this.isEditable = this.setIsEditableOnInit();
        this.isFocused = false;
        this.value = this.setDefaultValueToCell();
        this.style = { height : "calc(100% - 6px)", width : (this.column.width -6)};// -6 to offset for padding and border;
        this.styleAttributes = {
            isBold :  false,
            isItalic : false,
            fontSize : 12,
            font : 'Roboto',
            isHorizontallyAligned : false,
            isVerticallyAligned : false,
            color : "#000000",
            backgroundColor  : 'transparent',
        };
        this.formula = {};
        this.valueFormatter = null;
        this.formattedValue = null;
        this.cellClasses = [];
        this.address = this.column.name + this.row.id;
        this.initCellStyle();
    }

    setValue(value){
        if(!value) return this.value;
        this.value = value;
        if(this.valueFormatter){
            this.formattedValue = this.valueFormatter(value);
        }
        return this.value;
    }

    addClass(className){
        if(!className) return this.cellClasses;
        if(!this.cellClasses.includes(className)){
            this.cellClasses.push(className);
        }
        return this.cellClasses;
    }

    removeClass(className){
        if(!className) return this.cellClasses;
        if(!this.cellClasses.includes(className)) return this.cellClasses;
        this.cellClasses = this.cellClasses.filter(cls => cls !== className);
        return this.cellClasses
    }

    setIsEditable(isEditable = true){
        this.isEditable = isEditable;
    }

    setIsEditableOnInit(){
        if(this.isHeaderCell) return false;
        if(this.column.name === 'sNo') return false;
        return (this.row.isEditable && this.column.isEditable);
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
        if(this.isHeaderCell) this.cellClasses.push('headerCell');
    }

    setStyleAttribute(attr, value){
        if(!attr || !value) return this.styleAttributes;
        this.styleAttributes[attr] = value;
        return this.styleAttributes;
    }
}

export default Cell;