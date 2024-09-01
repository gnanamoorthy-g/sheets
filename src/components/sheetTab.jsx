import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import "./sheetTab.css";

function SheetTab({ sheet }){ 
    const {
        document,
        updateDocument,
        document: { activeSheet },
    } = useContext(SpreadsheetContext);

    const isActive = sheet?.isActive;

    const onClick = () => {
        document.setActiveSheet(sheet);
        updateDocument(document);
    }

    return (
        <div onClick={onClick} className={`sheet_tab ${isActive  && "sheet_tab-active"}`}>{sheet.worksheetName}</div>
    )
}

export default SheetTab;