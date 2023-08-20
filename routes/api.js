'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let {text, locale} = req.body
      let translation = [text]
      
      if (text === undefined || locale === undefined) {
        res.json({ error: 'Required field(s) missing' })
        return
      }
      
      if (!text) {
        res.json({ error: 'No text to translate' })
        return
      }
      
      if (locale === 'american-to-british') {
        let result = translator.americanToBritish(translation)
        if (result == text) {
          res.json({text, translation: "Everything looks good to me!"})
          return
        }
        res.json({text, translation: translation[0]})
      } else if (locale === 'british-to-american')  {
        let result = translator.britishToAmerican(translation)

        if (result == text) {
          res.json({text, translation: "Everything looks good to me!"})
          return
        }
        res.json({text, translation: translation[0]})
      } else {
        res.json({ error: 'Invalid value for locale field' })
      }
    });
};
