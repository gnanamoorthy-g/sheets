class Row{
    static initialHeight = 24;
    constructor(index,columns){
        this.id = index;
        this.isHeaderRow = index === 0;
        this.columns = columns;
        this.height = Row.initialHeight;
    }
}

export default Row;