<script setup lang="ts">
import { ConcreteComponent } from 'vue';
import { match } from '~/utils/common';

const { logout } = useGQLAuth();
const { user } = useGQLUser();

const userData = computed(() => user.result?.value?.getUser);

const logUserOut = async () => {
    const response = await logout.mutate();

    if (response?.data) {
        navigateTo({ path: '/auth/login' });
    }
};

export type ProfileLink = {
    to?: string;
    action?: string;
    label: string;
    icon: string | ConcreteComponent;
};

const buttonSelected = ref(false);
const showMobileNav = ref(false);
const showSubNav = ref(false);

// @todo add page where user can add vehicles
const profileLinks: ProfileLink[] = [
    { to: '/dashboard/settings', label: 'Settings', icon: resolveComponent('UiIconCog') },
    { action: 'logout', label: 'Logout', icon: resolveComponent('UiIconLogout') },
];
const menu: ProfileLink[] = [
    { to: '/dashboard', label: 'Home', icon: resolveComponent('UiIconHome') },
    // { link: { name: 'budgets' }, label: 'Budgets', icon: 'UiIconChart' },
    // {
    //     link: { name: 'reports' },
    //     label: 'Reports',
    //     icon: 'UiIconReports',
    // },
];

const resetSelected = () => {
    showSubNav.value = false;
    buttonSelected.value = false;
};

const toggleSelected = () => {
    showSubNav.value = !showSubNav.value;
    buttonSelected.value = !buttonSelected.value;
};

const handleNavClicked = (item: string) => {
    match(item, {
        logout: logUserOut(),
        default: null,
    });
};
</script>

<template>
    <nav class="relative z-50">
        <div class="relative flex h-16 flex-row items-center bg-primary px-4 py-1">
            <div class="container mx-auto flex flex-row items-center justify-between">
                <div class="flex flex-row items-center">
                    <UiIconMenu
                        v-if="!showMobileNav"
                        @click="showMobileNav = true"
                        class="mr-2 block h-8 w-8 cursor-pointer rounded p-1 text-white outline-none focus:bg-dark-primary active:bg-dark-primary sm:hidden"
                    />
                    <UiIconClosed
                        v-if="showMobileNav"
                        @click="showMobileNav = false"
                        class="mr-2 block h-8 w-8 cursor-pointer rounded p-1 text-white outline-none focus:bg-dark-primary active:bg-dark-primary sm:hidden"
                    />
                    <img src="~/assets/images/logo.png" alt="" class="crisp h-10" />
                </div>

                <DashboardSubNav>
                    <button
                        v-if="userData"
                        class="ease flex rounded-full border-2 p-2 text-sm transition duration-300 focus:outline-none"
                        :class="{
                            'border-white': buttonSelected,
                            'border-primary': !buttonSelected,
                        }"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                        @blur="resetSelected()"
                        @click="toggleSelected()"
                    >
                        <span class="rounded-full bg-white">
                            <UiIconUserCircle class="h-6 w-6 text-primary" />
                        </span>

                        <span class="ellipsis my-0 ml-4 mr-2 hidden max-w-32 text-white sm:block">
                            {{ userData.profile.fullName }}
                        </span>

                        <span class="hidden sm:block">
                            <UiIconChevronDown
                                class="h-6 w-6 transform text-white transition duration-300"
                                :class="{
                                    'rotate-180': buttonSelected,
                                    'rotate-0': !buttonSelected,
                                }"
                            />
                        </span>
                    </button>

                    <DashboardSubNavItems
                        :items="profileLinks"
                        :show="showSubNav"
                        @nav-clicked="handleNavClicked($event)"
                    />
                </DashboardSubNav>
            </div>
        </div>

        <div v-if="showMobileNav" class="absolute z-10 block w-full bg-primary px-4 py-2 sm:hidden">
            <SharedLink
                v-for="(item, index) in menu"
                :key="index"
                link-type="inverted"
                :link-to="item.to"
            >
                <component :is="item.icon" class="h-4 w-4"></component>
                <span class="ml-2">{{ item.label }}</span>
            </SharedLink>
        </div>

        <div class="hidden bg-white shadow-sm sm:block">
            <div class="container mx-auto flex flex-row">
                <SharedLink v-for="(item, index) in menu" :key="index" :link-to="item.to">
                    <component :is="item.icon" class="h-4 w-4"></component>
                    <span class="ml-2">{{ item.label }}</span>
                </SharedLink>
            </div>
        </div>
    </nav>
</template>
