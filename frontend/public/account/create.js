document.getElementById("type").addEventListener("change", function () {
    const type = this.value;
    const categorySelect = document.getElementById("category");
    categorySelect.innerHTML = ""; // 기존 옵션 초기화

    if (type === "income") {
        categorySelect.innerHTML += '<option value="월급">월급</option>';
        categorySelect.innerHTML += '<option value="상여급">상여급</option>';
    } else if (type === "expense") {
        categorySelect.innerHTML += '<option value="식비">식비</option>';
        categorySelect.innerHTML += '<option value="교통비">교통비</option>';
        categorySelect.innerHTML += '<option value="주거비">주거비</option>';
        categorySelect.innerHTML += '<option value="여가비">여가비</option>';
        categorySelect.innerHTML += '<option value="통신비">통신비</option>';
        categorySelect.innerHTML += '<option value="교육비">교육비</option>';
        categorySelect.innerHTML += '<option value="의료비">의료비</option>';
        categorySelect.innerHTML += '<option value="세금">세금</option>';
        categorySelect.innerHTML += '<option value="기타">기타</option>';
    } else {
        categorySelect.innerHTML += '<option value="">유형을 먼저 선택하세요</option>';
    }
});

document.getElementById("transaction-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        category: formData.get("category"),
        isIncome: formData.get("type") === "income",
        content: formData.get("content"),
        amount: parseFloat(formData.get("amount")),
    };
    console.log(formData);
    console.log(data);

    try {
        const response = await fetch(`http:/localhost:5000/api/account-book`, {
            //IP 주소 입력 필요
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Success:", result);

        alert("등록이 완료되었습니다.");
        window.location.href = `/account`;
    } catch (error) {
        console.error("Error:", error);
    }
});
