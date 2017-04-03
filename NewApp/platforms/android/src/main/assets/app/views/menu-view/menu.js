var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
var frameModule = require("ui/frame");

var page;

exports.principal = function(args) {
    page = args.object;

    var stackLayout = new layoutModule.StackLayout();
    var topmost = frameModule.topmost();
    
    var btn1 = new btnModule.Button();
    btn1.text = "Sumários";
    btn1.on(btnModule.Button.tapEvent, function(){
        alert("BUTTON 1");
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
}