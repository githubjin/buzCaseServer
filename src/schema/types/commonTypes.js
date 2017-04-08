import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLInputObjectType,
} from 'graphql';

var HomePlaceArgsType = new GraphQLInputObjectType({
    name: "HomePlaceArgs",
    description: '出生地点省市县',
    fields: () => ({
      province: {
        type: GraphQLString,
      },
      city: {
        type: GraphQLString,
      },
      area: {
        type: GraphQLString,
      },
      address: {
        type: GraphQLString,
      }
    }),
});

export {
  HomePlaceArgsType,
}
