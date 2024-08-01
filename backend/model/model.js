// DTO 역할을 하는 객체 모델

class AccountBook {
    constructor(id, createdDttm, category, isIncome, content, amount) {
      this.id = id;                     // INT, Primary Key
      this.createdDttm = createdDttm;   // TIMESTAMP
      this.category = category;         // VARCHAR(50)
      this.isIncome = isIncome;         // BOOLEAN
      this.content = content;           // VARCHAR(100)
      this.amount = amount;             // BIGINT
    }
  
    // Getter
    getId() {
      return this.id;
    }
  
    getCreatedDttm() {
      return this.createdDttm;
    }
  
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
    setId(id) {
      this.id = id;
    }
  
    setCreatedDttm(createdDttm) {
      this.createdDttm = createdDttm;
    }
  
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
  
  
  module.exports = AccountBook;