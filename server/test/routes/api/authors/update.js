const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server')


describe('Test PUT /api/authors/:id', () => {
    
    this.authors = [{firstName: "title1"}, {firstName: "title2"}, {firstName: "title3"}, ];


    before((done) => {

        for (let i = 0; i < this.authors.length; i++) {
            request(server.authors).post('/api/authors/')
                .send({ firstName: this.authors[i].firstName })
                .catch((err) => done(err));
        }
        done();
        
    })
    
    it ('For Fail, Return err msg when req title contains wrong characters.', (done) => {

        request(server.authors).put('/api/authors/2')
            .send({ firstName: '#error//' })
            .then((response) => {
                
                expect(response.statusCode).to.be.within(404, 422);

                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                if(response.statusCode === 422) {
                    expect(body.message).to.equal("Your input does not match the requirements.")
                } else {
                    expect(body.message).to.equal("Author does not exist.")
                }
                expect(body.success).to.equal(false)
                
                
                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Fail, Return 404 when params is not defined.', (done) => {

        request(server.authors).put('/api/authors/')
            .send({ firstName: 'name1' })
            .then((response) => {
                
                expect(response.statusCode).to.equal(404)

                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Failure, Return the same object if req body is empty', (done) => {

        request(server.authors).put('/api/authors/' + 2)
            .send({ })
            .then((response) => {
                
                expect(response.statusCode).to.equal(201);

                const body = response.body;

                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');

                
                done()
                
            }).catch((err) => done(err));
        
    });


    it ('For Success, Update last name.', (done) => {


        request(server.authors).put('/api/authors/' + 1)
            .send({ firstName: 'Ed', lastName: "Sheeran", pseudo: 'Edd' })
            .then((response) => {

                expect(response.statusCode).to.equal(201);
                
                const body = response.body;

                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');

                expect(body).to.contain.property('author')
                expect(body.message).to.equal("Author updated")
                expect(body.author.lastName).to.equal("Sheeran")
                
                
                done()
                
            }).catch((err) => done(err));
        
    });

})