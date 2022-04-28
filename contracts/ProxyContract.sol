pragma solidity 0.8.13;

import "./ImplementationContract.sol";

contract A {

    B b;

    constructor (address _b) {
        b = B(_b);
    }

    function outputB() external view returns (uint256) {

            return b.value();

    }

    function appendAgain() external {

        b.append();
        

    }

    

}