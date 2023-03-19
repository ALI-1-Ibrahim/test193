var r = document.querySelector(':root');

const Dark = localStorage.getItem("Dark");

const L = localStorage.getItem("lang");

mapboxgl.accessToken = 'pk.eyJ1IjoibWF6ZW54ZWxnYXlhciIsImEiOiJjbDV3eDEwejAwZmU3M2NwaXU4YzY5dTE0In0.ywGQXbcUzmKG1zk8e8ZYyg';
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/streets-v11',
    center: [-79.4512, 43.6568],
    zoom: 13
});

var marker = new mapboxgl.Marker().setLngLat(map.getCenter()).addTo(map);
map.on('move', function (e) {
    console.log(`Current Map Center: ${map.getCenter()}`);
    marker.setLngLat(map.getCenter());
});

var locae = new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  })
  map.addControl(locae, 'bottom-right');
  map.addControl(new mapboxgl.NavigationControl(),'top-left');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const geocoer = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    // placeholder: 'Search for places in Berkeley', // Placeholder text for the search bar
    // bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
    // proximity: {
    //   longitude: -122.25948,
    //   latitude: 37.87221
    // } // Coordinates of UC Berkeley
  });

  map.addControl(geocoer);
// map.on('moveend', function (e) {
//     console.log(`Current Map Center: ${map.getCenter()}`);
//     marker.setLngLat(map.getCenter());
// });

// map.on('click', (e) => {
  
//   console.log(JSON.stringify(e.lngLat.wrap()))
//   });
window.onload = function(){   
    
    document.getElementById("map").style.display = "none"

    if (Dark=="true") {
    r.style.setProperty('--TitleParbackground-color', 'black');
    r.style.setProperty('--ButttonGradiantColor', 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)');
    r.style.setProperty('--Apartment', '#151515');
    r.style.setProperty('--FontColor', 'white');
    // r.style.setProperty('--IconColor','blue');
    r.style.setProperty('--menu','black');
    r.style.setProperty('--BodyBackground','gray');
    r.style.setProperty('--PreloaderBackground','black');
    map.setStyle('mapbox://styles/mapbox/dark-v11');

  } else {
    r.style.setProperty('--TitleParbackground-color', '#526DA1');
    r.style.setProperty('--ButttonGradiantColor', 'linear-gradient(144deg,#d79eff, #bbb0ff 50%,#b7faff)');
    r.style.setProperty('--Apartment', 'white');
    r.style.setProperty('--FontColor', 'white');
    // r.style.setProperty('--IconColor','white');
    r.style.setProperty('--menu','#526DA1');
    r.style.setProperty('--BodyBackground','white');
    r.style.setProperty('--PreloaderBackground','white');
    map.setStyle('mapbox://styles/mapbox/streets-v12');

  }
  // document.body.style.flexDirection = "column";
  // document.body.style.alignItems = "center";
  document.getElementById("PreLoader").style.display="none";
   

    var pic = localStorage.getItem("pic")
   
  if (pic == null) {
        document.getElementById("profilepic").src = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    }
    else {
      
      document.getElementById("profilepic").src = pic;
    }
    












    var b = document.getElementById("MyPropertiesBody");
    fetch('../database/csvjson.json')
    .then(function(response) {
      
    console.log(response)
    
    return response.json();
    
    })
    .then(function(d) {
      
      SH = d;
      console.log(SH)
    
      d.forEach(({host_id,id,name})=>{
        if (host_id==124245) {/////////////////////////////////this should be the user id
            var p = document.createElement("div")
            p.style.width="100%";
            p.style.height="15%";
            p.style.borderRadius="15px";
            p.style.marginTop="20px"
            p.style.padding="0px 10px"
            Dark=="true"?p.style.backgroundColor="black":p.style.backgroundColor="#526DA1";
            // Dark=="true"?p.style.backgroundColor="black":p.style.backgroundColor="#526DA1";
            p.style.Color="black";
            p.style.fontSize="30px"
            // var c = document.createElement("p")
            // c.setAttribute("lng-tag", 'lng-tag');
            // p.appendChild(c);
            p.innerHTML="<div style=\"display: flex;\"><p lng-tag=\"apartment id: \"></p> <p>&nbsp"+id+"</p></div><p>"+name+"</p>"
            b.appendChild(p)
        }
    
    })
    

    if(L=='ar'){
      translate(L,'lng-tag');  
      document.body.dir="rtl" 
      // document.getElementsByClassName('wrapper')[0].style.clipPath = 'circle(0px at calc(100% + 30px) 30px)'
      r.style.setProperty('--cp', 'circle(0px at calc(100% + 30px) 30px)');
      r.style.setProperty('--cp2', 'circle(75%)');
    }else{
      translate('en','lng-tag'); 
      document.body.dir="ltr" 
      // document.getElementsByClassName('wrapper')[0].style.clipPath = 'circle(0px at calc(0% + 30px) 30px)'
      r.style.setProperty('--cp', 'circle(0px at calc(0% + 30px) 30px)');
      r.style.setProperty('--cp2', 'circle(75%)');
  
    }
    });
    






  }
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        console.log('jh')
    }
}

  function addappartement(){

    removeAllChildNodes(document.getElementById("MyPropertiesBody"))
    document.getElementById("map").style.display = "block"
  }
