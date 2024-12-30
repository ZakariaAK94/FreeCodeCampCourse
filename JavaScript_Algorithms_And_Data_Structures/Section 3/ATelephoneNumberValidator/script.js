const inputValue = document.getElementById("user-input");
const clearBtn = document.getElementById("clear-btn");
const checkBtn = document.getElementById("check-btn");
const resultsDiv = document.getElementById("results-div");

const buttons = [
  { id: "btn1", value: "1" },
  { id: "btn2", value: "2" },
  { id: "btn3", value: "3" },
  { id: "btn4", value: "4" },
  { id: "btn5", value: "5" },
  { id: "btn6", value: "6" },
  { id: "btn7", value: "7" },
  { id: "btn8", value: "8" },
  { id: "btn9", value: "9" },
  { id: "btn0", value: "0" },
  { id: "btnR", value: ")" },
  { id: "btnL", value: "(" },
  { id: "btnHyphen", value: "-" },
  { id: "btnSpace", value: " " }
];
const btnRemove = document.getElementById("btnRemove");
const phoneNbrEntry = [];

const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

const checkPhoneNumber = (phoneNbr) => {
    const sanitizeNbr = phoneNbr.trim();
    if(!sanitizeNbr)
    {
        alert("Please provide a phone number");
        return;
    }

    if(phoneRegex.test(sanitizeNbr) === true)  
    {
        resultsDiv.innerHTML =`<p class="results-text">Valid US number: ${sanitizeNbr}</p>` 
    }
    else
    {
        resultsDiv.innerHTML =`<p class="results-text">Invalid US number: ${sanitizeNbr}</p>` 
    }
     
};

checkBtn.addEventListener("click", ()=>{
    checkPhoneNumber(inputValue.value);
});

clearBtn.addEventListener("click", () => {
    inputValue.value = "";
    resultsDiv.innerHTML = "";
    phoneNbrEntry = [];
  });

buttons.forEach(({id,value}) => {
   const button = document.getElementById(id);
   button.addEventListener("click",()=>{
    inputValue.value += value;
    phoneNbrEntry.push(value);
   })
});


  btnRemove.addEventListener("click",()=>{
    if(phoneNbrEntry.length>0)
    {
       phoneNbrEntry.pop();
       inputValue.value = phoneNbrEntry.join("");
    }   
    else
    {
      inputValue.value= prompt("No character to remove, if you want you can tap it below.");
    }        
  });
