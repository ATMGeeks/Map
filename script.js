////////////////// MAPBOX ////////////////////
/**
 * token
 */
console.log("loaded")
const ACCESS_TOKEN =
  "pk.eyJ1IjoiYXRtZ2Vla3MyMDI1IiwiYSI6ImNtY3V0ZXRnYjAzaWkycXB3OXJxNmN3amYifQ.ccVnBoI2fUxAUsw_GnkVFA";
/**
 * mapboxgl initialize
 */
mapboxgl.accessToken = ACCESS_TOKEN;

if (mapboxgl.supported() === false) {
  loadScript(
    'https://api.mapbox.com/mapbox.js/v3.2.1/mapbox.js',
    'https://api.mapbox.com/mapbox.js/v3.2.1/mapbox.css',
    initMapboxJS
  );
  console.log("Mapbox GL");
} else {
  loadScript(
    'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js',
    'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css',
    initMapboxGLJS
  );
  console.log("Mapbox GLS");
}

function initMapboxGLJS() {
  mapboxgl.accessToken = ACCESS_TOKEN;
  /**
   * Add the GLJS map to the page
   */
  mapboxgl.clearStorage();
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [-95.7129, 37.0902],
    zoom: 3.5,
    scrollZoom: true
  });
  map.addControl(new mapboxgl.NavigationControl());

  /**
   * Adjust zoom of map for mobile and desktop
   */
  let mqLarge = window.matchMedia("(min-width: 1440px)");
  let mqSmall = window.matchMedia("(min-width: 480px)");
  let largestMap = 0;
  let mediumMap = 0;
  let smallMap = 0;
  if (mqLarge.matches) {
    map.setZoom(4.2); //set map zoom level for largest desktop size 1 is smallest number
    largestMap = 9;
  } else if (mqSmall.matches) {
    map.setZoom(3.5); //set map zoom level for medium desktop size
    mediumMap = 8.5;
  } else {
    map.setZoom(2.9); //set map zoom level for mobile size
    smallMap = 7;
  }

  /**
   * Wait for data to load on page via CMSNEST
   * Invoke function to build JSON geo object
   */

  /**
   * vars
   */
  const domain = "https://www.atmgeeks.com";
  let searchInput = document.getElementById("searchInput");
  const form = document.getElementById("form_val");
  /**
   * Remove some things before we collect the data
   */
  $(".w-condition-invisible").remove();
  $(".locations_sidebar").addClass("hide");

  /**
   * Set maplocations array for data
   */
  let mapLocations = {
    type: "FeatureCollection",
    features: []
  };
  /**
   * For each webflow CMS data collect data and build json geo information
   */
  let listLocations = document.getElementById("location-list_2").childNodes;
  let radiusLarge = "75";
  let radiusMedium = "50";
  let radiusSmall = "25";

  function getGeoData() {

    listLocations.forEach(function (location, i) {
      const locationLat = location.querySelector("#locationLatitude").value;
      const locationLong = location.querySelector("#locationLongitude").value;
      let locationInfo = location.querySelector(".locations-map_card").innerHTML;
      let coordinates = [locationLong, locationLat];
      let locationID = location.querySelector("#locationID").value;
      let City = location.querySelector("#Map_City").value;
      let State = location.querySelector("#Map_State").value;
      let Address = location.querySelector("#Map_Address").value;
      let Google = location.querySelector("#Google_Address").value;
      let Warning = location.querySelector("#Warning_Text").value;
      let radiusLargeOverride = location.querySelector("#radiusLargeOverride").value;
      let radiusMediumOverride = location.querySelector("#radiusMediumOverride")
        .value;
      let radiusSmallOverride = location.querySelector("#radiusSmallOverride").value;
      let arrayID = i + 1 - 1;
      let FLM_Zone1 = location.querySelector("#FLM_ZONE1") ? location.querySelector(
          "#FLM_ZONE1")
        .value : "";
      let FLM_Zone2 = location.querySelector("#FLM_ZONE2") ? location.querySelector(
          "#FLM_ZONE2")
        .value : "";
      let FLM_Zone3 = location.querySelector("#FLM_ZONE3") ? location.querySelector(
          "#FLM_ZONE3")
        .value : "";
      let SLM_Zone1 = location.querySelector("#SLM_ZONE1") ? location.querySelector(
          "#SLM_ZONE1")
        .value : "";
      let SLM_Zone2 = location.querySelector("#SLM_ZONE2") ? location.querySelector(
          "#SLM_ZONE2")
        .value : "";
      let SLM_Zone3 = location.querySelector("#SLM_ZONE3") ? location.querySelector(
          "#SLM_ZONE3")
        .value : "";
      let Install_Zone1 = location.querySelector("#INSTALL_ZONE1") ? location
        .querySelector(
          "#INSTALL_ZONE1").value : "";
      let Install_Zone2 = location.querySelector("#INSTALL_ZONE2") ? location
        .querySelector(
          "#INSTALL_ZONE2").value : "";
      let Install_Zone3 = location.querySelector("#INSTALL_ZONE3") ? location
        .querySelector(
          "#INSTALL_ZONE3").value : "";
      let Deinstall_Zone1 = location.querySelector("#DEINSTALL_ZONE1") ? location
        .querySelector(
          "#DEINSTALL_ZONE1").value : "";
      let Deinstall_Zone2 = location.querySelector("#DEINSTALL_ZONE2") ? location
        .querySelector(
          "#DEINSTALL_ZONE2").value : "";
      let Deinstall_Zone3 = location.querySelector("#DEINSTALL_ZONE3") ? location.querySelector(
        "#DEINSTALL_ZONE3").value : "";

      radiusLarge = radiusLargeOverride && location.querySelector("#RADIUS_75") ? location
        .querySelector("#RADIUS_75").value : "75";
      radiusMedium = radiusMediumOverride && location.querySelector("#RADIUS_50") ? location
        .querySelector("#RADIUS_50").value : "50";
      radiusSmall = radiusSmallOverride && location.querySelector("#RADIUS_25") ? location
        .querySelector("#RADIUS_25").value : "25";

      let geoData = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinates
        },
        properties: {
          id: locationID,
          description: locationInfo,
          arrayID: arrayID,
          name: locationID,
          address: Address,
          city: City,
          googleAddress: Google,
          state: State,
          warning: Warning,
          radius: {
            large: radiusLarge,
            medium: radiusMedium,
            small: radiusSmall
          },
          slm: {
            zone1: SLM_Zone1,
            zone2: SLM_Zone2,
            zone3: SLM_Zone3
          },
          flm: {
            zone1: FLM_Zone1,
            zone2: FLM_Zone2,
            zone3: FLM_Zone3
          },
          install: {
            zone1: Install_Zone1,
            zone2: Install_Zone2,
            zone3: Install_Zone3
          },
          deintsall: {
            zone1: Deinstall_Zone1,
            zone2: Deinstall_Zone2,
            zone3: Deinstall_Zone3
          }
        }
      };

      mapLocations.features.push(geoData);
    });
    console.log("Map Locations updated: ", mapLocations);
    mapLocations.features.splice(0, 2);
    if (mapLocations) {
      mapLoad = true;
    }
  }

  map.once("idle", () => {
    console.log("Map event loaded");
    getGeoData();
    /**
     * Create a new MapboxGeocoder instance.
     */
    map.addSource("places", {
      type: "geojson",
      data: stores
    });
    buildLocationList(stores);
    addMarkers();
    //
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      types: "address, postcode, place, region, poi", // address, city?, zip
      countries: "US, CA", //Add Country Codes to show more countries
      clearAndBlurOnEsc: true,
      autocomplete: false,
      placeholder: "Enter your address",
      marker: {
        color: "#000000"
      }
    });
    /**
     * Add all the things to the page:
     * - The location listings on the side of the page
     * - The search box (MapboxGeocoder) onto the map
     * - The markers onto the map
     */
    map.addControl(geocoder, "top-left");
    /**
     * Listen for when a geocoder result is returned. When one is returned:
     * - Calculate distances
     * - Sort stores by distance
     * - Rebuild the listings
     * - Adjust the map camera
     * - Open a popup for the closest store
     * - Highlight the listing for the closest store.
     */

    let circleLarge;
    let circleMedium;
    let circleSmall;

    let lastArrayID = null;
    let tempArray = null;

    geocoder.on("result", (event) => {
      /* Get the coordinate of the search result */
      const searchResult = event.result.geometry;

      /**
       * Calculate distances:
       * For each store, use turf.disance to calculate the distance
       * in miles between the searchResult and the store. Assign the
       * calculated value to a property called `distance`.
       */
      const options = {
        units: "miles"
      };
      for (const store of stores.features) {
        store.properties.distance = turf.distance(searchResult, store.geometry,
          options);
      }

      /**
       * Sort stores by distance from closest to the `searchResult`
       * to furthest.
       */
      stores.features.sort((a, b) => {
        if (a.properties.distance > b.properties.distance) {
          return 1;
        }
        if (a.properties.distance < b.properties.distance) {
          return -1;
        }
        return 0; // a must be equal to b
      });

      /**
       * Rebuild the listings:
       * Remove the existing listings and build the location
       * list again using the newly sorted stores.
       */
      const listings = document.getElementById("listings");
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }
      buildLocationList(stores);

      /* Open a popup for the closest store. */
      //createPopUp(stores.features[0]);

      /** Highlight the listing for the closest store. */
      const activeListing = document.getElementById(
        `listing-${stores.features[0].properties.id}`);
      activeListing.classList.add("active");

      const listingsCheck = document.querySelectorAll(".item, .map_divider");

      for (let i = 0; i < listingsCheck.length; i++) {
        if (i !== 0) {
          listingsCheck[i].classList.add("hide");
        }
      }

      document.getElementById(`listing-${stores.features[0].properties.id}`);

      /** Add radius sizes for searchresult */
      var optionsRadius = {
        steps: 80,
        units: "miles"
      };

      var radiusLarge = stores.features[0].properties.radius.large;
      var circleLarge = turf.circle(stores.features[0].geometry.coordinates,
        radiusLarge,
        optionsRadius);

      var radiusMedium = stores.features[0].properties.radius.medium;
      var circleMedium = turf.circle(stores.features[0].geometry.coordinates,
        radiusMedium,
        optionsRadius);

      var radiusSmall = stores.features[0].properties.radius.small;
      var circleSmall = turf.circle(stores.features[0].geometry.coordinates,
        radiusSmall,
        optionsRadius);

      // Define lastArrayID outside of your function so it maintains its value between calls
      //let lastArrayID = null;
      //let tempArray = stores.features[0].properties.arrayID;
      //console.log(tempArray)

      const sizeProperties = {
        large: { circleSize: circleLarge, color: 'black', opacity: 0.2 },
        medium: { circleSize: circleMedium, color: 'blue', opacity: 0.2 },
        small: { circleSize: circleSmall, color: 'red', opacity: 0.2 }
      };

      function mainFunction(searchResult, stores, circleLarge, circleMedium, circleSmall,
        map, callback) {
        if (searchResult) {

          // Update tempArray to the current arrayID
          let tempArray = stores.features[0].properties.arrayID;

          // If lastArrayID is not null, remove the old layers
          console.log(`Last arrayID: ${lastArrayID}`)
          if (lastArrayID !== null) {
            console.log('Entering loop to add/remove layers');
            ['large', 'medium', 'small'].forEach(size => {
              const oldLayerId = `${size}-${lastArrayID}`;
              removeLayer(map, oldLayerId);
            });
          }

          console.log(`Current arrayID: ${tempArray}`);
          ['large', 'medium', 'small'].forEach(size => {
            // Use the new arrayID when adding new layers
            const newLayerId = `${size}-${tempArray}`;
            const { circleSize, color, opacity } = sizeProperties[size];

            console.log(`Adding new layer: ${newLayerId}`);
            map.addLayer({
              id: newLayerId,
              type: "fill",
              source: {
                type: "geojson",
                data: circleSize
              },
              paint: {
                "fill-color": color,
                "fill-opacity": opacity
              }
            });
          });

          // Update lastArrayID to the current arrayID
          lastArrayID = tempArray;
          console.log(`Updated lastArrayID: ${lastArrayID}`);
        }
      }

      function removeLayer(map, layerId) {
        if (map.getLayer(layerId)) {
          console.log(`Removing old layer: ${layerId}`);
          map.removeLayer(layerId);
          map.removeSource(layerId);
        } else {
          console.log(`No old layer to remove: ${layerId}`);
        }
      }

      // Now you can call mainFunction() and lastArrayID will maintain its value between calls
      mainFunction(searchResult, stores, circleLarge, circleMedium, circleSmall,
        map);

      /**
       * Adjust the map camera:
       * Get a bbox that contains both the geocoder result and
       * the closest store. Fit the bounds to that bbox.
       */
      const bbox = getBbox(stores, 0, searchResult);

      if (mqLarge.matches) {
        map.fitBounds(bbox, {
          padding: 200 // this controls the padding around the bounding box when searchresult is found
        });
        map.flyTo({
          center: stores.features[0].geometry.coordinates,
          zoom: largestMap
        });
      } else if (mqSmall.matches) {
        map.fitBounds(bbox, {
          padding: 0 // this controls the padding around the bounding box when searchresult is found
        });
        map.flyTo({
          center: stores.features[0].geometry.coordinates,
          zoom: mediumMap
        });
      } else {
        map.fitBounds(bbox, {
          padding: 0 // this controls the padding around the bounding box when searchresult is found
        });
        map.flyTo({
          center: stores.features[0].geometry.coordinates,
          zoom: smallMap
        });
      }
    });
  });

  const stores = mapLocations;

  /**
   * Assign a unique id to each store. You'll use this `id`
   * later to associate each point on the map with a listing
   * in the sidebar.
   */
  stores.features.forEach((store, i) => {
    store.properties.id = i;
  });
  /**
   * Wait until the map loads to make changes to the map.
   */

  /**
   * Using the coordinates (lng, lat) for
   * (1) the search result and
   * (2) the closest store
   * construct a bbox that will contain both points
   */
  function getBbox(sortedStores, storeIdentifier, searchResult) {
    const lats = [
      sortedStores.features[storeIdentifier].geometry.coordinates[1],
      searchResult.coordinates[1]
    ];
    const lons = [
      sortedStores.features[storeIdentifier].geometry.coordinates[0],
      searchResult.coordinates[0]
    ];
    const sortedLons = lons.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    const sortedLats = lats.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    return [
      [sortedLons[0], sortedLats[0]],
      [sortedLons[1], sortedLats[1]]
    ];
  }

  /**
   * Add a marker to the map for every store listing.
   **/
  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    for (const marker of stores.features) {
      /* Create a div element for the marker. */
      const el = document.createElement("div");
      // marker to change to logo
      el.innerHTML =
        `<div class="map_svg-icon">
<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <path d="M49.2597 41.6615L26.3388 18.7406C28.1073 14.0709 27.1154 8.59448 23.3553 4.83443C19.5339 1.01302 13.9389 0.0481327 9.22061 1.93726L17.7365 10.4532L10.4531 17.7366L1.93717 9.2207C0.0481772 13.9391 1.01306 19.5341 4.83434 23.3554C8.5944 27.1155 14.0708 28.1074 18.7405 26.3389L41.6615 49.2599C39.893 53.9296 40.885 59.406 44.645 63.1661C48.4664 66.9875 54.0614 67.9524 58.7797 66.0632L50.2638 57.5473L57.5472 50.2639L66.0632 58.7798C67.9521 54.0614 66.9873 48.4664 63.166 44.6451C59.4059 40.8849 53.9295 39.8929 49.2597 41.6615Z" style="fill: rgb(214, 0, 0);" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M7.92988 23.3554C4.73906 20.1646 3.54149 15.7373 4.33239 11.616L1.93698 9.2207C0.0478594 13.9391 1.01287 19.5341 4.83416 23.3554C7.78591 26.3072 11.7954 27.5522 15.642 27.0958C12.8238 26.7632 10.0927 25.5183 7.92988 23.3554Z" fill="white" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M52.3555 41.6615C53.3593 41.2814 54.4004 41.0296 55.4538 40.9046C54.2041 40.7572 52.9378 40.7896 51.6956 41.0016L52.3555 41.6615Z" fill="#989898" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M47.7406 63.1659C43.9805 59.4059 42.9886 53.9295 44.7571 49.2598L21.836 26.3389C21.0434 26.639 20.2271 26.8578 19.4004 26.9988L41.6614 49.2598C39.8928 53.9295 40.8848 59.4059 44.6449 63.1659C47.595 66.1161 51.6022 67.3621 55.4473 66.9083C52.6307 66.5742 49.9018 65.3273 47.7406 63.1659Z" fill="white" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M55.8599 17.293L50.7068 12.1399L51.9005 7.22519L62.9089 1.79834L66.2015 5.09089L60.7746 16.0993L55.8599 17.293Z" fill="#CDCDC6" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M55.8614 17.2945L50.7065 12.1396L29.3343 33.5119L34.4891 38.6667L55.8614 17.2945Z" fill="#989898" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M33.1717 46.8156L21.1842 34.8281C20.4715 34.1154 20.4715 32.96 21.1842 32.2473L22.3157 31.1157C23.6113 29.8201 25.7119 29.8201 27.0075 31.1157L36.8841 40.9923C38.1796 42.2879 38.1796 44.3885 36.8841 45.6841L35.7525 46.8156C35.04 47.5283 33.8844 47.5283 33.1717 46.8156Z" fill="#68C0E0" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M24.2731 34.8281C23.5604 34.1154 23.5604 32.9599 24.2731 32.2473L25.4047 31.1157C25.6472 30.8732 25.9178 30.6761 26.2062 30.5244C24.954 29.8655 23.369 30.0626 22.316 31.1157L21.1844 32.2473C20.4717 32.9599 20.4717 34.1154 21.1844 34.8281L33.1719 46.8156C33.8846 47.5283 35.0401 47.5283 35.7527 46.8156L36.0067 46.5617L24.2731 34.8281Z" fill="#3282A1" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M10.6483 66.2013L1.79858 57.3516L3.41956 51.0354L21.5795 35.2231L32.7767 46.4204L16.9644 64.5803L10.6483 66.2013Z" fill="#68C0E0" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M4.89418 57.3516L6.51529 51.0354L23.0203 36.664L21.5795 35.2231L3.41956 51.0354L1.79858 57.3516L10.6483 66.2013L13.1117 65.5691L4.89418 57.3516Z" fill="#3282A1" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M63.6353 43.8443C59.9182 40.1268 54.3856 38.8615 49.431 40.5626L41.3164 32.448L56.2022 17.5624L60.9314 16.4137C61.1225 16.3672 61.2832 16.2385 61.3703 16.0621L66.7971 5.05372C66.9228 4.79858 66.8721 4.49165 66.671 4.29058L63.3785 0.998022C63.1772 0.796944 62.8706 0.74621 62.6152 0.871983L51.6068 6.2987C51.4302 6.38556 51.3016 6.5464 51.2551 6.73765L50.1054 11.4714L35.2226 26.3543L27.1064 18.2381C28.807 13.2833 27.5421 7.75101 23.8248 4.03385C19.9249 0.133812 14.0955 -1.0611 8.97354 0.98939C8.76635 1.07226 8.61468 1.25382 8.56979 1.47243C8.5249 1.69104 8.5929 1.91775 8.75068 2.0754L16.7971 10.1218L10.4527 16.4663L2.40649 8.41998C2.24871 8.2622 2.0224 8.19433 1.80353 8.23896C1.58492 8.28385 1.40336 8.43552 1.32049 8.64271C-0.730006 13.7645 0.464775 19.5939 4.36455 23.4937C8.08171 27.211 13.6141 28.4761 18.5688 26.7753L21.9808 30.1872C21.9352 30.2287 21.8902 30.2714 21.8463 30.3153L20.7147 31.4469C20.2445 31.9169 19.9857 32.5419 19.9857 33.2068C19.9857 33.8205 20.2087 34.3986 20.6124 34.8539L2.98343 50.2039C2.88196 50.2922 2.80971 50.4093 2.77624 50.5395L1.15527 56.8556C1.09696 57.083 1.16297 57.3243 1.32899 57.4902L10.1787 66.3399C10.3049 66.4661 10.4745 66.5345 10.6483 66.5345C10.7033 66.5345 10.7588 66.5276 10.8134 66.5136L17.1296 64.8927C17.2598 64.8592 17.377 64.7869 17.4653 64.6855L32.8152 47.0566C33.2705 47.4603 33.8487 47.6832 34.4623 47.6832C35.1271 47.6832 35.7521 47.4244 36.2223 46.9542L37.3538 45.8226C37.3978 45.7787 37.4402 45.7337 37.4817 45.6881L40.8936 49.1001C39.193 54.0549 40.4579 59.5872 44.1752 63.3043C46.809 65.9382 50.3222 67.3383 53.9038 67.338C55.6254 67.3379 57.3635 67.0142 59.0263 66.3485C59.2335 66.2657 59.3852 66.0841 59.4301 65.8655C59.475 65.6469 59.407 65.4202 59.2492 65.2625L51.2027 57.216L57.5471 50.8716L65.5935 58.9179C65.7513 59.0757 65.9781 59.1439 66.1965 59.099C66.4151 59.0541 66.5966 58.9024 66.6795 58.6952C68.73 53.5734 67.5351 47.7442 63.6353 43.8443ZM34.5241 37.3622L30.3084 33.1466L50.7067 12.7482L52.8136 14.8551L54.9224 16.9639L34.5241 37.3622ZM52.4724 7.3527L62.7758 2.27355L65.3955 4.89328L60.3163 15.1966L56.0658 16.229L53.7526 13.9158L51.4402 11.6032L52.4724 7.3527ZM19.2098 25.5381C19.083 25.4112 18.9132 25.3435 18.74 25.3435C18.6612 25.3435 18.5815 25.3574 18.505 25.3865C13.9362 27.1167 8.75427 26.0053 5.30367 22.5546C2.02333 19.2742 0.861221 14.483 2.21139 10.103L9.98332 17.8749C10.1079 17.9995 10.2767 18.0695 10.4529 18.0695C10.6292 18.0695 10.798 17.9996 10.9226 17.8749L18.206 10.5913C18.4654 10.3321 18.4654 9.9116 18.206 9.65235L10.4341 1.88043C14.8138 0.530389 19.6052 1.69237 22.8857 4.97257C26.3364 8.4233 27.448 13.6051 25.7177 18.174C25.6252 18.4182 25.6845 18.694 25.8692 18.8787L34.2836 27.293L31.4234 30.1533L27.196 25.9259C26.9366 25.6665 26.5162 25.6665 26.2568 25.9259C25.9974 26.1851 25.9974 26.6056 26.2568 26.8649L30.4844 31.0924L29.3693 32.2075L27.4771 30.3153C26.7251 29.5632 25.7253 29.149 24.6616 29.149C24.1259 29.149 23.6064 29.2543 23.1264 29.4548L19.2098 25.5381ZM16.5991 63.6576L10.8498 65.133L2.53572 56.8188L4.01127 51.0697L21.548 35.7999L31.8688 46.1208L16.5991 63.6576ZM36.4146 44.8835L35.283 46.0151C34.8304 46.4677 34.094 46.4677 33.6413 46.0151L21.6538 34.0274C21.4345 33.8083 21.3138 33.5168 21.3138 33.2066C21.3138 32.8967 21.4347 32.6051 21.6539 32.3857L22.7855 31.2542C23.2866 30.7531 23.9531 30.4768 24.6618 30.4768C25.3706 30.4768 26.0369 30.7529 26.538 31.2542L36.4146 41.1306C36.9157 41.6317 37.1918 42.2982 37.1918 43.007C37.1918 43.7158 36.9157 44.3824 36.4146 44.8835ZM65.7885 57.2349L58.0166 49.463C57.7572 49.2036 57.3368 49.2036 57.0774 49.463L49.794 56.7465C49.6694 56.871 49.5996 57.0399 49.5996 57.216C49.5996 57.3921 49.6696 57.561 49.794 57.6854L57.5659 65.4575C53.1862 66.8077 48.3947 65.6454 45.1143 62.3654C41.6636 58.9146 40.552 53.7328 42.2823 49.1639C42.3748 48.9197 42.3155 48.644 42.1309 48.4592L38.2122 44.5406C38.8132 43.0955 38.5275 41.3656 37.3538 40.1919L35.4634 38.3015L36.5784 37.1864L40.8041 41.4121C40.9338 41.5418 41.1037 41.6066 41.2737 41.6066C41.4437 41.6066 41.6135 41.5418 41.7433 41.4121C42.0027 41.1528 42.0027 40.7323 41.7433 40.4731L37.5176 36.2474L40.3777 33.3873L48.7903 41.7999C48.9751 41.9846 49.2508 42.0441 49.4952 41.9514C54.0641 40.2213 59.2459 41.3328 62.6965 44.7834C65.9765 48.0637 67.1386 52.8549 65.7885 57.2349Z" fill="black" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M11.0615 56.9386C11.1912 57.0684 11.3611 57.1332 11.5311 57.1332C11.7011 57.1332 11.871 57.0684 12.0007 56.9386L23.8277 45.1115C24.087 44.8523 24.087 44.4318 23.8277 44.1726C23.5683 43.9132 23.1479 43.9132 22.8885 44.1726L11.0616 55.9997C10.8021 56.2589 10.8021 56.6794 11.0615 56.9386Z" fill="black" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M20.9701 41.3157C20.7213 41.0462 20.3011 41.0293 20.0318 41.2785L7.73519 52.6361C7.46584 52.8848 7.44911 53.305 7.698 53.5744C7.82882 53.7161 8.00719 53.7878 8.18595 53.7878C8.34705 53.7878 8.50869 53.7296 8.63632 53.6116L20.9329 42.254C21.2022 42.0052 21.2188 41.585 20.9701 41.3157Z" fill="black" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M14.4257 60.3019C14.5534 60.4199 14.7149 60.4781 14.876 60.4781C15.0548 60.4781 15.2332 60.4063 15.364 60.2647L26.7214 47.9681C26.9703 47.6988 26.9536 47.2785 26.6843 47.0298C26.4148 46.7808 25.9947 46.7978 25.7459 47.067L14.3885 59.3636C14.1396 59.6329 14.1562 60.0531 14.4257 60.3019Z" fill="black" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
</svg></div>`;
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker.properties.id}`;
      /* Assign the `marker` class to each marker for styling. */
      el.className = "marker";

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, {
          offset: [0, -23]
        })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

      /**
       * Listen to the element and when it is clicked, do three things:
       * 1. Fly to the point
       * 2. Close all other popups and display popup for clicked store
       * 3. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      el.addEventListener("click", (e) => {
        flyToStore(marker);
        createPopUp(marker);
        const activeItem = document.getElementsByClassName("active");
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        const listing = document.getElementById(`listing-${marker.properties.id}`);
        listing.classList.add("active");
      });
    }
  }

  /**
   * Add a listing for each store to the sidebar.
   **/
  function buildLocationList(stores) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById("listings");
      const listing = listings.appendChild(document.createElement("div"));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${store.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = "item";
      const divider = listings.appendChild(document.createElement("div"));
      divider.className = "map_divider";

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement("a"));
      link.href = "#";
      link.className = "map_heading-large";
      link.id = `link-${store.properties.id}`;
      link.innerHTML = `${store.properties.name}`;

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement("div"));
      details.innerHTML = `
    `;

      /* this is the city name
      <div class="map_address-info"><div class="map-heading-small">${store.properties.city}</div></div>
      </div>
      */

      const roundedDistance = Math.round(store.properties.distance * 100) / 100;

      const existing = `
    <a id="existing" href="https://atmgeeks.my.site.com/portal" class="btn btn-small-2">Existing customer link</a>
    `;

      const nonCustomer = `
    <a id="new_customer" href="${domain}/service-request" class="btn btn-small-2">New customer link</a>
    `;

      const zone1 = `
    <div class="zone-wrapper">
    <div class="zone-header">Zone 1</div>
    <div class="zone-pricing"><div>FLM</div>$${store.properties.flm.zone1}</div>
    <div class="zone-pricing"><div>SLM</div>$${store.properties.slm.zone1}</div>
    <div class="zone-pricing"><div>Install</div>$${store.properties.install.zone1}</div>
    <div class="zone-pricing"><div>Deinstall</div>$${store.properties.deintsall.zone1}</div>
    </div>
    `;

      const zone2 = `
    <div class="zone-wrapper">
    <div class="zone-header">Zone 2</div>
    <div class="zone-pricing"><div>FLM</div>$${store.properties.flm.zone2}</div>
    <div class="zone-pricing"><div>SLM</div>$${store.properties.slm.zone2}</div>
    <div class="zone-pricing"><div>Install</div>$${store.properties.install.zone2}</div>
    <div class="zone-pricing"><div>Deinstall</div>$${store.properties.deintsall.zone2}</div>
    </div>
    `;

      const zone3 = `
    <div class="zone-wrapper">
    <div class="zone-header">Zone 3</div>
    <div class="zone-pricing"><div>FLM</div>$${store.properties.flm.zone3}</div>
    <div class="zone-pricing"><div>SLM</div>$${store.properties.slm.zone3}</div>
    <div class="zone-pricing"><div>Install</div>$${store.properties.install.zone3}</div>
    <div class="zone-pricing"><div>Deinstall</div>$${store.properties.deintsall.zone3}</div>
    </div>
    `;

      if (store.properties.distance) {
        details.innerHTML += `
      <div class="map_additional-info">
      <div class="additional-info_line">
      <div class="map_svg-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" style="width:100%;height:100%">
      <path d="M13.4227 17.3618L16.9348 8.19598C17.2164 7.46107 16.5389 6.78361 15.804 7.06521L6.63824 10.5773C5.80779 10.8955 5.78079 12.06 6.5981 12.3083L10.0751 13.3648C10.3455 13.447 10.553 13.6545 10.6352 13.9249L11.6917 17.4019C11.94 18.2192 13.1045 18.1922 13.4227 17.3618Z" fill="currentColor"></path>
      </svg>
      </div>${roundedDistance} miles away</div>
      </div>
      `;

        if (roundedDistance <= `${store.properties.radius.small}`) {
          details.innerHTML += `
        ${zone1}
        <div class="map_additional-info">${existing}${nonCustomer}</div>
        `;
        } else if (roundedDistance > `${store.properties.radius.small}` && roundedDistance <=
          `${store.properties.radius.medium}`) {
          // check radius values
          details.innerHTML += `
        ${zone2}
        <div class="map_additional-info">${existing}${nonCustomer}</div>
        `;
        } else if (roundedDistance > `${store.properties.radius.medium}` && roundedDistance <=
          `${store.properties.radius.large}`) {
          details.innerHTML += `
        ${zone3}
        <div class="map_additional-info">${existing}${nonCustomer}</div>
        `;
        } else if (roundedDistance > `${store.properties.radius.large}`) {
          details.innerHTML += `
        <div class="map_additional-info"><a id="" href="mailto:services@atmgeeks.com" class="btn">Contact our team for prices</a></div>
        `;
        }
      }

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      link.addEventListener("click", function () {
        for (const feature of stores.features) {
          if (this.id === `link-${feature.properties.id}`) {
            flyToStore(feature);
            createPopUp(feature);
          }
        }
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        this.parentNode.classList.add("active");
      });
    }
  }

  /**
   * Use Mapbox GL JS's `flyTo` to move the camera smoothly
   * a given center point.
   **/
  function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 7
    });
  }

  /**
   * Create a Mapbox GL JS `Popup`.
   **/
  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({
        closeOnClick: false
      })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `
    <h3 class="map_heading-large">${currentFeature.properties.name}</h3>
    <h4 class="map-heading-small">${currentFeature.properties.address}</h4>
    <div style="color:red">
    ${currentFeature.properties.warning}</div>
    `
      )
      .addTo(map);
  }

}

function initMapboxJS() {
  /**
   * Add the MJS map to the page
   */
  L.mapbox.accessToken = ACCESS_TOKEN;
  const map = L.mapbox.map('map').setView([-95.7129, 37.0902], 4.5);
  L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v12').addTo(map);

  /**
   * vars
   */
  var domain = "https://www.atmgeeks.com";
  var searchInput = document.getElementById("searchInput");
  var form = document.getElementById("form_val");

  /**
   * Remove some things before we collect the data
   */
  $(".w-condition-invisible").remove();
  $(".locations_sidebar").addClass("hide");

  /**
   * Set maplocations array for data
   */
  var mapLocations = {
    type: "FeatureCollection",
    features: []
  };

  /**
   * For each webflow CMS data collect data and build json geo information
   */
  var listLocations = document.getElementById("location-list_2").childNodes;
  var radiusLarge = "75";
  var radiusMedium = "50";
  var radiusSmall = "25";

  function getGeoData() {
    for (var i = 0; i < listLocations.length; i++) {
      var location = listLocations[i];
      var locationLat = location.querySelector("#locationLatitude").value;
      var locationLong = location.querySelector("#locationLongitude").value;
      var locationInfo = location.querySelector(".locations-map_card").innerHTML;
      var coordinates = [locationLong, locationLat];
      var locationID = location.querySelector("#locationID").value;
      var City = location.querySelector("#Map_City").value;
      var State = location.querySelector("#Map_State").value;
      var Address = location.querySelector("#Map_Address").value;
      var Google = location.querySelector("#Google_Address").value;
      var Warning = location.querySelector("#Warning_Text").value;
      var radiusLargeOverride = location.querySelector("#radiusLargeOverride").value;
      var radiusMediumOverride = location.querySelector("#radiusMediumOverride").value;
      var radiusSmallOverride = location.querySelector("#radiusSmallOverride").value;
      var arrayID = i;

      // Rest of the code for building geoData...

      var geoData = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinates
        },
        properties: {
          // Properties data here...
        }
      };
      mapLocations.features.push(geoData);
    }
    console.log("Map Locations updated: ", mapLocations);
    if (mapLocations) {
      mapLoad = true;
    }
  }

  // Other parts of the code...
  map.on("load", function () {
    console.log("Map event loaded");
    getGeoData();
    map.featureLayer.setGeoJSON(stores);
    buildLocationList(stores);
    addMarkers();
    var geocoder = L.mapbox.geocoder('mapbox.places', {
      autocomplete: false
    });
    geocoder.query({
      types: "address,postcode,place,region,poi",
      countries: "US, CA",  //Add Country Codes to show more countries
      clearAndBlurOnEsc: true,
      placeholder: "Enter your address",
      marker: {
        color: "#000000"
      }
    }, function (err, data) {
      if (err) throw err;
      var searchResult = data.lbounds;
      var options = {
        units: "miles"
      };
      for (var i = 0; i < stores.features.length; i++) {
        var store = stores.features[i];
        store.properties.distance = turf.distance(searchResult, store.geometry, options);
      }
      stores.features.sort(function (a, b) {
        return a.properties.distance - b.properties.distance;
      });
      var listings = document.getElementById("listings");
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }
      buildLocationList(stores);
      var activeListing = document.getElementById(
        `listing-${stores.features[0].properties.id}`);
      activeListing.classList.add("active");
      var listingsCheck = document.querySelectorAll(".item, .map_divider");
      for (var i = 0; i < listingsCheck.length; i++) {
        if (i !== 0) {
          listingsCheck[i].classList.add("hide");
        }
      }
      var optionsRadius = {
        steps: 80,
        units: "miles"
      };
      var radiusLarge = stores.features[0].properties.radius.large;
      var circleLarge = turf.circle(stores.features[0].geometry.coordinates, radiusLarge,
        optionsRadius);
      var radiusMedium = stores.features[0].properties.radius.medium;
      var circleMedium = turf.circle(stores.features[0].geometry.coordinates, radiusMedium,
        optionsRadius);
      var radiusSmall = stores.features[0].properties.radius.small;
      var circleSmall = turf.circle(stores.features[0].geometry.coordinates, radiusSmall,
        optionsRadius);
      var tempArray = stores.features[0].properties.arrayID;
      var sizeProperties = {
        large: { circleSize: circleLarge, color: 'black', opacity: 0.2 },
        medium: { circleSize: circleMedium, color: 'blue', opacity: 0.2 },
        small: { circleSize: circleSmall, color: 'red', opacity: 0.2 }
      };

      function mainFunction(searchResult, stores, circleLarge, circleMedium, circleSmall,
        map, callback) {
        if (searchResult) {
          tempArray = stores.features[0].properties.arrayID;
          ['large', 'medium', 'small'].forEach(function (size) {
            if (tempArray !== null) {
              var oldLayerId = `${size}-${tempArray}`;
              removeLayer(map, oldLayerId);
            }
            var newLayerId = `${size}-${tempArray}`;
            var { circleSize, color, opacity } = sizeProperties[size];
            L.geoJson(circleSize, {
              style: function (feature) {
                return { color: color, fillOpacity: opacity };
              }
            }).addTo(map);
          });
          tempArray = null;
        }
      }

      function removeLayer(map, layerId) {
        var layer = map.getLayer(layerId);
        if (layer) {
          map.removeLayer(layer);
        }
      }
      mainFunction(searchResult, stores, circleLarge, circleMedium, circleSmall, map);
      var bbox = getBbox(stores, 0, searchResult);
      if (mq.matches) {
        map.fitBounds(bbox, {
          padding: 200
        });
        map.flyTo(stores.features[0].geometry.coordinates, 7);
      } else {
        map.fitBounds(bbox, {
          padding: 0
        });
        map.flyTo(stores.features[0].geometry.coordinates, 6);
      }
    });
  });

  const stores = mapLocations;

  /**
   * Assign a unique id to each store. You'll use this `id`
   * later to associate each point on the map with a listing
   * in the sidebar.
   */
  stores.features.forEach((store, i) => {
    store.properties.id = i;
  });
  /**
   * Wait until the map loads to make changes to the map.
   */

  /**
   * Using the coordinates (lng, lat) for
   * (1) the search result and
   * (2) the closest store
   * construct a bbox that will contain both points
   */
  function getBbox(sortedStores, storeIdentifier, searchResult) {
    const lats = [
      sortedStores.features[storeIdentifier].geometry.coordinates[1],
      searchResult.coordinates[1]
    ];
    const lons = [
      sortedStores.features[storeIdentifier].geometry.coordinates[0],
      searchResult.coordinates[0]
    ];
    const sortedLons = lons.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    const sortedLats = lats.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    return [
      [sortedLons[0], sortedLats[0]],
      [sortedLons[1], sortedLats[1]]
    ];
  }

  /**
   * Add a marker to the map for every store listing.
   **/
  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    for (const marker of stores.features) {
      /* Create a div element for the marker. */
      const el = document.createElement("div");
      // marker to change to logo
      el.innerHTML =
        `<div class="map_svg-icon">
<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <path d="M49.2597 41.6615L26.3388 18.7406C28.1073 14.0709 27.1154 8.59448 23.3553 4.83443C19.5339 1.01302 13.9389 0.0481327 9.22061 1.93726L17.7365 10.4532L10.4531 17.7366L1.93717 9.2207C0.0481772 13.9391 1.01306 19.5341 4.83434 23.3554C8.5944 27.1155 14.0708 28.1074 18.7405 26.3389L41.6615 49.2599C39.893 53.9296 40.885 59.406 44.645 63.1661C48.4664 66.9875 54.0614 67.9524 58.7797 66.0632L50.2638 57.5473L57.5472 50.2639L66.0632 58.7798C67.9521 54.0614 66.9873 48.4664 63.166 44.6451C59.4059 40.8849 53.9295 39.8929 49.2597 41.6615Z" style="fill: rgb(214, 0, 0);" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M7.92988 23.3554C4.73906 20.1646 3.54149 15.7373 4.33239 11.616L1.93698 9.2207C0.0478594 13.9391 1.01287 19.5341 4.83416 23.3554C7.78591 26.3072 11.7954 27.5522 15.642 27.0958C12.8238 26.7632 10.0927 25.5183 7.92988 23.3554Z" fill="white" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M52.3555 41.6615C53.3593 41.2814 54.4004 41.0296 55.4538 40.9046C54.2041 40.7572 52.9378 40.7896 51.6956 41.0016L52.3555 41.6615Z" fill="#989898" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M47.7406 63.1659C43.9805 59.4059 42.9886 53.9295 44.7571 49.2598L21.836 26.3389C21.0434 26.639 20.2271 26.8578 19.4004 26.9988L41.6614 49.2598C39.8928 53.9295 40.8848 59.4059 44.6449 63.1659C47.595 66.1161 51.6022 67.3621 55.4473 66.9083C52.6307 66.5742 49.9018 65.3273 47.7406 63.1659Z" fill="white" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M55.8599 17.293L50.7068 12.1399L51.9005 7.22519L62.9089 1.79834L66.2015 5.09089L60.7746 16.0993L55.8599 17.293Z" fill="#CDCDC6" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M55.8614 17.2945L50.7065 12.1396L29.3343 33.5119L34.4891 38.6667L55.8614 17.2945Z" fill="#989898" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M33.1717 46.8156L21.1842 34.8281C20.4715 34.1154 20.4715 32.96 21.1842 32.2473L22.3157 31.1157C23.6113 29.8201 25.7119 29.8201 27.0075 31.1157L36.8841 40.9923C38.1796 42.2879 38.1796 44.3885 36.8841 45.6841L35.7525 46.8156C35.04 47.5283 33.8844 47.5283 33.1717 46.8156Z" fill="#68C0E0" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M24.2731 34.8281C23.5604 34.1154 23.5604 32.9599 24.2731 32.2473L25.4047 31.1157C25.6472 30.8732 25.9178 30.6761 26.2062 30.5244C24.954 29.8655 23.369 30.0626 22.316 31.1157L21.1844 32.2473C20.4717 32.9599 20.4717 34.1154 21.1844 34.8281L33.1719 46.8156C33.8846 47.5283 35.0401 47.5283 35.7527 46.8156L36.0067 46.5617L24.2731 34.8281Z" fill="#3282A1" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M10.6483 66.2013L1.79858 57.3516L3.41956 51.0354L21.5795 35.2231L32.7767 46.4204L16.9644 64.5803L10.6483 66.2013Z" fill="#68C0E0" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M4.89418 57.3516L6.51529 51.0354L23.0203 36.664L21.5795 35.2231L3.41956 51.0354L1.79858 57.3516L10.6483 66.2013L13.1117 65.5691L4.89418 57.3516Z" fill="#3282A1" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M63.6353 43.8443C59.9182 40.1268 54.3856 38.8615 49.431 40.5626L41.3164 32.448L56.2022 17.5624L60.9314 16.4137C61.1225 16.3672 61.2832 16.2385 61.3703 16.0621L66.7971 5.05372C66.9228 4.79858 66.8721 4.49165 66.671 4.29058L63.3785 0.998022C63.1772 0.796944 62.8706 0.74621 62.6152 0.871983L51.6068 6.2987C51.4302 6.38556 51.3016 6.5464 51.2551 6.73765L50.1054 11.4714L35.2226 26.3543L27.1064 18.2381C28.807 13.2833 27.5421 7.75101 23.8248 4.03385C19.9249 0.133812 14.0955 -1.0611 8.97354 0.98939C8.76635 1.07226 8.61468 1.25382 8.56979 1.47243C8.5249 1.69104 8.5929 1.91775 8.75068 2.0754L16.7971 10.1218L10.4527 16.4663L2.40649 8.41998C2.24871 8.2622 2.0224 8.19433 1.80353 8.23896C1.58492 8.28385 1.40336 8.43552 1.32049 8.64271C-0.730006 13.7645 0.464775 19.5939 4.36455 23.4937C8.08171 27.211 13.6141 28.4761 18.5688 26.7753L21.9808 30.1872C21.9352 30.2287 21.8902 30.2714 21.8463 30.3153L20.7147 31.4469C20.2445 31.9169 19.9857 32.5419 19.9857 33.2068C19.9857 33.8205 20.2087 34.3986 20.6124 34.8539L2.98343 50.2039C2.88196 50.2922 2.80971 50.4093 2.77624 50.5395L1.15527 56.8556C1.09696 57.083 1.16297 57.3243 1.32899 57.4902L10.1787 66.3399C10.3049 66.4661 10.4745 66.5345 10.6483 66.5345C10.7033 66.5345 10.7588 66.5276 10.8134 66.5136L17.1296 64.8927C17.2598 64.8592 17.377 64.7869 17.4653 64.6855L32.8152 47.0566C33.2705 47.4603 33.8487 47.6832 34.4623 47.6832C35.1271 47.6832 35.7521 47.4244 36.2223 46.9542L37.3538 45.8226C37.3978 45.7787 37.4402 45.7337 37.4817 45.6881L40.8936 49.1001C39.193 54.0549 40.4579 59.5872 44.1752 63.3043C46.809 65.9382 50.3222 67.3383 53.9038 67.338C55.6254 67.3379 57.3635 67.0142 59.0263 66.3485C59.2335 66.2657 59.3852 66.0841 59.4301 65.8655C59.475 65.6469 59.407 65.4202 59.2492 65.2625L51.2027 57.216L57.5471 50.8716L65.5935 58.9179C65.7513 59.0757 65.9781 59.1439 66.1965 59.099C66.4151 59.0541 66.5966 58.9024 66.6795 58.6952C68.73 53.5734 67.5351 47.7442 63.6353 43.8443ZM34.5241 37.3622L30.3084 33.1466L50.7067 12.7482L52.8136 14.8551L54.9224 16.9639L34.5241 37.3622ZM52.4724 7.3527L62.7758 2.27355L65.3955 4.89328L60.3163 15.1966L56.0658 16.229L53.7526 13.9158L51.4402 11.6032L52.4724 7.3527ZM19.2098 25.5381C19.083 25.4112 18.9132 25.3435 18.74 25.3435C18.6612 25.3435 18.5815 25.3574 18.505 25.3865C13.9362 27.1167 8.75427 26.0053 5.30367 22.5546C2.02333 19.2742 0.861221 14.483 2.21139 10.103L9.98332 17.8749C10.1079 17.9995 10.2767 18.0695 10.4529 18.0695C10.6292 18.0695 10.798 17.9996 10.9226 17.8749L18.206 10.5913C18.4654 10.3321 18.4654 9.9116 18.206 9.65235L10.4341 1.88043C14.8138 0.530389 19.6052 1.69237 22.8857 4.97257C26.3364 8.4233 27.448 13.6051 25.7177 18.174C25.6252 18.4182 25.6845 18.694 25.8692 18.8787L34.2836 27.293L31.4234 30.1533L27.196 25.9259C26.9366 25.6665 26.5162 25.6665 26.2568 25.9259C25.9974 26.1851 25.9974 26.6056 26.2568 26.8649L30.4844 31.0924L29.3693 32.2075L27.4771 30.3153C26.7251 29.5632 25.7253 29.149 24.6616 29.149C24.1259 29.149 23.6064 29.2543 23.1264 29.4548L19.2098 25.5381ZM16.5991 63.6576L10.8498 65.133L2.53572 56.8188L4.01127 51.0697L21.548 35.7999L31.8688 46.1208L16.5991 63.6576ZM36.4146 44.8835L35.283 46.0151C34.8304 46.4677 34.094 46.4677 33.6413 46.0151L21.6538 34.0274C21.4345 33.8083 21.3138 33.5168 21.3138 33.2066C21.3138 32.8967 21.4347 32.6051 21.6539 32.3857L22.7855 31.2542C23.2866 30.7531 23.9531 30.4768 24.6618 30.4768C25.3706 30.4768 26.0369 30.7529 26.538 31.2542L36.4146 41.1306C36.9157 41.6317 37.1918 42.2982 37.1918 43.007C37.1918 43.7158 36.9157 44.3824 36.4146 44.8835ZM65.7885 57.2349L58.0166 49.463C57.7572 49.2036 57.3368 49.2036 57.0774 49.463L49.794 56.7465C49.6694 56.871 49.5996 57.0399 49.5996 57.216C49.5996 57.3921 49.6696 57.561 49.794 57.6854L57.5659 65.4575C53.1862 66.8077 48.3947 65.6454 45.1143 62.3654C41.6636 58.9146 40.552 53.7328 42.2823 49.1639C42.3748 48.9197 42.3155 48.644 42.1309 48.4592L38.2122 44.5406C38.8132 43.0955 38.5275 41.3656 37.3538 40.1919L35.4634 38.3015L36.5784 37.1864L40.8041 41.4121C40.9338 41.5418 41.1037 41.6066 41.2737 41.6066C41.4437 41.6066 41.6135 41.5418 41.7433 41.4121C42.0027 41.1528 42.0027 40.7323 41.7433 40.4731L37.5176 36.2474L40.3777 33.3873L48.7903 41.7999C48.9751 41.9846 49.2508 42.0441 49.4952 41.9514C54.0641 40.2213 59.2459 41.3328 62.6965 44.7834C65.9765 48.0637 67.1386 52.8549 65.7885 57.2349Z" fill="black" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M11.0615 56.9386C11.1912 57.0684 11.3611 57.1332 11.5311 57.1332C11.7011 57.1332 11.871 57.0684 12.0007 56.9386L23.8277 45.1115C24.087 44.8523 24.087 44.4318 23.8277 44.1726C23.5683 43.9132 23.1479 43.9132 22.8885 44.1726L11.0616 55.9997C10.8021 56.2589 10.8021 56.6794 11.0615 56.9386Z" fill="black" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M20.9701 41.3157C20.7213 41.0462 20.3011 41.0293 20.0318 41.2785L7.73519 52.6361C7.46584 52.8848 7.44911 53.305 7.698 53.5744C7.82882 53.7161 8.00719 53.7878 8.18595 53.7878C8.34705 53.7878 8.50869 53.7296 8.63632 53.6116L20.9329 42.254C21.2022 42.0052 21.2188 41.585 20.9701 41.3157Z" fill="black" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
  <path d="M14.4257 60.3019C14.5534 60.4199 14.7149 60.4781 14.876 60.4781C15.0548 60.4781 15.2332 60.4063 15.364 60.2647L26.7214 47.9681C26.9703 47.6988 26.9536 47.2785 26.6843 47.0298C26.4148 46.7808 25.9947 46.7978 25.7459 47.067L14.3885 59.3636C14.1396 59.6329 14.1562 60.0531 14.4257 60.3019Z" fill="black" transform="matrix(1, 0, 0, 1, 0, -4.440892098500626e-16)"/>
</svg></div>`;
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker.properties.id}`;
      /* Assign the `marker` class to each marker for styling. */
      el.className = "marker";

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, {
          offset: [0, -23]
        })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

      /**
       * Listen to the element and when it is clicked, do three things:
       * 1. Fly to the point
       * 2. Close all other popups and display popup for clicked store
       * 3. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      el.addEventListener("click", (e) => {
        flyToStore(marker);
        createPopUp(marker);
        const activeItem = document.getElementsByClassName("active");
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        const listing = document.getElementById(`listing-${marker.properties.id}`);
        listing.classList.add("active");
      });
    }
  }

  /**
   * Add a listing for each store to the sidebar.
   **/
  function buildLocationList(stores) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById("listings");
      const listing = listings.appendChild(document.createElement("div"));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${store.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = "item";
      const divider = listings.appendChild(document.createElement("div"));
      divider.className = "map_divider";

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement("a"));
      link.href = "#";
      link.className = "map_heading-large";
      link.id = `link-${store.properties.id}`;
      link.innerHTML = `${store.properties.name}`;

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement("div"));
      details.innerHTML = `
    `;

      /* this is the city name
      <div class="map_address-info"><div class="map-heading-small">${store.properties.city}</div></div>
      </div>
      */

      const roundedDistance = Math.round(store.properties.distance * 100) / 100;

      const existing = `
    <a id="existing" href="https://atmgeeks.my.site.com/portal" class="btn btn-small-2">Existing customer link</a>
    `;

      const nonCustomer = `
    <a id="new_customer" href="${domain}/service-request" class="btn btn-small-2">New customer link</a>
    `;

      const zone1 = `
    <div class="zone-wrapper">
    <div class="zone-header">Zone 1</div>
    <div class="zone-pricing"><div>FLM</div>$${store.properties.flm.zone1}</div>
    <div class="zone-pricing"><div>SLM</div>$${store.properties.slm.zone1}</div>
    <div class="zone-pricing"><div>Install</div>$${store.properties.install.zone1}</div>
    <div class="zone-pricing"><div>Deinstall</div>$${store.properties.deintsall.zone1}</div>
    </div>
    `;

      const zone2 = `
    <div class="zone-wrapper">
    <div class="zone-header">Zone 2</div>
    <div class="zone-pricing"><div>FLM</div>$${store.properties.flm.zone2}</div>
    <div class="zone-pricing"><div>SLM</div>$${store.properties.slm.zone2}</div>
    <div class="zone-pricing"><div>Install</div>$${store.properties.install.zone2}</div>
    <div class="zone-pricing"><div>Deinstall</div>$${store.properties.deintsall.zone2}</div>
    </div>
    `;

      const zone3 = `
    <div class="zone-wrapper">
    <div class="zone-header">Zone 3</div>
    <div class="zone-pricing"><div>FLM</div>$${store.properties.flm.zone3}</div>
    <div class="zone-pricing"><div>SLM</div>$${store.properties.slm.zone3}</div>
    <div class="zone-pricing"><div>Install</div>$${store.properties.install.zone3}</div>
    <div class="zone-pricing"><div>Deinstall</div>$${store.properties.deintsall.zone3}</div>
    </div>
    `;

      if (store.properties.distance) {
        details.innerHTML += `
      <div class="map_additional-info">
      <div class="additional-info_line">
      <div class="map_svg-icon w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" style="width:100%;height:100%">
      <path d="M13.4227 17.3618L16.9348 8.19598C17.2164 7.46107 16.5389 6.78361 15.804 7.06521L6.63824 10.5773C5.80779 10.8955 5.78079 12.06 6.5981 12.3083L10.0751 13.3648C10.3455 13.447 10.553 13.6545 10.6352 13.9249L11.6917 17.4019C11.94 18.2192 13.1045 18.1922 13.4227 17.3618Z" fill="currentColor"></path>
      </svg>
      </div>${roundedDistance} miles away</div>
      </div>
      `;

        if (roundedDistance <= `${store.properties.radius.small}`) {
          details.innerHTML += `
        ${zone1}
        <div class="map_additional-info">${existing}${nonCustomer}</div>
        `;
        } else if (roundedDistance > `${store.properties.radius.small}` && roundedDistance <=
          `${store.properties.radius.medium}`) {
          // check radius values
          details.innerHTML += `
        ${zone2}
        <div class="map_additional-info">${existing}${nonCustomer}</div>
        `;
        } else if (roundedDistance > `${store.properties.radius.medium}` && roundedDistance <=
          `${store.properties.radius.large}`) {
          details.innerHTML += `
        ${zone3}
        <div class="map_additional-info">${existing}${nonCustomer}</div>
        `;
        } else if (roundedDistance > `${store.properties.radius.large}`) {
          details.innerHTML += `
        <div class="map_additional-info"><a id="" href="mailto:services@atmgeeks.com" class="btn">Contact our team for prices</a></div>
        `;
        }
      }

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      link.addEventListener("click", function () {
        for (const feature of stores.features) {
          if (this.id === `link-${feature.properties.id}`) {
            flyToStore(feature);
            createPopUp(feature);
          }
        }
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        this.parentNode.classList.add("active");
      });
    }
  }

  /**
   * Use Mapbox GL JS's `flyTo` to move the camera smoothly
   * a given center point.
   **/
  function flyToStore(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 7
    });
  }

  /**
   * Create a Mapbox GL JS `Popup`.
   **/
  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({
        closeOnClick: false
      })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `
    <h3 class="map_heading-large">${currentFeature.properties.name}</h3>
    <h4 class="map-heading-small">${currentFeature.properties.address}</h4>
    <div style="color:red">
    ${currentFeature.properties.warning}</div>
    `
      )
      .addTo(map);
  }

}

function loadScript(jsSource, cssSource, callback) {
  const headElement = document.getElementsByTagName('head')[0];
  const scriptElement = document.createElement('script');
  const styleElement = document.createElement('link');

  styleElement.href = cssSource;
  styleElement.rel = 'stylesheet';
  headElement.appendChild(styleElement);

  // make sure callback isn't run more than once
  function runCallback() {
    if (callback) {
      callback();
      scriptElement.onload = scriptElement.onreadystatechange = null;
      callback = null;
    }
  }

  scriptElement.type = 'text/javascript';
  // Most browsers
  scriptElement.onload = runCallback;
  // Internet Explorer
  scriptElement.onreadystatechange = function () {
    if (this.readyState === 'complete') {
      runCallback();
    }
  };
  scriptElement.src = jsSource;
  headElement.appendChild(scriptElement);
}
