var frameModule = require("ui/frame");
var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
var glayout = require("ui/layouts/grid-layout");
var localStorage = require("nativescript-localstorage");
var dialogs = require("ui/dialogs");
var page;

var opcaoMenu;

exports.principal = function(args) {
    page = args.object;
    var topmost = frameModule.topmost();

    if( localStorage.getItem("refreshMenu") == true ){
        localStorage.setItem("refreshMenu", false );
        
        var topmost = frameModule.topmost();
        var navigationEntry = {
            moduleName: "views/menu-view/menu",
            clearHistory: true,
        };
        console.log(localStorage.getItem("loggedUser"));
        topmost.navigate(navigationEntry);
    } 
    else {
        if (localStorage.getItem("form_menu_layout") == "" || localStorage.getItem("form_menu_layout") == null) {
           console.info("null");
            opcaoMenu = 1;
        }
        else {
            opcaoMenu = localStorage.getItem("form_menu_layout");
            console.info(opcaoMenu);
        }

        if (opcaoMenu == 1) {
            var stackLayout = new layoutModule.StackLayout();
        }
        else if (opcaoMenu == 2) {
            var gridlayout = new glayout.GridLayout();
        }
        
        btn = new Array();
        const textButton = new Array();
        const caminhoButton = new Array();

        var x = 0;
        var y = 0;

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

            if (opcaoMenu == 1) {
                stackLayout.addChild(btn[cont]);
            }
            else if (opcaoMenu == 2) {
                if (x <= 2) {
                         glayout.GridLayout.setColumn(btn[cont], x);
                     }
                     else {
                         glayout.GridLayout.setRow(btn[cont], 1);
                         glayout.GridLayout.setColumn(btn[cont], y);
                         y += 1;    
                    }
                    x += 1;

                    gridlayout.addChild(btn[cont]);
                    var column = new glayout.ItemSpec(1, glayout.GridUnitType.auto);
                    var row = new glayout.ItemSpec(1, glayout.GridUnitType.auto);
                    gridlayout.addColumn(column);
                    gridlayout.addRow(row);
            }
        }  

        if (opcaoMenu == 1) {
            page.content = stackLayout;
        }
        else if (opcaoMenu == 2) {
            page.content = gridlayout;
        }
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