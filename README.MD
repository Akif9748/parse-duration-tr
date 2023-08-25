# parse-duration-tr
[`parse-duration`](https://npmjs.org/package/parse-duration-tr) modülü için Türkçe desteği.
Yazı halindeki süreyi milisaniye cinsine çevirir.

## Kurulum

[![NPM](https://nodei.co/npm/parse-duration-tr.png?mini=true)](https://npmjs.org/package/parse-duration-tr)

Kod:

```js
import parse from 'parse-duration-tr'
```

CommonJS kodu:

```js
const parse = require('parse-duratio-tr')
```

## API

### parse(input="", format="ms")

`string`i ms cinsine çevirir.

```js
const ns = parse('1ns') // => 1 / 1e6
const us = parse('1us') // => 1 / 1000
const ms = parse('1ms') // => 1
const s = parse('1s')   // => ms * 1000
const d = parse('1d')   // => s * 60
const sa = parse('1sa') // => d * 60
const g = parse('1g')   // => sa * 24
const h = parse('1h')   // => g * 7
const y = parse('1y')   // => g * 365.25
```

Ayrıca basit cümleleri de dönüştürebilir:

```js
parse('1sa 20dk') // => 1 * sa + 20 * d
parse('1 sa 20 dak') // => 1 * sa + 20 * d
```

youtube formatı

```js
parse('1sa20d0s') // => 1 * sa + 20 * d
```

Virgüllüler:

```js
parse('27,681 ns') // => 27681 * ns
```

Diğer türler:

```js
parse('süre: 1sa:20d') // => 1 * sa + 20 * d
```

Ve `e`

```js
parse('2e3s') // => 2000 * s
```

#### Kullanılabilir formatlar:
- nanosaniye (ns)
- mikrosaniye (μs, us)
- milisaniye (ms)
- saniye (sn, s)
- dakika (dak, dk, d)
- saat (sa)
- gün (gun, g)
- ay (a)
- hafta (hft, h)
- months (a)
- yıl (yil, y)

Hatta kendi formatlarınızı da ekleyebilirsiniz:

```js
parse.salise = parse.saniye / 60;
parse('salise') // 16.6
```

Çıkış formatı da ayarlanabilir.

```js
parse('1 saat 20 dakika', 'dakika') // => 80
```

Geliştirilmiş özellikler:
- Çıkış olarak null değil 0 döndürür.
- Eğer stringde farklı karakter varsa null döndürmez. Yine de parselemeye çalışır.