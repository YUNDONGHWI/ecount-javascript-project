monthPicker.addEventListener("input", function (e) {
    console.log("event!");
    fetchData(e.target.value.substring(0, 4), e.target.value.substring(5));
});

async function fetchData(year, month) {
    const URL = `http://172.29.12.155:5000/api/monthly-data?year=${year}&month=${month}`;
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("response was not ok");
        }
        const data = await response.json();
        console.log(data); // 데이터를 올바르게 출력

        render(data); // 데이터가 올바르게 렌더링
    } catch (err) {
        console.error("Fetch error: ", err);
    }
}

function render(data) {
    console.log("render!");
    if (data.length == 0) {
        console.log("empty!");
        const content = document.getElementById("content");
        content.innerHTML += "<p>월별 비용, 수익 내역이 없습니다.<p>";
        return;
    }

    let fixedExpenseDetails = [
        { label: "고정 비용", amount: data.fixedExpense }, //고정비 : "통신비" || "교육비" || "주거비" || "세금"
    ];
    let flexExpenseDetails = [{ label: "유동 비용", amount: data.flexExpense }];
    let fixedIncomeDetails = [
        { label: "고정 수입", amount: data.fixedIncome }, //월급
    ];
    let flexIncomeDetails = [
        { label: "유동 수입", amount: data.flexIncome }, //상여급
    ];

    const rows = data.datas;
    const fixedExpenseCategories = ["통신비", "교육비", "주거비", "세금"];
    const flexExpenseCategories = ["식비", "여가비", "의료비"];

    rows.forEach((item) => {
        if (fixedExpenseCategories.includes(item.category) && item.is_income === false) {
            fixedExpenseDetails.push({ label: item.category, amount: Number(item.total_amount) });
        } else if (flexExpenseCategories.includes(item.category) && item.is_income === false) {
            flexExpenseDetails.push({ label: item.category, amount: Number(item.total_amount) });
        } else if (item.category === "월급" && item.is_income === true) {
            fixedIncomeDetails.push({ label: item.category, amount: Number(item.total_amount) });
        } else if (item.category === "상여급" && item.is_income === true) {
            flexIncomeDetails.push({ label: item.category, amount: Number(item.total_amount) });
        }
    });

    const tableBody = document.querySelector("#monthTable tbody");
    const totalExpenseRow = document.createElement("tr");
    totalExpenseRow.innerHTML = `
    <td>총 비용</td>
    <td>${data.totalExpense}</td>
    <td></td>
    `;
    tableBody.appendChild(totalExpenseRow);

    fixedExpenseDetails.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.label}</td>
        <td>${item.amount}</td>
        <td></td>
        `;
        tableBody.appendChild(row);
    });

    flexExpenseDetails.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.label}</td>
        <td>${item.amount}</td>
        <td></td>
        `;
        tableBody.appendChild(row);
    });

    fixedIncomeDetails.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.label}</td>
        <td>${item.amount}</td>
        <td></td>
        `;
        tableBody.appendChild(row);
    });

    flexIncomeDetails.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.label}</td>
        <td>${item.amount}</td>
        <td></td>
        `;
        tableBody.appendChild(row);
    });
}

function calcTotalIncome(data) {}
