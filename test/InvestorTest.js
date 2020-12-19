const {assert, expect} = require('chai');
const Investor = require('../Investor');

describe('Investor Test', function() {
  it('get name', function() {
    const investor = new Investor('Steve');
    assert.equal(investor.name, 'Steve');
  });

  it('invest test', function() {
    const investor = new Investor('Steve');
    investor.invest(50);
    assert.equal(investor.investedMoney, 50);
  })

  it('withdraw test', function() {
    const investor = new Investor('Steve');
    investor.invest(50);
    investor.withdraw(50);
    assert.equal(investor.investedMoney, 0);
  })

  it('withdraw not enough money', function() {
    const investor = new Investor('Steve');
    investor.invest('Steve', 100);

    expect(() => investor.withdraw('Steve', 200)).to.throw(Error, 'Not enough money');
  });

  it('claim test', function() {
    const investor = new Investor('Steve');
    investor.settleProfit(100);
    assert.equal(investor.claim(), 100);
  });

  it('get/set settle profit test', function() {
    const investor = new Investor('Steve');
    investor.settleProfit(100);
    investor.settleProfit(200);
    assert.equal(investor.getSettlementProfit(), 300);
  });

  it('clear expired profit test', function() {
    const investor = new Investor('Steve');

    // pass three seasons
    investor.settleProfit(100);
    investor.settleProfit(200);
    investor.settleProfit(500);
    investor.clearExpiredProfit(2);
    assert.equal(investor.getSettlementProfit(), 700);
  });
});