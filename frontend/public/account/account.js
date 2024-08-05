async function fetchData(category) {
    const URI = `http://localhost:5000`; //IP 주소 입력 필요
    let url = "";

    // 임의의 API URL 설정 (실제 백엔드 API 엔드포인트로 교체 필요)
    if (category == "all") {
        url = `${URI}/api/account-book`;
    } else if (category == "income") {
        url = `${URI}/api/income`;
    } else if (category == "expense") {
        url = `${URI}/api/expenditure`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error("Fetch error:", error);
        renderError(error);
    }
}

function renderData(data) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // 기존 내용을 지우기

    if (data.length === 0) {
        container.innerHTML = "<p>No data available</p>";
        return;
    }

    data.forEach((item) => {
        const columnsDiv = document.createElement("div");
        columnsDiv.classList.add("rows");

        const formattedDate = formatDate(item.created_dttm);

        const dateDiv = document.createElement("div");
        dateDiv.classList.add("row-date");
        dateDiv.textContent = formattedDate;

        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("row-category");
        categoryDiv.textContent = item.category;

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("row-content");
        contentDiv.textContent = item.content;

        const amount = typeof item.amount === "number" ? item.amount : Number(item.amount);
        const formattedAmount = formatAmount(amount);

        const amountDiv = document.createElement("div");
        amountDiv.classList.add("row-amount");
        amountDiv.textContent = formattedAmount;

        columnsDiv.appendChild(dateDiv);
        columnsDiv.appendChild(categoryDiv);
        columnsDiv.appendChild(contentDiv);
        columnsDiv.appendChild(amountDiv);

        container.appendChild(columnsDiv);
    });
}

// 날짜 형식 정리하는 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 금액 형식 변환 함수
function formatAmount(amount) {
    return amount.toLocaleString(); // 천 단위 구분 기호 추가
}

function renderError(error) {
    const container = document.getElementById("data-container");
    container.innerHTML = `<p>Error: ${error.message}</p>`;
}
