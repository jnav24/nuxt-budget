import { seeders } from '../../prisma/seeders';

for (const seed of seeders) {
    if (typeof seed === 'function') {
        (seed as () => void)();
    }
}
