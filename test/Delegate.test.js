const { contains } = require("min-document")

require("chai")
    .use(require("chai-as-promised"))
    .should()



const CONTRACT_A = artifacts.require("./A")
const CONTRACT_B = artifacts.require("./B")

contract ("Delegate Call Test", ([account1])=>{

    let contractA
    let contractB 

    beforeEach(async()=>{

        
        contractB = await CONTRACT_B.new()
        contractA = await CONTRACT_A.new(contractB.address)

    })

    describe("normal call", ()=>{

        let append

        beforeEach(async()=>{
            append = await contractA.appendAgain({from: account1})
           
        })




            it("should emit contract A as the caller to contract B after the `append` transaction ", async()=>{

                const event = await contractB.getPastEvents("Log", {filter: {_sender: contractA.address}, from: "latest"})

                event[0].args._sender.should.be.equal(contractA.address, "contract A is the caller to B")

                
            })

            it("should return account1 as the caller to contract A", async()=>{

                append.logs[1].args._sender.should.be.equal(account1, "it returns account1 as the caller to contract A")
            
            })

    })

    describe("delegate call", ()=>{

        let delegate

        beforeEach(async()=>{

            delegate = await contractA.delegateCallToContractB({from: account1})

        })

        it("should return account1 as the caller to contract B and contract A", async()=>{
            
            delegate.logs[0].args._sender.should.be.equal(account1, "the caller to contract B is account 1")
           

        })

        it("should not save the value to contract B storage", async()=>{

           
            const contractBValue = await contractB.value()
            
            Number(contractBValue).should.be.equal(0, "the value was not saved in contract b storage")

        })

        it("should save the value to contract A storage", async()=>{

            const contractAValue = await contractA.value()
            
            Number(contractAValue).should.be.equal(1, "contract A storage was used to save the data after the delegate call")

            Number(delegate.logs[0].args._value).should.be.equal(1, "contract B storage was not used to store the value")

        })

    })

})