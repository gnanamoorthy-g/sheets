import { useContext ,useEffect, useState} from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import { get_xy_pointer_cells } from "../utils";
import "./cell.css";

function CellNode({ cell }) {
    const { value, isEditable, style , styleAttributes } = cell;

    const [cellState,setCellState] = useState({});

    const {
        document,
        setContext,
        document: { activeSheet },
    } = useContext(SpreadsheetContext);

    const isActive = cell.id === activeSheet.activeCell?.id;
    let { x_pointer, y_pointer} = cellState;
    const user_applied_styles = buildStylesFromStyleAttr(styleAttributes);
    const cellStyles = {...style,...user_applied_styles};
    let cellClasses = cell.cellClasses || [];
    setCellClasses(isActive,cellClasses);
    const classNames = (cellClasses || []).join(' ');

    const onFocus = (e) => {
        activeSheet.setActiveCell(cell);
        // x_pointer.addClass('active-cell-xy-pointer');
        // y_pointer.addClass('active-cell-xy-pointer');
        setContext({ ...document });
    }

    function setCellClasses(isActive, cellClasses = []){
        if(isActive){
            cellClasses = cell.addClass("cell-active");
            // x_pointer.addClass('active-cell-xy-pointer');
            // y_pointer.addClass('active-cell-xy-pointer');
        }else{
            cellClasses = cell.removeClass("cell-active");
            // x_pointer?.removeClass("active-cell-xy-pointer");
            // y_pointer?.removeClass("active-cell-xy-pointer");
        };
    };

    function buildStylesFromStyleAttr(styleAttributes){
        let styleObject = {};
        if(styleAttributes?.isBold) styleObject["fontWeight"] =  "bold";
        return styleObject;
    }

    useEffect(()=>{
        let [x_pointer,y_pointer] = get_xy_pointer_cells(activeSheet,cell);
        setCellState({ x_pointer, y_pointer});
    },[]);

    return (
        <div
            className={`cell_container ${classNames}`}
            contentEditable={isEditable}
            tabIndex={0}
            style={cellStyles}
            onFocus={onFocus}
            
        >
            {value}
        </div>
    );
}

export default CellNode;
