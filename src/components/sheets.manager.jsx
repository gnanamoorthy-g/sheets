import { useContext } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import SheetTab from "./sheetTab";
import "./sheets.manager.css";

function SheetsManager() {
    const {
        document,
        updateDocument,
    } = useContext(SpreadsheetContext);

    const addNewSheet = () => {
        console.log(document,"document")
        document.add_a_worksheet();
        updateDocument(document);
    }

    const renderSheetTabs = () => {
        return (
            <div className="sheet_tabs_container">
                {document.worksheets.map(sheet => <SheetTab key={sheet.id} sheet={sheet} />)}
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