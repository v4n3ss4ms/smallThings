var serverAPI = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last'; //API doc

var data = {
    'idClient': idClient,
    'passKey': passKey,
    'idStop': '2491',
    'url': serverAPI + '/geo/GetArriveStop.php' //Gets bus arrive info to a target stop
};

var data2 = {
    'idClient': idClient,
    'passKey': passKey,
    'latitude': '40.439755831562',
    'longitude': '-3.6142271125227',
    'Radius':'500',
    'url': serverAPI + '/geo/GetStopsFromXY.php' //Returns a list of stops from a coordinate with a radius and the lines arriving to those stops
};

var data3 = {
    'idClient': idClient,
    'passKey': passKey,
    'idStop': '4423',
    'Radius':'500',
    'url': serverAPI + '/geo/GetStopsFromStop.php' //Returns a list of stops from a target stop with a target radius and the lines arriving to those stops.
};

var sendData = data;

var responseData;
var responseDataF;


// saving response #2
function getInfo(data) {
 return $.ajax({
     method: 'POST',
     url: data.url,
     // headers: {
     //     'Content-Type': 'application/x-www-form-urlencoded'
     // },
     data: data,
 });
}

getInfo(sendData).then((response) => responseData = response);

// saving response #3
function getInfoF(data) {
    return fetch(data.url,{
        method: 'POST',
        data: data,
    });
}

getInfoF(sendData).then((response) => responseDataF = response);


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