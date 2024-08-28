import CellNode from "./cell";
import Cell from "../types/cell";
import "./row.css";

function RowNode({ row }){
    const { id, columns = [], isHeaderRow } = row;
    const cells = columns.map(col => new Cell(row,col));
    const rowStyle = { height : row.height, minHeight :row.height};
    const classNames = row.rowClasses.join(' ');
    return (
        <div className={`row_container ${classNames}`} style={rowStyle}>{cells.map(cell => <CellNode key={cell.id} cell={cell}/>)}</div>
    )
}

export default RowNode;