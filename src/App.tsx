import { useCallback, useMemo, useState } from "react";
import { SpreadsheetContext } from './spreadsheetContext.js';
import Spreadsheet from './types/spreadsheet';
import SpreadSheet from "./spreadsheet";

function App() {
  const [document,setDocument] = useState(new Spreadsheet());
  
  const setContext = useCallback(setDocument,[]);
  const contextValue = useMemo(() => ({ document, setContext}),[document,setContext]);

  return (
    <SpreadsheetContext.Provider value={contextValue} >
       <SpreadSheet/>
    </SpreadsheetContext.Provider>
  )
}

export default App
