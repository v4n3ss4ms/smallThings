let serverAPI = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last'; //API doc

let data = {
    'idClient': idClient,
    'passKey': passKey,
    'idStop': '2491',
    'url': serverAPI + '/geo/GetArriveStop.php' //Gets bus arrive info to a target stop
};

let data2 = {
    'idClient': idClient,
    'passKey': passKey,
    'latitude': '40.439755831562',
    'longitude': '-3.6142271125227',
    'Radius':'500',
    'url': serverAPI + '/geo/GetStopsFromXY.php' //Returns a list of stops from a coordinate with a radius and the lines arriving to those stops
};

let data3 = {
    'idClient': idClient,
    'passKey': passKey,
    'idStop': '4423',
    'Radius':'500',
    'url': serverAPI + '/geo/GetStopsFromStop.php' //Returns a list of stops from a target stop with a target radius and the lines arriving to those stops.
};

let sendData = data;

let responseData;
let responseDataF;


// saving response #2
function getInfo(data) {
 return $.ajax({
     method: 'GET',
     url: data.url,
     headers: {
         //'Content-Type': 'application/x-www-form-urlencoded'
     },
     data: data,
 });
}

getInfo(sendData).then((response) => {
    responseData = response;
    console.log('ajax');
    console.log(response);
});

// saving response #3
function getInfoF(data) {
    return fetch(data.url,{
        method: 'GET',
        data: data,
    });
}

getInfoF(sendData).then((response) => {
    responseDataF = response;
    console.log('fetch');
    console.log(response);
});



// saving response #1
// let getInfo = $.ajax({
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
// let jqxhr = $.ajax({
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