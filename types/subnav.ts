import type { ConcreteComponent } from 'vue';

export type ProfileLink = {
    to?: string;
    action?: string;
    label: string;
    icon: string | ConcreteComponent;
};
