import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import RowNode from "./row";
import "./grid.css";


function Grid(){
    const { 
        documentObj , 
        documentObj : { activeSheet }
    } = useContext(SpreadsheetContext);
    const rows = activeSheet.rows || [];

    return(
        <div id="container" className="root_container" spellCheck={false}>{rows.map(row => <RowNode key={row.id} row={row}/>)}</div>
    )


}

export default Grid;