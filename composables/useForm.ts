import { FormContext, FormContextType, RulesType } from '~/types/form';

type Props = {
    label: string;
    rules?: RulesType | Array<keyof RulesType>;
    validateOnInit: boolean;
    value: string;
};

export default function useForm({ label, rules, validateOnInit, value }: Props) {
    const formContext = inject<FormContextType>(FormContext);
    const labelId = ref('');

    onMounted(() => {
        if (label && !!formContext && Object.keys(formContext).length) {
            labelId.value = formContext.setupForm(label, rules);
            formContext.validateField(labelId.value, value, validateOnInit);
        }
    });

    const error = computed(() => {
        if (formContext && formContext.formElements[labelId.value]) {
            return formContext.formElements[labelId.value].error;
        }

        return null;
    });

    const updateInputValue = (value: string) => {
        if (formContext && !!Object.keys(formContext).length) {
            formContext.validateField(labelId.value, value, true);
        }
    };

    return { error, labelId: labelId.value, updateInputValue };
}
