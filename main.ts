#! /usr/bin/env node

import inquirer from "inquirer"

let myBalance: number = 20000 ; //dollar
let myPin: number = 5678 ;

let pinAnswer = await inquirer.prompt(
    [
        {
            name: "pin",
            message: "enter your pin" ,
            type: "number"
        }
    ]
);

if(pinAnswer.pin === myPin) {
    console.log("Correct pin code!");

    let operationAnswer = await inquirer.prompt(
        [
            {
                name: "operations" ,
                message:" please select operations",
                type: "list",
                choices:["withdraw" , "checkBalance"] 
            }
        ]
    );

    if(operationAnswer.operations === "withdraw") { 
        let withdrawAnswer = await inquirer.prompt(
            [
                {
                    name:"withdrawMethod",
                    message: "select a withdraw method" , 
                    type: "list",
                    choices: ["fastCash" , "enterAmount"]
                }
            
            ]

        );
        if(withdrawAnswer.withdrawMethod === "fastCash" ) {
            let fastCashAnswer = await inquirer.prompt(
                [
                    {
                        name: "fastCash",
                        type: "list" ,
                        message: "select amount",
                        choices: [2000, 5000, 8000, 15000, 18000, 20000, 25000]
                    }
                ]
            );
            if(fastCashAnswer.fastCash > myBalance) {
                console.log("insufficiant balance");
            }
            else{
                myBalance -= fastCashAnswer.fastCash;
                console.log(`${fastCashAnswer.fastCash} withdraw succesfully`);
                console.log("your remaining balance is:" + myBalance);
            }
        }
        else if(withdrawAnswer.withdrawMethod === "enterAmount") {
        let amountAnswer = await inquirer.prompt(
            [
                {
                    name: "amount" ,
                    message: "enter your amount to withdraw",
                    type: "number"
                }
            ]
        );
        if(amountAnswer.amount >myBalance) {
            console.log("insuficcient balance");
        }
        else{
        myBalance -= amountAnswer.amount ;
        console.log(`${amountAnswer.amount} withdraw succesfully`);
        console.log("your remaining balance is: " + myBalance)
        }
    }

    }
    else if(operationAnswer.operations === "checkBalance") {
        console.log("your balance is:" + myBalance)
    }
}
else{
    console.log("Incorrect pin number");
}