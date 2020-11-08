const checkPalindrom = require("../functions/checkPalindrom");

test('check if "abba" is palindrom', () => {
	expect(checkPalindrom("abba")).toBe(true);
});

test('check if "abb" is palindrom', () => {
	expect(checkPalindrom("abb")).toBe(false);
});

test('check if "121" is palindrom', () => {
	expect(checkPalindrom("121")).toBe(true);
});

test('check if "123" is palindrom', () => {
	expect(checkPalindrom("123")).toBe(false);
});
