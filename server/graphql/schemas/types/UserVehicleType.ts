import { UserVehicle } from '@prisma/client';
import { builder } from '~/server/graphql/builder';

const setBuilder = (pothos: typeof builder) => {
    pothos.prismaObject('UserVehicle', {
        findUnique: (vehicle) => ({ id: vehicle.id }),
        fields: (t) => ({
            id: t.exposeID('uuid'),
            make: t.exposeString('make'),
            model: t.exposeString('model'),
            year: t.exposeString('year'),
            color: t.exposeString('color'),
            license: t.exposeString('license', { nullable: true }),
            // @todo do I need both active and deleted fields?
            active: t.exposeBoolean('active'),
            isDeleted: t.boolean({
                resolve: (vehicle: UserVehicle) => !!vehicle.deleted_at,
            }),
        }),
    });

    return pothos;
};

export default { setBuilder };
