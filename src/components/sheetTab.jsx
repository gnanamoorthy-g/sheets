import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import "./sheetTab.css";

function SheetTab({ sheet }){ 
    const {
        documentObj,
        updateDocument,
        documentObj: { activeSheet },
    } = useContext(SpreadsheetContext);

    const isActive = sheet?.isActive;

    const onClick = () => {
        documentObj.setActiveSheet(sheet);
        updateDocument(documentObj);
    }

    return (
        <div onClick={onClick} className={`sheet_tab ${isActive  && "sheet_tab-active"}`}>{sheet.worksheetName}</div>
    )
}

export default SheetTab;