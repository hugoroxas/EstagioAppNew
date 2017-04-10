var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var layoutModule = require("ui/layouts/stack-layout");
var dialogs = require("ui/dialogs");
var storage = require("nativescript-localstorage");

exports.limpeza = function(){

    dialogs.confirm({
            title: "Log Out",
            message: "Tem certeza que quer apagar os dados da localstorage?",
            okButtonText: "OK",
            cancelButtonText: "CANCEL"

        }).then(function (result) {
            
            if( result == true ){

                console.log("limpinho");
                localStorage.clear();

            }

        });

}

exports.changeLayout = function(){

    var opcaoMenu = storage.getItem("form_presenca_opcaoMenu");
    var texto = "";

    if (opcaoMenu != 1 && opcaoMenu != 2) {
        
        storage.setItem("form_presenca_opcaoMenu", 1);

    }

    if (opcaoMenu == 1) {

       opcaoMenu = 2;
       texto = "Layout - Horizontal";

    } else if (opcaoMenu == 2) {
        
        opcaoMenu = 1;
        texto = "Layout - Vertical";
    
    }     
        
    console.info(opcaoMenu);
    storage.setItem("form_presenca_opcaoMenu", opcaoMenu);
    storage.setItem("form_definicoes_btnText", texto)

}

exports.definicoes = function(args) {
    
}
