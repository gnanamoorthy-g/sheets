import MenuItem from "./menuItem";
import Avatar from "./userAvatar";
import RangeSelector from "./rangeSelector";
import SheetUtilities from "./sheet.utilities";
import fxIcon from "/formula.png";
import "./header.css";

import BannerIcon from "/sheets.svg";

function Header() {
    const menuItems = [
        "File",
        "Edit",
        "View",
        "Insert",
        "Format",
        "Data",
        "Tools",
        "Extensions",
        "Help",
    ];

    const renderMenuItems = (menuItems) => {
        return <div className="sheet_menu">{menuItems.map((menu) => <MenuItem key={menu} menu={menu} />)}</div>;
    };

    return (
        <div className="header">
            <div className="topbar">
                <div className="banner"><img src={BannerIcon}/></div>
                <div className="header_content">
                    <div className="title_menu_container">
                        <div className="title">Untitled spreadsheet</div>
                        {renderMenuItems(menuItems)}
                    </div>
                    <div className="sheet_actions_container"><Avatar userName="Gnanamoorthy"/></div>
                </div>
            </div>
            <div className="sheet_utilities_container"><SheetUtilities /></div>
            <div className="range_container">
                <RangeSelector/>
                <div className="sheet-functions">
                    <div className="fx_icon"><img src={fxIcon}/></div>
                    <div className="fx_input"></div>
                </div>

            </div>
        </div>
    );
}

export default Header;
