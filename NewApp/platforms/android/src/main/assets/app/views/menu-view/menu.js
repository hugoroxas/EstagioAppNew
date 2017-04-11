var frameModule = require("ui/frame");
var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
var localStorage = require("nativescript-localstorage");
var dialogs = require("ui/dialogs");
var page;

exports.principal = function(args) {
    page = args.object;
    var topmost = frameModule.topmost();

    if( localStorage.getItem("refreshMenu") == true ){
        localStorage.setItem( "refreshMenu" , false );

        var topmost = frameModule.topmost();
        var navigationEntry = {
            moduleName: "views/menu-view/menu",
            clearHistory: true,
        };
        console.log(localStorage.getItem( "loggedUser" ));
        topmost.navigate(navigationEntry);
    } 
    else {
        var stackLayout = new layoutModule.StackLayout();
        
        btn = new Array();
        const textButton = new Array();
        const caminhoButton = new Array();

        for (i = 0; i <= 4; i++) {
            const cont = i;
            switch (i) {
            case 0:
                textButton[0] = "Sumários";
                caminhoButton[0] = "views/sumarios/sumarios";
                break;
            case 1:
                textButton[1] = "Presenças";
                caminhoButton[1] = "views/presencas-view/presencas";
                break;
            case 2:
                textButton[2] = "Definições";
                caminhoButton[2] = "views/definicoes-view/definicoes";
                break;
            case 3:
                textButton[3] = "Tarefas";
                caminhoButton[3] = "views/AGORA-DAS/AGORA";
                break;
            case 4:
                textButton[4] = "Logout";
                caminhoButton[4] = "views/login-view/login";
                break;
            }
            
            btn[cont] = new btnModule.Button();
            btn[cont].text = textButton[i];
            btn[cont].on(btnModule.Button.tapEvent, function() {
                localStorage.setItem( "refreshMenu" , true );

                if (cont < 4) {
                    topmost.navigate(caminhoButton[cont]);
                }
                else {
                    functionLogout();
                }                
            });

            stackLayout.addChild(btn[cont]);
        }  
        page.content = stackLayout; 
    }
}

functionLogout = function() {
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
}