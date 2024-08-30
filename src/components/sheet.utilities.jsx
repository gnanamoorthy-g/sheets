import { useContext ,useEffect, useState} from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import "./sheet.utilities.css";

function SheetUtilities() {
    const {
        document,
        setContext,
        document: { activeSheet },
    } = useContext(SpreadsheetContext);

    const activeCell = activeSheet.activeCell;
    const cellStyleAttributes = activeCell?.styleAttributes;
    const isBold = cellStyleAttributes?.isBold;

    const onBtnClick = (e) => {
        let {name, value} = e.target;
        cellStyleAttributes[name] = !cellStyleAttributes[name];
        setContext({ ...document });
    }
    
    return (
        <div className="utilities_panel">
            <div className="utilities_section">
                <div id="currency" className="utility_btn">$</div>
                <div id="percentage" className="utility_btn">%</div>
            </div>

            <div className="utilities_section">
                <div id="font" className="utility_btn">Default Font</div>
            </div>

            <div className="utilities_section">
                <div id="fontSize_decrease" className="utility_btn">-</div>
                <div id="fontSizeInput" className="">10</div>
                <div id="fontSizeIncrease" className="utility_btn">+</div>
            </div>

            <div className="utilities_section">
                <button
                    id="bold"
                    name="isBold"
                    value={isBold}
                    className={`utility_btn ${isBold && "btn_selected"}`}
                    onClick={onBtnClick}
                >B</button>
                <div id="italic" className="utility_btn">I</div>
                <div id="strikethrough" className="utility_btn">S</div>
                <div id="textColor" className="utility_btn">A</div>
            </div>

            <div className="utilities_section">
                <div id="fillColor" className="utility_btn">F</div>
                <div id="border" className="utility_btn">Br</div>
            </div>

            <div className="utilities_section">
                <button id="horizontalAlign" className="utility_btn">HA</button>
                <div id="verticalAlign" className="utility_btn">VA</div>
                <div id="textWrap" className="utility_btn">TW</div>
                <div id="textRotation" className="utility_btn">TR</div>
            </div>
        </div>
    )
}

export default SheetUtilities;