export const get_xy_pointer_cells = (sheet = null,activeCell = null)=>{
    if(!sheet || !activeCell) return;
    let { row , column} = activeCell;
    let x_pointer = sheet.cells[row.id][0];
    let y_pointer = sheet.cells[0][column.id +1];
    return [x_pointer,y_pointer];
}

export const KEY_CODE_MAP = {
  ctrl: 17,
  cmd: 91,
  v: 86,
  c: 67,
};