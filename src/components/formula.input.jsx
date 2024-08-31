import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import fxIcon from "/formula.png";
import "./formula.input.css";

function FormulaEditor() {
    const { document } = useContext(SpreadsheetContext);
    const { activeSheet } = document;

    return (
        <div className="sheet-functions">
            <div className="fx_icon"><img src={fxIcon} /></div>
            <input className="fx_input"></input>
        </div>
    )
}

export default FormulaEditor;