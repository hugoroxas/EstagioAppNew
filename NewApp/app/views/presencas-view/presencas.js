var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var storage = require("nativescript-localstorage");

var urlJson = "https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_presencas";
var verifica;

exports.presenca = function(args) {
    page = args.object;

    // localStorage.setItem("verify", 1);
  
    verifica = localStorage.getItem("verify");
    console.info(localStorage.getItem("verify"));
    console.info(verifica);
    
    if (verifica == 1) {
        requestJson();
    }
    else if (verifica == 2) {
        drawFormStorage();
    }
    else {
        console.info(verifica);
    }     
}

requestJson = function() {
    fetch(urlJson).then(response => {
        return response.json();
    })
    .then(function (r) {
        console.info("CHEGOU AO JSON");

        var sizeFields = Object.keys(r).length;
        var dataFields = r;

        storage.setItem("numObjects", sizeFields);

        console.info(sizeFields);
        console.info(JSON.stringify(dataFields));
        
        // drawFormJson(sizeFields, dataFields);
        getValuesForm(sizeFields, dataFields);
    });    
}

getValuesForm = function(size, data) {
    // var array


}

drawFormStorage = function() {
    console.info("ESTA A USAR A STORAGE CRL");
        var stackLayout = new layout.StackLayout();
        var num = storage.getItem("numObjects");
        
        for(i = 0; i < num; i++) {
            switch (storage.getItem("typeObject" + i)) {
                case "button":
                    btn = new buttonModule.Button();
                    btn.text = storage.getItem("objectText" + i);
                    stackLayout.addChild(btn);
                    break;

                case "label":
                    lbl = new labelModule.Label();
                    lbl.text = storage.getItem("objectText" + i);
                    stackLayout.addChild(lbl);
                    break;
            }
        }
         page.content = stackLayout;
}

drawFormJson = function(size, data) {
    var stackLayout = new layout.StackLayout();
    var arrayButton = new Array(size);
    var arrayLabel = new Array(size);
    var arrayTeste = new Array(size);

    for (i = 0; i < size; i++) {
        switch (data[i].Fields.type) {
            case "button":
                arrayButton[i] = new buttonModule.Button();
                arrayButton[i].text = data[i].Fields.text;
                stackLayout.addChild(arrayButton[i]);
                storage.setItem("btnTap" + i, data[i].Fields.text);                
                break;

            case "label":
                arrayLabel[i] = new labelModule.Label();
                arrayLabel[i].text = data[i].Fields.text;
                stackLayout.addChild(arrayLabel[i]);                
                break;
        }

        storage.setItem("typeObject" + i, data[i].Fields.type);
        storage.setItem("objectText" + i, data[i].Fields.text);     
        storage.setItem("verify", 2);

        page.content = stackLayout;
    }    
}