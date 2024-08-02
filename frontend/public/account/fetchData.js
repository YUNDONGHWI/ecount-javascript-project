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

    const tableBody = document.querySelector("#monthTable tbody");
    const totalExpenseRow = document.createElement("tr");
    totalExpenseRow.innerHTML = `
    <td>총 비용</td>
    <td>${data.totalExpense}</td>
    <td></td>
    `;
    tableBody.appendChild(totalExpenseRow);

    let fixedExpenseDetails = [
        { label: "고정 비용", amount: data.fixedExpense }, //고정비 : "통신비" || "교육비" || "주거비" || "세금"
    ];
    let flexExpenseDetails = [{ label: "유동 비용", amount: data.flexExpense }];
    let fixedIncomeDetails = [
        { label: "고정 수입", amount: data.fixedIncome }, //월급
    ];
    let flexIncomeDetails = [
        { label: "유동 수입", amout: data.flexIncome }, //상여급
    ];

    const rows = data.datas;
    const fixedExpenseCategories = ["통신비", "교육비", "주거비", "세금"];

    rows.forEach((item) => {
        if (fixedExpenseCategories.includes(item.category)) {
            fixedExpenseDetails.push({ label: item.category, amount: Number(item.total_amount) });
        } else if (!fixedExpenseCategories.includes(item.category) && item.is_income === false) {
            flexExpenseDetails.push({ label: item.category, amount: Number(item.total_amount) });
        } else if (item.category === "월급") {
            fixedIncomeDetails.push({ label: item.category, amount: Number(item.total_amount) });
        } else if (item.category === "상여급") {
            flexIncomeDetails.push({ label: item.category, amount: Number(item.total_amount) });
        }
    });
    console.log(fixedExpenseDetails);
    console.log(flexExpenseDetails);
    console.log(fixedIncomeDetails);
    console.log(flexIncomeDetails);
}

function calcTotalIncome(data) {}
