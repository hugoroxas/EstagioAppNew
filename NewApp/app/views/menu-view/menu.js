var frameModule = require("ui/frame");
var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
var localStorage = require("nativescript-localstorage");
var dialogs = require("ui/dialogs");
var page;

exports.principal = function(args) {
    page = args.object;
    var topmost = frameModule.topmost();

    var stackLayout = new layoutModule.StackLayout();
    var btn1 = new btnModule.Button();
    btn1.text = "Sumários";
    btn1.on(btnModule.Button.tapEvent, function(){
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
        topmost.navigate("views/definicoes-view/definicoes");
    })

    var btn4 = new btnModule.Button();
    btn4.text = "Tarefas";
    btn4.on(btnModule.Button.tapEvent, function(){
        topmost.navigate("views/AGORA-DAS/AGORA");
    })

    var btn5 = new btnModule.Button();
    btn5.text = "Logout";
    btn5.on(btnModule.Button.tapEvent, function(){

        dialogs.confirm({
            title: "Log Out",
            message: "Tem certeza que quer fazer logout?",
            okButtonText: "OK",
            cancelButtonText: "CANCEL"

        }).then(function (result) {

            if( result == true ){

                var topmost = frameModule.topmost();
                var navigationEntry = {
                    moduleName: "views/login-view/login",
                    clearHistory: true,
                    transition: {
                        name: "slideRight",
                        duration: 380,
                        curve: "easeIn"
                    }
        };
        localStorage.setItem("loggedUser" , " ");
        topmost.navigate(navigationEntry);

            }

        });

    });

    stackLayout.addChild(btn1);
    stackLayout.addChild(btn2);
    stackLayout.addChild(btn3);
    stackLayout.addChild(btn4);
    stackLayout.addChild(btn5);

    page.content = stackLayout;
}