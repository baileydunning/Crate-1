import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';

describe('product queries', () => {
  let server = express();

  beforeAll(() => {
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )
  })

  it('survey products men', async(done) => {
    const response = await request(server)
      .post('/')
      .send({query: '{productsSurveyByGender(gender: 1){name slug description type gender image survey style sub_type} }'})
      .expect(200)
    expect(response.body.data.productsSurveyByGender.length).toBe(24)
    expect(response.body.data.productsSurveyByGender[0].gender).toBe(1)
    expect(response.body.data.productsSurveyByGender[0].survey).toBe(true)
    done();
  })

  it('survey products women', async(done) => {
    const response = await request(server)
      .post('/')
      .send({query: '{productsSurveyByGender(gender: 2){name slug description type gender image survey style sub_type} }'})
      .expect(200)
    expect(response.body.data.productsSurveyByGender.length).toBe(24)
    expect(response.body.data.productsSurveyByGender[0].gender).toBe(2)
    expect(response.body.data.productsSurveyByGender[0].survey).toBe(true)
    done();
  })
})
