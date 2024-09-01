import { useContext, useEffect, useRef } from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import { toast, ToastContainer } from 'react-toastify';
import fxIcon from "/formula.png";
import "react-toastify/dist/ReactToastify.css";
import "./formula.input.css";

const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

function FormulaEditor() {
    const {
        documentObj,
        updateDocument,
        documentObj: { activeSheet },
    } = useContext(SpreadsheetContext);
    const { activeCell = {} } = activeSheet;

    const inputRef = useRef(null);

    const toastError = (toastMessage) => {
        toast.error(toastMessage?.toString(), toastStyle);
    }

    const onInputChange = debounce((e) => {
        let inputValue = e.target.value;
        try {
            activeCell.setValue(inputValue, activeSheet);
            updateDocument(documentObj);
        }
        catch (err) { toastError(err)};
    }, 500);


    const onBlur = (e) => {
        let inputValue = e.target.value;
        try {
            activeCell.setFormula(inputValue, activeSheet);
            updateDocument(documentObj);
        }
        catch (err) { toastError(err)};
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            let inputValue = e.target.value;
            try {
                activeCell.setFormula(inputValue, activeSheet);
                updateDocument(documentObj);
            } 
            catch (err) { toastError(err)};
        }
    }

    useEffect(() => {
        inputRef.current.value = activeCell?.formula || '';
    }, [activeCell]);

    return (
        <div className="sheet-functions">
            <div className="fx_icon"><img src={fxIcon} /></div>
            <input ref={inputRef} className="fx_input" onChange={onInputChange} onBlur={onBlur} onKeyDown={onKeyDown}></input>
            <div className="toast_container"><ToastContainer /></div>
        </div>
    )
}

export default FormulaEditor;