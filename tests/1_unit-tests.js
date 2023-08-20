const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator()


suite('Unit Tests', () => {
    suite('to British English', () => {
        test('Translate => Mangoes are my favorite fruit.', () => {
            assert.equal(translator.americanToBritish(["Mangoes are my favorite fruit."]), "Mangoes are my favourite fruit.");
        })

        test('Translate => I ate yogurt for breakfast.', () => {
            assert.equal(translator.americanToBritish(["I ate yogurt for breakfast."]), "I ate yoghurt for breakfast.");
        })

        test("Translate => We had a party at my friend's condo.", () => {
            assert.equal(translator.americanToBritish(["We had a party at my friend's condo."]), "We had a party at my friend's flat.");
        })

        test('Translate => Can you toss this in the trashcan for me?', () => {
            assert.equal(translator.americanToBritish(["Can you toss this in the trashcan for me?"]), "Can you toss this in the bin for me?");
        })

        test('Translate => The parking lot was full.', () => {
            assert.equal(translator.americanToBritish(["The parking lot was full."]), "The car park was full.");
        })

        test('Translate => Like a high tech Rube Goldberg machine.', () => {
            assert.equal(translator.americanToBritish(["Like a high tech Rube Goldberg machine."]), "Like a high tech Heath Robinson device.");
        })

        test("Translate => To play hooky means to skip class or work.", () => {
            assert.equal(translator.americanToBritish(["To play hooky means to skip class or work."]), "To bunk off means to skip class or work.");
        })

        test('Translate => No Mr. Bond, I expect you to die.', () => {
            assert.equal(translator.americanToBritish(["No Mr. Bond, I expect you to die."]), "No Mr Bond, I expect you to die.");
        })

        test('Translate => Dr. Grosh will see you now.', () => {
            assert.equal(translator.americanToBritish(["Dr. Grosh will see you now."]), "Dr Grosh will see you now.");
        })

        test('Translate => Lunch is at 12:15 today.', () => {
            assert.equal(translator.americanToBritish(["Lunch is at 12:15 today."]), "Lunch is at 12.15 today.");
        })

    });

    suite('to American English', () => {
        test("Translate => We watched the footie match for a while.", () => {
            assert.equal(translator.britishToAmerican(["We watched the footie match for a while."]), "We watched the soccer match for a while.");
        });

        test('Translate => Paracetamol takes up to an hour to work.', () => {
            assert.equal(translator.britishToAmerican(["Paracetamol takes up to an hour to work."]), "Tylenol takes up to an hour to work.");
        });

        test('Translate => First, caramelise the onions.', () => {
            assert.equal(translator.britishToAmerican(["First, caramelise the onions."]), "First, caramelize the onions.");
        });

        test('Translate => I spent the bank holiday at the funfair.', () => {
            assert.equal(translator.britishToAmerican(["I spent the bank holiday at the funfair."]), "I spent the public holiday at the carnival.");
        });

        test("Translate => I had a bicky then went to the chippy.", () => {
            assert.equal(translator.britishToAmerican(["I had a bicky then went to the chippy."]), "I had a cookie then went to the fish-and-chip shop.");
        });

        test("Translate => I've just got bits and bobs in my bum bag.", () => {
            assert.equal(translator.britishToAmerican(["I've just got bits and bobs in my bum bag."]), "I've just got odds and ends in my fanny pack.");
        });

        test('Translate => The car boot sale at Boxted Airfield was called off.', () => {
            assert.equal(translator.britishToAmerican(["The car boot sale at Boxted Airfield was called off."]), "The swap meet at Boxted Airfield was called off.");
        });

        test("Translate => Have you met Mrs Kalyani?", () => {
            assert.equal(translator.britishToAmerican(["Have you met Mrs Kalyani?"]), "Have you met Mrs. Kalyani?");
        });

        test("Translate => Prof Joyner of King's College, London.", () => {
            assert.equal(translator.britishToAmerican(["Prof Joyner of King's College, London."]), "Prof. Joyner of King's College, London.");
        });

        test('Translate => Tea time is usually around 4 or 4.30.', () => {
            assert.equal(translator.britishToAmerican(["Tea time is usually around 4 or 4.30."]), "Tea time is usually around 4 or 4:30.");
        });
    });

    suite('Highlight translations', () => {
        test('Highlight => Mangoes are my favorite fruit.', () => {
            let result = ["Mangoes are my favorite fruit."]
            translator.americanToBritish(result)
            assert.equal(result[0], 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        });

        test("Highlight => I ate yogurt for breakfast.", () => {
            let result = ["I ate yogurt for breakfast."]
            translator.americanToBritish(result)
            assert.equal(result[0], 'I ate <span class="highlight">yoghurt</span> for breakfast.');
        });

        test("Highlight => We watched the footie match for a while.", () => {
            let result = ["We watched the footie match for a while."]
            translator.britishToAmerican(result)
            assert.equal(result[0], 'We watched the <span class="highlight">soccer</span> match for a while.');
        });

        test('Highlight => Paracetamol takes up to an hour to work.', () => {
            let result = ["Paracetamol takes up to an hour to work."]
            translator.britishToAmerican(result)
            assert.equal(result[0], '<span class="highlight">Tylenol</span> takes up to an hour to work.');
        });
    });
});
