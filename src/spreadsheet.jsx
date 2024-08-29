import Grid from "./components/grid";
import Header from "./components/header";
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
            <footer></footer>
        </section>

    )
}

export default SpreadSheet;