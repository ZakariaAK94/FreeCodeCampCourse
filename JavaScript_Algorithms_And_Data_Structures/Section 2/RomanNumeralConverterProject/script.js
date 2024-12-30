const convertBtn = document.getElementById("convert-btn");
const inputValue = document.getElementById("number");
const output = document.getElementById("output");
const romanNbrArray = {1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII",9:"IX",10:"X",
             11:"XI",12:"XII",13:"XIII",14:"XIV",15:"XV",16:"XVI",17:"XVII",18:"XVIII",19:"XIX",
             20:"XX",30:"XXX",40:"XL",50:"L",60:"LX",70:"LXX",80:"LXXX",90:"XC",
             100:"C",200:"CC",300:"CCC",400:"CD",500:"C",600:"DC",700:"DCC",800:"DCCC",900:"CM",
             1000:"M",2000:"MM",3000:"MMM"};

const convertNumber = (num)=>
{
    let remainder;
    let result = "";
    let multiplication = 1;

    while(num>0)
    {
        remainder = num % 10;
        num = Math.floor(num/10);
        if(remainder)
        {
            result= romanNbrArray[remainder * multiplication]+result;
        }
        multiplication *=10;
    }

    return result;
}

convertBtn.addEventListener("click",()=>
{
output.classList.remove("hide");
if(inputValue.value ==="")
{
  output.innerHTML=`<p id="result">Please enter a valid number</p>`;
}else if(inputValue.value<=0)
{
  output.innerHTML=`<p id="result">Please enter a number greater than or equal to 1</p>`;
}else if(inputValue.value>=4000)
{
  output.innerHTML=`<p id="result">Please enter a number less than or equal to 3999</p>`;
}else{
    output.innerHTML= `<p id="result">${convertNumber(Number(inputValue.value))}</p>`;
}
})

inputValue.addEventListener("mouseover",()=>{
    output.classList.add("hide");
})
