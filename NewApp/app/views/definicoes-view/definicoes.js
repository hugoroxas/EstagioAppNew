var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var layoutModule = require("ui/layouts/stack-layout");

var storage = require("nativescript-localstorage");

exports.definicoes = function(args) {
    page = args.object;

    var layout = new layoutModule.StackLayout();
    var btn = new buttonModule.Button();
    var lbl = new labelModule.Label();
    var lbl1 = new labelModule.Label();
    var lbl2 = new labelModule.Label();
    var opcaoMenu = storage.getItem("form_presenca_opcaoMenu");
    
    lbl.className = "teste";
    lbl.text = "Layout";
    lbl2.text = "Layout - Presenças";
    
    lbl1.text = "Atualizações";
    lbl1.className = "teste";

    btn.text = storage.getItem("form_definicoes_btnText");
    btn.on(buttonModule.Button.tapEvent, function(){
        if (opcaoMenu == null) {
            storage.setItem("form_presenca_opcaoMenu", 2);
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
        storage.setItem("form_definicoes_btnText", btn.text)
    })
    
    layout.addChild(lbl);
    layout.addChild(lbl2);
    layout.addChild(btn);
    layout.addChild(lbl1);
    
    page.content = layout;
}
