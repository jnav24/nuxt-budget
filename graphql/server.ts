import { builder } from './builder';
import path from 'path';
import fs from 'fs';
import { GraphQLSchema, lexicographicSortSchema, printSchema } from 'graphql';
import '~/graphql/schemas';

export const schema = builder.toSchema({});

builder.queryField('getUser', (t) =>
    t.prismaField({
        nullable: true,
        type: 'Users',
        resolve: () => {
            return null;
        },
    }),
);

function writeSchema(schema: GraphQLSchema) {
    const schemaAsString = printSchema(lexicographicSortSchema(schema));
    const schemaPath = path.join(process.cwd(), 'graphql/generated/schema.graphql');
    const existingSchema = fs.existsSync(schemaPath) && fs.readFileSync(schemaPath, 'utf-8');

    if (existingSchema !== schemaAsString) {
        fs.writeFileSync(schemaPath, schemaAsString);
    }
}

if (process.env.APP_ENV !== 'production') {
    writeSchema(schema);
}
