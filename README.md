# Telephone Attack

Smart Contract Security Practice | Lv4 Telephone Attack

```
!!! DON'T TRY ON MAINNET !!!
```

## Summary
Look carefully at the contract's code below. You find a security risk on the contract and expose it.

#### You will beat this level if
- you claim ownership of the contract

#### What you will learn
- Difference between `msg.sender` and `tx.origin`

## Smart Contract Code
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}
```

## Security pitfall in the contract
#### `msg.sender` vs `tx.origin`
To win this level, you need to know what is `tx.origin` and what differences it has compared to `msg.sender`.
`msg.sender` is always the address where the current (external) function call came from.
`tx.origin` is a global variable in Solidity which returns the address of the account that sent the transaction.

On the other hand, [Solidity Official Docs](https://docs.soliditylang.org/en/develop/units-and-global-variables.html#block-and-transaction-properties) described like this.
`msg.sender` is sender of the message (current call)
`tx.origin` is the sender of the transaction (full call chain)

So the difference between the `msg.sender` can be described like this.
