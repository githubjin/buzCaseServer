import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from "graphql-relay";
import { nodeInterface } from "../../types/NodeType";

const shipType = new GraphQLObjectType({
  name: "Ship",
  description: "A ship in the Star Wars saga",
  fields: () => ({
    id: globalIdField("Ship"),
    name: {
      type: GraphQLString,
      description: "The name of the ship."
    }
  }),
  interfaces: [nodeInterface]
});

const {
  connectionType: shipConnection,
  edgeType: ShipEdge
} = connectionDefinitions({ name: "Ship", nodeType: shipType });

const FactionType = new GraphQLObjectType({
  name: "Faction",
  description: "A faction in the Star Wars saga",
  fields: () => ({
    id: globalIdField("Faction"),
    factionId: {
      type: GraphQLString,
      description: "id of faction in db",
      resolve: faction => faction.id
    },
    name: {
      type: GraphQLString,
      description: "The name of the faction."
    },
    ships: {
      type: shipConnection,
      description: "The ships used by the faction.",
      args: connectionArgs,
      resolve: (faction, args) => connectionFromArray(faction.ships, args)
    }
  }),
  interfaces: [nodeInterface]
});

const datasource = {
  id: 1,
  factionId: "hello",
  name: "黑龙",
  ships: [
    { id: 1, name: "ship 1" },
    { id: 2, name: "ship 1" },
    { id: 3, name: "ship 1" },
    { id: 4, name: "ship 1" },
    { id: 5, name: "ship 1" },
    { id: 6, name: "ship 1" },
    { id: 7, name: "ship 1" },
    { id: 8, name: "ship 1" },
    { id: 9, name: "ship 1" },
    { id: 10, name: "ship 1" }
  ]
};
module.exports = {
  type: FactionType,
  description: "demo",
  resolve: () => datasource
};
