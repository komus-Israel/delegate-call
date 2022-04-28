require("chai")
    .use(require("chai-as-promised"))
    .should()



const CONTRACT_A = artifacts.require("./A")
const CONTRACT_B = artifacts.require("./B")

contract ("Delegate Call Test", ()=>{

    let contractA
    let contractB 

    beforeEach(async()=>{

        
        contractB = await CONTRACT_B.new()
        contractA = await CONTRACT_A.new(contractB.address)

    })

    describe("normal call", ()=>{



            it("outputs the value", async()=>{

                let value
                
                value = await contractA.outputB()

                console.log(value.toString())

                const append = await contractA.appendAgain()

                value = await contractA.outputB()

                console.log(value.toString())

                console.log(append.logs[0].args._sender)

            })

    })

})