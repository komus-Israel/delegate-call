require("chai")
    .use(require("chai-as-promised"))
    .should()



const CONTRACT_A = artifacts.require("./A")
const CONTRACT_B = artifacts.require("./B")

contract ("Delegate Call Test", ([account1, account2])=>{

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

})