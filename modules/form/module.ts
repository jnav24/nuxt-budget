import {
    addComponent,
    addComponentsDir,
    addTemplate,
    createResolver,
    defineNuxtModule,
} from '@nuxt/kit';
import { fileURLToPath } from 'url';
import defu from 'defu';

const FormComponents = ['Form'];

export default defineNuxtModule({
    meta: {
        name: 'budget-form',
        configKey: 'budgetForm',
    },
    setup(_options, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        nuxt.hook('nitro:config', (nitroConfig) => {
            nitroConfig.alias = nitroConfig.alias || {};

            nitroConfig.externals = defu(
                typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {},
                {
                    inline: [resolve('./runtime')],
                },
            );

            nitroConfig.alias['#budgetform'] = resolve('./runtime/server/services');
        });

        // this works
        // addComponent({
        //     filePath: resolve('./runtime', 'components', 'BudgetForm.vue'),
        //     name: 'BudgetForm',
        // });

        addComponentsDir({
            path: resolve('./runtime/components'),
            pathPrefix: false,
            prefix: 'Budget',
            global: true,
        });

        // addImportsDir(resolve(runtimeDir, 'composables'))
    },
});
