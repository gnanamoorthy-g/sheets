import { useCallback, useEffect, useMemo, useState } from "react";
import { SpreadsheetContext } from './spreadsheetContext.js';
import { KEY_CODE_MAP } from "./utils.js";
import Spreadsheet from './types/spreadsheet';
import SpreadSheet from "./spreadsheet";

function App() {
  const [documentObj, setDocument] = useState(new Spreadsheet());

  const updateDocumentInstance = (updatedDoc) => {
    setDocument((prev) => {
      const newDocument = Object.create(Object.getPrototypeOf(prev));
      Object.assign(newDocument, prev, updatedDoc);
      return newDocument;
    });
  }

  const updateDocument = useCallback(updateDocumentInstance, []);
  const contextValue = useMemo(() => ({ documentObj, updateDocument }), [documentObj, updateDocument]);

  const onCopy = async () => {
    let activeCell = documentObj.activeSheet.activeCell;
    let activeElement = document.getElementById(activeCell.id);
    await navigator.clipboard.writeText(activeCell.value);
    activeElement?.classList.add('cell-blink');
    setTimeout(() => {
      activeElement?.classList.remove('cell-blink');
  }, 1500);

  }

  const onPaste = () => {

  }

  useEffect(()=>{
    document.addEventListener('keydown', (e) => {
      if(e.ctrlKey && e.keyCode === KEY_CODE_MAP.c) onCopy();
      if(e.ctrlKey && e.keyCode === KEY_CODE_MAP.c) onPaste();
    })
  },[documentObj]);

  return (
    <SpreadsheetContext.Provider value={contextValue} >
      <SpreadSheet />
    </SpreadsheetContext.Provider>
  )
}

export default App
