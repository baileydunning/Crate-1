// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'

// Product type
const ProductType = new GraphQLObjectType({
  name: 'product',
  description: 'Product Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    type: { type: GraphQLInt },
    gender: { type: GraphQLInt },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    style: { type: GraphQLString },
    sub_type: { type: GraphQLString },
    survey: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  })
})

// User Gender type
const ProductTypesType = new GraphQLObjectType({
  name: 'productTypesType',
  description: 'User Types Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

export { ProductType, ProductTypesType }
