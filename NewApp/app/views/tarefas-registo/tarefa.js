var frameModule = require("ui/frame");
var layout = require("ui/layouts/stack-layout");
var buttonModule = require("ui/button");
var listViewModule = require("ui/list-view");
var gridModule = require("ui/layouts/grid-layout");
var page;
var http = require("http");

exports.registoLoad = function(args){
    page = args.object;
    var newgrid = new gridModule.GridLayout;
    var gotData = page.navigationContext;
    var ide = gotData.referencia;
    http.getString("https://luisfranciscocode.000webhostapp.com/tarefasTap.php?ide=" + ide)
    .then(function (r){
        var daaaados = r.replace(/"/g, '')
        array_dados = daaaados.split('/');

        // 4 labels, 4 campos, 8 linas e 2 colunas

    }, function (e) {
        toast.makeText("Fuck you").show();
    });
}