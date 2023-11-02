
//    mapboxgl.accessToken = mapToken;
mapboxgl.accessToken = '<%-process.env.MAPBOX_TOKEN%>';
    
   const map = new mapboxgl.Map({
           container: 'map', // container ID
           style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [-74.5, 40], // starting position [lng, lat]
           zoom: 9, // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl());



    new mapboxgl.Marker()
    .setLngLat(motel.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${motel.title}</h3><p>${motel.location}</p>`
            )
    )
    .addTo(map)