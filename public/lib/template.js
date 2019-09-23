module.exports = {
    HTML: function (body, list) {
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Etherscan</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            <script src="http://code.jquery.com/jquery-latest.min.js"></script>
            <script type="text/javascript" src="/public/js/bootstrap.js"></script>
           
        </head>
        <body class= "container">
            ${body}
            <table class="table">     
            <thead>
                <tr>
                    <th scope="col">Latest Blocks</th> 
                </tr>
                <tr>
                    <th scope="col">Blocks Number</th> 
                    <th scope="col">Miner</th> 
                    <th scope="col">txns</th> 
                </tr>
            </thead>
            <tbody>
                ${list}
            </tbody>
            </table>  
            

        </body>
        </html>
    `},
    blockPage : function(num, Block_Height, Timestamp, Transactions, Mined_by, Block_Reward, Uncles_Reward,
         Difficulty, Total_Difficulty, Size, Gas_Used, Gas_Limit, Extra_Data, hash, parentHash, sha3Uncles,nonce){
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Etherscan</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            <script src="http://code.jquery.com/jquery-latest.min.js"></script>
            <script type="text/javascript" src="/public/js/bootstrap.js"></script>
        </head>
        <body class="container">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="/">
                    <img src="../public/images/ether.png" width="" height="40" alt="">
                </a>
                <form action="/block" method = "post">
                    <input type="search" placeholder="Search by Address/ Txn Hash / Block" name="address" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            <h3> block # ${num} </h3>
            <table class="table">
                <tr>
                    <th scope="row">Block Height</th>
                    <td>${Block_Height}</td>
                </tr>
                <tr>
                    <th scope="row">Timestamp:</th>
                    <td>${Timestamp}</td>
                </tr>
                <tr>
                    <th scope="row">Transactions:</th>
                    <td>${Transactions}</td>
                </tr>
                <tr>
                    <th scope="row">Mined by:</th>
                    <td>${Mined_by}</td>
                </tr>
                <tr>
                    <th scope="row">Block Reward:</th>
                    <td>${Block_Reward}</td>
                </tr>
                
                <tr>
                    <th scope="row">Uncles Reward:</th>
                    <td>${Uncles_Reward}</td>
                </tr>
             
                <tr>
                    <th scope="row">Difficulty:</th>
                    <td>${Difficulty}</td>
                </tr>
                
                <tr>
                    <th scope="row">Total Difficulty:</th>
                    <td>${Total_Difficulty}</td>
                </tr>
                <tr>
                    <th scope="row">Size:</th>
                    <td>${Size} bytes</td>
                </tr>
                <tr>
                    <th scope="row">Gas Used:</th>
                    <td>${Gas_Used}</td>
                </tr>
                <tr>
                    <th scope="row">Gas Limit:</th>
                    <td>${Gas_Limit}</td>
                </tr>
                <tr>
                    <th scope="row">Extra Data:</th>
                    <td> hex :  ${Extra_Data}</td>
                </tr>
                <tr>
                    <th scope="row">Hash:</th>
                    <td>${hash}</td>
                </tr>
                <tr>
                    <th scope="row">Parent Hash:</th>
                    <td>${parentHash}</td>
                </tr>
                <tr>
                    <th scope="row">Sha3Uncles:</th>
                    <td>${sha3Uncles}</td>
                </tr>
                <tr>
                    <th scope="row">Nonce:</th>
                    <td>${nonce}</td>
                </tr>
            </table>      
        </body>
        </html>
    `
    },
    txPage : function(Transaction_Hash, Status, Block, Timestamp, From, To, Value, Transaction_Fee, Gas_Limit, GasUsed_byTransaction,
        Gas_Price, Nonce, Input_Data){
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Etherscan</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            <script src="http://code.jquery.com/jquery-latest.min.js"></script>
            <script type="text/javascript" src="/public/js/bootstrap.js"></script>
        </head>
        <body class="container">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="/">
                    <img src="../public/images/ether.png" width="" height="40" alt="">
                </a>
                <form class="form-inline" action="/block" method = "post">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search by Address/ Txn Hash / Block" name="address" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            <h3> Transaction Details </h3>
            <table class="table">
                <tr>
                    <th scope="row">Transaction Hash:</th>
                    <td>${Transaction_Hash}</td>
                </tr>
                <tr>
                    <th scope="row">Status:</th>
                    <td>${Status}</td>
                </tr>
                <tr>
                    <th scope="row">Block:</th>
                    <td>${Block}</td>
                </tr>
                <tr>
                    <th scope="row">Timestamp:</th>
                    <td>${Timestamp}</td>
                </tr>
                <tr>
                    <th scope="row">From:</th>
                    <td>${From}</td>
                </tr>
                
                <tr>
                    <th scope="row">To:</th>
                    <td>${To}</td>
                </tr>
                <tr>
                    <th scope="row">Value:</th>
                    <td>${Value} Ether</td>
                </tr>
                <tr>
                    <th scope="row">Transaction Fee:</th>
                    <td>${Transaction_Fee}</td>
                </tr>
                <tr>
                    <th scope="row">Gas Limit:</th>
                    <td>${Gas_Limit}</td>
                </tr>
                <tr>
                    <th scope="row">Gas Used by Transaction:</th>
                    <td>${GasUsed_byTransaction}</td>
                </tr>
                <tr>
                    <th scope="row">Gas Price:</th>
                    <td>${Gas_Price} Ether</td>
                </tr>
                <tr>
                    <th scope="row">Nonce:</th>
                    <td>${Nonce}</td>
                </tr>
                <tr>
                    <th scope="row">Input Data:</th>
                    <td>${Input_Data}</td>
                </tr>
            </table>      
        </body>
        </html>
    `
    },
    addressPage : function(address, balance){
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Etherscan</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            <script src="http://code.jquery.com/jquery-latest.min.js"></script>
            <script type="text/javascript" src="/public/js/bootstrap.js"></script>
        </head>
        <body class="container">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="/">
                    <img src="../public/images/ether.png" width="" height="40" alt="">
                </a>
                <form class="form-inline" action="/block" method = "post">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search by Address/ Txn Hash / Block" name="address" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            <h5> Address ${address} </h5>
            balance: ${balance}
           
        </body>
        </html>
    `
    }

}



