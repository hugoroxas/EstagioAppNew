var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var listViewModule = require("ui/list-view");
var page;
var http = require("http");

exports.listLoad = function(args){
    page = args.object;
    
    http.getJSON("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_tarefas")
    .then(function (r) {
        var newStackLayout = new layout.StackLayout();
        var tarefasList = new listViewModule.ListView();
        var buttoooon = new buttonModule.Button();
        var array_dados = new Array();
        var myJason = r;
        var fieldsSize = myJason.length;

        for(i = 0; i < fieldsSize; i++){
            switch (myJason[i].Fields.type){
                case "ListView":
                    http.getString("https://luisfranciscocode.000webhostapp.com/dadosList.php")
                    .then(function (q){
                        
                        var daaaados = q.replace(/"/g, '')
                        array_dados = daaaados.split(',');
                        tarefasList.items = "";
                        tarefasList.items = array_dados;
                        newStackLayout.addChild(tarefasList);
                    }, function(e) {
                        console.log(e);
                    });
                    tarefasList.items = "";
                    tarefasList.items = array_dados;
                    newStackLayout.addChild(tarefasList);
                    break;
                case "button":
                    button.text = "adicionar";
                    break;
                default:
                    break;
            }
        }
        page.content = newStackLayout;
    }, function (e) {
        console.log(e);
       });
}