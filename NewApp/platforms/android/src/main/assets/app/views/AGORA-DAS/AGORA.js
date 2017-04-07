var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var listViewModule = require("ui/list-view");
var page;
var http = require("http");

exports.listLoad = function(args){

    http.getJSON("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_tarefas")
    .then(function (r) {
        page = args.object;
        var newStackLayout = new layout.StackLayout();
        var tarefasList = new listViewModule.ListView();
        var buttoooon = new buttonModule.Button();

        var myJason = r;
        var fieldsSize = myJason.length;

        for(i = 0; i < fieldsSize; i++){
            switch (myJason[i].Fields.type){
                case "ListView":
                    http.getString("https://luisfranciscocode.000webhostapp.com/numDados.php")
                    .then(function (r){
                        var array_dados = [r];
                        for(k=1; k <= r; k++) {
                            http.getstring("https://luisfranciscocode.000webhostapp.com/dadosList.php?id=" + k)
                            .then(function (r){
                                array_dados[k] = r;
                            }, function(e) {
                                console.log(e);
                            })
                        }
                        tarefasList.items = array_dados;
                        newStackLayout.addChild(tarefasList);
                    }, function(e) {
                        console.log(e);
                    });
                    
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