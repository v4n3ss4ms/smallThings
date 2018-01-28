// Id de cliente: WEB.SERV.noemims@gmail.com
// Pass Key: B434D627-6F9A-4C54-BEF1-86DA45ECAE1C
// https://servicios.emtmadrid.es:8443/

var getIncomingBusesToStopUrl = 'https://openbus.emtmadrid.es/emt-proxy-server/last/geo/GetArriveStop.php';
var server = 'https://servicios.emtmadrid.es:8443/';
var data = {
    idClient: 'noemims@gmail.com',
    passKey: 'B434D627-6F9A-4C54-BEF1-86DA45ECAE1C'

};
var jqxhr = $.ajax({
        method: 'POST',
        url: getIncomingBusesToStopUrl,
        form: data,
    })
    .done(function(e) {
        console.log(e);
        alert( "success" );
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        alert( "complete" );
    });