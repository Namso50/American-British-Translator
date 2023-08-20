const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator { 
  americanToBritish(str) {
    let result = str[0]
    
    for (let usa in americanOnly) {
      let regex = new RegExp(` ${usa}$|^${usa} |^${usa}$|[^a-z-]+${usa}[^a-z-]+`, 'gi')
      let bri = americanOnly[usa]

      result = result.replace(regex, (match) => {   
        let re = new RegExp(usa, "gi")
        return match.replace(re, bri)
      });

      str[0] = str[0].replace(regex, (match) => {
        let re = new RegExp(usa, "gi")
        return match.replace(re, `<span class="highlight">${bri}</span>`)
      });
    };
       
    for (let usa in americanToBritishSpelling) {
      let regex = new RegExp(` ${usa}$|^${usa} |^${usa}$|[^a-z-]+${usa}[^a-z-]+`, 'gi')
      let bri = americanToBritishSpelling[usa]

      result = result.replace(regex, (match) => {
        let re = new RegExp(usa, "gi")
        return match.replace(re, bri)
      });
      str[0] = str[0].replace(regex, (match) => {
        let re = new RegExp(usa, "gi")
        return match.replace(re, `<span class="highlight">${bri}</span>`)
      });
    };
    
    for (let usa in americanToBritishTitles) {
      let regex = new RegExp(usa, 'gi')
      let bri = americanToBritishTitles[usa]

      result = result.replace(regex, bri)
      str[0] = str[0].replace(regex, `<span class="highlight">${bri}</span>`)
    };

    result = result.replace(/\d{1,2}:\d{1,2}/g, (match) => {
      return match.replace(":", ".");
    });

    str[0] = str[0].replace(/\d{1,2}:\d{1,2}/g, (match) => {
      return `<span class="highlight">${match.replace(":", ".")}</span>`
    });

    return result
  }

  britishToAmerican(str) {
    let result = str[0]
   
    for (let bri in britishOnly) {
      let regex = new RegExp(` ${bri}$|^${bri} |^${bri}$|[^a-z-]+${bri}[^a-z-]+`, 'gi');
      let usa = britishOnly[bri]
      
      result = result.replace(regex, (match) => {   
        let re = new RegExp(bri, "gi")
        return match.replace(re, usa);
      });
      
      str[0] = str[0].replace(regex, (match) => {
        let re = new RegExp(bri, "gi")
        return match.replace(re, `<span class="highlight">${usa}</span>`)
      });
    };
    
    for (let usa in americanToBritishSpelling) {
      let bri = americanToBritishSpelling[usa]
      let regex = new RegExp(` ${bri}$|^${bri} |^${bri}$|[^a-z-]+${bri}[^a-z-]+`, 'gi');

      result = result.replace(regex, (match) => {
        let re = new RegExp(bri, "gi")
        return match.replace(re, usa)
      });

      str[0] = str[0].replace(regex, (match) => {
        let re = new RegExp(bri, "gi")
        return match.replace(re, `<span class="highlight">${usa}</span>`)
      });
    };

    for (let usa in americanToBritishTitles) {
      let bri = americanToBritishTitles[usa]
      let regex = new RegExp(` ${bri} |^${bri} `, 'gi')

      result = result.replace(regex, (match) => {
        let re = new RegExp(bri, "gi")
        return match.replace(re, usa)
      });
      
      str[0] = str[0].replace(regex, (match) => {
        let re = new RegExp(bri, "gi")
        return match.replace(re, `<span class="highlight">${usa}</span>`)
      });
    };
    
    result = result.replace(/\d{1,2}\.\d{1,2}/g, (match) => {
      return match.replace(/\./, ":");
    });

    str[0] = str[0].replace(/\d{1,2}\.d{1,2}/g, (match) => {
      return `<span class="highlight">${match.replace(/\./, ":")}</span>`
    });

    return result
  }
}

module.exports = Translator;