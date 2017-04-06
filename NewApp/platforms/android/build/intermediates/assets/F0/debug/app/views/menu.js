var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
<<<<<<< HEAD
var frameModule = require("ui/frame");

var topmost = frameModule.topmost();
 
>>>>>>> refs/remotes/origin/Branch-do-Azeite

var page;

exports.principal = function(args) {
    page = args.object;
    //console.dump(page);
    var stackLayout = new layoutModule.StackLayout();
    var btn1 = new btnModule.Button();
    btn1.text = "Sumários";
    btn1.on(btnModule.Button.tapEvent, function(){
<<<<<<< HEAD
        var topmost = frameModule.topmost();
        topmost.navigate("views/sumarios/sumarios");
 
        alert("BUTTON 1");
>>>>>>> refs/remotes/origin/Branch-do-Azeite
    })

    var btn2 = new btnModule.Button();
    btn2.text = "Presenças";
    btn2.on(btnModule.Button.tapEvent, function(){
        alert("BUTTON 2");
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

<<<<<<< HEAD
 
    // ORA MUITO BOA TARDE
    // ESTOU AQUI A PERDER O MEU TEMPO 
    // A FAZER ESTES COMENTÁRIOS
    // MAS NÃO FAZ MAL PORQUE
    // NÃO TENHO MAIS NADA PARA FAZER

    // RECKT OKEH

    // https://luisfranciscocode.000webhostapp.com/webservice.php?format=json
>>>>>>> refs/remotes/origin/Branch-do-Azeite
}