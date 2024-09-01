import Grid from "./components/grid";
import Header from "./components/header";
import SheetsManager from "./components/sheets.manager";
import  "./spreadsheet.css";

function SpreadSheet(){
    return(
        <section>
            <header>
                <Header/>
            </header>
            <main>
                <Grid/>
            </main>
            <footer><SheetsManager/></footer>
        </section>

    )
}

export default SpreadSheet;