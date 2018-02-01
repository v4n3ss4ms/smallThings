var server = 'https://servicios.emtmadrid.es:8443/';
var data = {
    'idClient': idClient,
    'passKey': passKey,
    'latitude': '40.439755831562',
    'longitude': '-3.6142271125227',
    'Radius':'500',
    'url': 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetStopsFromXY.php'
};

var data2 = {
    'idClient': idClient,
    'passKey': passKey,
    'idStop': '608',
    'url':'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php'
};

var data3 = {
    'idClient': idClient,
    'passKey': passKey,
    'idStop': '4423',
    'Radius':'500',
    'url':'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetStopsFromStop.php'
};

var sendData = data;

var jqxhr = $.ajax({
        method: 'POST',
        url: sendData.url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: sendData,
    })
    .done(function(response, textStatus, jqXHR) {
        console.log(response);
        //alert( "success" );
    })
    .fail(function() {
        //alert( "error" );
    })
    .always(function() {
        //alert( "complete" );
    });