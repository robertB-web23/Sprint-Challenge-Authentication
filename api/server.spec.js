const request = require('supertest');

const server = require('./server.js');

const db = require("../database/dbConfig");

            
        
describe('CRUD Tests', () => {
    beforeAll(async () => {
        await db("users").truncate();
    });
    
      it("tests are running with DB_ENV set to 'testing'", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });
    describe("auth-router tests", () => {
        describe("POST /api/auth/register", () => {
          it("should return a 201 created status", () => {
            return request(server)
              .post("/api/auth/register")
              .send({
                username: "robert",
                password: "final"
              })
              .then(res => {
                expect(res.status).toBe(201);
              });
          });
          it("should return a JSON object after creating a user", () => {
            return request(server)
              .post("/api/auth/register")
              .send({
                username: "Dave",
                password: "pass"
              })
              .then(res => {
                expect(res.type).toEqual("application/json");
              });
          });
        });
    })

    describe("POST /api/auth/login", () => {
        it("should return a 200 OK status", () => {
          return request(server)
            .post("/api/auth/login")
            .send({
              username: "Dave",
              password: "pass"
            })
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
        it("should return a JSON object", () => {
          return request(server)
            .post("/api/auth/login")
            .send({
              username: "Dave",
              password: "pass"
            })
            .then(res => {
              expect(res.type).toMatch(/json/);
            });
        });
    });

    describe("jokes-router tests", () => {
        describe("GET /api/jokes", () => {
          it("should return an array of jokes", () => {
            return request(server)
              .get("/api/jokes")
              .set(
                "Authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InIiLCJpYXQiOjE1NzM4MzgxMDEsImV4cCI6MTU3MzkyNDUwMX0.JZosc45tZu-sAW2koSwxG6TMXhuN6zEMpqeGrqvzRls"
              )
              .then(res => {
                expect(Array.isArray(res.body)).toBe(true);
              });
          });
          it("should return a status 200 code", () => {
            return request(server)
              .get("/api/jokes")
              .set(
                "Authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InIiLCJpYXQiOjE1NzM4MzgxMDEsImV4cCI6MTU3MzkyNDUwMX0.JZosc45tZu-sAW2koSwxG6TMXhuN6zEMpqeGrqvzRls"
              )
              .then(res => {
                expect(res.status).toBe(200);
              });
            });
        });
    });
})
    
  