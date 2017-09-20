

function getUrl(config) {
    var userName = config.maps_api_config.user_name; //should check if it's undefined and set a default one if needed
    var mapconfig = {
        "layers": [
          {
            "type": "http",
            "options": {
              "urlTemplate": "http://" + userName + ".basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            }//there were two different urls in the example under type:http  //"http://" + userName + ".basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
          },
          {
            "type": "mapnik",
            "options": {
              "cartocss": "/** choropleth visualization */\n\n#european_countries_e{\n  polygon-fill: #FFFFB2;\n  polygon-opacity: 0.8;\n  line-color: #FFF;\n  line-width: 1;\n  line-opacity: 0.5;\n}\n#european_countries_e [ area <= 1638094] {\n   polygon-fill: #B10026;\n}\n#european_countries_e [ area <= 55010] {\n   polygon-fill: #E31A1C;\n}\n#european_countries_e [ area <= 34895] {\n   polygon-fill: #FC4E2A;\n}\n#european_countries_e [ area <= 12890] {\n   polygon-fill: #FD8D3C;\n}\n#european_countries_e [ area <= 10025] {\n   polygon-fill: #FEB24C;\n}\n#european_countries_e [ area <= 9150] {\n   polygon-fill: #FED976;\n}\n#european_countries_e [ area <= 5592] {\n   polygon-fill: #FFFFB2;\n}",
              "cartocss_version": "2.1.1",
              "sql": "select * from european_countries_e",
              "interactivity": [
                "cartodb_id"
              ]
            }
          }
        ]
      };
      var httpUrlTemplate = getUrlTemplate(mapconfig,'type','http');

    
    $.ajax({
        crossOrigin: true,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: 'https://'+ userName +'.carto.com/api/v1/map',
        data: JSON.stringify(mapconfig),
        success: function(data) {
          var templateUrl = 'https://'+ userName +'.carto.com/api/v1/map/' + data.layergroupid + '/{z}/{x}/{y}.png'
          console.log('data'); //remove
          console.log(data); //remove
          console.log('templateUrl'); //remove
          console.log(templateUrl); //remove
        }
      })

}

function getUrlTemplate(obj,att,ele) {
    _.findIndex(obj, function(o) { return o[att] == ele; });
}



