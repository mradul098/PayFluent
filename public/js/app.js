console.log("hola");
console.log(mcomp.value);




let LIST=[],id=0; //LIST ke andar saara data rakghenge and id will be used to give every task an id

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const add = document.getElementById("add-to-do");

//classes descriptions

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

//show todays dat3e

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

dateElement.innerHTML = today;

function addToDo(toDo,prc,qty,id,done,trash){ //insertadjacentHTML ki functionaluty apan ne padh li hai and we used this and cut down some of the part of html here but why? asa html is rigid and here in js we can use it as function 
    
    if(trash){return; } //agar trash me click kiya hai to kuch add wagerah karne ki jarurat nahi hai even if list mai hai tab bjhi ignore kar do

    const DONE= done? "fa-check-circle":"fa-circle-o";    //agar done ho chuka hai but trash nahi hua hai then elemnt ka style kya hoga? .. ek to sabse pehle icon checked hona chahiye and text kata hobna chahiye
    const LINE= done ? "lineThrough":""; //mere dimag ki upaj !!!

    const item=  `
                    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo} price:${prc} qty:${qty}</p>
                  
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                `;
    const position = "beforeend";
    // console.log(DONE);

    list.insertAdjacentHTML(position,item);
}



document.addEventListener("keyup",function(event){  //enter key dabane par bhi task list me add ho jhaye 
    if(event.keyCode == 13){    //the code for the enter key is 13
        const toDo=product.value;
        const prc = pprice.value;
        const qty = pquantity.value;

        //if the input isnt empty
        if(toDo){
            addToDo(toDo,prc,qty,id,false,false); //shuruwat me na uncheck hai na hi trash me gaya hai isliye wo dono false

            LIST.push({
                description:toDo,
                price:prc,
                quantity:qty,
                id:id,
                tax:gst.value,
                done:false,
                trash:false, 
            });
            id++;
        }
        pprice.value = "";   //input box firse kghali ho jaye enter dabane ke baad
        product.value="";
        pquantity.value="";
    }
});

list.addEventListener("click",function(event){
    const element = event.target; //return the clicked element inside list
    const elementjob = element.attributes.job;
    console.log(elementjob);
    console.log(element.attributes.class.value);
    
    if(element.attributes.class.value == "fa fa-circle-o co")
    {
        
        console.log(element.parentNode.innerHTML);
        element.parentNode.innerHTML=`
                    <i class="fa fa-check-circle co" job="complete" id="${element.attributes.id.value}" aria-hidden="true"></i>
                    <p class="text lineThrough">${LIST[element.attributes.id.value].description} price:${LIST[element.attributes.id.value].price} qty:${LIST[element.attributes.id.value].quantity}</p>
                    
                    <i class="fa fa-trash-o de" job="delete" id="${element.attributes.id.value}" aria-hidden="true"></i>
        `;
        LIST[element.attributes.id.value].done = true;
    }

    else if(element.attributes.class.value == "fa fa-check-circle co")
    {
        
        console.log(element.parentNode.innerHTML);
        element.parentNode.innerHTML=`
                    <i class="fa fa-circle-o co" job="complete" id="${element.attributes.id.value}" aria-hidden="true"></i>
                    <p class="text ">${LIST[element.attributes.id.value].description} price:${LIST[element.attributes.id.value].price} qty:${LIST[element.attributes.id.value].quantity}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${element.attributes.id.value}" aria-hidden="true"></i>
        `;
        LIST[element.attributes.id.value].done = true;
    }
    else if(element.attributes.job.value=="delete")
    {
        
            var index = (element.attributes.id.value);
            if (index > -1) {
                LIST.splice(index, 1);
            }
        
        element.parentNode.parentNode.removeChild(element.parentNode);
        
    }
});

clear.addEventListener("click",function(event){
    list.innerHTML="";
});

add.addEventListener("click",function(event){
    const toDo=product.value;
    const prc=pprice.value;
    const qty=pquantity.value;
    const tax=gst.value;

        //if the input isnt empty
        if(toDo){
            addToDo(toDo,prc,qty,id,false,false); //shuruwat me na uncheck hai na hi trash me gaya hai isliye wo dono false

            LIST.push({
                description:toDo,
                price:prc,
                quantity:qty,
                id:id,
                tax:gst.value,
                done:false,
                trash:false, 
            });
            id++;
        }
        pprice.value = "";   //input box firse kghali ho jaye enter dabane ke baad
        product.value="";
        pquantity.value="";
});

var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "currency": "INR",
    "taxNotation": "gst", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "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", //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company": "",
        "address":"" ,
        "zip": "",
        "city": "",
        "country": ""
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
        "company": "Michael Scott",
        "address": "Dunder Mifflin",
        "zip": "4567 CD",
        "city": "Scranton",
        "country": "USA"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber":Math.floor(Math.random()*100000),
    "invoiceDate": today,
    "products": LIST,
    
};
 


function downloadInvoice(){
    //Create your invoice! Easy!
    
    data.sender.company = mcomp.value;
    data.sender.zip = mzco.value;
    data.sender.address = madd.value;
    data.sender.city = mcty.value;
    data.sender.country = mctry.value;
    data.client.company = ccomp.value;
    data.client.zip = czco.value;
    data.client.address = cadd.value;
    data.client.city = ccty.value;
    data.client.country = cctry.value;
 
    easyinvoice.createInvoice(data, function (result) {
        //The response will contain a base64 encoded PDF file
        
        console.log(result.pdf);
        easyinvoice.download("invoice.pdf");
    });
}
