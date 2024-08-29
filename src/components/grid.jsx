import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import RowNode from "./row";
import "./grid.css";


function Grid(){
    const { document } = useContext(SpreadsheetContext);
    const { activeSheet } = document;
    const { rows } = activeSheet;

    return(
        <div id="container" className="root_container" spellCheck={false}>{rows.map(row => <RowNode key={row.id} row={row}/>)}</div>
    )


}

export default Grid;