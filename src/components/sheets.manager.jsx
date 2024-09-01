import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import SheetTab from "./sheetTab";
import "./sheets.manager.css";

function SheetsManager() {
    const {
        documentObj,
        updateDocument,
    } = useContext(SpreadsheetContext);

    const addNewSheet = () => {
        documentObj.add_a_worksheet();
        updateDocument(documentObj);
    }

    const renderSheetTabs = () => {
        return (
            <div className="sheet_tabs_container">
                {documentObj.worksheets.map(sheet => <SheetTab key={sheet.id} sheet={sheet} />)}
            </div>
        )
    }

    return (
        <div className="sheets_manager_panel">
            <button className="add-sheet-btn" onClick={addNewSheet}><span className="material-symbols-outlined">
                add_circle
            </span></button>
            {renderSheetTabs()}
        </div>
    )
}

export default SheetsManager;