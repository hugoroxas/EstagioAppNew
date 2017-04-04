var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
var http = require("http");
var frameModule = require("ui/frame");
var listViewModule = require("ui/list-view");
var buttonModule = require("ui/button");
var localStorage = require("nativescript-localstorage");

var topmost = frameModule.topmost();


var page;

exports.principal = function(args) {
    page = args.object;
    var formexists = localStorage.getItem("form_existe");
    //console.dump(page);
    var stackLayout = new layoutModule.StackLayout();
    var btn1 = new btnModule.Button();
    /*
    localStorage.setItem('Another Plugin', 'By Master Technology');
    var teste2 = localStorage.getItem('Another Plugin');
    console.log("STORAGE: " + teste2 + " / LENGTH: " + localStorage.length);
    localStorage.removeItem('Another Plugin');
    console.log("var teste2 = "+teste2);
    teste2 = localStorage.getItem('Another Plugin');
    console.log("TESTE2 FIM = " + teste2 + " / LENGHT: "+localStorage.length);
    localStorage.clear();
    */
    //var btn2 = new btnModule.Button();
/*
    btn1.text = "Voltar";
    btn1.on(btnModule.Button.tapEvent, function(){
        var topmost = frameModule.topmost();
        topmost.navigate("views/menu");
    })


    btn2.text = "TESTE";
    btn2.on(btnModule.Button.tapEvent, function(){
        novosumario();
    })
*/

//stackLayout.addChild(btn1);
//stackLayout.addChild(btn2);



//localStorage.clear();

if(formexists != "true"){

http.getJSON("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_sumarios").then(function (r) {
    
    //localStorage.clear();
    
    //var amount_btn = 0;
    var formexists = localStorage.getItem("form_existe");
    console.log("FORMEXISTS: " + formexists);
    
    

            var jsonfile = r;
            console.dump(jsonfile);
            //console.log(jsonfile[0].Fields.id);

            var tamanho = jsonfile.length;

            
                
            for(i=0; i<tamanho; i++){
                
                console.log("MEU TYPE: "+ jsonfile[i].Fields.type);
                if(jsonfile[i].Fields.type == "ListView"){
                    var lista1 = new listViewModule.ListView();
                    localStorage.setItem("elementoID_type"+i, "listview");
                    //lista1.id = jsonfile[i].id;
                    lista1.items = "";
                    
                    var array1 = ['Dia 1: Trabalhei bué','Dia 2: Trabalhei ainda mais','Dia 3: Fui despedido'];
                    
                    localStorage.setItem("listview_sumarios_array1", ['Dia 1: Trabalhei bué','Dia 2: Trabalhei ainda mais','Dia 3: Fui despedido']);
                    lista1.items = array1;
                    localStorage.setItem("elementoID_items"+i, lista1.items);
                    stackLayout.addChild(lista1);
                    

                }else if(jsonfile[i].Fields.type == "Button"){
                    //amount_btn = amount_btn+1;
                    var btn1 = new buttonModule.Button();
                    localStorage.setItem("elementoID_type"+i, "button");
                    var btnid = jsonfile[i].Fields.id;
                    localStorage.setItem("elementoID_id"+i, btnid);
                    
                    if(btnid == "adicionarsumario"){
                    //localStorage.setItem("btnid", jsonfile[i].Fields.id);
                    //lista1.id = jsonfile[i].id;
                    btn1.text = jsonfile[i].Fields.text;
                    localStorage.setItem("elementoID_text"+i, jsonfile[i].Fields.text);
                    //localStorage.setItem("btn_adicionarsumario_text", jsonfile[i].Fields.text);
                    //var tapme = jsonfile[i].Fields.tap;
                    btn1.width = jsonfile[i].Fields.width;
                    localStorage.setItem("elementoID_width"+i, jsonfile[i].Fields.width);
                    //localStorage.setItem("btn_adicionarsumario_width", jsonfile[i].Fields.width);
                    btn1.height = jsonfile[i].Fields.height;
                    localStorage.setItem("elementoID_height"+i, jsonfile[i].Fields.height);
                    //localStorage.setItem("btn_adicionarsumario_height", jsonfile[i].Fields.height);
                    stackLayout.addChild(btn1);

                    btn1.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        topmost.navigate("views/sumarios/criarnovo/criarnovo");
                    });
                    //localStorage.setItem("btn_adicionarsumario_tap", jsonfile[i].Fields.height);
                    //localStorage.setItem("btn_adicionar_sumario", "true");
                }else if(btnid == "btn_voltar_menu"){
                    //localStorage.setItem("btnid", jsonfile[i].Fields.id);
                    //lista1.id = jsonfile[i].id;
                    btn1.text = jsonfile[i].Fields.text;
                    localStorage.setItem("elementoID_text"+i, jsonfile[i].Fields.text);
                    //localStorage.setItem("btn_voltarmenu_text", jsonfile[i].Fields.text);
                    //var tapme = jsonfile[i].Fields.tap;
                    //btn1.width = jsonfile[i].Fields.width;
                    //localStorage.setItem("btn_voltarmenu_width", jsonfile[i].Fields.width);
                    //btn1.height = jsonfile[i].Fields.height;
                    //localStorage.setItem("btn_voltarmenu_height", jsonfile[i].Fields.height);
                    stackLayout.addChild(btn1);
                    btn1.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        topmost.navigate("views/menu");
                    });
                    //localStorage.setItem("btn_voltar_menu", "true");
                    }
                    console.log(jsonfile[i].Fields.tap);
                    //localStorage.setItem("amount_btn", amount_btn);
                    
                }
            }
            localStorage.setItem("form_existe", "true");
            formexists = localStorage.getItem("form_existe");
            console.log("SET2");
            //alert("SET2");
            //var layout2 = new layoutModule.StackLayout();
            //localStorage.setItem("pag_sumarios", stackLayout);
            page.content = stackLayout;
            }, function (e) {
            //// Argument (e) is Error!
            console.log(e);
            alert("Error: "+ e);
        });

        }else{
            
            for(i=0;i<6;i++){
                var curr_obj = localStorage.getItem("elementoID_type"+i);
                console.log("ELEMENTOID: " + curr_obj);
                if(curr_obj == "button"){
                    if(localStorage.getItem("elementoID_id"+i) == "adicionarsumario"){
                    var btn1 = new buttonModule.Button();
                    btn1.text = localStorage.getItem("elementoID_text"+i);
                    btn1.width = localStorage.getItem("elementoID_width"+i);
                    btn1.height = localStorage.getItem("elementoID_height"+i);
                    btn1.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        topmost.navigate("views/sumarios/criarnovo/criarnovo");
                    });
                    stackLayout.addChild(btn1);
                }else if(localStorage.getItem("elementoID_id"+i) == "btn_voltar_menu"){
                    var btn1 = new buttonModule.Button();
                    btn1.text = localStorage.getItem("elementoID_text"+i);
                    btn1.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        topmost.navigate("views/menu");
                    });
                    stackLayout.addChild(btn1);
                }

                }else if(curr_obj == "listview"){
                    var lista1 = new listViewModule.ListView();
                    lista1.items = localStorage.getItem("elementoID_items"+i);
                    stackLayout.addChild(lista1);
                }
            }
            page.content = stackLayout;
            //page.content= localStorage.getItem("pag_sumarios");
            /*
            var lista1 = new listViewModule.ListView();
            //lista1.id = jsonfile[i].id;
            lista1.items = localStorage.getItem("listview_sumarios_items");
            var array1 = localStorage.getItem("listview_sumarios_array1");
            lista1.items = array1;

            stackLayout.addChild(lista1);

            var amount_buttons = localStorage.getItem("amount_btn");
            console.log("AMOUNT OF BUTTONS: " + amount_buttons);

            for(i=0;i<amount_buttons;i++){

            var btn1 = new buttonModule.Button();

            btn1.id = localStorage.getItem("btnid");
            alert("BTN_ID: " + btn1.id);

            if(btn1.id == "adicionarsumario"){
            btn1.text = localStorage.getItem("btn_adicionarsumario_text");
            btn1.width = localStorage.getItem("btn_adicionarsumario_width");
            btn1.height = localStorage.getItem("btn_adicionarsumario_height");

            btn1.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        topmost.navigate("views/sumarios/criarnovo/criarnovo");
            });

            stackLayout.addChild(btn1);
            console.log("BUTTON ADDED");
            
        }else if(btn1.id == "btn_voltar_menu"){
            console.log("ADD BTN VOLTAR MENU");
            btn1.text = localStorage.getItem("btn_voltarmenu_text");
            //btn1.width = localStorage.getItem("btn_voltarmenu_width");
            //btn1.height = localStorage.getItem("btn_voltarmenu_height");

            btn1.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        topmost.navigate("views/sumarios/criarnovo/criarnovo");
            });

            stackLayout.addChild(btn1);
            console.log("BUTTON ADDED");
            }
            }

            
            
            //localStorage.setItem("form_existe", "true");
            formexists = localStorage.getItem("form_existe");
            console.log("SET");
            alert("SET");
            */
        }
        

    

}