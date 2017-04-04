var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var storage = require("nativescript-localstorage");
var Observable = require("data/observable").Observable;
var timePickerModule = require("ui/time-picker");

var urlJson = "https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_presencas";
var verifica;

var timePicker = new timePickerModule.TimePicker();

var user = new Observable({
    mensagem: "user@domain.com"
});

exports.presenca = function(args) {
    page = args.object;
    page.bindingContext = user;

    laibel = new labelModule.Label();
    laibel.text = user.mensagem;
    console.info(laibel.text);
    console.info(user.mensagem);
 
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
        storage.setItem("dataJson", dataFields );

        console.info(sizeFields);
        console.info(JSON.stringify(dataFields));
        
        drawFormJson(sizeFields, dataFields);
    });    
}

drawFormStorage = function() {
    console.info("ESTA A USAR A STORAGE");
    var stackLayout = new layout.StackLayout();

    var num = storage.getItem("numObjects");
    var arrayButton = new Array(num);
    var arrayLabel = new Array(num);
    const saveFunction = new Array(num);

    for(i = 0; i < num; i++) {
        const cont = i;
        console.info(cont);
        switch (storage.getItem("typeObject" + cont)) {
            case "button":
                arrayButton[cont] = new buttonModule.Button(num); 
                arrayButton[cont].text = storage.getItem("textObject" + cont);
                arrayButton[cont].tap = storage.getItem("btnTap" + cont);         
                saveFunction[cont] = arrayButton[cont].tap;

                arrayButton[i].on(buttonModule.Button.tapEvent, function() {
                    escolher(saveFunction[cont]);
                }); 

                stackLayout.addChild(arrayButton[cont]);
                break;
            case "label":
                arrayLabel[cont] = new labelModule.Label();
                // arrayLabel[cont].text = storage.getItem("textObject" + cont);
                arrayLabel[cont].text = user.mensagem;
                stackLayout.addChild(arrayLabel[cont]);
                break;
            }
        }
    page.content = stackLayout;
}

drawFormJson = function(size, data) {
    var stackLayout = new layout.StackLayout();
    var arrayButton = new Array(size);
    var arrayLabel = new Array(size);

    for (i = 0; i < size; i++) {
        switch (data[i].Fields.type) {
            case "button":
                arrayButton[i] = new buttonModule.Button();
                arrayButton[i].text = data[i].Fields.text;
                stackLayout.addChild(arrayButton[i]);
                storage.setItem("btnTap" + i, data[i].Fields.tap);                
                break;

            case "label":
                arrayLabel[i] = new labelModule.Label();
                arrayLabel[i].text = data[i].Fields.text;
                stackLayout.addChild(arrayLabel[i]);                
                break;
        }

        storage.setItem("idObject" + i, data[i].Fields.id);
        storage.setItem("typeObject" + i, data[i].Fields.type);
        storage.setItem("textObject" + i, data[i].Fields.text);     
        storage.setItem("verify", 2);

        page.content = stackLayout;
    }    
}

escolher = function(func) {
    var msg;
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    timePicker.hour = h;
    timePicker.minute = m;

    switch(func) {
        case "darEntrada":
            msg = "Muito bem, acabaste de dar entrada às ";     
            break;
        case "darSaida":
            msg = "Muito bem, acabaste de dar saida às ";
            break;
        case "iniciarPausa":
            msg = "Muito bem, acabaste de acabar a pausa às ";
            break;
        case "acabarPausa":
            msg = "Muito bem, acabaste de começar a pausa às ";
            break;
    }

    user.set("mensagem", msg + timePicker.hour + ":" + timePicker.minute);
    drawFormStorage();
}