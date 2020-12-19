const Investor = require('./Investor');

class InvestmentProject {
  /**
   * @type {number}
   */
  currentSeason;

  /**
   * @type {number}
   */
  MaxClaimableSeason;

  /**
   * @type {number}
   */
  totalInvest = 0;

  /**
   * @type {number}
   */
  currentSeasonProfit = 0;

  /**
   * @type {Map}
   */
  investors = new Map();

  /**
   * @param maxClaimableSeason
   * @param initSeason
   */
  constructor(maxClaimableSeason, initSeason) {
    this.currentSeason = initSeason;
    this.MaxClaimableSeason = maxClaimableSeason;

    console.log(`Suppose MaxClaimableSeason ${this.MaxClaimableSeason}`);
    console.log(`Season ${this.getCurrentSeason()}`);
  }

  /**
   * @returns {int}
   */
  getCurrentSeason() {
    return this.currentSeason;
  }

  /**
   * @param investorName
   * @param money
   */
  invest(investorName, money) {
    let investor = this.investors.get(investorName);

    if (!investor) {
      investor = new Investor(investorName);
      this.investors.set(investorName, investor);
    }

    investor.invest(money);
    this.totalInvest += money;
  }

  /**
   * @param investorName
   * @param money
   */
  withdraw(investorName, money) {
    const investor = this.getInvestor(investorName);

    investor.withdraw(money);
  }

  /**
   * @param money
   */
  addProfit(money) {
    this.currentSeasonProfit += money;
    console.log(`add profit: ${money}`);
  }

  /**
   * @param investorName
   * @returns float
   */
  claim(investorName) {
    const investor = this.getInvestor(investorName);
    return investor.claim();
  }

  /**
   * 換季結算
   * 1. 清空過期利潤
   * 2. 當季利潤分配
   */
  nextSeason() {
    if (this.currentSeason === 4) {
      this.currentSeason = 1;
    } else {
      this.currentSeason += 1;
    }

    this.investors.forEach((investor) => {
      // 可得利潤 = 投資人投資金額 / 總投資金額 * 當季利潤
      const currentSeasonGetProfit = this.totalInvest !== 0 ? investor.investedMoney / this.totalInvest *
          this.currentSeasonProfit : 0;

      investor.settleProfit(currentSeasonGetProfit);
      investor.clearExpiredProfit(this.MaxClaimableSeason);
    });

    this.currentSeasonProfit = 0;

    console.log(`Season ${this.getCurrentSeason()}`);
  }

  /**
   * @param investorName
   * @returns Investor
   */
  getInvestor(investorName) {
    const investor = this.investors.get(investorName);
    if (!investor) {
      throw new Error(`No such Investor ${investorName}`);
    }

    return investor;
  }
}

module.exports = InvestmentProject;
