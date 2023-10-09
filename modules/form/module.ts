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

            nitroConfig.alias['#budgetform'] = resolve('./runtime');
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

        addTemplate({
            filename: 'types/budget-form.d.ts',
            getContents: () =>
                [
                    "declare module '#budgetform' {",
                    `import { RulesType } from '${resolve('./runtime/types')}/form'`,
                    'interface BudgetForm {',
                    'validateRequest: <InputObject, RuleObject extends keyof InputObject>(',
                    '    request: InputObject,',
                    '    rulesObject: Record<RuleObject, Array<keyof RulesType> | RulesType>,',
                    ') => void',
                    '}',
                    `const useFormValidator: () => BudgetForm = import('${resolve('./runtime')}')`,
                    '}',
                ].join('\n'),
        });

        nuxt.hook('prepare:types', (options) => {
            options.references.push({
                path: resolve(nuxt.options.buildDir, 'types/budget-form.d.ts'),
            });
        });
    },
});
