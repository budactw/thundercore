class Investor {
  /**
   * @type {string}
   */
  name = '';

  /**
   * @type {number}
   */
  investedMoney = 0;

  /**
   * @type {array}
   */
  settlementProfit = [];

  /**
   * @param investorName
   */
  constructor(investorName) {
    this.name = investorName;
  }

  /**
   * @param money
   */
  invest(money) {
    this.investedMoney += money;
    console.log(`${this.name} invest: ${money}`);
  }

  /**
   * @param money
   */
  withdraw(money) {
    if (this.investedMoney < money) {
      throw new Error('Not enough money');
    }

    this.investedMoney -= money;

    console.log(`${this.name} withdraw: ${money}`);
  }

  /**
   * @returns {number}
   */
  claim() {
    const total = this.settlementProfit.length > 0 ? this.settlementProfit.reduce((a, b) => a + b) : 0;
    this.settlementProfit.length = 0;
    console.log(`${this.name} claim : ${total}`);

    return total;
  }

  /**
   * @param money
   */
  settleProfit(money) {
    this.settlementProfit.push(money);
  }

  /**
   * @param maxClaimableSeason
   */
  clearExpiredProfit(maxClaimableSeason) {
    if (this.settlementProfit.length > maxClaimableSeason) {
      this.settlementProfit.shift();
    }
  }

  /**
   * @returns {number}
   */
  getSettlementProfit() {
    return this.settlementProfit.reduce((a, b) => a + b);
  }
}

module.exports = Investor;