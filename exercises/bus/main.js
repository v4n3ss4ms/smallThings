var getIncomingBusesToStopUrl = 'https://openbus.emtmadrid.es/emt-proxy-server/last/geo/GetArriveStop.php';
var server = 'https://servicios.emtmadrid.es:8443/';
var data = {

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
