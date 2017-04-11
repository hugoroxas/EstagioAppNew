var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var layoutModule = require("ui/layouts/stack-layout");
var dialogs = require("ui/dialogs");
var localStorage = require("nativescript-localstorage");
var toast = require("nativescript-toast");

exports.limpeza = function(){

    dialogs.confirm({
            title: "Clean LocalStorage",
            message: "Tem certeza que quer apagar os dados da localstorage?",
            okButtonText: "OK",
            cancelButtonText: "CANCEL"

        }).then(function (result) {
            
            if( result == true ){

                localStorage.clear();
                localStorage.setItem("refreshIt" , true );
                toast.makeText("Dados da localstorage foram limpos").show();

            }

        });

}

exports.changeLayout = function(){

    var opcaoMenu = localStorage.getItem("form_presenca_opcaoMenu");
    var texto = "";

    if (opcaoMenu != 1 && opcaoMenu != 2) {
        
        localStorage.setItem("form_presenca_opcaoMenu", 1);

    }

    if (opcaoMenu == 1) {

       opcaoMenu = 2;
       texto = "Layout - Horizontal";

    } else if (opcaoMenu == 2) {
        
        opcaoMenu = 1;
        texto = "Layout - Vertical";
    
    }     
        
    console.info(opcaoMenu);
    localStorage.setItem("form_presenca_opcaoMenu", opcaoMenu);
    localStorage.setItem("form_definicoes_btnText", texto)

}

exports.changeAppTextSize = function(){

    // FAZ ISTO !!!!

}

exports.definicoes = function(args) {
    
}
