const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test("Translation with text and locale fields", (done) => {
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text: "I spent the bank holiday at the funfair.", locale: "british-to-american" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'text');
                assert.equal(res.body.text, "I spent the bank holiday at the funfair.")
                assert.property(res.body, "translation")
                assert.equal(res.body.translation, 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.')
                done();
            });
    });

    test("Translation with text and invalid locale field", (done) => {
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text: "I sat on the bank", locale: "french-to-american" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid value for locale field')
                done();
            });
    });

    test("Translation with missing text field", (done) => {
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ locale: "british-to-american" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field(s) missing')
                done();
            });
    });

    test("Translation with missing locale field", (done) => {
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text: "I sat on the bank " })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field(s) missing')
                done();
            });
    });

    test("Translation with empty text", (done) => {
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text: "", locale: "american-to-british" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'No text to translate')
                done();
            });
    });

    test("Translation with text that needs no translation", (done) => {
        chai.request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text: "I'm doing well", locale: "american-to-british" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'text');
                assert.equal(res.body.text, "I'm doing well")
                assert.property(res.body, "translation")
                assert.equal(res.body.translation, 'Everything looks good to me!')
                done();
            });
    });
});
