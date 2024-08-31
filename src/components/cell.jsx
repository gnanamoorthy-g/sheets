import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import "./cell.css";

function CellNode({ cell }) {
    const { value, formattedValue, errorMessage , isEditable, style , styleAttributes } = cell;

    const {
        document,
        setContext,
        document: { activeSheet },
    } = useContext(SpreadsheetContext);

    const isActive = cell.id === activeSheet.activeCell?.id;
    const user_applied_styles = buildStylesFromStyleAttr(styleAttributes);
    const cellStyles = {...style,...user_applied_styles};
    let cellClasses = cell.cellClasses || [];
    const hasActiveClass = cellClasses.includes("cell-active");
    if(isActive && !cellClasses.includes("cell-active")) cellClasses.push("cell-active");
    if(!isActive && hasActiveClass) cellClasses = cellClasses.filter(cls => cls !== 'cell-active');
    const classNames = (cellClasses || []).join(' ');

    const onFocus = (e) => {
        activeSheet.setActiveCell(cell);
        setContext({ ...document });
    }

    const onBlur = (e) =>{
        let { textContent } = e.target;
        cell.setValue(textContent,activeSheet);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13){
            let { textContent } = e.target;
            cell.setValue(textContent,activeSheet);
            setContext({ ...document });
        }
    }

    function buildStylesFromStyleAttr(styleAttributes){
        let styleObject = {};
        if(styleAttributes?.isBold) styleObject["fontWeight"] =  "bold";
        if(styleAttributes?.isItalic) styleObject["fontStyle"] =  "italic";
        if(styleAttributes?.fontSize) styleObject["fontSize"] =  styleAttributes?.fontSize;
        if(styleAttributes?.font) styleObject["fontFamily"] =  styleAttributes?.font;
        if(styleAttributes?.color) styleObject["color"] =  styleAttributes?.color;
        if(styleAttributes?.backgroundColor) styleObject["backgroundColor"] =  styleAttributes?.backgroundColor;
        return styleObject;
    }

    return (
        <div
            className={`cell_container ${classNames}`}
            contentEditable={isEditable}
            tabIndex={0}
            style={cellStyles}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            suppressContentEditableWarning={true}
        >
            {errorMessage || formattedValue || value}
        </div>
    );
}

export default CellNode;
