class Row{
    static initialHeight = 24;
    constructor(index,columns){
        this.id = index;
        this.isHeaderRow = index === 0;
        this.columns = columns;
        this.height = Row.initialHeight;
        this.style = {};
        this.isEvenRow = this.getIsEvenRow();
        this.rowClasses = [];
        this.initializeRowClass();
    }

    initializeRowClass(){
        if(this.isEvenRow) this.rowClasses.push('row-even');
        if(!this.isEvenRow) this.rowClasses.push('row-odd');
        if(this.isHeaderRow) this.rowClasses.push('row-sticky');
    }

    getIsEvenRow(){
        return this.id % 2 === 0;
    }


}

export default Row;