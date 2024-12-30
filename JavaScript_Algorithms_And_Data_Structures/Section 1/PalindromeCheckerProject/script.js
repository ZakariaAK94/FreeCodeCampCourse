const btnCheck = document.getElementById("check-btn");
const inputText = document.getElementById("text-input");
const result = document.getElementById('result');

btnCheck.addEventListener("click", ShowResult);

function getStrAlphanumeric(str) {
    const regex = /[^a-zA-Z0-9]/g;  
    return str.replace(regex, "").toLowerCase();  
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function checkPalindrome(str) {
   const alphanumericStr = getStrAlphanumeric(str);  
   const strReverse = reverseString(alphanumericStr);
   return alphanumericStr === strReverse;
}

function ShowResult() {
    if (inputText.value === "") {
        alert("Please input a value");
        return;
    }
    
    if (checkPalindrome(inputText.value)===true)
    {
        result.innerHTML = `<Strong>${inputText.value}</Strong> is a Palindrome`;      
        result.classList.add('changeColor1');
        result.classList.remove('changeColor2');
    }else
    {
        result.innerHTML = `<Strong>${inputText.value}</Strong> is not a Palindrome`;
        result.classList.add('changeColor2');
        result.classList.remove('changeColor1');
    }
}

inputText.addEventListener("mouseout", ()=>{
    if(inputText.value==="")
        result.innerHTML = '';
})