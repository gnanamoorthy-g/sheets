import "./cell.css";

function CellNode({cell}){
    const {value, isEditable,style} = cell;
    return(
        <div className="cell_container" style={style}>{value}</div>
    )
}

export default CellNode;