class Row{
    static initialHeight = 24;
    constructor(index,columns){
        this.id = index;
        this.isHeaderRow = index === 0;
        this.columns = columns;
        this.height = Row.initialHeight;
        this.style = {};
        this.isEvenRow = this.getIsEvenRow();
        this.isHighlighted = false;
        this.rowClasses = [];
        this.isEditable = !this.isHeaderRow;
        this.initializeRowClass();
    }

    setHighlightRow(status = false){
        this.isHighlighted = status;
        if(status) this.rowClasses.push('row-focused');
    }

    initializeRowClass(){
        if(this.isHeaderRow) this.rowClasses.push('row-header');
        if(this.isEvenRow) this.rowClasses.push('row-even');
        if(!this.isEvenRow) this.rowClasses.push('row-odd');
        if(this.isHeaderRow) this.rowClasses.push('row-sticky');
    }

    getIsEvenRow(){
        return this.id % 2 === 0;
    }


}

export default Row;