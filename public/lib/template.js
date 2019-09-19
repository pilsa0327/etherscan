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
            <h1> Etherscan </h1>
            ${body}
            <table class="table">     
            <thead>
                <tr>
                    <th scope="col">Latest Blocks</th> 
                </tr>
            </thead>
            <tbody>
                ${list}
            </tbody>
            </table>  
            

        </body>
        </html>
    `},
    blockPage : function(num,Block_Height,Timestamp,Transactions,Mined_by,Block_Reward,Uncles_Reward,
        Difficulty,Total_Difficulty,Size,Gas_Used,Gas_Limit,Extra_Data){
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
            <h1> Etherscan </h1>
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
                    <td>${Size}</td>
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
                    <td>${Extra_Data}</td>
                </tr>
                <tr>
                    <td><a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"> onclick="myFunction()" id="myBtn">
                    Click to see more
                  </a></td>
                </tr>
            </table>
            <script>
                function myFunction() {
                    var dots = document.getElementById("dots");
                    var moreText = document.getElementById("more");
                    var btnText = document.getElementById("myBtn");

                    if (dots.style.display === "none") {
                        dots.style.display = "inline";
                        btnText.innerHTML = "Click to see more"; 
                        moreText.style.display = "none";
                    } else {
                        dots.style.display = "none";
                        btnText.innerHTML = "Click to see more\ less"; 
                        moreText.style.display = "inline";
                    }
                }
            </script>
        </body>
        
        </html>
    `
    
    }
}