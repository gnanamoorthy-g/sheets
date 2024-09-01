import CellNode from "./cell";
import Cell from "../types/cell";
import { SpreadsheetContext } from "../spreadsheetContext";
import "./row.css";
import { useContext } from "react";

function RowNode({ row }){
    const { documentObj } = useContext(SpreadsheetContext);
    const { activeSheet } = documentObj;
    const { cells } = activeSheet;

    const { id } = row;
    const rowCells = cells[id] || [];
    const rowStyle = { height : row.height, minHeight :row.height};
    const classNames = row.rowClasses.join(' ');
    return (
        <div className={`row_container ${classNames}`} style={rowStyle}>{rowCells.map(cell => <CellNode key={cell.id} cell={cell}/>)}</div>
    )
}

export default RowNode;