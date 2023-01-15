// const MONOGRAMS = '⚊⚋' // 3-byte binary monograms (Yin/Yang, reversed binary order)
// const DIGRAMS = '⚌⚍⚎⚏' // 3-byte binary digrams (Yin/Yang, reversed binary order)
// const TRIGRAMS = '☰☱☲☳☴☵☶☷' // 3-byte binary trigrams (Bagua, reversed binary order)
// prettier-ignore
const HEXAGRAMS = '䷀䷁䷂䷃䷄䷅䷆䷇䷈䷉䷊䷋䷌䷍䷎䷏䷐䷑䷒䷓䷔䷕䷖䷗䷘䷙䷚䷛䷜䷝䷞䷟䷠䷡䷢䷣䷤䷥䷦䷧䷨䷩䷪䷫䷬䷭䷮䷯䷰䷱䷲䷳䷴䷵䷶䷷䷸䷹䷺䷻䷼䷽䷾䷿' // 3-byte binary hexagrams (Yì Jīng)
// Ternary tetragrams and diagrams use 4 bytes, which in JavaScript are encoded
// using surrogate pairs. That makes it very painful to look up characters by
// index. A simple workaround is to convert it to an actual array.
// See also: https://mathiasbynens.be/notes/javascript-encoding#surrogate-pairs
// prettier-ignore
const TERNARY_TETRAGRAMS = Array.from('𝌆𝌇𝌈𝌉𝌊𝌋𝌌𝌍𝌎𝌏𝌐𝌑𝌒𝌓𝌔𝌕𝌖𝌗𝌘𝌙𝌚𝌛𝌜𝌝𝌞𝌟𝌠𝌡𝌢𝌣𝌤𝌥𝌦𝌧𝌨𝌩𝌪𝌫𝌬𝌭𝌮𝌯𝌰𝌱𝌲𝌳𝌴𝌵𝌶𝌷𝌸𝌹𝌺𝌻𝌼𝌽𝌾𝌿𝍀𝍁𝍂𝍃𝍄𝍅𝍆𝍇𝍈𝍉𝍊𝍋𝍌𝍍𝍎𝍏𝍐𝍑𝍒𝍓𝍔𝍕𝍖') // 4-byte ternary tetragrams (Tài Xuán Jīng)
const TERNARY_DIGRAMS = Array.from('𝌁𝌂𝌃𝌄') // 4-byte ternary digrams (Tài Xuán Jīng)

/**
 * Bases and their variants.
 */
// prettier-ignore
export const bases = {
  85: {
    ching: TERNARY_TETRAGRAMS.concat(TERNARY_DIGRAMS),
    default: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu', // Ascii85
    ipv6: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~', // RFC 1924
    z: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#', // ZeroMQ's Z85
  },
  81: {
    ching: TERNARY_TETRAGRAMS,
    default: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%()*+-;=?@^_{|}~', // John Gamble's Base81
  },
  64: {
    ching: HEXAGRAMS,
    default: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/', // RFC 4648
    url: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_', // URL and filename safe
  },
  62: {
    ching: HEXAGRAMS.slice(0, 62),
    default: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  },
  58: {
    ching: HEXAGRAMS.slice(0, 58),
    default: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', // Bitcoin's Base58
  },
  45: {
    ching: HEXAGRAMS.slice(0, 45),
    default: '0123456789abcdefghijklmnopqrstuvwxyz $%*+-./:', // RFC 9285
  },
  36: {
    ching: HEXAGRAMS.slice(0, 36),
    default: '0123456789abcdefghijklmnopqrstuvwxyz',
  },
  32: {
    ching: HEXAGRAMS.slice(0, 32),
    default: 'abcdefghijklmnopqrstuvwxyz234567', // RFC 4648
    bech: 'qpzry9x8gf2tvdw0s3jn54khce6mua7l', // Bitcoin's Bech32
    crockford: '0123456789abcdefghjkmnpqrstvwxyz', // Crockford's Base32
    z: 'ybndrfg8ejkmcpqxot1uwisza345h769', // Zooko's z-base-32
  },
  16: {
    ching: HEXAGRAMS.slice(0, 16),
    default: '0123456789abcdef', // RFC 4648
  },
}

/**
 * Converts a base encoded string from one variant to another.
 *
 * @param {string} input Encoded data to convert
 * @param {number} base The base used to encode the data, given as an integer
 * @param {string} from The variant of the encoder used (defaults to the 'default' variant for the base)
 * @param {string} to The variant to convert to (defaults to 'ching', or the 'default' variant for the base if from is 'ching')
 * @returns {string}
 */
export function ching(input, base, from, to) {
  if (!from) from = 'default'
  if (!to) to = from === 'ching' ? 'default' : 'ching'
  if (!bases[base]) throw Error('Base not supported')
  if (!bases[base][from]) throw Error('From variant not supported')
  if (!bases[base][to]) throw Error('To variant not supported')

  const data = Array.from(input) // workaround for surrogate pairs
  const a = bases[base][from]
  const b = bases[base][to]

  let output = ''
  for (let i = 0, len = data.length; i < len; i++) {
    // Bases <= 45 are case insensitive, so normalize to lowercase
    const char = base > 45 ? data[i] : data[i].toLowerCase()
    output += b[a.indexOf(char)]
  }

  return output
}
