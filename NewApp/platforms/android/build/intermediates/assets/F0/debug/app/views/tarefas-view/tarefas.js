var http = require("http");
var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var frameModule = require("ui/frame");
var listViewModule = require("ui/list-view");
var labelModule = require("ui/label");
var page;

exports.principal = function(args){
    page = args.object;
    var newStackLayout = new layout.StackLayout();
    var tarefasList = new listViewModule.ListView();

    http.getJSON("https://luisfranciscocode.000webhostapp.com/webservice.php?format=json&&form=form_lista_tarefas")
    .then(function (r) {
        console.log("oi");
        jason = r.json;
        var fieldsSize = jason.fields.length;
        console.log("oi");
        for(i = 0; i < fieldsSize; i++){
            switch (jason.fields[i].type){
                case fieldView:
                    //tarefasList.items = jason.fields[i].List;
                    //newStackLayout.addChild(tarefasList);
                    console.log(jason.fields[i].List);
                    break;
                    }
                }
    }, function (e) {
        console.log("oi");
    });
                
    tarefasList.on(listViewModule.ListView.itemTapEvent, function (args = listViewModule.ItemEventData) {
            var tappedItemIndex = args.index;
            console.log(tappedItemIndex); 
    });
    page.content = newStackLayout;
};