// provided via contentScriptOptions
const {l10n} = self.options;

function text(key) {
    return l10n[key];
}

function addNil(value) {
    return value < 10 ? `0${value}` : value;
}

function date(value) {
    const currentDate = new Date();
    let yearPostfix = '';

    if (currentDate.toDateString() === value.toDateString()) {
        const hour = addNil(value.getHours());
        const min = addNil(value.getMinutes());

        return `${hour}:${min}`;
    }
    else if (currentDate.getYear() !== value.getYear()) {
        yearPostfix = ` ${value.getFullYear()}`;
    }

    const month = text('month' + (value.getMonth() + 1));

    return `${value.getDate()} ${month}${yearPostfix}`;
}

export default {
    text,
    date
};
