var request = require("supertest");
var app = require("./app");
var redis = require("redis");
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Request to the root path', function() {
    
    it('returns a 200 status code,', function(done) {
      request(app)
    .get('/')
    .expect(200, done);
    });
    
    it('Return in HTML format', function(done) {
        request(app)
        .get('/')
        .expect("Content-Type", /html/, done);
    });
    
    it ('Returns an HTML page containing Cities', function(done) {
        request(app)
        .get('/')
        .expect(/cities/i, done);
    });
});

describe('Listing cities on /cities', function(){
    it ('Returns 200 status code', function(done) {
        request(app)
        .get('/cities')
        .expect(200, done);
    });
    
    it ('Returns JSON format', function(done) {
       request(app)
       .get('/cities')
       .expect('Content-Type', /json/, done);
 
    });
    
    it('Returns initial cities', function(done) {
        request(app)
        .get('/cities')
        .expect(JSON.stringify([]), done);
    });
});

describe('Creating new cities', function() {
    it ('returns 201 on city creation', function(done) {
        request(app)
        .post('/cities')
        .send("name=Springfield&description=Where+the+simpsons+live")
        .expect(201, done);
    });
    
    it("returns a new city", function(done) {
        request(app)
        .post('/cities')
        .send("name=Springfield&description=Where+the+simpsons+live")
        .expect(/springfield/i, done);
    });
});

