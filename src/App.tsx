import { useCallback, useMemo, useState } from "react";
import { SpreadsheetContext } from './spreadsheetContext.js';
import Spreadsheet from './types/spreadsheet';
import SpreadSheet from "./spreadsheet";

function App() {
  const [document,setDocument] = useState(new Spreadsheet());

  const updateDocumentInstance = (document) => {
    setDocument((prev) => {
      const newDocument = Object.create(Object.getPrototypeOf(prev));
      Object.assign(newDocument, prev, document);
      return newDocument;
    });
  }
  
  const updateDocument = useCallback(updateDocumentInstance,[]);
  const contextValue = useMemo(() => ({ document, updateDocument}),[document,updateDocument]);

  return (
    <SpreadsheetContext.Provider value={contextValue} >
       <SpreadSheet/>
    </SpreadsheetContext.Provider>
  )
}

export default App
