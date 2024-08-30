import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import "./rangeSelector.css";

function RangeSelector(){
    const { document } = useContext(SpreadsheetContext);
    const { activeSheet } = document;

    return(
        <div className="range-selector">{activeSheet?.activeCell?.address || ''}</div>
    )
}

export default RangeSelector;