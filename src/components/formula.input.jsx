import { useContext , useEffect, useState, useRef} from "react";
import { SpreadsheetContext } from "../spreadsheetContext";
import fxIcon from "/formula.png";
import "./formula.input.css";

function FormulaEditor() {
    const {
        document,
        setContext,
        document: { activeSheet },
    } = useContext(SpreadsheetContext);
    const { activeCell = {} } = activeSheet;

    const inputRef = useRef(null);

    const onInputChange = debounce((e) => {
        let inputValue = e.target.value;
        activeCell.setValue(inputValue,activeSheet);
        setContext({ ...document });
    }, 500);


    const onBlur = (e) => {
        let inputValue = e.target.value;
        activeCell.setFormula(inputValue,activeSheet);
        setContext({ ...document });
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13){
            let inputValue = e.target.value;
            activeCell.setFormula(inputValue,activeSheet);
            setContext({ ...document });
        }
    }

    useEffect(()=>{
        inputRef.current.value = activeCell?.formula || '';
    },[activeCell]);

    return (
        <div className="sheet-functions">
            <div className="fx_icon"><img src={fxIcon} /></div>
            <input ref={inputRef} className="fx_input" onChange={onInputChange} onBlur={onBlur} onKeyDown={onKeyDown}></input>
        </div>
    )
}

export default FormulaEditor;