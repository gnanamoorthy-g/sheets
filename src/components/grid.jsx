import Column from "../types/column";
import Row from "../types/row";
import RowNode from "./row";


function Grid(){

    const initialColumns = 26;
    const initialRows = 100;

    const columns = new Array(initialColumns).fill({})
    .map((col,idx) => (new Column(idx)));
    columns.unshift(new Column('sNo'));

    const rows = new Array(initialRows+1).fill({})
    .map((col,idx) => ( new Row(idx,columns)));

    return(
        <div id="container">{rows.map(row => <RowNode key={row.id} row={row}/>)}</div>
    )


}

export default Grid;