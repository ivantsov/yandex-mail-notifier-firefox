jest.unmock('../l10n');

import l10n from '../l10n';

const months = Array
    .from(Array(12).keys())
    .reduce((obj, item) => {
        obj[`month${item}`] = `month${item}`;
        return obj;
    }, {});

self.options = {
    l10n: months
};

describe('l10n', () => {
    it('defined', () => {
        expect(l10n).toBeDefined();
    });

    describe('text', () => {
        it('not exist key', () => {
            expect(l10n.text('notexist')).toBeUndefined();
        });

        it('exist key', () => {
            const key = 'month1';

            expect(l10n.text(key)).toBe(months[key]);
        });
    });

    describe('date', () => {
        describe('this day', () => {
            it('no need nils', () => {
                const current = new Date();

                current.setHours(12);
                current.setMinutes(10);

                expect(l10n.date(current)).toBe('12:10');
            });

            it('need nils', () => {
                const current = new Date();

                current.setHours(9);
                current.setMinutes(5);

                expect(l10n.date(current)).toBe('09:05');
            });
        });

        it('this year', () => {
            const current = new Date();
            const prevMonth = current.getMonth() - 1;

            current.setMonth(prevMonth);

            expect(l10n.date(current)).toBe(`${current.getDate()} ${months[`month${prevMonth + 1}`]}`);
        });

        it('another year', () => {
            const current = new Date();
            const prevYear = current.getYear() - 1;

            current.setYear(prevYear);

            expect(l10n.date(current)).toBe(`${current.getDate()} ${months[`month${current.getMonth() + 1}`]} ${current.getFullYear()}`);
        });
    });
});
