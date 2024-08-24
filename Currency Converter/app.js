const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const mesg=document.querySelector(".mesg");
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");

for(let select of dropdowns){
    for(currcodes in countryList)
        {
            let newoption=document.createElement("option")
            newoption.innerText=currcodes;
            newoption.value=currcodes;
            if(select.name==="from" && currcodes==="USD"){
                newoption.selected="selected";
            }
            else if(select.name==="to" && currcodes==="INR")
            {
                newoption.selected="selected";
            }
            select.append(newoption);
    }
select.addEventListener("change",(evt)=>{
    updateflag(evt.target)
});
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("form input");
    let amountval=amount.value;
    if(amountval==="  " || amountval<1)
        {
            amount.value=1;
            amount=1;
        }
        const Base_Url = `https://v6.exchangerate-api.com/v6/32e19db7054c67fa52b56248/latest`;
        const API_URL=`${Base_Url}/${fromcurr.value.toUpperCase()}`;
        const response=await fetch(API_URL);
        const data= await response.json();
        let form_curr_rate=data.conversion_rates[fromcurr.value];
        let to_curr_rate=data.conversion_rates[tocurr.value];
        let convertedamount=((amountval)/form_curr_rate)*(to_curr_rate);
        mesg.innerText=`The conversion of ${amountval} ${fromcurr.value} to ${tocurr.value} is ${convertedamount}`
});
