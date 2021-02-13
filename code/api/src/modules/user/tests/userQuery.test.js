import request from 'supertest'; // import request library from supertest
import express from 'express'; // import express so we can create a mock server
import graphqlHTTP from 'express-graphql'; // import graphqlHTTP express library
import schema from '../../../setup/schema'; // import our graphql schema

// we create describe functions similar to RSpec
describe('user queries', () => {
  let server = express();

  beforeAll(() => {
    server.use(
    "/",
    graphqlHTTP({
      schema: schema,
      graphiql: false
      })
    )
  })

  it('user query', async (done) => {
    const response = await request(server)
      .post('/')
      .send({query: '{user(id: 3){ id name email role style_preference } }'})
      .expect(200)
    expect(response.body.data.user.id).toBe(3)
    expect(response.body.data.user.name).toBe('The Admin')
    done();
  })

  it('user update mutations', async (done) => {
    const response = await request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: "mutation {userUpdate(id: 3, style_preference: \"preppy\"){ name style_preference } }"
      })
      .expect(200)
    expect(response.body.data.userUpdate.style_preference).toBe("preppy")
    done();
  })
})
