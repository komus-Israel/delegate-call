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




            it("the sender of the transaction to contract B is contract A", async()=>{

                const event = await contractB.getPastEvents("Log", {filter: {_sender: contractA.address}, from: "latest"})

                events[0].args._sender.should.be.equal(contractA.address, "contract A is the caller to B")


                /*console.log(append)

                console.log(account1)

                console.log(contractA.address)

                console.log(contractB.address)

                append.receipt.from.should.be.equal(contractA.address, "the caller to the append function in contract B is contract A")*/
                

                
            })

    })

})