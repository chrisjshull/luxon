/* global test expect */

import { DateTime } from '../../dist/cjs/luxon';

//------
// .fromISO
//-------
test('DateTime.fromISO() parses as local by default', () => {
  const dt = DateTime.fromISO('2016-05-25T09:08:34.123');
  expect(dt.toObject()).toEqual({
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 8,
    second: 34,
    millisecond: 123
  });
});

test('DateTime.fromISO() uses the offset provided, but keeps the dateTime as local', () => {
  const dt = DateTime.fromISO('2016-05-25T09:08:34.123+06:00');
  expect(dt.toUTC().toObject()).toEqual({
    year: 2016,
    month: 5,
    day: 25,
    hour: 3,
    minute: 8,
    second: 34,
    millisecond: 123
  });
});

test('DateTime.fromISO() uses the Z if provided, but keeps the dateTime as local', () => {
  const dt = DateTime.fromISO('2016-05-25T09:08:34.123Z');
  expect(dt.toUTC().toObject()).toEqual({
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 8,
    second: 34,
    millisecond: 123
  });
});

test('DateTime.fromISO() optionally adopts the UTC offset provided', () => {
  const dt = DateTime.fromISO('2016-05-25T09:08:34.123+06:00', { setZone: true });
  expect(dt.zone.name).toBe('UTC+6');
  expect(dt.toObject()).toEqual({
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 8,
    second: 34,
    millisecond: 123
  });
});

test('DateTime.fromISO() can optionally specify a zone', () => {
  let dt = DateTime.fromISO('2016-05-25T09:08:34.123', { zone: 'utc' });
  expect(dt.offset()).toEqual(0);
  expect(dt.toObject()).toEqual({
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 8,
    second: 34,
    millisecond: 123
  });

  dt = DateTime.fromISO('2016-05-25T09:08:34.123+06:00', { zone: 'utc' });
  expect(dt.offset()).toEqual(0);
  expect(dt.toObject()).toEqual({
    year: 2016,
    month: 5,
    day: 25,
    hour: 3,
    minute: 8,
    second: 34,
    millisecond: 123
  });
});

test('DateTime.fromISO() accepts a variety of ISO formats', () => {
  const isSame = (s, expected) => expect(DateTime.fromISO(s).toObject()).toEqual(expected);

  isSame('2016-05-25', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  isSame('20160525', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  isSame('2016-05-25T09', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  isSame('2016-05-25T09:24', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 0,
    millisecond: 0
  });

  isSame('2016-05-25T09:24:15', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 0
  });

  isSame('2016-05-25T09:24:15.123', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 123
  });

  isSame('2016-05-25T0924', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 0,
    millisecond: 0
  });

  isSame('2016-05-25T092415', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 0
  });

  isSame('2016-05-25T092415.123', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 123
  });

  isSame('2016-05-25T09:24:15,123', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 123
  });

  isSame('2016-W21-3', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  isSame('2016W213', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  isSame('2016-W21-3T09:24:15.123', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 123
  });

  isSame('2016W213T09:24:15.123', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 123
  });

  isSame('2016-200', {
    year: 2016,
    month: 7,
    day: 18,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  isSame('2016200', {
    year: 2016,
    month: 7,
    day: 18,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });

  isSame('2016-200T09:24:15.123', {
    year: 2016,
    month: 7,
    day: 18,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 123
  });

  // these are formats that aren't technically valid but we parse anyway.
  // Testing them more to document them than anything else
  isSame('2016-05-25T0924:15.123', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 123
  });

  isSame('2016-05-25T09:2415.123', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 9,
    minute: 24,
    second: 15,
    millisecond: 123
  });

  isSame('2016-W213', {
    year: 2016,
    month: 5,
    day: 25,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  });
});

test('DateTime.fromISO() rejects poop', () => {
  const rejects = s => expect(DateTime.fromISO(s).isValid()).toBeFalsy();

  rejects(null);
  rejects('');
  rejects(' ');
  rejects('2016');
  rejects('2016-1');
  rejects('2016-1-15');
  rejects('2016-01-5');
  rejects('2016-05-25 08:34:34');
  rejects('2016-05-25Q08:34:34');
  rejects('2016-05-25T8:04:34');
  rejects('2016-05-25T08:4:34');
  rejects('2016-05-25T08:04:4');
  rejects('2016-05-25T:03:4');
  rejects('2016-05-25T08::4');
  rejects('2016-W32-02');

  // some of these are actually valid iso we don't take (yet)
  rejects('2016-08');
  rejects('2016-W32');
});

//------
// .fromRFC2822
//-------

test('DateTime.fromRFC2822() accepts full format', () => {
  const dt = DateTime.fromRFC2822('Tue, 01 Nov 2016 13:23:12 +0630');
  expect(dt.isValid()).toBe(true);
  expect(dt.toUTC().toObject()).toEqual({
    year: 2016,
    month: 11,
    day: 1,
    hour: 6,
    minute: 53,
    second: 12,
    millisecond: 0
  });
});

test('DateTime.fromRFC2822() rejects incorrect days of the week', () => {
  const dt = DateTime.fromRFC2822('Wed, 01 Nov 2016 13:23:12 +0600');
  expect(dt.isValid()).toBe(false);
});

test('DateTime.fromRFC2822() can elide the day of the week', () => {
  const dt = DateTime.fromRFC2822('01 Nov 2016 13:23:12 +0600');
  expect(dt.isValid()).toBe(true);
  expect(dt.toUTC().toObject()).toEqual({
    year: 2016,
    month: 11,
    day: 1,
    hour: 7,
    minute: 23,
    second: 12,
    millisecond: 0
  });
});

test('DateTime.fromRFC2822() can elide seconds', () => {
  const dt = DateTime.fromRFC2822('01 Nov 2016 13:23 +0600');
  expect(dt.isValid()).toBe(true);
  expect(dt.toUTC().toObject()).toEqual({
    year: 2016,
    month: 11,
    day: 1,
    hour: 7,
    minute: 23,
    second: 0,
    millisecond: 0
  });
});

test('DateTime.fromRFC2822() can use Z', () => {
  const dt = DateTime.fromRFC2822('01 Nov 2016 13:23:12 Z');
  expect(dt.isValid()).toBe(true);
  expect(dt.toUTC().toObject()).toEqual({
    year: 2016,
    month: 11,
    day: 1,
    hour: 13,
    minute: 23,
    second: 12,
    millisecond: 0
  });
});

test('DateTime.fromRFC2822() can use a weird subset of offset abbreviations', () => {
  const dt = DateTime.fromRFC2822('01 Nov 2016 13:23:12 EST');
  expect(dt.isValid()).toBe(true);
  expect(dt.toUTC().toObject()).toEqual({
    year: 2016,
    month: 11,
    day: 1,
    hour: 18,
    minute: 23,
    second: 12,
    millisecond: 0
  });
});

//------
// .fromHTTP
//-------