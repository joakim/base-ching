# Base Ching `𝌖𝍁𝌫𝍅𝌽𝍕𝍃𝌠𝍁𝌻𝌇𝌑𝌲𝍃`

An [I Ching](https://en.m.wikipedia.org/wiki/I_Ching) alphabet for displaying [binary-to-text encodings](https://en.m.wikipedia.org/wiki/Binary-to-text_encoding).

The alphabet consists of [Yì Jīng](https://en.m.wikipedia.org/wiki/Hexagram_(I_Ching)) and [Tài Xuán Jīng](https://en.m.wikipedia.org/wiki/Taixuanjing#Unicode) Unicode characters and supports a wide range of bases.

#### Pros

- Looks better than scrambled ASCII
- Code and URL safe (no conflicting characters)
- Interchangeable with all variants (Bech32 produces the same output as z-base-32)

#### Cons

- Not exactly human readable
- Requires Unicode support
- The characters use 3–4 bytes vs the 1 byte of ASCII characters


## Usage

```js
import { ching } from 'base-ching'

// Encode your data using your library of choice
let encoded = base85.encode(uuid)
// .ML\:N#E"MSjQha3L'5u

// Enching the output string by specifying its base
let chinged = ching(encoded, 85)
// 𝌲𝌱𝍁𝌟𝌳𝌈𝌪𝌇𝌲𝌸𝍏𝌶𝍍𝍆𝌘𝌱𝌌𝌚𝌄

// Deching the enchinged string by converting from 'ching' (say that 10 times fast)
let dechinged = ching(chinged, 85, 'ching')
// .ML\:N#E"MSjQha3L'5u
```

The function `ching` converts a base encoded string from one variant (alphabet) to another.

By default, it converts from the `'default'` variant to the `'ching'` alphabet.

Parameters:

- **input** `string` (required)  
  Encoded data to convert
- **base** `number` (required)  
  The base used to encode the data, given as an integer
- **from** `string` (optional)  
  The variant of the encoder used (defaults to the `'default'` variant for the base)
- **to** `string` (optional)  
  The variant to convert to (defaults to `'ching'`, or the `'default'` variant for the base if `from` is `'ching'`)


## Bases

- Base85: [Ascii85](https://en.m.wikipedia.org/wiki/Ascii85)
  - `ipv6`: [RFC 1924](https://datatracker.ietf.org/doc/html/rfc1924) (IPv6)
  - `z`: [ZeroMQ's](https://rfc.zeromq.org/spec/32/)
- Base81: [John Gamble's](https://metacpan.org/pod/Convert::Base81) (ternary)
- Base64: [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-4)
  - `url`: [RFC 4648 (with URL and Filename Safe Alphabet)](https://datatracker.ietf.org/doc/html/rfc4648#section-5)
- Base62
- Base58: [Bitcoin's](https://en.bitcoinwiki.org/wiki/Base58)
- Base45: [RFC 9285](https://datatracker.ietf.org/doc/html/rfc9285) (QR)
- Base36
- Base32: [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-6)
  - `hex`: [RFC 4648 (with Extended Hex Alphabet)](https://datatracker.ietf.org/doc/html/rfc4648#section-7)
  - `bech`: [Bitcoin's Bech32](https://en.bitcoin.it/wiki/Bech32)
  - `crockford`: [Douglas Crockford's](https://www.crockford.com/base32.html)
  - `z`: [Zooko O'Whielacronx's](https://philzimmermann.com/docs/human-oriented-base-32-encoding.txt)
- Base16: [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-8)

Base64 and lower use [Yì Jīng hexagrams](https://unicode-table.com/en/blocks/yijing-hexagram-symbols/), Base81 uses [Tài Xuán Jīng tetragrams](https://unicode-table.com/en/blocks/tai-xuan-jing-symbols/), while Base85 also uses the first four Tài Xuán Jīng digrams.

Pull requests for other bases are welcome.


## FAQ

### What does it do?

It simply translates base encoded data to or from I Ching characters (or any other alphabet), for display purposes.

The underlying encoding and character length is exactly the same, only the alphabet changes.

### Why should I use it?

It lets you use a more efficient encoding, like Base85, by avoiding some issues with its alphabet, like syntax conflicts or poor aesthetics.

    #&@?Kh.<=T"CGi<\872T301je:K*P[)qDRsW*f → 𝌈𝌋𝌥𝌤𝌰𝍍𝌓𝌡𝌢𝌹𝌇𝌨𝌬𝍎𝌡𝍁𝌝𝌜𝌗𝌹𝌘𝌕𝌖𝍏𝍊𝌟𝌰𝌏𝌵𝍀𝌎𝍖𝌩𝌷𝌂𝌼𝌏𝍋

A 36 character 128-bit UUID can instead be represented as a string of 20 futuristic looking symbols.

    1a181f5d-4d9a-4e6a-9c36-8554b0edddc7 → 𝌙𝌆𝌸𝌙𝌔𝌗𝍋𝌕𝍌𝍎𝌲𝌮𝌸𝍂𝌡𝌜𝍄𝌏𝌰𝍀
    
It can also be used to present the raw bytes of a large binary to end users in a more interesting way than scrambled text.

    𝌌𝍀𝌦𝍊𝍇𝌌𝌘𝌩𝌻𝍃𝌙𝍒𝌜𝌲𝌘𝌭𝌔𝌚𝌥𝍖𝌒𝍁𝌠𝌒𝌆𝌽𝌺𝌗𝌬𝌡𝌬𝌳𝌥𝍖𝌓𝌯𝌵𝌏𝌻𝌸𝌈𝌍𝌥𝍅𝌨𝌶𝌌𝍊𝌘𝌨𝌛𝌬𝍍𝍖𝍔𝌒𝌩𝌛𝌟𝌬𝍈𝍍𝌥𝌾𝌇𝌯𝍕
    𝌇𝌦𝌏𝍌𝍐𝍈𝌋𝌆𝌓𝌜𝌟𝍓𝌦𝌛𝌷𝍄𝍍𝌋𝌇𝌍𝌾𝌌𝌶𝌍𝍀𝍃𝌜𝌌𝌥𝌜𝌏𝌆𝌺𝌏𝌎𝍇𝌰𝍅𝌥𝍄𝌉𝍍𝌥𝌰𝌢𝍒𝍑𝌈𝌴𝌹𝌖𝍈𝍖𝍒𝌋𝌎𝌤𝌦𝌈𝍃𝌻𝌨𝍅𝌼𝍑𝌖𝌣
    𝌞𝌒𝌤𝌼𝌝𝌚𝍋𝌦𝌛𝌦𝌭𝍖𝌆𝍎𝍐𝌩𝌣𝍎𝍁𝌷𝍕𝌰𝌦𝍂𝌷𝌍𝌠𝌵𝌹𝌠𝌗𝌩𝍆𝍋𝌙𝌳𝌽𝍋𝌍𝌓𝌘𝌚𝍓𝌘𝌢𝌵𝍏𝌙𝌧𝍑𝌏𝌯𝌓𝍉𝌶𝌼𝌾𝌕𝌉𝌚𝌕𝌜𝌿𝌖𝌏𝌲𝌨
    𝌢𝍓𝍉𝌵𝌽𝍕𝍋𝌫𝌞𝌮𝌞𝌔𝍊𝌋𝌶𝌮𝌖𝍋𝌆𝌆𝌱𝍋𝍈𝌧𝌿𝍎𝍁𝌓𝌇𝍇𝌽𝌌𝌵𝍇𝌪𝍏𝌒𝍁𝌨𝌗𝍍𝌚𝌕𝍉𝍌𝍀𝌫𝌓𝌭𝌡𝌜𝌷𝌴𝌟𝌡𝌽𝍆𝌭𝌈𝌱𝌺𝍍𝌔𝌠𝌶𝌚𝌶
    𝌍𝍐𝌲𝍏𝍎𝌤𝌣𝌹𝍔𝍊𝍐𝌠𝍋𝌣𝌙𝍀𝌭𝌑𝍎𝍈𝌫𝌹𝍍𝍏𝌥𝌐𝌘𝌨𝍄𝍖𝌴𝌈𝍖𝌳𝌳𝌰𝌲𝍐𝍉𝌮𝌿𝌦𝌝𝍀𝌪𝌪𝍉𝍅𝌞𝌫𝌑𝍀𝍇𝌯𝌸𝌴𝌲𝍔𝌳𝌗𝌓𝍎𝌍𝌒𝌎𝍋𝌯
    𝌥𝍇𝌎𝌚𝌚𝌤𝌠𝍕𝌞𝍋𝌬𝌖𝍑𝍕𝌍𝌔𝌬𝌮𝌙𝌛𝌝𝌶𝍉𝌞𝍏𝌧𝌳𝌷𝍀𝌻𝌘𝌦𝍀𝌯𝌲𝌕𝌔𝍎𝍏𝌞𝌇𝍑𝌻𝌧𝍀𝌌𝌺𝌴𝍒𝌒𝌜𝌋𝌽𝌢𝌞𝌩𝌮𝍖𝌟𝌥𝌙𝌢𝍈𝍄𝍑𝌡𝌉
    𝌨𝍁𝌹𝌴𝌸𝌈𝌯𝌦𝌘𝍄𝌵𝌟𝍊𝌢𝍎𝍓𝌌𝌞𝌍𝌾𝌯𝌧𝌛𝍇𝌒𝌌𝌆𝌱𝍓𝌨𝌳𝍄𝌬𝌐𝍁𝌮𝌿𝌉𝌭𝌫𝌗𝍎𝍈𝌙𝍎𝍕𝌉𝌷𝌶𝌊𝌟𝌭𝍒𝌍𝍔𝌥𝌛𝌙𝌹𝍇𝌊𝍆𝍀𝌸𝌢𝍁𝌈
    𝌈𝍎𝌞𝌔𝍂𝌊𝌲𝍉𝌊𝌝𝌮𝍕𝌬𝍈𝌳𝌢𝌋𝌗𝌺𝌧𝍆𝌞𝌞𝌸𝍇𝌑𝍖𝍒𝍕𝍎𝍏𝌵𝌢𝌕𝌋𝌙𝌔𝍈𝌺𝌟𝌧𝌺𝌓𝍈𝌔𝌭𝌨𝍉𝌬𝌼𝌟𝍈𝌖𝌻𝌫𝍔𝌠𝌼𝌇𝍃𝍎𝍊𝌪𝌯𝌮𝍈𝍉
    𝌟𝍒𝌜𝌦𝌩𝌲𝌕𝍐𝌸𝍖𝌷𝌾𝌚𝌢𝍂𝍅𝌪𝍒𝌨𝌭𝍏𝍊𝌶𝌆𝌒𝍍𝌏𝌆𝍌𝍅𝍐𝌼𝍏𝍋𝍂𝌫𝍌𝍂𝌥𝌬𝍌𝌉𝌕𝌑𝍉𝌱𝌰𝍉𝍊𝌙𝌜𝌚𝌸𝌇𝌻𝌯𝌊𝌓𝌋𝌝𝌬𝍂𝍂𝍋𝍌𝌾𝌣
    𝌏𝌻𝌧𝌑𝍎𝍌𝍊𝌞𝍖𝌰𝌎𝌴𝌨𝍔𝌺𝌿𝍑𝌆𝌊𝌒𝌆𝌵𝍕𝍆𝌕𝌧𝌳𝌓𝍈𝌻𝌇𝌞𝌬𝍄𝍅𝍄𝌯

Finally, it can be used to convert between different variants (alphabets) of a base.

```js
ching(encoded, 32, 'bech', 'crockford')
```

### When should I use it?

When your target environment(s) support Unicode and:

1. You want to show encoded data to users in a visually pleasing way
   - And users don't need to read/speak/type the encoded data (copy/paste is fine)
2. You want to use encoded data in code/URLs/etc without having to escape characters
   - And the extra bytes is an acceptable tradeoff
3. You want a universal textual representation compatible with all variants of a base
   - Or just convert between different variants of a base

If that's not you, just use the default ASCII output for your encoding of choice.

This alphabet is not suitable for storing or transmitting large binaries, as the Unicode characters are 3–4 times larger than the original ASCII characters.
