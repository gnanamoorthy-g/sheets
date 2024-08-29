import Grid from "./components/grid";
import Header from "./components/header";

import  "./sheet.css";

function Sheet(){
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

export default Sheet;