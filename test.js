'use strict';
const t = require("node:test");
const parse = require('.');
const assert=require("node:assert");
const { ns, saat: h, ay: b, s, ms, gun: d, y, dk: m } = parse;

t('ms, milisaniye', t => {
	assert.strictEqual(parse('100ms'), 100)
	assert.strictEqual(parse('10milisaniye'), 10)
})


t('combined', t => {
	assert.strictEqual(parse('01sa20d00s'), 1 * h + 20 * m)
	assert.strictEqual(parse('1sa 20dk'), 1 * h + 20 * m)
	assert.strictEqual(parse('1 sa 20 dk'), 1 * h + 20 * m)
	assert.strictEqual(parse('.5 s'), 500)
	assert.strictEqual(parse('27_681 ns'), 27681 * ns)
	assert.strictEqual(parse('running length: 1saat:20dk'), 1 * h + 20 * m)
	assert.strictEqual(parse('2sa -40dk'), 2 * h + 40 * m)
	assert.strictEqual(-parse('1sa 40dk'), -1 * h - 40 * m)
	assert.strictEqual(parse('2e3s'), 2000 * s)
})

t('edge cases', t => {
	assert.strictEqual(parse('1y.2ay.5gün.12saat.34sn.20ms'), 1 * y + .2 * b + .5 * d + .12 * h + .34 * s + .20 * ms)
	assert.strictEqual(-parse('-1y.2ay.5gün 12saat,34sn,20ms'), -1 * y - .2 * b - .5 * d - 12 * h - 34 * s - 20 * ms)
})

t('invalid', t => {
	assert.strictEqual(parse('abc'), 0)
	assert.strictEqual(parse(), 0)
})

t('format', t => {
	assert.strictEqual(parse('1sa 20dk', 'dk'), parse('1sa 20dk') / 1000 / 60)
	assert.strictEqual(parse('10 s', 's'), 10)
	assert.strictEqual(parse('10s', 's'), 10)	
})

t('no-units', t => {
	assert.strictEqual(parse(1), 1)
	assert.strictEqual(parse(`1`), 1)
	assert.strictEqual(parse(`20`), 20)
})

t('unicode support', t => {
	parse['сек'] = parse['s'] // ru seconds
	assert.strictEqual(parse('5сек'), 5000);
})

t('local number formats', t => {
	assert.strictEqual(parse('3.14 saniye'), 3140)
	assert.strictEqual(parse('3,14 saniye'), 3140)
	assert.strictEqual(parse('"1,23,456.789 saniye'), 123456789)
	assert.strictEqual(parse('"1,23,456.789s'), 123456789)
	assert.strictEqual(parse('"123.456,789 saniye'), 123456789)
	assert.strictEqual(parse('"30,000.65 saniye'), 30000650)
	assert.strictEqual(parse('"30.000,65 saniye'), 30000650)
	assert.strictEqual(parse('"30 000,65 saniye'), 30000650)
	assert.strictEqual(parse('"30_000,65 saniye'), 30000650)
})