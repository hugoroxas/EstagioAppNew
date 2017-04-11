var frameModule = require("ui/frame");
var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var listViewModule = require("ui/list-view");
var page;
var http = require("http");

exports.listLoad = function(args){
    page = args.object;
    var topmost = frameModule.topmost();
    http.getJSON("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_tarefas")
    .then(function (r) {
        var newStackLayout = new layout.StackLayout();
        var tarefasList = new listViewModule.ListView();
        var buttoooon = new buttonModule.Button();
        
        var idArray = Array();
        var textoArray = Array();
        var array_dados = new Array();
        var myJason = r;
        var fieldsSize = myJason.length;

        for(i = 0; i < fieldsSize; i++){
            switch (myJason[i].Fields.type){
                case "ListView":
                    http.getString("https://luisfranciscocode.000webhostapp.com/dadosList.php")
                    .then(function (q){
                        var idContador = 0;
                        var textoContador = 0;
                        var idIdentifier = 0;
                        var textoIdentifier = 1;

                        var daaaados = q.replace(/"/g, '')
                        array_dados = daaaados.split(',');

                        for(j = 0; j < array_dados.length; j++){
                            if (j == idIdentifier){
                                idArray[idContador] = array_dados[j];
                                idContador += 1;
                                idIdentifier += 2;
                            }
                            if (j == textoIdentifier){
                                textoArray[textoContador] = array_dados[j];
                                textoContador += 1;
                                textoIdentifier += 2;
                            }
                        }
                        tarefasList.items = "";
                        tarefasList.items = textoArray;
                        newStackLayout.addChild(tarefasList);
                        var arr
                    }, function(e) {
                        console.log(e);
                    });
                    tarefasList.items = "";
                    tarefasList.items = array_dados;
                    newStackLayout.addChild(tarefasList);
                    break;
                default:
                    break;
            }
        }
        tarefasList.on(listViewModule.ListView.itemTapEvent, function (args = listViewModule.ItemEventData) {
            var tappedItemIndex = args.index;
            var navigationOptions={
            moduleName: 'views/tarefas-registo/tarefa',
            context:{
                referencia: idArray[tappedItemIndex]
                }}
            topmost.navigate(navigationOptions);
        });
        var fapp = page.getViewById("fapbutton");


        page.content = newStackLayout;
        page.content.append(fapp);
    }, function (e) {
        console.log(e);
       });
}