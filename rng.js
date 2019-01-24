let travelphase    = ['pre-trip', 'en-route', 'sightseeing'];
let poiclass       = ['Cultural', 'Ecological', 'Historical-Site', 'Temple', 'Art', 'Snacks', 'National-Park', 'National-Scenic-Area', 'Agricultural', 'Hot-springs', 'Natural-Scenery', 'Recreational', 'Sports-Health'];
let cloudcover     = ['sunny', 'cloudy', 'overcast'];
let pet             = ['under-16', 'between-pet', 'over-40'];
let temperature     = ['under-17', 'between-temp', 'over-35'];
let relativehumidity = ['under-44', 'between-rh', 'over-82'];
let comfortindex    = ['level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6'];
let pop             = ['no-rain', 'rain'];
let travelchange   = ['no', 'some', 'substantial'];
let poi1 = ['National-Park', 'National-Scenic-Area', 'Natural-Scenery', 'Recreational', 'Sports-Health'];
let poi2 = ['Cultural', 'Ecological', 'Historical-Site', 'Temple', 'Art', 'Snacks', 'Agricultural', 'Hot-springs'];

function r(myArray) {
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    return rand;
}

// for (let index = 0; index < 20; index++) {
//     console.log(r(travelphase)+','+r(poiclass)+','+r(cloudcover)+','+r(pet)+','+r(temperature)+','+r(relativehumidity)+','+r(comfortindex)+','+r(pop)+','+r(travelchange))
// }

for (let index = 0; index < 60; index++) {
    console.log(r(poi2)+','+r(pet)+',')
}


