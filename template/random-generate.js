const setting = {
  number: true,
  symbol: false,
  capital: true,
  small: true,
  length: 15,
};

function createChars() {
  let tmp = "";

  if (setting.number) {
    tmp = tmp + "0123456789";
  }
  if (setting.symbol) {
    tmp = tmp + "!@#$%^&*()-_=+";
  }
  if (setting.capital) {
    tmp = tmp + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (setting.small) {
    tmp = tmp + "abcdefghijklmnopqrstuvwxyz";
  }

  return tmp;
}

createrandom = {
  generate() {
    const chars = createChars();
    const length = chars.length;
    let returnValue = "";

    for (let i = 0; i < setting.length; i++) {
      const random = Math.floor(Math.random() * length);
      returnValue += chars.charAt(random);
    }

    return returnValue;
  },
};

module.exports = createrandom;
