<script setup lang="ts">
import type { RulesType } from '../types/form';
import useForm from '../composables/useForm';
import {
    addMonth,
    formatDate,
    formatTimeZone,
    getEndDayOfMonth,
    getStartDayOfMonth,
} from '../utils/timestamp';
import CalendarIcon from '../icons/CalendarIcon.vue';
import ChevronLeftIcon from '../icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '../icons/ChevronRightIcon.vue';

type Emits = {
    (e: 'update:value', value: string): void;
};

type Props = {
    label: string;
    rules?: RulesType | Array<keyof RulesType>;
    validateOnInit?: boolean;
    value: string;
};

const props = withDefaults(defineProps<Props>(), { validateOnInit: false });
const emit = defineEmits<Emits>();

const { error, labelId, updateInputValue } = useForm({
    label: props.label,
    validateOnInit: props.validateOnInit,
    value: props.value,
    rules: props.rules,
});

const selected = ref(false);
const today = formatTimeZone('yyyy-MM-dd');
const setSelected = () => (selected.value = false);
const dateCounter = ref(0);
const dateHeader = computed(() =>
    formatDate('yyyy-MM', addMonth(dateCounter.value, props.value).toISOString()),
);
const datePicker = ref(null);
const dayBegins = computed(() =>
    formatDate(
        'EEEEEE',
        getStartDayOfMonth(addMonth(dateCounter.value, props.value).toISOString()).toISOString(),
    ),
);
const dayEnds = computed(() =>
    formatDate(
        'EEEEEE',
        getEndDayOfMonth(addMonth(dateCounter.value, props.value).toISOString()).toISOString(),
    ),
);
const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const daysList = computed(() => {
    const buffer = Array.from(Array(days.indexOf(dayBegins.value)).keys(), (num) => 60 + num);
    const daysOfTheMonth = Array.from(
        Array(
            +formatDate(
                'd',
                getEndDayOfMonth(
                    addMonth(dateCounter.value, props.value).toISOString(),
                ).toISOString(),
            ),
        ).keys(),
    );

    return buffer.concat(daysOfTheMonth);
});

watchEffect(() => {
    if (datePicker.value) {
        if (selected.value) {
            (datePicker.value as any).addEventListener('click', (e: any) => e.stopPropagation());
            setTimeout(() => {
                document.body.addEventListener('click', setSelected);
            }, 200);
        } else {
            (datePicker.value as any).removeEventListener('click', (e: any) => e.stopPropagation());
            document.body.removeEventListener('click', setSelected);
        }
    }
});

const setDay = (day: number) => (day < 10 ? `0${day}` : day);

const isSelected = (day: number) => {
    const result = `${dateHeader.value}-${setDay(day)}`;
    return formatTimeZone('yyyy-MM-dd', 'UTC', props.value) === result;
};

const isToday = (day: number) => {
    const result = `${formatTimeZone('yyyy-MM', 'UTC', dateHeader.value)}-${setDay(day)}`;
    return today === result;
};

const updateValue = (day: number) => {
    selected.value = false;
    const inputValue = `${dateHeader.value}-${setDay(day)}`;
    updateInputValue(inputValue);
    emit('update:value', inputValue);
};
</script>

<template>
    <div>
        <BudgetLabel :error="error" :labelId="labelId" :label="label" />

        <div class="relative mt-2" ref="datePicker">
            <div
                class="absolute left-0 top-0 flex h-full w-10 flex-col items-center justify-center rounded-l-md bg-gray-600"
            >
                <CalendarIcon class="h-5 w-5 text-white" />
            </div>
            <input
                :id="labelId"
                class="w-full rounded border py-2 pl-12 pr-2 text-gray-500 outline-none"
                :class="{
                    'border-gray-300 focus:border-primary': !error,
                    'border-red-600': error,
                }"
                type="text"
                :value="formatTimeZone('yyyy-MM-dd', 'UTC', value)"
                :autocomplete="type !== 'password' ? 'on' : 'off'"
                @click="selected = !selected"
                :aria-labelledby="labelId"
                readonly
            />

            <div
                class="absolute left-0 top-0 z-50 min-h-64 w-64 origin-top-left translate-y-12 transform bg-white px-4 py-3 shadow-2xl transition duration-200 ease-out"
                :class="{
                    'scale-100 opacity-100': selected,
                    'scale-0 opacity-0': !selected,
                }"
            >
                <div class="flex flex-row items-center justify-between text-gray-700">
                    <Button fab @click="dateCounter--">
                        <ChevronLeftIcon class="h-4 w-4 cursor-pointer" />
                    </Button>
                    <span class="text-sm">
                        {{ formatTimeZone('MMMM yyyy', 'UTC', dateHeader) }}
                    </span>
                    <Button fab @click="dateCounter++" class="translate-x-2 transform">
                        <ChevronRightIcon class="h-4 w-4 cursor-pointer" />
                    </Button>
                </div>

                <div class="my-2 grid grid-cols-7 gap-1">
                    <span
                        class="text-center text-sm text-gray-500"
                        v-for="(day, index) in days"
                        :key="index"
                    >
                        {{ day }}
                    </span>
                </div>

                <div class="grid grid-cols-7 gap-1">
                    <div v-for="(date, index) in daysList" :key="index">
                        <span v-if="date > 31">&nbsp;</span>
                        <button
                            v-if="date < 32"
                            class="focus:shadow-outline w-full rounded-full py-1 text-center text-sm focus:outline-none"
                            :class="{
                                'border-0 bg-white text-gray-600 hover:bg-gray-200':
                                    !isSelected(date + 1) && !isToday(date + 1),
                                'border-0 bg-primary text-white': isSelected(date + 1),
                                'bg-gray-200 text-primary shadow-inner':
                                    isToday(date + 1) && !isSelected(date + 1),
                            }"
                            @click="updateValue(date + 1)"
                        >
                            {{ date + 1 }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
    </div>
</template>
