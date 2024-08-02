// const monthPicker = document.getElementById("monthPicker");

// // 날짜를 'YYYY-MM' 형식으로 변환하는 함수
// function formatDateToMonthInput(date) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로 포맷
//     return `${year}-${month}`;
// }

// const now = new Date();
// const current = formatDateToMonthInput(now);

// // 월을 'YYYY-MM' 형식으로 설정
// monthPicker.value = current;

// // 'input' 이벤트를 생성하고 디스패치하기
// const event = new Event("input", {
//     bubbles: true,
//     cancelable: true,
// });

// monthPicker.dispatchEvent(event);
