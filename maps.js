$(document).ready(function(){

$.ajax({
  url: 'https://www.mapquestapi.com/search/v2/radius',
  dataType: 'jsonp',
  crossDomain: true,
  data: {
    key: decodeURIComponent('qyNSnqk6s1mOGQMQZtkpGDvg9stlKSfJ'),
    origin: '1555 Blake St, Denver, CO',                      // origin of the radius search
    radius: 2,                                                // radius of search in miles
    maxMatches: 25,                                           // maximum number of results returned
    hostedData: 'mqap.ntpois'  // hosted data table to search
  },

  // on success, display the results on the map
  success: function(data, textStatus, jqXHR) {
    console.log(data)
    var pois = new MQA.ShapeCollection();
    console.log(pois)
    var html = '<table class="clean"><thead><tr><th>ID</th><th>NAME</th>' +
      '<th>ADDRESS</th><th>ZIP</th><th>CATEGORY</th><th>DISTANCE (miles)</th></tr>';

    // add POI markers and populate the search result table
    for (i = 0; i < data.searchResults.length; i++) {
      var result = data.searchResults[i];
      var location = new MQA.Poi({ lat: result.shapePoints[0], lng: result.shapePoints[1] });

      // change default POI icons to numbered icons
      var numberedPoi = new MQA.Icon('https://www.mapquestapi.com/staticmap/geticon?uri=poi-' + (i+1) + '.png', 20, 29);
      location.setIcon(numberedPoi);

      // populate the content within the InfoWindows
      location.setRolloverContent('<span class="poi-title">' + result.name + '</span>');
      location.setInfoContentHTML('<div class="poi-body"><div class="poi-title">' +
        result.name + '</div>' + result.fields.address + '<br />' +
        result.fields.city + ', CO ' + result.fields.postal_code + '</div>');

      // add locations to the shape collection
      pois.add(location);

      // build the html to be displayed
      html += '<tr><td>' + result.resultNumber + '</td><td>' + result.name + '</td><td>' + result.fields.address + '</td><td>' +
        result.fields.postal_code + '</td><td>' + result.fields.group_sic_code_name + '</td><td>' + result.distance + '</td></tr>';
    }

    html += '</table>';
    document.getElementById('clean').innerHTML = html;

    // construct an instance of MQA.TileMap
    window.map = new MQA.TileMap({
      elt: document.getElementById('map'),       // ID of map element on page
      collection: pois                           // initialize map with shape collection
    });

    // download the modules
    MQA.withModule('smallzoom', 'mousewheel', function() {
      map.addControl(new MQA.SmallZoom());
      map.enableMouseWheelZoom();
    });
  }
});
});
