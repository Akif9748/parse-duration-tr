// ./index.d.ts

declare namespace parse {
  /**
   * convert `str` to ms
   */
  type Units =
    'nanosaniye' | 'ns' |
    'mikrosaniye' | 'µs' | 'μs' | 'us' |
    'milisaniye' | 'ms' |
    'saniye' | 'sn' | 's' |
    'dakika' | 'dak' | 'dk' | 'd' |
    'saat' | 'sa' |
    'gün' | 'gun' | 'g' |
    'hafta' | 'hft' | 'h' |
    'ay' | 'a' |
    'yıl' | 'yil' | 'y'
}

type Parse = {
  (input: string, format?: parse.Units = "ms"): number;
  [key: string]: number;
}

declare const parse: Parse;

export = parse;
