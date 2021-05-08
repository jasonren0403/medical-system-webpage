/**
 * @file 示例的 utils 方法，.vue 会用到
 */

export function sayHello () {
  console.log('Say Say Say Hello!')
}

export function randomVal(type,len){
  let alnum = '1234567890'
  let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let randoms = ''
  switch (type) {
    case "number":
      randoms = alnum;
      break;
    case "letters":
      randoms = letters;
      break;
    case "string":
      randoms = alnum+letters
      break;
  }
  let randomArr = randoms.split('')
  let resStr = ''
  for(let i=0;i<len;i++){
    var randomIndex = Math.floor(Math.random() * (len - 0))
    resStr += randomArr[randomIndex]
  }
  return resStr;
}
