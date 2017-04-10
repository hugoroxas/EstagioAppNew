var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var layoutModule = require("ui/layouts/stack-layout");

var storage = require("nativescript-localstorage");

exports.limpeza = function(){

    console.log("limpinho");
    localStorage.clear();

}

exports.definicoes = function(args) {
    /*page = args.object;

    var layout = new layoutModule.StackLayout();
    var btnPresencas = new buttonModule.Button();
    var lblPresencas = new labelModule.Label();
    var lblActualizacoes = new labelModule.Label();
    var lblPresencas2 = new labelModule.Label();
    var opcaoMenu = storage.getItem("form_presenca_opcaoMenu");
    
    lblPresencas.className = "teste";
    lblPresencas.text = "Layout";
    lbl2Presencas.text = "Layout - Presenças";
    
    lblActualizacoes.text = "Atualizações";
    lblActualizacoes.className = "teste";

    btnActualizacoes.text = storage.getItem("form_definicoes_btnText");
    btnActualizacoes.className = "bbutton";
    btnPresencas.on(buttonModule.Button.tapEvent, function(){
        if (opcaoMenu != 1 && opcaoMenu != 2) {
            storage.setItem("form_presenca_opcaoMenu", 1);
        }

        if (opcaoMenu == 1) {
            opcaoMenu = 2;
            btn.text = "Layout - Horizontal";
        }
        else if (opcaoMenu == 2) {
            opcaoMenu = 1;
            btn.text = "Layout - Vertical";
        }     
        
        console.info(opcaoMenu);
        storage.setItem("form_presenca_opcaoMenu", opcaoMenu);
        storage.setItem("form_definicoes_btnText", btnPresencas.text)
    })
    
    layout.addChild(lblPresencas);
    layout.addChild(lblPresencas2);
    layout.addChild(btnPresencas);
    layout.addChild(lblPresencas1);
    
    page.content = layout;
*/
}
