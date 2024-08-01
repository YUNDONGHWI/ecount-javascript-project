// DTO 역할을 하는 객체 모델

class AccountRequest {
    constructor(category, isIncome, content, amount) {
      this.category = category;         // VARCHAR(50)
      this.isIncome = isIncome;         // BOOLEAN
      this.content = content;           // VARCHAR(100)
      this.amount = amount;             // BIGINT
    }
  
    // Getter
    getCategory() {
      return this.category;
    }
  
    getIsIncome() {
      return this.isIncome;
    }
  
    getContent() {
      return this.content;
    }
  
    getAmount() {
      return this.amount;
    }
  
    // Setter
    setCategory(category) {
      this.category = category;
    }
  
    setIsIncome(isIncome) {
      this.isIncome = isIncome;
    }
  
    setContent(content) {
      this.content = content;
    }
  
    setAmount(amount) {
      this.amount = amount;
    }
  }
  
  
  module.exports = AccountRequest;