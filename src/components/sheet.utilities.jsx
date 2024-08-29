import "./sheet.utilities.css";

function SheetUtilities() {
    const tools = []
    return (
        <div className="utilities_panel">
            <div className="utilities_section">
                <div id="currency" className="utility_btn">$</div>
                <div id="currency" className="utility_btn">%</div>
            </div>

            <div className="utilities_section">
                <div id="currency" className="utility_btn">Default Font</div>
            </div>

            <div className="utilities_section">
                <div id="currency" className="utility_btn">-</div>
                <div id="currency" className="">10</div>
                <div id="currency" className="utility_btn">+</div>
            </div>

            <div className="utilities_section">
                <div id="currency" className="utility_btn">B</div>
                <div id="currency" className="utility_btn">I</div>
                <div id="currency" className="utility_btn">S</div>
                <div id="currency" className="utility_btn">A</div>
            </div>

            <div className="utilities_section">
                <div id="currency" className="utility_btn">F</div>
                <div id="currency" className="utility_btn">Br</div>
            </div>

            <div className="utilities_section">
                <div id="currency" className="utility_btn">HA</div>
                <div id="currency" className="utility_btn">VA</div>
                <div id="currency" className="utility_btn">TW</div>
                <div id="currency" className="utility_btn">TR</div>
            </div>
        </div>
    )
}

export default SheetUtilities;