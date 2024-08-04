const monthPicker = document.getElementById("monthPicker");
const now = new Date();
const str = now.toISOString();
const year = str.substring(0, 4); 
const month = str.substring(5, 7); 
const currentMonth = `${year}-${month}`;
monthPicker.setAttribute('max', currentMonth);
monthPicker.setAttribute('min', "2010-01");

monthPicker.addEventListener("input", function (e) {
    fetchData(e.target.value.substring(0, 4), e.target.value.substring(5));
});

monthPicker.value = currentMonth;
monthPicker.dispatchEvent(new Event('input'));

async function fetchData(year, month) {
    const URL = `http://localhost:5000/api/monthly-data?year=${year}&month=${month}`;
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("response was not ok");
        }
        const data = await response.json();
        render(data);
    } catch (err) {
        renderError(err)
        console.error("Fetch error: ", err);
    }
}

function render(data) {
    const tableBody = document.querySelector("#monthTable tbody");
    tableBody.innerHTML = ''; // 기존 데이터 지우기


    if (data.datas.length === 0) {
          // 데이터가 없는 경우 
          const noDataRow = document.createElement("tr");
          noDataRow.className = 'no-data';
          noDataRow.innerHTML = `
              <td colspan="3">월별 비용, 수익 내역이 없습니다.</td>
          `;
          tableBody.appendChild(noDataRow);
        return;
    }

    let fixedExpenseDetails = [
        { category: "고정 비용", amount: data.fixedExpense, is_income: false }, // 고정비
    ];
    let flexExpenseDetails = [
        { category: "유동 비용", amount: data.flexExpense, is_income: false }
    ];
    let fixedIncomeDetails = [
        { category: "고정 수익", amount: data.fixedIncome, is_income: true }, // 월급
    ];
    let flexIncomeDetails = [
        { category: "유동 수익", amount: data.flexIncome, is_income: true } // 상여급
    ];

    const items = data.datas;
    const fixedExpenseCategories = ["통신비", "교육비", "주거비", "세금"];
    const flexExpenseCategories = ["식비", "여가비", "의료비"];
    items.forEach((item) => {
        if (item.is_income) {
            if (item.category === "월급") {
                fixedIncomeDetails.push({ category: item.category, amount: item.total_amount, is_income: true });
            } else if (item.category === "상여급") {
                flexIncomeDetails.push({ category: item.category, amount: item.total_amount, is_income: true });
            }
        } else {
            if (fixedExpenseCategories.includes(item.category)) {
                fixedExpenseDetails.push({ category: item.category, amount: item.total_amount, is_income: false });
            } else if (flexExpenseCategories.includes(item.category)) {
                flexExpenseDetails.push({ category: item.category, amount: item.total_amount, is_income: false });
            }
        }
    });

    //총비용 row
    const totalExpenseRow = document.createElement("tr");
    totalExpenseRow.innerHTML = `
    <td class="total">총 비용</td>
    <td class="total">${formatAmount(data.totalExpense)}</td>
    <td class="total">100%</td>
    `;
    
    //총비용 row
    const totalIncomeRow = document.createElement("tr");
    totalIncomeRow.innerHTML = `
    <td class="total">총 수익</td>
    <td class="total">${formatAmount(data.totalIncome)}</td>
    <td class="total">100%</td>
    `;

    //당기순이익 row
    const totalCostRow = document.createElement("tr");
    const totalCost = Number(data.totalIncome) - Number(data.totalExpense);
    if(totalCost >= 0) {
        totalCostRow.innerHTML = `
        <td class="total">당기 순이익</td>
        <td class="plus">${formatAmount(totalCost)}</td>
        <td class="total"></td>
        `;
    } else {
        totalCostRow.innerHTML = `
        <td class="total">당기 순이익</td>
        <td class="minus">${formatAmount(totalCost)}</td>
        <td class="total"></td>
        `;
    }
    
    //나머지 row 추가
    function appendRows(tableBody, details, totalAmount) {
        details.forEach((item, i) => {
            const percentage = calcPercentage(item.amount, totalAmount);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.category}</td>
                <td>${formatAmount(Number(item.amount))}</td>
                 <td>${percentage}%</td>
            `;
 
            tableBody.appendChild(row);
        });
    }

    tableBody.appendChild(totalExpenseRow);
    appendRows(tableBody, fixedExpenseDetails, data.totalExpense);
    appendRows(tableBody, flexExpenseDetails, data.totalExpense);
    tableBody.appendChild(totalIncomeRow);
    appendRows(tableBody, fixedIncomeDetails, data.totalIncome);
    appendRows(tableBody, flexIncomeDetails, data.totalIncome); 
    tableBody.appendChild(totalCostRow);
}//render()


function calcPercentage(amount, total) {
    if (total === 0) return '0'; 
    const percentage = (amount / total) * 100;
    //소수점 1자리
    const percentageStr = percentage.toFixed(1);
    return percentageStr;
}

// 금액 형식 변환 함수
function formatAmount(amount) {
return amount.toLocaleString(); // 천 단위 구분 기호 추가
}

function renderError(error) {
    const noDataRow = document.createElement("tr");
    noDataRow.className = 'no-data';
    noDataRow.innerHTML = `
        <td colspan="3"> ${error.message}</td>
    `;
    tableBody.appendChild(noDataRow);
}