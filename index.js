'use strict';
const durationRE = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/uig;

module.exports = parse;

parse.nanosaniye =
  parse.ns = 1 / 1e6;

parse.mikrosaniye =
  parse["µs"] =
  parse["μs"] =
  parse.us =
  1 / 1e3;

parse.milisaniye =
  parse.ms = 1;

parse.saniye =
  parse.sn =
  parse.s = parse.ms * 1000;

parse.dakika =
  parse.dak =
  parse.dk =
  parse.d = parse.sn * 60;

parse.saat =
  parse.sa = parse.dakika * 60;

parse["gün"] =
  parse.gun =
  parse.g = parse.sa * 24;

parse.hafta =
  parse.hft =
  parse.h = parse.gun * 7;

parse.ay =
  parse.a = parse.gun * (365.25 / 12);

parse["yıl"] =
  parse.yil =
  parse.y = parse.gun * 365.25;

const unitRatio = str => parse[str.toLowerCase()] || 1;

/**
 * `string`i ms'ye çevir
 *
 * @param {String} input
 * @param {String} format
 * @return {Number}
 */

function parse(input = "", format = "ms") {
  let result = 0;

  String(input).replace(/(\d)[,_](\d)/g, "$1$2")
    .replace(durationRE, (_, n, units) =>
      (units = unitRatio(units)) &&
      (result += Math.abs(parseFloat(n)) * units)
    );

  return result && result / unitRatio(format);
}