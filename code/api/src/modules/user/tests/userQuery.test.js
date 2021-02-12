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
  // it('returns true for true', (done) => {
  //   expect(true).toBe(true)
  // done()})

  it('user update mutations', async (done) => {
    const response = await request(server)
      .post('/')
      .send({mutation: '{userUpdate(id: 1 style_preference: "punk"){ id name email password role style_preference } }'})
      .expect(200)
    expect(response.body.data.user.id).toBe()
    done();
  })
})

  // it('Async test', async done => {
  //   // Do your async tests here
  //
  //   done()
  // })

//   import request from 'supertest'; // import request library from supertest
//   import express from 'express'; // import express so we can create a mock server
//   import graphqlHTTP from 'express-graphql'; // import graphqlHTTP express library
//   import schema from '../../../setup/schema'; // import our graphql schema
//   // we create describe functions similar to RSpec
//
// describe('user queries', () => {
//   let server = express();
//   beforeAll(() => {
//       server.use(
//       "/",
//       graphqlHTTP({
//         schema: schema,
//         graphiql: false
//       })
//     )
//   })
//
  // it('test description'), async (done) => {
  //   const response = await request(server)
  //     .post('/')
  //     .send({query: '{users {name} }'})
  //     .expect(200)
  //   expect(response.body.data.users.length).toBe(2)
  //   done();
  // }
// });
