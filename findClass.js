var displayData = require('./src/data/scenic_spot_C_f.json');

let results = displayData.XML_Head.Infos.Info;
let filtered = results.filter(item => {
    return item.Class1 === '13';
    // return true;
  });

let result = filtered.map(e => { return e.Name })
console.log(result);