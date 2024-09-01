import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import "./rangeSelector.css";

function RangeSelector(){
    const { documentObj } = useContext(SpreadsheetContext);
    const { activeSheet } = documentObj;

    return(
        <div className="range-selector">{activeSheet?.activeCell?.address || ''}</div>
    )
}

export default RangeSelector;