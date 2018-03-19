
var server = 'https://servicios.emtmadrid.es:8443/'; //info web
var server = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/ '; //API doc
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
    'idStop': '2491',
    'url':'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetArriveStop.php'
};

var data3 = {
    'idClient': idClient,
    'passKey': passKey,
    'idStop': '4423',
    'Radius':'500',
    'url':'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/GetStopsFromStop.php'
};

var sendData = data2;

var responseData;


// saving response #2
function getInfo(data) {
 return $.ajax({
     method: 'POST',
     url: data.url,
     headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
     },
     data: data,
 });
}

getInfo(sendData).then((response) => responseData = response);

// saving response #1
// var getInfo = $.ajax({
//             method: 'POST',
//             url: sendData.url,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             data: sendData,
//         })
//
// getInfo.then((response) => responseData = response);


// ajax call
// var jqxhr = $.ajax({
//     method: 'POST',
//     url: sendData.url,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: sendData,
// })
//     .done(function(response, textStatus, jqXHR) {
//         console.log(response);
//         //alert( "success" );
//     })
//     .fail(function() {
//         //alert( "error" );
//     })
//     .always(function() {
//         //alert( "complete" );
//     });