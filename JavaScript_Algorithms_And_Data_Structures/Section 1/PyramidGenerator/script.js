
const character = "!";
const count = 5;
const rows = [];
let inverted = true;

function padRow(rowNumber, rowCount)
{
  const spaceBeforeAndAfter = " ".repeat(rowCount - rowNumber);
    return  spaceBeforeAndAfter + character.repeat(2 * rowNumber - 1) + spaceBeforeAndAfter;    
}
  
for (let i = 1; i <= count; i++)
{
    if (inverted) 
    {
      rows.unshift(padRow(i, count));
    } else 
    {
      rows.push(padRow(i, count));
    }
}
  
let result = ""
  
for (const row of rows) 
{
    result = result + "\n" + row;
}
  
// console.log(result);
document.getElementById("pattern").innerText = result;