const bcrypt = require("bcrypt");
// const password = "무야호";
// const encryptedPassowrd = bcrypt.hashSync(password, 10);
// console.log("무야호");
// console.log(encryptedPassowrd);
// const same = bcrypt.compareSync("무야호", encryptedPassowrd);
// console.log(same);
const aa = bcrypt.hashSync("무야호", 12);
const bb = bcrypt.hashSync("무야호", 7);
// console.log(aa === encryptedPassowrd);
console.log(aa === bb);

const same = bcrypt.compareSync("무야호", aa);
const same1 = bcrypt.compareSync("무야호", bb);
console.log(same);
console.log(same1);
