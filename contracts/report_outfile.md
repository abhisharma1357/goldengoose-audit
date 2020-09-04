## Sūrya's Description Report

### Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| GoldenGoose.sol | 953c09689163512a6effaf061cbfd668bc581da9 |


### Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **IERC20** | Interface |  |||
| └ | transfer | External ❗️ | 🛑  |NO❗️ |
| └ | approve | External ❗️ | 🛑  |NO❗️ |
| └ | transferFrom | External ❗️ | 🛑  |NO❗️ |
| └ | totalSupply | External ❗️ |   |NO❗️ |
| └ | balanceOf | External ❗️ |   |NO❗️ |
| └ | allowance | External ❗️ |   |NO❗️ |
||||||
| **SafeMath** | Library |  |||
| └ | sub | Internal 🔒 |   | |
| └ | add | Internal 🔒 |   | |
||||||
| **GoldenGoose** | Implementation | IERC20 |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
| └ | getowner | Public ❗️ |   |NO❗️ |
| └ | isOwner | Internal 🔒 |   | |
| └ | transferOwnership | Public ❗️ | 🛑  | onlyOwner |
| └ | setAllTransfersLockStatus | External ❗️ | 🛑  | onlyOwner |
| └ | getAllTransfersLockStatus | Public ❗️ |   |NO❗️ |
| └ | addLockingTime | Internal 🔒 | 🛑  | |
| └ | checkLockingTimeByAddress | Public ❗️ |   |NO❗️ |
| └ | getLockingStatus | Public ❗️ |   |NO❗️ |
| └ | decreaseLockingTimeByAddress | External ❗️ | 🛑  | onlyOwner |
| └ | increaseLockingTimeByAddress | External ❗️ | 🛑  | onlyOwner |
| └ | name | Public ❗️ |   |NO❗️ |
| └ | symbol | Public ❗️ |   |NO❗️ |
| └ | decimals | Public ❗️ |   |NO❗️ |
| └ | totalSupply | Public ❗️ |   |NO❗️ |
| └ | balanceOf | Public ❗️ |   |NO❗️ |
| └ | allowance | Public ❗️ |   |NO❗️ |
| └ | transfer | Public ❗️ | 🛑  | AllTransfersLockStatus checkLocking |
| └ | transferFrom | Public ❗️ | 🛑  | AllTransfersLockStatus checkLocking |
| └ | transferByOwner | Public ❗️ | 🛑  | AllTransfersLockStatus onlyOwner |
| └ | transferLockedTokens | External ❗️ | 🛑  | onlyOwner |
| └ | airdropByOwner | Public ❗️ | 🛑  | AllTransfersLockStatus onlyOwner |
| └ | _transfer | Internal 🔒 | 🛑  | |
| └ | approve | Public ❗️ | 🛑  |NO❗️ |
| └ | _approve | Internal 🔒 | 🛑  | |
| └ | increaseAllowance | Public ❗️ | 🛑  |NO❗️ |
| └ | decreaseAllowance | Public ❗️ | 🛑  |NO❗️ |
| └ | _burn | Internal 🔒 | 🛑  | |
| └ | burn | Public ❗️ | 🛑  | onlyOwner checkLocking |


### Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
