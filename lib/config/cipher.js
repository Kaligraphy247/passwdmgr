// //? For encryption and decryption of locally saved passwords.

const characterSet = `\
abcdefghikjlmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ0123456789\u0020.+-*;'"?/\\[](){}!@#$%^&*_\
`

export const KEY = 43
// var word = "any_super*pass0rD"


export function encrypt(word, key) {
    let encrypted_numbers = [];
    let final_result = '';
    for (let i = 0; i < word.length; i++) {
        let temp = (characterSet.indexOf(word[i]) + key) % characterSet.length;
        encrypted_numbers.push(temp);
    }
    for (let i = 0; i < encrypted_numbers.length; i++) {
        let s = characterSet[encrypted_numbers[i]];
        final_result += s;
    }
    return final_result;
}

// let encrypted_word = encrypt(word, KEY);

export function decrypt(encrypted_word, key) {
    let decrypted_numbers = [];
    let final_result = '';
    for (let i = 0; i < encrypted_word.length; i++) {
        let s = (characterSet.indexOf(encrypted_word[i]) - key + characterSet.length) % characterSet.length;
        decrypted_numbers.push(s);
    }
    for (let i = 0; i < decrypted_numbers.length; i++) {
        let s = characterSet[decrypted_numbers[i]];
        final_result += s;
    }
    return final_result;
}

// let de = decrypt(encrypted_word, KEY)
// console.log(encrypted_word)
// console.log(de)