function checkPalindrom(str) {
	return str == str.split("").reverse().join("");
}

module.exports = checkPalindrom;
