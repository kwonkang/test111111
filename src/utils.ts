export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const cleanText = (text: string) => {
  return text.toUpperCase().replace(/[^A-Z]/g, "");
};

export const caesarEncrypt = (text: string, shift: number) => {
  const s = ((shift % 26) + 26) % 26;
  return text
    .toUpperCase()
    .replace(/[A-Z]/g, (c) => ALPHABET[(c.charCodeAt(0) - 65 + s) % 26]);
};

export const caesarDecrypt = (text: string, shift: number) => {
  const s = ((shift % 26) + 26) % 26;
  return text
    .toUpperCase()
    .replace(/[A-Z]/g, (c) => ALPHABET[(c.charCodeAt(0) - 65 - s + 26) % 26]);
};

export const vigenereEncrypt = (text: string, keyword: string) => {
  let result = "";
  let j = 0;
  const kw = cleanText(keyword);
  if (!kw) return text.toUpperCase();

  for (let i = 0; i < text.length; i++) {
    const c = text[i].toUpperCase();
    if (/[A-Z]/.test(c)) {
      const shift = kw[j % kw.length].charCodeAt(0) - 65;
      result += ALPHABET[(c.charCodeAt(0) - 65 + shift) % 26];
      j++;
    } else {
      result += text[i];
    }
  }
  return result;
};

export const vigenereDecrypt = (text: string, keyword: string) => {
  let result = "";
  let j = 0;
  const kw = cleanText(keyword);
  if (!kw) return text.toUpperCase();

  for (let i = 0; i < text.length; i++) {
    const c = text[i].toUpperCase();
    if (/[A-Z]/.test(c)) {
      const shift = kw[j % kw.length].charCodeAt(0) - 65;
      result += ALPHABET[(c.charCodeAt(0) - 65 - shift + 26) % 26];
      j++;
    } else {
      result += text[i];
    }
  }
  return result;
};

export const transpositionEncrypt = (text: string, columns: number) => {
  if (columns <= 1) return text;
  const cleaned = text.replace(/\s+/g, '_'); // Replace spaces with underscores for visibility
  let result = "";
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < Math.ceil(cleaned.length / columns); r++) {
      const idx = r * columns + c;
      if (idx < cleaned.length) {
        result += cleaned[idx];
      }
    }
  }
  return result;
};

export const transpositionDecrypt = (text: string, columns: number) => {
  if (columns <= 1) return text;
  const numRows = Math.ceil(text.length / columns);
  const emptyCells = (numRows * columns) - text.length;
  
  const result = new Array(text.length);
  let currentIndex = 0;
  
  for (let c = 0; c < columns; c++) {
    const rowCount = c < columns - emptyCells ? numRows : numRows - 1;
    for (let r = 0; r < rowCount; r++) {
      const idx = r * columns + c;
      result[idx] = text[currentIndex++];
    }
  }
  return result.join('');
};
