pragma solidity 0.8.13;

contract B {

    uint256 public value;

    function append() external {

        value += 1;
        emit Log(msg.sender, value);

    }

    event Log(address _sender, uint256 _value);

}