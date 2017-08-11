var map = L.map('mapid').setView([32.7543, -97.3319], 17);
var clicked = [];
var intersected = [];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiYnJ1bGVjIiwiYSI6IlpEOGRJVkUifQ.SDYry6LIIHfMMpajIkFCAg'
}).addTo(map);

function style(feature) {
	return {
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.1,
		fillColor: 'white'
	};
}

function highlightFeature(e) {
	var layer = e.target;
	if (clicked.indexOf(e.target.feature.id) < 0 && intersected.indexOf(e.target.feature.id) < 0) {
	    layer.setStyle({
	        weight: 5,
	        color: '#1AD4D7',
	        dashArray: '',
	        fillOpacity: 0.7,
	        fillColor: '#A7ECED'
	    });
	}

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
	var layer = e.target;
	if (clicked.indexOf(e.target.feature.id) < 0 && intersected.indexOf(e.target.feature.id) < 0) {
		layer.setStyle({
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.1,
			fillColor: 'white'
		});

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    	}
	}
}

function clickedFeature(e) {
	var layer = e.target;

	// if (typeof bufLyr !== 'undefined') {
	// 	map.removeLayer(bufLyr);
	// 	parcels.resetStyle();
	// }
	var foo = document.getElementById('red');
	if (foo.checked) {
	    layer.setStyle({
	        weight: 5,
	        color: '#666',
	        dashArray: '',
	        fillOpacity: 0.7,
	        fillColor: 'red'
		});
		data.datasets[0].data[0] += layer.feature.properties.LAND_SQFT
		myDoughnutChart.update();
	}
	else{
    	layer.setStyle({
		    weight: 5,
		    color: '#666',
		    dashArray: '',
		    fillOpacity: 0.7,
		    fillColor: 'green'
	});
	data.datasets[0].data[1] += layer.feature.properties.LAND_SQFT
	myDoughnutChart.update();
}


    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    clicked.push(e.target.feature.id);


  //   var poly = turf.polygon([layer.feature.geometry.coordinates[0]])
  //   var buffered = turf.buffer(poly, 0.0568182, 'miles');
  //   bufLyr = L.geoJson(buffered).addTo(map);

  //   parcels.query()["intersects"](buffered).ids(function(error, ids){
  //   	intersected = ids;
		// OIDs = ids.join();
		// for (var i = ids.length - 1; i >= 0; i--) {
		// 	parcels.setFeatureStyle(ids[i], { color: 'red', weight: 3 });
  // 			};
		// 	//parcels.setWhere("OBJECTID IN (" + OIDs + ")")
  //   });

    //var clipped = turf.bboxClip(poly, buffered)
    //L.geoJson(clipped).addTo(map);
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: clickedFeature
	});
}

var parcels = L.esri.featureLayer({url: 'https://mapit.tarrantcounty.com/arcgis/rest/services/Dynamic/TADParcels/MapServer/0', style: style, onEachFeature: onEachFeature}).addTo(map);

//parcels.bindPopup(function(evt) {
//	return L.Util.template('<h3>{OWNER_NAME}</h3><hr /><p>{SITUS_ADDR}', evt.feature.properties);
//}); 


//chart stuff
var data = {
    datasets: [{
    	data: [1, 1],
    	backgroundColor: ['#ff3333', '#339933']
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Red','Green']
};
var ctx = document.getElementById("myChart").getContext('2d');
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data
});