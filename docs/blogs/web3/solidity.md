# Learn Solidity

## 基础数据类型 - 函数

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract SimpleStorage {
    // boolean, unit, int, address, bytes

    bool hasFavoriteNumber = false;

    uint256 public favNumber;
    string favNumberInText = "Five";
    address myaddress= 0xe606944aC64Af1273869602DE40c482fEd3c89df;
    bytes32 favbytes = "Cat";

    function store(uint256 _favNumber) public {
        favNumber = _favNumber;
        // favNumber = favNumber + 1;
    }

    // view, pure cannot modify data, don't need to spend gas
    function retrieve() public view returns(uint256) {
        return favNumber;
    }

}

// 0xd9145CCE52D386f254917e481eB44e9943F39138
```

## 结构体和数组

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {

    uint256 public favNumber;
    struct People {
        string name;
        uint256 favNumber;
    }

    // People public person = People({name: "Jason", favNumber: 888});
    // uint256[] public favNumberList;
    People[] public people;

    function store(uint256 _favNumber) public {
        favNumber = _favNumber;
    }

    // view, pure
    function retrieve() public view returns(uint256) {
        return favNumber;
    }

    function addPerson(string memory _name, uint256 _favNumber) public {
        // people.push(People(_name, _favNumber));
        People memory newPerson = People({name: _name, favNumber: _favNumber});
        people.push(newPerson);
    }

}
```

- calldata: 不能被修改的临时变量
- memory：临时变量，用完销毁
- storage：默认

## mapping

```solidity
mapping(string => uint256) public nameToFav;

function addPerson(string memory _name, uint256 _favNumber) public {
        // people.push(People(_name, _favNumber));
        People memory newPerson = People({name: _name, favNumber: _favNumber});
        people.push(newPerson);
        nameToFav[_name] = _favNumber;
    }
```
