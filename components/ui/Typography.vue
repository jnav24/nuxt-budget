<script setup lang="ts">
type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';

type Props = {
    className?: string;
    color?: 'primary' | 'secondary' | 'danger';
    tag?: TagType;
    variant:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'subhead'
        | 'subhead2';
};

const props = withDefaults(defineProps<Props>(), { className: '' });

const variantsMapping = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    caption: 'p',
    subhead: 'h4',
    subhead2: 'h4',
    body1: 'p',
    body2: 'p',
};

const styles = () => {
    const classes = [];

    switch (variantsMapping[props.variant] ?? 'p') {
        case 'h1':
            classes.push('text-2xl font-header');
            break;
        case 'h2':
            classes.push('text-1xl font-header');
            break;
        case 'h3':
            classes.push('text-xl font-header');
            break;
        case 'h4':
            classes.push('text-lg font-header');
            break;
        case 'h5':
            classes.push('text-md font-header');
            break;
        default:
            if (props.variant === 'caption') {
                classes.push('text-sm');
            } else {
                classes.push('text-base');
            }
            break;
    }

    switch (props.color) {
        case 'primary':
            classes.push('text-primary dark:text-light-primary');
            break;
        case 'secondary':
            classes.push('text-secondary dark:text-light-secondary');
            break;
        case 'danger':
            classes.push('text-danger dark:text-light-danger');
            break;
        default:
            classes.push('text-gray-600 dark:text-gray-300');
            break;
    }

    return `${classes.join(' ')} ${props.className} `;
};

const Component: TagType = props.tag ?? (variantsMapping[props.variant] as TagType) ?? 'p';
</script>

<template>
    <component :is="Component" :class="styles()">
        <slot />
    </component>
</template>
