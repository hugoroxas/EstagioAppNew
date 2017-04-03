var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var storage = require("nativescript-localstorage");

var urlJson = "https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_presencas";
var verifica

exports.presenca = function(args) {
    page = args.object;

    localStorage.setItem("verify", 0);

    


    verifica = localStorage.getItem("verify");
    console.info(localStorage.getItem("verify"));
    console.info(verifica);
    
    if (verifica == 0) {
        requestJson();
    }
    else if (verifica == 1) {
        console.info("ESTA A USAR A STORAGE CRL");
        var stackLayout = new layout.StackLayout();
        var num = storage.getItem("numObjects");
        

        for(i = 0; i < numObjects; i++) {
            switch (storage.getItem("typeObject" + i)) {
                case "button":
                    btn = new buttonModule.Button();
                    btn.text = storage.getItem("btnText" + i);
                    stackLayout.addChild(btn);
                    break;
                case "label":
                    lbl = new labelModue.Label();
                    lbl.text = storage.getItem("lblText" + i);
                    stackLayout.addChild(lbl);
                    break;
            }
        }
         page.content = stackLayout;
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
        
        drawForm(sizeFields, dataFields);
    });    
}

verifyStorage = function() {
    
   // storage.setItem("Button", "Boa, o storage está a funcionar");

   // console.info(storage.getItem("Testar"));

}

drawForm = function(size, data) {
    var stackLayout = new layout.StackLayout();
    var arrayButton = new Array(size);
    var arrayLabel = new Array(size);
    countButton = 0;
    var arrayTeste = new Array(size);

    for (i = 0; i < size; i++) {
        switch (data[i].Fields.type) {
            case "button":
                arrayButton[i] = new buttonModule.Button();
                arrayButton[i].text = data[i].Fields.text;

                stackLayout.addChild(arrayButton[i]);

                storage.setItem("typeObject" + i, data[i].Fields.type);
                storage.setItem("btnTap" + i, data[i].Fields.text);
                storage.setItem("btnText" + i, data[i].Fields.text);           
                
                break;

            case "label":
                arrayLabel[i] = new labelModule.Label();
                arrayLabel[i].text = data[i].Fields.text;
                stackLayout.addChild(arrayLabel[i]);

                storage.setItem("typeObject" + i, data[i].Fields.type);
                storage.setItem("lblText" + i, data[i].Fields.text);
                break;
        }

        storage.setItem("verify", 1);
        // zika();
        page.content = stackLayout;
    }    
}