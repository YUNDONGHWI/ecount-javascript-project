class MonthResponse {
    constructor(
        totalIncome,
        totalExpense,
        flexIncome,
        fixedIncome,
        flexExpense,
        fixedExpense,
        datas
    ) {
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.flexIncome = flexIncome;
        this.fixedIncome = fixedIncome;
        this.flexExpense = flexExpense;
        this.fixedExpense = fixedExpense;
        this.datas = datas;
    }

    //Getter
    getTotalIncome() {
        return this.totalIncome;
    }
    getTotalExpense() {
        return this.totalExpense;
    }
    getFlexIncome() {
        return this.flexIncome;
    }
    getFixedIncome() {
        return this.fixedIncome;
    }
    getflexExpense() {
        return this.flexExpense;
    }
    getFixedExpense() {
        return this.fixedExpense;
    }

    //Setter
    setTotalIncome(totalIncome) {
        this.totalIncome = totalIncome;
    }
    setTotalExpense(totalExpense) {
        this.totalExpense = totalExpense;
    }
    setFlexIncome(flexIncome) {
        this.flexIncome = flexIncome;
    }
    setFixedIncome(fixedIncome) {
        this.fixedIncome = fixedIncome;
    }
    setflexExpense(flexExpense) {
        this.flexExpense = flexExpense;
    }
    setFixedExpense(fixedExpense) {
        this.fixedExpense = fixedExpense;
    }
}

module.exports = MonthResponse;
