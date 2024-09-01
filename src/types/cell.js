class Cell {
  constructor(row, column) {
    this.id = `row_${row.id}::col_${column.id}`;
    this.isHeaderCell = row.id === 0;
    this.row = row;
    this.column = column;
    this.isEditable = this.setIsEditableOnInit();
    this.isFocused = false;
    this.value = this.setDefaultValueToCell();
    this.style = { height: "calc(100% - 6px)", width: this.column.width - 6 }; // -6 to offset for padding and border;
    this.styleAttributes = {
      isBold: false,
      isItalic: false,
      fontSize: 12,
      font: "Roboto",
      isHorizontallyAligned: false,
      isVerticallyAligned: false,
      color: "#000000",
      backgroundColor: "transparent",
    };
    this.formula = "";
    this.dependents = [];
    this.valueFormatter = null;
    this.formattedValue = null;
    this.errorMessage = "";
    this.cellClasses = [];
    this.address = this.column.name + this.row.id;
    this.initCellStyle();
  }

  setErrorMessage(error) {
    this.errorMessage = error;
  }

  setFormula(formula, worksheet, onRecalculate = false) {
    if (formula === this.formula && !onRecalculate) return this.formula;
    if (!formula) {
      this.setValue(null, worksheet);
      this.setErrorMessage(null);
      this.removeClass("cell-error");
      return this.formula;
    }
    this.removeDependencies(formula, worksheet);
    this.formula = formula;
    const isAnExpression = formula.length && formula.substring(0, 1) === "=";
    let operands = isAnExpression
      ? formula.substring(1).split(" ")
      : formula.split(" ");
    for (let i = 0; i < operands.length; i++) {
      if (operands[i].trim()) {
        let { isValidAddress, match } = worksheet.checkIfAddressIsValid(
          operands[i]
        );
        if (isValidAddress) {
          try {
            let cell = worksheet.getCellByAddress(operands[i]);
            operands[i] = cell.value;
            cell.addDependent(this);
            let isCyclic = this.checkIfFormulaIsCyclic(this);
            if(isCyclic) throw new Error("Formula is cyclic");
          } catch (err) {
            this.setValue(null, worksheet);
            this.setErrorMessage("#ERR!");
            this.addClass("cell-error");
            throw new Error(err);
          }
        }
      }
    }
    let decodedFormula = operands.join(" ");
    try {
      let evaluatedValue = isAnExpression ? eval(decodedFormula) : formula;
      this.setValue(evaluatedValue, worksheet);
      this.setErrorMessage(null);
      this.removeClass("cell-error");
    } catch (err) {
      this.setValue(null, worksheet);
      this.setErrorMessage("#ERR!");
      this.addClass("cell-error");
      throw new Error(err);
    }
    return this.formula;
  }

  setValueFormatter(formatter) {
    this.valueFormatter = formatter;
    if (!formatter) this.formattedValue = null;
    else this.formattedValue = this.valueFormatter(this.value);
    return this.valueFormatter;
  }

  setValue(value, worksheet) {
    if (!value) return this.value;
    this.value = value;
    if (this.valueFormatter) {
      this.formattedValue = this.valueFormatter(value);
    }
    if (this.dependents && this.dependents.length) {
      this.reCalculateDependentValues(worksheet);
    }
    return this.value;
  }

  addClass(className) {
    if (!className) return this.cellClasses;
    if (!this.cellClasses.includes(className)) {
      this.cellClasses.push(className);
    }
    return this.cellClasses;
  }

  removeClass(className) {
    if (!className) return this.cellClasses;
    if (!this.cellClasses.includes(className)) return this.cellClasses;
    this.cellClasses = this.cellClasses.filter((cls) => cls !== className);
    return this.cellClasses;
  }

  setIsEditable(isEditable = true) {
    this.isEditable = isEditable;
  }

  setIsEditableOnInit() {
    if (this.isHeaderCell) return false;
    if (this.column.name === "sNo") return false;
    return this.row.isEditable && this.column.isEditable;
  }

  setDefaultValueToCell() {
    if (this.isHeaderCell) return this.column.name;
    if (this.column.isSerialNumberColumn) return this.row.id;
    return null;
  }

  getDefaultStyle() {
    const centerAligned = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
    if (this.isHeaderCell) return centerAligned;
    if (this.column.isSerialNumberColumn) return centerAligned;
  }

  initCellStyle() {
    let currentStyle = this.style;
    let defaultStyle = this.getDefaultStyle();
    this.style = Object.assign({}, currentStyle, defaultStyle);
    if (this.isHeaderCell) this.cellClasses.push("headerCell");
  }

  setStyleAttribute(attr, value) {
    if (!attr || !value) return this.styleAttributes;
    this.styleAttributes[attr] = value;
    return this.styleAttributes;
  }

  removeDependencies(formula, worksheet) {
    const isAnExpression = formula.length && formula.substring(0, 1) === "=";
    if (!isAnExpression) return -1;
    let operands = formula.substring(1).split(" ");
    for (let i = 0; i < operands.length; i++) {
      if (operands[i].trim()) {
        let { isValidAddress, match } = worksheet.checkIfAddressIsValid(
          operands[i]
        );
        if (isValidAddress) {
          try {
            let cell = worksheet.getCellByAddress(operands[i]);
            cell.removeDependent(this);
          } catch (err) {
            throw new Error(err);
          }
        }
      }
    }
    return 1;
  }

  removeDependent(dependent) {
    if (!dependent) return this.dependents;
    let dependantIndex = this.dependents.findIndex(
      (i) => i.id === dependent.id
    );
    if (dependantIndex < 0) return this.dependents;
    this.dependents.splice(dependantIndex, 1);
  }

  addDependent(dependent) {
    if (!dependent) return this.dependents;
    if (!Array.isArray(this.dependents)) this.dependents = [];
    let dependantIndex = this.dependents.findIndex(
      (i) => i.id === dependent.id
    );
    if (dependantIndex >= 0) return this.dependents;
    this.dependents.push(dependent);
    return this.dependents;
  }

  reCalculateDependentValues(worksheet) {
    const onRecalculate = true;
    this.dependents.forEach((dependant) => {
      dependant.setFormula(dependant.formula, worksheet, onRecalculate);
    });
  }

  checkIfFormulaIsCyclic(cell) {
    const visited = new Set();
    function dfs(cell) {
      if (visited.has(cell.id)) {
        return true;
      }
      visited.add(cell.id);
      for (let child of cell.dependents) {
        if (dfs(child)) {
          return true;
        }
      }
      visited.delete(cell.id);
      return false;
    }
    return dfs(cell);
  }
}

export default Cell;
