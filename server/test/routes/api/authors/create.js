const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server');




describe('Test POST /api/authors/', () => {
    
    
    this.authors = [{firstName: "firstName1", id: 1}, {firstName: "firstName2", id: 2}, {firstName: "firstName3", id: 3}, ];

    

    it ('For Fail, Return err msg when req firstName contains wrong characters.', (done) => {


        request(server.authors).post('/api/authors')
            .send({ firstName: '#error//' })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                expect(body.success).to.equal(false)
                expect(body.message).to.equal("Your input does not match the requirements.")
                
                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Fail, Return err msg when req body is empty.', (done) => {


        request(server.authors).post('/api/authors')
            .send({ })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                expect(body.success).to.equal(false)
                expect(body.message).to.equal("Your input is empty. Please enter the required value.")
                
                done()
                
            }).catch((err) => done(err));
        
    });


    it ('For Success, Create a new author.', (done) => {


        request(server.authors).post('/api/authors')
            .send({ firstName: "Ed", pseudo: "Sheeran" })
            .then((response) => {
                               
                expect(response.statusCode).to.equal(201)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('author')
                expect(body).to.contain.property('message')

                expect(body.message).to.equal("Author Created")
                expect(body.author.firstName).to.equal("Ed")
                
                done()
                
            }).catch((err) => done(err));
        
    });

})