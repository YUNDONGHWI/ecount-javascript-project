document.getElementById('type').addEventListener('change', function() {
    const type = this.value;
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = ''; // 기존 옵션 초기화

    if (type === 'income') {
      categorySelect.innerHTML += '<option value="salary">월급</option>';
      categorySelect.innerHTML += '<option value="bonus">상여금</option>';
    } else if (type === 'expense') {
      categorySelect.innerHTML += '<option value="food">식비</option>';
      categorySelect.innerHTML += '<option value="transport">교통비</option>';
    } else {
      categorySelect.innerHTML += '<option value="">유형을 먼저 선택하세요</option>';
    }
  });

  document.getElementById('transaction-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        category: formData.get('category'),
        is_income: formData.get('type') === 'income',
        content: formData.get('content'),
        amount: parseFloat(formData.get('amount'))
    };

    try {
      const response = await fetch('http://localhost:5000/api/account-book', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      // You can add further logic here, e.g., clearing the form or showing a success message
  } catch (error) {
      console.error('Error:', error);
      // Handle errors here, e.g., show an error message to the user
  }
});