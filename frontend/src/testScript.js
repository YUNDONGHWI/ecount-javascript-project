/*
test.html에서 /api/test 요청을 통해 데이터를 가져오기 위한 스크립트
*/
document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://172.29.12.155:5000/api/test";

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // resultDiv id를 가진 요소 내부에 응답받은 데이터 렌더링
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = JSON.stringify(data);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
});
