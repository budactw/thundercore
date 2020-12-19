const {assert, expect} = require('chai');
const InvestmentProject = require('../InvestmentProject');

describe('InvestmentProjectTest', function() {
  describe('Basic Test', function() {
    it('get current season', function() {
      const ip = new InvestmentProject(1, 1);
      assert.equal(ip.getCurrentSeason(), 1);
      assert.equal(ip.currentSeason, 1);

      ip.nextSeason();

      assert.equal(ip.getCurrentSeason(), 2);
      assert.equal(ip.currentSeason, 2);
    });

    it('get MaxClaimableSeason', function() {
      const ip = new InvestmentProject(2, 1);
      assert.equal(ip.MaxClaimableSeason, 2);
    });

    it('reset season after season4', function() {
      const ip = new InvestmentProject(1, 1);

      ip.nextSeason();
      ip.nextSeason();
      ip.nextSeason();
      assert.equal(ip.getCurrentSeason(), 4);
      ip.nextSeason();
      assert.equal(ip.getCurrentSeason(), 1);
    });

    it('initial max claimable season', function() {
      const ip = new InvestmentProject(2, 1);
      assert.equal(ip.MaxClaimableSeason, 2);
    });

    it('no such investor', function() {
      const ip = new InvestmentProject(1, 1);

      expect(() => ip.getInvestor('Steve')).to.throw(Error, 'No such Investor Steve');
    });

  });

  describe('Complex Action Test', function() {
    it('invest test', function() {
      const ip = new InvestmentProject(1, 1);
      ip.invest('Dave', 100);
      const investor = ip.getInvestor('Dave');
      assert.equal(investor.investedMoney, 100);
      assert.equal(ip.totalInvest, 100);
    });

    it('zero invest', function() {
      const ip = new InvestmentProject(1, 1);
      ip.invest('Dave', 100);
      ip.withdraw('Dave', 100);
      ip.addProfit(100);
      ip.nextSeason();
      assert.equal(ip.getInvestor('Dave').getSettlementProfit(), 0)
    });

    it('claim test', function() {
      const ip = new InvestmentProject(1, 1);
      ip.invest('Steve', 100);
      ip.addProfit(50);
      ip.invest('Dave', 100);
      ip.addProfit(150);
      assert.equal(ip.claim('Dave'), 0);
      ip.nextSeason();
      assert.equal(ip.claim('Steve'), 100);
      assert.equal(ip.claim('Dave'), 100);
    });

    it('claim with expired', function() {
      const ip = new InvestmentProject(1, 1);
      ip.invest('Steve', 400);
      ip.invest('Dave', 100);
      ip.addProfit(50);
      ip.nextSeason();
      ip.nextSeason();
      assert.equal(ip.claim('Steve'), 0);
      assert.equal(ip.claim('Dave'), 0);
    });

    it('accumulate profit test', function() {
      const ip = new InvestmentProject(2, 1);
      ip.invest('Steve', 400);
      ip.invest('Dave', 100);
      ip.addProfit(50);
      ip.addProfit(50);
      ip.nextSeason();
      ip.addProfit(50);
      ip.nextSeason();
      assert.equal(ip.claim('Steve'), 120);
      assert.equal(ip.claim('Dave'), 30);
    });

    it('one maxClaimableSeason expired claim test', function() {
      const ip = new InvestmentProject(1, 1);
      ip.invest('Steve', 100);
      ip.addProfit(100);
      ip.nextSeason();
      assert.equal(ip.getInvestor('Steve').getSettlementProfit(), 100);
      ip.nextSeason();
      assert.equal(ip.getInvestor('Steve').getSettlementProfit(), 0);
    });

    it('two maxClaimableSeason expired claim test', function() {
      const ip = new InvestmentProject(2, 1);
      ip.invest('Steve', 100);
      ip.addProfit(100);
      ip.nextSeason();
      assert.equal(ip.getInvestor('Steve').getSettlementProfit(), 100);
      ip.nextSeason();
      assert.equal(ip.getInvestor('Steve').getSettlementProfit(), 100);
      ip.nextSeason();
      assert.equal(ip.getInvestor('Steve').getSettlementProfit(), 0);
    });

    it('withdraw test', function() {
      const ip = new InvestmentProject(1, 1);
      ip.invest('Steve', 100);
      ip.withdraw('Steve', 100);
      assert.equal(ip.getInvestor('Steve').investedMoney, 0);
    });

    it('withdraw not enough money', function() {
      const ip = new InvestmentProject(1, 1);
      ip.invest('Steve', 100);

      expect(() => ip.withdraw('Steve', 200)).to.throw(Error, 'Not enough money');
    });
  });
});