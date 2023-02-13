import { addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit';
import defu from 'defu';

type ModuleOptions = {};

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'budget-db',
        configKey: 'budgetDB',
        compatibility: {
            nuxt: '^3.0.0',
        },
    },
    defaults: {},
    setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        nuxt.hook('nitro:config', (nitroConfig) => {
            nitroConfig.alias = nitroConfig.alias || {};

            nitroConfig.externals = defu(
                typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {},
                {
                    inline: [resolve('./runtime')],
                },
            );

            nitroConfig.alias['#budgetdb'] = resolve('./runtime/server/services');
        });

        addTemplate({
            filename: 'types/budget-db.d.ts',
            getContents: () =>
                [
                    "declare module '#budgetdb' {",
                    `     const useRedis: typeof import('${resolve(
                        './runtime/server/services',
                    )}').useRedis`,
                    `     const useDatabase: typeof import('${resolve(
                        './runtime/server/services',
                    )}').useDatabase`,
                    '}',
                ].join('\n'),
        });

        nuxt.hook('prepare:types', (options) => {
            options.references.push({
                path: resolve(nuxt.options.buildDir, 'types/budget-db.d.ts'),
            });
        });
    },
});
