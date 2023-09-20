import { builder } from '~/server/graphql/builder';
import { UserVehicles } from '@prisma/client';

const setBuilder = (pothos: typeof builder) => {
    pothos.prismaObject('UserVehicles', {
        findUnique: (vehicle) => ({ id: vehicle.id }),
        fields: (t) => ({
            id: t.exposeID('uuid'),
            make: t.exposeString('make'),
            model: t.exposeString('model'),
            year: t.exposeString('year'),
            color: t.exposeString('color'),
            license: t.exposeString('license', { nullable: true }),
            active: t.exposeBoolean('active'),
            deleted: t.expose('image', { nullable: true, type: 'DateTime' }),
            isDeleted: t.boolean({
                resolve: (vehicle: UserVehicles) => !!vehicle.deleted_at,
            }),
        }),
    });

    return pothos;
};

export default { setBuilder };
