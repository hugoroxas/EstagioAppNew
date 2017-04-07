var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
var http = require("http");
var frameModule = require("ui/frame");
var listViewModule = require("ui/list-view");
var buttonModule = require("ui/button");
var localStorage = require("nativescript-localstorage");
var Sqlite = require("nativescript-sqlite");
var labelModule = require("ui/label");
var scrollViewModule = require("ui/scroll-view");

var topmost = frameModule.topmost();


var page;

exports.principal = function(args) {
    page = args.object;


    var formexists = localStorage.getItem("form_existe");
    //console.dump(page);
    var stackLayout = new layoutModule.StackLayout();
    var btn1 = new btnModule.Button();

//stackLayout.addChild(btn1);
//stackLayout.addChild(btn2);



//localStorage.clear();

var scrollfinal = new scrollViewModule.ScrollView();
scrollfinal.height = 600;
scrollfinal.orientation = "vertical";

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

                if(jsonfile[i].Fields.type == "ScrollView"){
                    var scroll1 = new scrollViewModule.ScrollView();
                    localStorage.setItem("elementoID_type"+i, jsonfile[i].Fields.type);
                    localStorage.setItem("elementoID_id"+i, jsonfile[i].Fields.id);
                    scroll1.height = 500;
                    scroll1.id = jsonfile[i].Fields.id;
                    //var kap = new labelModule.Label();
                    //kap.text = "GNAHEI";
                    console.log("GANHEI1");
                    //scroll1.addChild(page.getViewById("lista_sumarios"));
                    scroll1.content = page.getViewById("lista_sumarios");
                    console.log("GANHEI2");
                    //stackLayout.addChild(scroll1);
                    console.log("GANHEI3");

                }else if(jsonfile[i].Fields.type == "ListView"){
                    var lista1 = new listViewModule.ListView();
                    localStorage.setItem("elementoID_type"+i, "listview");
                    localStorage.setItem("elementoID_id"+i, "lista_sumarios");
                    //lista1.id = jsonfile[i].id;
                    lista1.items = "";
                    
                    //var array1 = ['Dia 1: Trabalhei bué','Dia 2: Trabalhei ainda mais','Dia 3: Fui despedido'];
                    
                    //localStorage.setItem("listview_sumarios_array1", ['Dia 1: Trabalhei bué','Dia 2: Trabalhei ainda mais','Dia 3: Fui despedido']);
                    lista1.items = [];
                    lista1.id = "lista_sumarios";
                    localStorage.setItem("elementoID_items"+i, lista1.items);
                    stackLayout.addChild(lista1);

                    

                }else if(jsonfile[i].Fields.type == "Button"){
                    //alert("asdfghjk");
                    //amount_btn = amount_btn+1;
                    var btn1 = new buttonModule.Button();
                    localStorage.setItem("elementoID_type"+i, "button");
                    var btnid = jsonfile[i].Fields.id;
                    localStorage.setItem("elementoID_id"+i, btnid);
                    //alert("ADICIONAR SUMARIO BTN");
                    
                    if(btnid == "adicionarsumario"){
                    //localStorage.setItem("btnid", jsonfile[i].Fields.id);
                    //lista1.id = jsonfile[i].id;
                    //alert("ADICIONAR SUMARIO BTN");
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
                    stackLayout.addChild(btn1);
                    btn1.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        topmost.navigate("views/menu-view/menu");
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
            
            for(i=0;i<100;i++){
                var curr_obj = localStorage.getItem("elementoID_type"+i);
                console.log("ELEMENTOID: " + curr_obj);
                if(curr_obj == "ScrollView"){
                    var scroll1 = new scrollViewModule.ScrollView();
                    scroll1.height = 500;
                    scroll1.id = localStorage.getItem("elementoID_id"+i);
                    var kap = new labelModule.Label();
                    kap.text = "GNAHEI";
                    console.log("GANHEI1");
                    //scroll1.content = kap;
                    //scroll1.content = page.getViewById("lista_sumarios");
                    console.log("GANHEI2");
                    //stackLayout.addChild(scroll1);
                    console.log("GANHEI3");

                }else if(curr_obj == "button"){
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
                        topmost.navigate("views/menu-view/menu");
                    });
                    stackLayout.addChild(btn1);
                }

                }else if(curr_obj == "listview"){
                    var lista1 = new listViewModule.ListView();
                    lista1.id = localStorage.getItem("elementoID_id"+i);
                    lista1.items = localStorage.getItem("elementoID_items"+i);
                    stackLayout.addChild(lista1);
                }
            }
            scrollfinal.content = stackLayout;
            page.content = scrollfinal;
            //page.content= localStorage.getItem("pag_sumarios");
            
        }

        http.getJSON("https://luisfranciscocode.000webhostapp.com/verSumario.php").then(function (r) {
            var jsonfile2 = r;
            var tamanho = jsonfile2.length;
            //conteudo = JSON.parse(r);
            //alert("TEXTO_SUMARIO: " + teste123);
            page.getViewById("lista_sumarios").items = [];
            page.getViewById("lista_sumarios").rowHeight = 150;
            
            //page.getViewById("lista_sumarios").textWrap = true;
            //page.getViewById("lista_sumarios").items = [teste123[0].Fields.dia_sumario +": "+ teste123[0].Fields.texto_sumario];
            for(i=0;i<tamanho;i++){
                //alert("AQUI");
                //var lbl_meu = new labelModule.Label();
                //lbl_meu.text = "123";
                var txtfinal = jsonfile2[i].Fields.texto_sumario.replace(/_/g," ");
                page.getViewById("lista_sumarios").items.push(jsonfile2[i].Fields.dia_sumario +": "+ txtfinal);
                //alert("AQU2");
                
                //alert("AQUI3");
                
                //page.getViewById("lista_sumarios").items.push(lbl_meu);
            }
            

            page.getViewById("lista_sumarios").on(listViewModule.ListView.itemTapEvent, function(args = listViewModule.itemEventData){
                var tappedItemIndex = args.index;
                console.log(tappedItemIndex);
                var tappedItemView = args.view;
                console.log(tappedItemView.text);
                localStorage.setItem("to_show",tappedItemView.text);
                //var lblteste = new labelModule.Label();
                //lblteste.text = "qwertyui";

                //alert(lblteste);
                var topmost = frameModule.topmost();
                topmost.navigate("views/sumarios/ver_sumario/ver_sumario");
            });
            //alert("1");
            //var finallayout = new layoutModule.StackLayout();
            //finallayout.addChild(page.getViewById("lista_sumarios"));
            scrollfinal.content = stackLayout;
            page.content = scrollfinal;
            //alert("2");
            //page.getViewById("lista_sumarios").items += [teste123[1].Fields.dia_sumario +": "+ teste123[1].Fields.texto_sumario];
            //console.dump(r);
            }, function (e) {
            //// Argument (e) is Error! 
            console.log(e);
            alert("Error: "+ e);
        });
        

    

}