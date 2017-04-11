
var slayout = require("ui/layouts/stack-layout");
var glayout = require("ui/layouts/grid-layout");

var buttonModule = require("ui/button");
var labelModule = require("ui/label");
var timePickerModule = require("ui/time-picker");
var listViewModule = require("ui/list-view");

var storage = require("nativescript-localstorage");
var Observable = require("data/observable").Observable;

var urlJson = "https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_presencas";
var verifica;
var guardarPicancos = [];
var timePicker = new timePickerModule.TimePicker();

var opcaoMenu = 2;

var picar = new Observable({
    mensagem: ""
});

exports.presenca = function(args) {
    var date = new Date();
    var d = date.getDay();

    if (storage.getItem("form_presenca_verificaDia") == null || storage.getItem("form_presenca_verificaDia") != d) {
        storage.removeItem("form_presenca_picancoGuarda");
        storage.setItem("form_presenca_verificaDia", d);
        console.info("if picanco");
    }
    else {
        guardarPicancos = storage.getItem("form_presenca_picancoGuarda");
        console.info("else picanco");
    }

    page = args.object;
    page.bindingContext = picar;   

    laibel = new labelModule.Label();
    laibel.text = picar.mensagem;
    console.info(laibel.text);
    console.info(picar.mensagem);
 
    verifica = storage.getItem("form_presenca_verify");

    console.info("VERIFICA ANTES DA CONDIÇÃO: " + verifica);

    if (verifica == null) {
        verifica = 1;
    }

    console.info("DEPOIS: " + verifica);
    
    if (verifica == 1) {
        requestJson();
    }
    else if (verifica == 2) {
        drawFormStorage();
    }
    else {
        console.info("nao fez request nem storage");
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

        storage.setItem("form_presenca_numObjects", sizeFields);
        storage.setItem("form_presenca_dataJson", dataFields );

        console.info(sizeFields);
        console.info(JSON.stringify(dataFields));
        
        drawFormJson(sizeFields, dataFields);
    });    
}

drawFormStorage = function() {
    console.info("ESTA A USAR A STORAGE");
    var stackLayout = new slayout.StackLayout();
    
    var arrayButton = new Array();
    var arrayLabel = new Array();
    var arrayListView = new Array();
    const saveFunction = new Array();

    var x = 0;
    var y = 0;

    
    opcaoMenu = storage.getItem("form_presenca_opcaoMenu");
    console.info("confirma menu: " + opcaoMenu);


    if (opcaoMenu == null) {
        storage.setItem("form_presenca_opcaoMenu", 2);
        opcaoMenu = 2;
    }

    console.info("confirma menu again: " + opcaoMenu);

    if (opcaoMenu == 2) {
        var gridLayout = new glayout.GridLayout();
        stackLayout.addChild(gridLayout);
    }    

    var num = storage.getItem("form_presenca_numObjects");
    for(i = 0; i < num; i++) {
        const cont = i;
        switch (storage.getItem("form_presenca_typeObject" + cont)) {
            case "button":
                arrayButton[cont] = new buttonModule.Button(num); 
                arrayButton[cont].text = storage.getItem("form_presenca_textObject" + cont);
                arrayButton[cont].tap = storage.getItem("form_presenca_btnTap" + cont);         
                saveFunction[cont] = arrayButton[cont].tap;
                arrayButton[cont].on(buttonModule.Button.tapEvent, function() {
                    escolher(saveFunction[cont]);
                }); 

                 if (opcaoMenu == 2) {
                     if (x <= 1) {
                         glayout.GridLayout.setColumn(arrayButton[cont], x);
                     }
                     else {
                         glayout.GridLayout.setRow(arrayButton[cont], 1);
                         glayout.GridLayout.setColumn(arrayButton[cont], y);
                         y += 1;    
                    }
                    x += 1;

                    gridLayout.addChild(arrayButton[cont]);
                    var column = new glayout.ItemSpec(1, glayout.GridUnitType.auto);
                    var row = new glayout.ItemSpec(1, glayout.GridUnitType.auto);
                    gridLayout.addColumn(column);
                    gridLayout.addRow(row);
                }
               
                if (opcaoMenu == 1) {
                    stackLayout.addChild(arrayButton[cont]);
                }
                break;

            case "label":
                arrayLabel[cont] = new labelModule.Label();
                // arrayLabel[cont].text = storage.getItem("textObject" + cont);
                arrayLabel[cont].text = "LABEL: " + picar.mensagem;
                stackLayout.addChild(arrayLabel[cont]);
                break;

            case "listView":
                arrayListView[cont] = new listViewModule.ListView();
                // arrayListView[cont].items = storage.getItem("arrayGuardar");
                arrayListView[cont].items = guardarPicancos;
                stackLayout.addChild(arrayListView[cont]);
                break;
            }
    }

    page.content = stackLayout;
}

drawFormJson = function(size, data) {
    console.info("veio ao json???»?");
    for (i = 0; i < size; i++) {
        switch (data[i].Fields.type) {
            case "button":
                storage.setItem("form_presenca_btnTap" + i, data[i].Fields.tap);                
                break; 
        }

        storage.setItem("form_presenca_idObject" + i, data[i].Fields.id);
        storage.setItem("form_presenca_typeObject" + i, data[i].Fields.type);
        storage.setItem("form_presenca_textObject" + i, data[i].Fields.text);
        storage.setItem("form_presenca_verify", 2);
    }

    drawFormStorage();
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
            msg = "Hora de entrada: ";
            break;
            
        case "darSaida":
            msg = "Hora de saída: ";
            break;

        case "iniciarPausa":
            msg = "Hora de ínicio de pausa: ";
            break;

        case "acabarPausa":
            msg = "Hora de fim de pausa: ";
            break;
    }

    if (m < 10) {
        // apresenta 0 + o minuto
        picar.set("mensagem", msg + timePicker.hour + ":0" + timePicker.minute);
    }
    else {
        picar.set("mensagem", msg + timePicker.hour + ":" + timePicker.minute);
    }
    
    guardarPicancos.push(picar.mensagem);
    storage.setItem("form_presenca_picancoGuarda", guardarPicancos);

    drawFormStorage();
} 