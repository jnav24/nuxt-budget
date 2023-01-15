<template>
    <div class="min-h-screen flex flex-col justify-center items-center">
        <div
            class="absolute top-0 left-0 w-full h-full bg-gray-100 sm:bg-primary sm:bg-opacity-75 z-20"
        ></div>
        <div class="bg-image"></div>

        <div
            class="relative z-30 w-full sm:w-100 mt-6 px-4 sm:px-0 pt-4 sm:bg-white sm:rounded-lg sm:shadow-md overflow-hidden text-left"
        >
            <div class="flex flex-row justify-center mb-4">
                <div class="overflow-hidden h-16 w-16">
                    <img
                        src="@/assets/images/logo_1.png"
                        alt="Dime Budget"
                        style="max-width: 12rem"
                        class="crisp h-full w-64"
                    />
                </div>
            </div>

            <slot />
        </div>
    </div>
</template>
