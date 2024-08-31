import { useContext, useEffect, useState } from "react";
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
    const {
        isBold, isItalic, fontSize, font,
        isHorizontallyAligned, isVerticallyAligned,
        color, backgroundColor
    } = cellStyleAttributes;

    const onBtnClick = (e) => {
        let { name, value } = e.currentTarget;
        cellStyleAttributes[name] = !cellStyleAttributes[name];
        setContext({ ...document });
    }

    return (
        <div className="utilities_panel">
            <div className="utilities_section">
                <button id="currency" className="utility_btn"><span className="material-symbols-outlined">
                    attach_money
                </span></button>
                <button id="percentage" className="utility_btn"><span className="material-symbols-outlined">
                    percent
                </span></button>
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
                    title="Bold"
                    value={isBold}
                    className={`utility_btn ${isBold && "btn_selected"}`}
                    onClick={onBtnClick}
                ><span className="material-symbols-outlined">
                        format_bold
                    </span></button>
                <button
                    id="italic"
                    name="isItalic"
                    title="Italic"
                    value={isItalic}
                    className={`utility_btn ${isItalic && "btn_selected"}`}
                    onClick={onBtnClick}

                ><span className="material-symbols-outlined">
                        format_italic
                    </span></button>
                <button
                    id="strikethrough"
                    className="utility_btn"
                    title="Strikethrough"
                >
                    <span className="material-symbols-outlined">
                        format_strikethrough
                    </span></button>
                <button
                    id="underline"
                    className="utility_btn"
                    title="Underline"
                >
                    <span className="material-symbols-outlined">
                        format_underlined
                    </span></button>
                <button
                    id="textColor"
                    className="utility_btn"
                    title="Text Color"
                ><span className="material-symbols-outlined">
                        format_color_text
                    </span></button>
            </div>

            <div className="utilities_section">
                <div
                    title="Background Color"
                    id="fillColor" className="utility_btn"><span className="material-symbols-outlined">
                        format_color_fill
                    </span></div>
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