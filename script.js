// ---------------------------
// Caesar Cipher Functions
// ---------------------------
function encryptCaesar() {
  const text = document.getElementById("caesarText").value.toUpperCase();
  const key = parseInt(document.getElementById("caesarKey").value);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text.charCodeAt(i);
    if (char >= 65 && char <= 90) {
      let shifted = ((char - 65 + key) % 26) + 65;
      result += String.fromCharCode(shifted);
    } else {
      result += text[i];
    }
  }

  document.getElementById("caesarResult").innerText = result;
}

function decryptCaesar() {
  const text = document.getElementById("caesarText").value;
  const key = parseInt(document.getElementById("caesarKey").value, 10);
  if (!text || isNaN(key)) {
    document.getElementById("caesarResult").textContent = "-";
    return;
  }
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    if (c.match(/[a-z]/i)) {
      let code = text.charCodeAt(i);
      let base = code >= 65 && code <= 90 ? 65 : 97;
      result += String.fromCharCode(((code - base - key + 26) % 26) + base);
    } else {
      result += c;
    }
  }
  document.getElementById("caesarResult").textContent = result;
}

// ---------------------------
// RSA Cipher Functions
// ---------------------------
let n, e, d;

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

function generateKeys() {
  const p = parseInt(document.getElementById("p").value);
  const q = parseInt(document.getElementById("q").value);
  n = p * q;
  const phi = (p - 1) * (q - 1);

  // Find smallest e that is coprime with phi
  e = 2;
  while (e < phi && gcd(e, phi) !== 1) {
    e++;
  }

  d = modInverse(e, phi);

  document.getElementById("publicKey").innerText = `(${e}, ${n})`;
  document.getElementById("privateKey").innerText = `(${d}, ${n})`;
}

function encryptRSA() {
  const M = parseInt(document.getElementById("rsaMessage").value);
  const C = BigInt(M) ** BigInt(e) % BigInt(n);
  document.getElementById("rsaEncrypted").innerText = C.toString();
}

function decryptRSA() {
  const C = BigInt(document.getElementById("rsaEncrypted").innerText);
  const M = C ** BigInt(d) % BigInt(n);
  document.getElementById("rsaDecrypted").innerText = M.toString();
}
