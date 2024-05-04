let password = ""
let passLength = 10
let checkCount = 0


const slider = document.querySelector("[sliderVal]")
const pLen = document.querySelector("[pasLen]")
handler();
function handler() {
    slider.value = passLength
    pLen.innerHTML = passLength
    const min=slider.min
    const max=slider.max
    slider.style.backgroundSize = ( (passLength - min)*100/(max - min)) + "% 100%"
}

slider.addEventListener("input", (e) => {
    passLength = e.target.value
    handler();
});

function getRnmInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function genrateNumber() {
    return getRnmInt(0, 9)
}
function genrateUpper() {
    return String.fromCharCode(getRnmInt(65, 91))
}
function genrateLower() {
    return String.fromCharCode(getRnmInt(97, 123))
}

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function genrateSymbole() {
    let val = getRnmInt(0, symbols.length)
    return symbols[val]
}



const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheck = document.querySelectorAll("input[type=checkbox]")

function passStength() {
    let uCase = false
    let lCase = false
    let nNum = false
    let sSymb = false
    if (uppercaseCheck.checked) uCase = true
    if (lowercaseCheck.checked) lCase = true
    if (numbersCheck.checked) nNum = true
    if (symbolsCheck.checked) sSymb = true

    if (uCase && lCase && (nNum || sSymb) && passLength >= 8) {
        setIndicator("#0f0")
    }
    else if ((uCase || lCase) && (nNum || sSymb) && passLength >= 6)
        setIndicator("#ff0");

    else
        setIndicator("#f00");
}

const indicat = document.querySelector("[indic]")
function setIndicator(color) {
    indicat.style.backgroundColor = color;
}


const dPass = document.querySelector("[disPass]")
const gButton = document.querySelector("[ansGen]")

function allCheckHandle() {
    checkCount = 0
    allCheck.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++
        }
        if (passLength < checkCount) {
            passLength = checkCount
            handler();
        }

    })
}

allCheck.forEach((checkbox) => {
    checkbox.addEventListener('change', allCheckHandle);
})
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


gButton.addEventListener("click", () => {
    if (checkCount == 0) {
        return
    }
    if (passLength < checkCount) {
        passLength = checkCount
        handler();
    }
    password = ""
    let funArr = []

    if (uppercaseCheck.checked) funArr.push(genrateUpper)
    if (lowercaseCheck.checked) funArr.push(genrateLower)
    if (numbersCheck.checked) funArr.push(genrateNumber)
    if (symbolsCheck.checked) funArr.push(genrateSymbole)

    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }
    for(let i=0;i<passLength-funArr.length;i++)
        {
            let rand=getRnmInt(0,funArr.length)
            password+=funArr[rand]()
        }

    password=shufflePassword(Array.from(password))
    passStength();
    dPass.value=password

})
const copyMsg=document.querySelector("[copyBlock]")
async function copyContent() {
    try {
        await navigator.clipboard.writeText(dPass.value);
        copyMsg.innerText = "copied"; // add var
       
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

const copy=document.querySelector("[copyBtn]")

copy.addEventListener('click', () => {
    if(dPass.value)
        copyContent();
})