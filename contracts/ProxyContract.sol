pragma solidity 0.8.13;

import "./ImplementationContract.sol";

contract A {

    uint256 public value;
    B b;
    

    constructor (address _b) {
        b = B(_b);
    }

    function outputB() external view returns (uint256) {

            return b.value();

    }

    function appendAgain() external {

        b.append();    
        emit Log(msg.sender, b.value());

    }

    function delegateCallToContractB () external {

        (bool success, bytes memory data) = address(b).delegatecall(abi.encodeWithSignature("append()"));

        require(success, "delegate call failed");
        

    }

    event Log(address indexed _sender, uint256 _value);

    

}