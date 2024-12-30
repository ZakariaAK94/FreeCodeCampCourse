let price = 3.26;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const inputCash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const change = document.getElementById("change-due");
const divPrice = document.getElementById("price");
const changeInDrawer = document.getElementById("change-in-drawer");

divPrice.innerHTML = `<p>Total: $${price}</p>`;

const currencyUnits = [["PENNY", 0.01],["NICKEL", 0.05],["DIME", 0.1],["QUARTER", 0.25],["ONE", 1],["FIVE", 5],["TEN", 10],["TWENTY", 20],["ONE HUNDRED", 100]];

const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

const getChange = (changeDue, cid) => {
  const totalCashInDrawer = roundToTwoDecimals( cid.reduce((sum, [_, amount]) => sum + amount, 0) );

  if (totalCashInDrawer < changeDue)
    return { status: "INSUFFICIENT_FUNDS", change: [] };

  let changeArray = [];
  let remainingChange = changeDue;

  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    const [unitName, unitValue] = currencyUnits[i];
    let unitInDrawer = cid[i][1];

    if (unitValue <= remainingChange && unitInDrawer > 0) 
    {
       let amountFromUnit = 0;

          while (remainingChange >= unitValue && unitInDrawer > 0) 
        {
            remainingChange = roundToTwoDecimals(remainingChange - unitValue);
            unitInDrawer = roundToTwoDecimals(unitInDrawer - unitValue);
            amountFromUnit = roundToTwoDecimals(amountFromUnit + unitValue);
        }

        if (amountFromUnit > 0) 
        {
            changeArray.push([unitName, amountFromUnit]);       
            cid[i][1] = cid[i][1]-amountFromUnit;
        }
    
    }
  }

  if (remainingChange > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalCashInDrawer === changeDue) {
    return { status: "CLOSED", change: changeArray };
  }

  return { status: "OPEN", change: changeArray };
};

const formatChange = (changeArray) =>  changeArray.filter(([_,amount])=> amount > 0).map(([unitName, amount]) => `<li>${unitName}: $${amount.toFixed(2)}</li>`).join("");

const updateDrawerDisplay = (cid) =>  {
  const formattedDrawer = cid.map(([unitName, amount]) => `<li>${unitName}: <span>$${amount.toFixed(2)}</span></li>`).join("");
  changeInDrawer.innerHTML = formattedDrawer;
} 
const showResult = ()=>{
    const cashValue = parseFloat(inputCash.value);
    if (isNaN(cashValue)) {
      alert("Please enter a valid cash amount.");
      return;
    }
  
    const changeDueValue = roundToTwoDecimals(cashValue - price);
    if (cashValue < price) {
      alert("Customer does not have enough money to purchase the item.");
      return;
    }
  
    if (cashValue === price) {
      change.innerText = "No change due - customer paid with exact cash.";
      return;
    }
  
    const changeResult = getChange(changeDueValue, cid);
    change.innerHTML = `Status: ${changeResult.status}`;
    change.innerHTML += formatChange(changeResult.change);
    updateDrawerDisplay(cid);
}

purchaseBtn.addEventListener("click", showResult);

inputCash.addEventListener("keydown",(e)=>
{
    if(e.key==='Enter')
       showResult();
})

window.onload = () => updateDrawerDisplay(cid);