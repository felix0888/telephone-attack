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

1) Address type
- `msg.sender` EOA(wallet), smart contract address
- `tx.origin` only EOA. It can't be smart contract address.
2) Scope
- `msg.sender` is changed on each transaction/call(function from other smart contract)
- `tx.origin` remains the same until the transaction is completed.

On the above link you may find...

> ! Note : The values of all members of msg, including msg.sender and msg.value can change for every external function call. This includes calls to library functions.

> ! Note : When contracts are evaluated off-chain rather than in context of a transaction included in a block, you should not assume that block.* and tx.* refer to values from any specific block or transaction. These values are provided by the EVM implementation that executes the contract and can be arbitrary.

[SWC-115](https://swcregistry.io/docs/SWC-115)
> ! WARNING: Besides the issue with authorization, there is a chance that `tx.origin` will be removed from the Ethereum protocol in the future, so code that uses `tx.origin` won't be compatible with future releases [Vitalik: Do NOT assume that tx.origin will continue to be usable or meaningful.](https://ethereum.stackexchange.com/questions/196/how-do-i-make-my-dapp-serenity-proof/200#200)

#### So what we can get from the above practice is...
> By checking tx.origin, it gets the original address that kicked off the transaction, which is still the owner address. The attack wallet instantly drains all your funds. Smart contracts that provide authentication using the tx.origin variable are usually vulnerable to phishing attacks which may trick users into performing authenticated actions on the vulnerable contract. 
