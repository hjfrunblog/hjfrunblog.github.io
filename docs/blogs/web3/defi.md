# DeFi 去中心化金融

## 中心化金融 vs 去中心化金融

只改变服务的方式，不改变服务的种类

- 由中心化机构提供服务
  - 银行、保险公司、证券公司、基金管理公司
- 这些中心化机构可以
  - 保管用户的资产：冻结用户的账户
  - 作为交易中介：审查交易
  - 制定准入门槛
  - 了解用户的隐私
- 在技术上，中心化机构使用不透明、孤立的数据库，其安全取决于对机构本身的信任

### 去中心化的金融

区块链技术带来的信任与低门槛

- 去中心化金融：建立在区块链、智能合约平台上的金融类产品工具
  - 区块链、智能合约等系列技术，解决了**信任**、**低门槛**两大问题，并且长期有更高的**效率**和**隐私性**，因此伪金融领域带来了服务范式上的革新
- 场景：你在美国读书的亲戚因为学费等原因，需要你给他转账 10 万美元
  - 中心化金融：给亲戚的银行账户跨境转账
    - 缓慢的流程（数天），手续费（0.1%），潜在的审查
  - 去中心化金融：给亲戚的链上地址转代币，如 `USDT` 等美元稳定币
    - 快速（至多半小时），GAS 费（常数，小于 1 美元），无需他人许可和审查

|                  |            中心化金融（CeFi）            |                    去中心化金融（DeFi）                    |
| :--------------: | :--------------------------------------: | :--------------------------------------------------------: |
| **☆ 信任与安全** |             信任基于机构本身             |                     信任基于开放的代码                     |
|  **☆ 准入门槛**  |       由机构自身或所在地区监管设立       |                             无                             |
|       隐私       |  由机构掌握用户信息；封闭、不对公众开放  | 匿名，但主流公链的金融操作所有人可见；有专门的隐私保护产品 |
|       效率       | 取决于：金融行为的监管性质、涉及实体数量 |      取决于：金融行为在代码层面的复杂度、底层公链效率      |

## DeFi 的主要成熟场景介绍

- 去中心化交易所 （DEX）
- 链上借贷
- 稳定币

### 去中心化交易所

- 中心化的交易所 （CEX）
  - 托管用户资产
  - 不透明
- 去中心化交易所：链上的智能合约，不托管用户资产 + 透明

#### 交易所机制：订单簿

#### 去中心化交易所：AMM 机制（Auto Market Maker）

- 在交易所存在一个“流动性池”，池子里有苹果币、以太币各一定数量
- 任意用户可以根据乘积恒定（xy=k）的简单原则，去池子里做苹果币和以太币的互相兑换
- 任意用户可以通过向池子等比例添加代币，成为“流动性提供者”（LP），获得手续费收入

#### 去中心化交易所的代表项目：Uniswap

- Uniswap V2： “DeFi 的起点”，机制简单且被众多后来的 DeFi 项目所借鉴，值得深入研究学习。
  - 案例：手续费 0.3%，其中 0.25%给流动性提供者，0.05 给 Uniswap 项目金库

### 去中心化借贷

- 链上借钱，无需许可和信任，但需要超额抵押
  - 从根基上并不相信你会还钱
  - 案例：借出价值 100ETH 的 USDT，需要抵押 150ETH；如果不还钱，150ETH 会被协议没收
- 为什么用户会超额抵押？
  - 提高杠杆率
  - 币本位主义者

#### 去中心化借贷的代表项目：`AVVE`

### 稳定币

- 稳定币：价格锚定 1 美元的加密货币
- 稳定币分 3 类：
  - 中心化机构用法币 1:1 抵押发行的锚定性稳定币，以 `USDT、USDC` 为代表；
  - 去中心化发行、用 `ETH` 等主流加密资产作超额抵押的稳定币，以 `DAI` 为代表；
  - 去中心化发行、也没有用主流加密资产作超额抵押的稳定币，以 `UST、FRAX` 为代表；
    - 他们往往有着比较精巧的机制和算法设计，因此也被称为算法稳定币（`Algorithmic Stablecoin`）

#### 为什么需要稳定币

- 抵押稳定币 USDT、USDC、DAI 等：加密货币以法币计价的价格波动过于剧烈，用户希望能在链上有一个价值稳定的载体
- 算法稳定币 UST、FRAX 等：用户持有往往是因为其较高的“投资收益率”
  - 因此，算法稳定币实际上并不稳定，很容易称为庞氏游戏的载体
  - 案例：2022 年 5 月的 LUNA / UST 几天时间由 100 多亿市值归零

### 其他 DeFi 场景

- 衍生品：期权、合约
- 保险
- 预言急（获取链下信息）
- NFTfi
