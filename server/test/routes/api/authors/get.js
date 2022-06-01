const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server')


describe('Test GET /api/authors', () => {
    
    before((done) => {
        const names = [ "Ed", "Me", "Ed" ]

        for (let i = 0; i < names.length; i++) {
            request(server.authors).post('/api/authors/')
                .send({ firstName: names[i] })
                .catch((err) => done(err));
        }
        done();
        
    })
    


    it ('For Success, Get a correct response with a status and properties, and array of authors', (done) => {

        request(server.authors).get('/api/authors/')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('authors');
                expect(body.authors).to.be.an('array');
                expect(body.success).to.be.a('boolean');
                
                done();
            
            }).catch((err) => done(err));
    });

    it ('For Success, Get a filtred array of authors by first name.', (done) => {

        request(server.authors).get('/api/authors?phrase=me')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('authors');
                
                expect(body.authors).to.be.an('array').to.have.lengthOf.above(0);

                if (body.authors.length) {
                    expect(body.authors[0]).to.own.include({firstName: 'Me'});
                }

                done();
            
            }).catch((err) => done(err));
    });

    
    
    it ('For Failure, Get an author by id.', (done) => {

        request(server.authors).get('/api/authors/0')
            .then((response) => {
            
                expect(response.statusCode).to.equal(404)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                

                expect(body.success).to.equal(false);

                done();
            
            }).catch((err) => done(err));
    });

    it ('For Success, Get an author by id.', (done) => {

        request(server.authors).get('/api/authors/1')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('author');
                

                if (body.author) {
                    expect(body.author.id).to.equal(1);
                }

                done();
            
            }).catch((err) => done(err));
    });

});