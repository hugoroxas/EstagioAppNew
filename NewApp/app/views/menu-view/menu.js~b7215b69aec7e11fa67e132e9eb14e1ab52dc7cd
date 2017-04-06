var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
var frameModule = require("ui/frame");
<<<<<<< HEAD:NewApp/app/views/menu.js

var topmost = frameModule.topmost();
=======
>>>>>>> refs/remotes/origin/LuisFuckingCode:NewApp/app/views/menu-view/menu.js

var page;

exports.principal = function(args) {
    page = args.object;

    var stackLayout = new layoutModule.StackLayout();
    var topmost = frameModule.topmost();
    
    var btn1 = new btnModule.Button();
    btn1.text = "Sumários";
    btn1.on(btnModule.Button.tapEvent, function(){
        var topmost = frameModule.topmost();
        topmost.navigate("views/sumarios/sumarios");
    })

    var btn2 = new btnModule.Button();
    btn2.text = "Presenças";
    btn2.on(btnModule.Button.tapEvent, function(){
        topmost.navigate("views/presencas-view/presencas");
    })

    var btn3 = new btnModule.Button();
    btn3.text = "Definições";
    btn3.on(btnModule.Button.tapEvent, function(){
        alert("BUTTON 3");
    })

    var btn4 = new btnModule.Button();
    btn4.text = "Tarefas";
    btn4.on(btnModule.Button.tapEvent, function(){
        alert("BUTTON 4");
    })

    var btn5 = new btnModule.Button();
    btn5.text = "Logout";
    btn5.on(btnModule.Button.tapEvent, function(){
        alert("BUTTON 5");
        
    })

    stackLayout.addChild(btn1);
    stackLayout.addChild(btn2);
    stackLayout.addChild(btn3);
    stackLayout.addChild(btn4);
    stackLayout.addChild(btn5);
    page.content = stackLayout;

<<<<<<< HEAD:NewApp/app/views/menu-view/menu.js
<<<<<<< HEAD:NewApp/app/views/menu.js
=======
    // ORA MUITO BOA TARDE
    // ESTOU AQUI A PERDER O MEU TEMPO 
    // A FAZER ESTES COMENTÁRIOS
    // MAS NÃO FAZ MAL PORQUE
    // NÃO TENHO MAIS NADA PARA FAZER

    // RECKT OKEH

>>>>>>> origin/master:NewApp/platforms/android/src/main/assets/app/views/menu.js
    // https://luisfranciscocode.000webhostapp.com/webservice.php?format=json
=======
}

readJson = function() {
    fetch("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json").then(response => { 
        return response.json();
     })
     .then(function (r) {
        console.info("json chegou");    
        var dataJson = r;
        var numDataJson = Object.keys(dataJson).length;

        console.info("Numer JSON: " + numDataJson);
        console.info(JSON.stringify(dataJson[0].Fields.text)); 
        console.info("---------------------------");

	}); 
>>>>>>> refs/remotes/origin/LuisFuckingCode:NewApp/app/views/menu-view/menu.js
}