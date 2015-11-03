const {run} = require('sdk/test');
const tests = [
	require('./utils/tab'),
	require('./utils/cookie')
];

tests.forEach(item => {
	Object.keys(item).forEach(key => exports[`test ${key}`] = item[key]);
});

run(exports);