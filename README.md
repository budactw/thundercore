## 建構程式過程
1. 思考可能情況，寫下案例
    ```
    MaxClaimableSeason = 1
    
    Initial
    //// Season = 1
    Steve + 100
    Profit + 50
    Dave + 100
    Profit + 150
    Dave Claim = 0
    
    // 結算動作,利潤分配,移除過期利潤
    // Dave Past Invest: 100, Steve Past Invest: 100, Settlement: D100+S100 , Unsettlement: 0
    
    //// Season = 2
    Steve + 100
    Dave + 50
    Profit + 200
    // Dave Invest: 100, Steve Invest: 100, Settlement: D100+S100, Unsettlement: 200
    
    Steve Claim = 100 // SteveInvest/(SteveInvest+DaveInvest)*Settlement
    // Dave Invest: 150, Steve Invest: 200, Settlement: D100, Unsettlement: 200
    
    Dave - 100
    // Dave Invest: 50, Steve Invest: 100, Settlement: D100, Unsettlement: 200
    
    // 結算動作,利潤分配,移除過期利潤
    // Dave Invest: 50, Steve Invest: 200, Settlement: D40+S160, Unsettlement: 0
    
    //// Season = 3
    Dave Claim = 40
    Steve - 200
    Profit + 20
    Javis + 50
    // Dave Past Invest: 50, Steve Past Invest: 0, Javis Invest: 50 Settlement: S160, Unsettlement: 20 
    
    // 結算動作,利潤分配,移除過期利潤
    // Dave Past Invest: 50, Steve Past Invest: 0, Javis Past Invest: 50, Settlement: D10+J10, Unsettlement: 0
    ```
2. 列出主要的邏輯
    1. MaxClaimableSeason可以是任意數字，故需要紀錄每一季的利潤，選用陣列紀錄，長度超過MaxClaimableSeason時，剔除陣列最後一個數字
    2. 當季利潤不包含在已結算利潤上，故需要有兩種利潤變數 `SettlementProfit` `UnsettlmentProfit`
    3. 每個投資人將在換季結算時進行利潤結算

3. 規劃大概有哪些method和class及method要做的事情
    - Class InvestmentProject
      - global variable `investors[]`  `currentSeason` `MaxClaimableSeason`  `unsettlmentProfit`  `totalInvest`
      - method `getCurrentSeason()`
      - method `invest (investorName, money)`
        - chec if exist Investor or new investor
        - invsestor.invest(money)
        - add totalInvest
      - method `withdraw(investorName, money)`
        - check exist investor
        - check enough
      - method `addProfit(money)`
      - method `claim(investorName)`
        - find investor
        - calc total settlmentProfit and clear settlmentProfit
      - method `nextSeason()`
        - if Season = 4 , set Season = 1
        - call `settleProfit()`
      - method `settleProfit()`
        - `total` = `investor.getTotalInvest()`)/ `totalInvest`*`unsettlementProfit`
        - call `investor.settleProfit(total)`
        - set `unsettlementProfit` =0
    - Class Investor
      - global variable `investorName` `currentInvest` `pastInvest` `SettlmentProfit[]` 
      - method `invest(money)`
        - currentInvest = currentInvest + money
      - method `withdraw(money)`
        - first sub currentInvest then sub pastInvest
      - method `getTotalInvest()`
        - `currentInvest` +  `pastInvest`
      - method `clearExpiredProfit(MaxClaimableSeason)`
        - `SettlmentProfit.length` > `MaxClaimableSeason`  clear first profit
      - method `settleProfit(settlemoentProfit)`
        - set `pastInvest` += `currentInvest`  
        - set `currentInvest`  = 0
      - method `claim()`
        - sum settlmentProfit
        - clear settlmentProfit
5. 初步程式撰寫
6. 撰寫測試碼
    1. 寫的過程中發現不需要分`pastInvest`、`currentInvest`，故重構程式，合併成`investedMoney`並且把`getTotalInvest()`移除
    2. 重新命名若干變數名稱

## Run test
```
npm install
npm run test
// 覆蓋率
npm run coverage
```