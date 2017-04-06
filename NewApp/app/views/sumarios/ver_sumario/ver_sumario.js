var btnModule = require("ui/button");
var layoutModule = require("ui/layouts/stack-layout");
var http = require("http");
var frameModule = require("ui/frame");
var listViewModule = require("ui/list-view");
var buttonModule = require("ui/button");
var textViewModule = require("ui/text-view");
var datePickerModule = require("ui/date-picker");
var labelModule = require("ui/label");

var topmost = frameModule.topmost();


var page;

exports.principal = function(args) {
    page = args.object;
    //console.dump(page);
    var formexists = localStorage.getItem("form_existe3");
    var stackLayout = new layoutModule.StackLayout();
    var btn1 = new btnModule.Button();
    //var btn2 = new btnModule.Button();

    /*  
    var datahoje_antes = new Date();
    var meu_year = datahoje_antes.getFullYear();
    var meu_month = datahoje_antes.getMonth()+1;
    var meu_day = datahoje_antes.getDate();
    var datacompleta = meu_year+"-"+meu_month+"-"+meu_day;
    var datahoje = datacompleta;

    

    console.log(datahoje_antes);
    console.log(datahoje);

  

    btn1.text = "Voltar";
    btn1.on(btnModule.Button.tapEvent, function(){
        var topmost = frameModule.topmost();
        topmost.navigate("views/sumarios/sumarios");
    })


stackLayout.addChild(btn1);

*/

//txt1 = new textViewModule.TextView();
//txt1.hint = "Sumário";

//stackLayout.addChild(lbl_data);
//stackLayout.addChild(txt1);

//stackLayout.addChild(btn2);

//localStorage.clear();

if(formexists != "true"){

http.getJSON("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_sumarios").then(function (r) {
            var jsonfile = r;
            console.dump(jsonfile);

            //localStorage.clear();

            //console.log(jsonfile[0].Fields.id);

            var tamanho = jsonfile.length;

            

            for(i=0; i<tamanho; i++){
                console.log("MEU TYPE: "+ jsonfile[i].Fields.type);
                if(jsonfile[i].Fields.type == "TextField"){
                    //txt1 = new textViewModule.TextView();
                    //localStorage.setItem("elemento3ID_type"+i, "textview");
                    //localStorage.setItem("elemento3ID_id"+i,"txt_sumario");
                    //txt1.hint = "Sumário";
                    //stackLayout.addChild(txt1);

                }else if(jsonfile[i].Fields.type == "Button"){
                    var btn2 = new buttonModule.Button();
                    localStorage.setItem("elemento3ID_type"+i, "button");
                    var btnid = jsonfile[i].Fields.id;
                    localStorage.setItem("elemento3ID_id"+i, btnid);
                    //var txt_tamanho = txt1.text;
                    //console.log("TATAMNHO123: " + txt_tamanho);
                   /* 
                    if(btnid == "confirma_add"){
                    btn2.on(btnModule.Button.tapEvent, function(){
                        if(txt1.text != ""){
                            alert("Adiciona");
                        }else{
                            alert("Escreva texto no sumário.");
                        }
                    });
                    */
                    //lista1.id = jsonfile[i].id;
                    btn2.text = jsonfile[i].Fields.text;
                    localStorage.setItem("elemento3ID_text"+i, btn2.text);
                    //var tapme = jsonfile[i].Fields.tap;
                    
                   // btn1.width = jsonfile[i].Fields.width;
                    //btn1.height = jsonfile[i].Fields.height;
                    stackLayout.addChild(btn2);

                    if(btnid == "btn_voltar_menu"){
                    //lista1.id = jsonfile[i].id;
                    btn2.text = jsonfile[i].Fields.text;
                    localStorage.setItem("elemento3ID_text"+i, btn2.text);
                    //var tapme = jsonfile[i].Fields.tap;
                    btn2.width = jsonfile[i].Fields.width;
                    localStorage.setItem("elemento3ID_width"+i, btn2.width);
                    btn2.height = jsonfile[i].Fields.height;
                    localStorage.setItem("elemento3ID_height"+i, btn2.height);
                    
                    btn2.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        topmost.navigate("views/sumarios/sumarios");
                    });
                    stackLayout.addChild(btn2);
                    }
                    console.log(jsonfile[i].Fields.tap);
                    //stackLayout.addChild(btn1);
                }else if(jsonfile[i].Fields.type == "Label"){
                    /*
                    var lbl_data = new labelModule.Label();
                    localStorage.setItem("elemento3ID_type"+i, "label");
                    var lbl_id = jsonfile[i].Fields.id;
                    localStorage.setItem("elemento3ID_id"+i, lbl_id);
                    
                    
                    if(lbl_id == "lbl_data"){
                        lbl_data.text = datahoje;
                        localStorage.setItem("elemento3ID_text"+i, lbl_id.text);
                        //lbl_data.id = jsonfile[i].Fields.id;
                        stackLayout.addChild(lbl_data);
                        //console.log("LABEL AQUI");
                    }
                    */
                    localStorage.setItem("form_existe3", "true");
                    //topmost.navigate("views/sumarios/criarnovo/criarnovo");
                    //console.log(jsonfile[i].Fields.tap);
                    //stackLayout.addChild(btn1);
                    
                }
            }
            }, function (e) {
            //// Argument (e) is Error!
            console.log(e);
            alert("Error: "+ e);
        });
            }else{
                for(i=0;i<6;i++){
                var curr_obj = localStorage.getItem("elemento3ID_type"+i);
                console.log("ELEMENTOID: " + curr_obj);
                if(curr_obj == "button"){
                    /*
                    if(localStorage.getItem("elemento3ID_id"+i) == "confirma_add"){
                    var btn1 = new buttonModule.Button();
                    btn1.text = localStorage.getItem("elemento3ID_text"+i);
                    //btn1.width = localStorage.getItem("elemento2ID_width"+i);
                    //btn1.height = localStorage.getItem("elemento2ID_height"+i);
                    btn1.on(btnModule.Button.tapEvent, function(){
                        page.getViewById("txt_sumario").dismissSoftInput();
                        datahoje_antes = new Date();
                        meu_year = datahoje_antes.getFullYear();
                        meu_month = datahoje_antes.getMonth()+1;
                        meu_day = datahoje_antes.getDate();
                        datacompleta = meu_year+"-"+meu_month+"-"+meu_day;
                        datahoje = datacompleta;
                        page.getViewById("lbl_data").text = datahoje;
                        

                        var txtfinal_antes = page.getViewById("txt_sumario").text;
                        var txtfinal = txtfinal_antes.replace(/ /g,"_");
                        var datafinal = datahoje;

                        console.log("txtfinal: " + txtfinal);
                        console.log("datafinal: " + datafinal);

                        http.getString("https://luisfranciscocode.000webhostapp.com/adicionar_sumario.php?lbl_data="+datafinal+"&&txt_sumario="+txtfinal).then(function (r){
                            console.log(r);
                        });
                        topmost.navigate("views/sumarios/sumarios");
                    });
                    stackLayout.addChild(btn1);
                    */
                if(localStorage.getItem("elemento3ID_id"+i) == "btn_voltar_menu"){
                    var btn1 = new buttonModule.Button();
                    btn1.text = localStorage.getItem("elemento3ID_text"+i);
                    btn1.on(btnModule.Button.tapEvent, function(){
                        var topmost = frameModule.topmost();
                        //page.getViewById("txt_sumario").dismissSoftInput();
                        topmost.navigate("views/sumarios/sumarios");
                    });
                    stackLayout.addChild(btn1);
                }

                }else if(curr_obj == "listview"){
                    var lista1 = new listViewModule.ListView();
                    lista1.items = localStorage.getItem("elemento3ID_items"+i);
                    stackLayout.addChild(lista1);
                }else if(curr_obj == "textview"){
                    var txt1 = new textViewModule.TextView();
                    txt1.id = localStorage.getItem("elemento3ID_id"+i);
                    //txt1.items = localStorage.getItem("elemento2ID_items"+i);
                    stackLayout.addChild(txt1);
                }else if(curr_obj == "label"){
                    var lbl1 = new labelModule.Label();
                    lbl1.id = localStorage.getItem("elemento3ID_id"+i);
                    //lbl1.text = localStorage.getItem("elemento2ID_text"+i);
                    lbl1.text = datahoje;
                    //txt1.items = localStorage.getItem("elemento2ID_items"+i);
                    stackLayout.addChild(lbl1);
                }
                
            }
            page.content = stackLayout;
            }

        


    page.content = stackLayout;

}