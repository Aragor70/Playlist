const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server');




describe('Test POST /api/songs/', () => {
    
    
    this.songs = [{title: "Tenerife Sea", id: 1}, {title: "Sea", id: 2}, {title: "Tenerife", id: 3}, ];

    

    it ('For Fail, Return err msg when req title contains wrong characters.', (done) => {


        request(server.songs).post('/api/songs')
            .send({ title: '#error//' })
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


        request(server.songs).post('/api/songs')
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


    it ('For Success, Create a new song.', (done) => {

        request(server.songs).post('/api/songs')
            .send({ title: "Ed" })
            .then((response) => {
                          
                expect(response.statusCode).to.equal(201)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('song')
                expect(body).to.contain.property('message')

                expect(body.message).to.equal("Song Created")
                expect(body.song.title).to.equal("Ed")
                
                done()
                
            }).catch((err) => done(err));
        
    });

})