
let datalist={};
let count=0;
let currentstate=false;

function createbg()
{
    document.body.setAttribute("class","bgdesign");
}

function submitData()
{
    var inputcountv2 =document.getElementsByName("gender");
    var inputcountv3 =document.getElementsByName("foodcheckbox");
   //var inputcountv4 =document.getElementsByName("data");
    var inputcountv4 =document.getElementsByClassName("inputdata");
   // console.log("input files:",inputcountv4);


    let finaldataobj={};
    let fooditems=[];
    let address=[];
    let genderval="";


    if(!inputcountv2[0].checked && !inputcountv2[1].checked)
    {
        finaldataobj["gender"]="";
        
    }else
    {
        genderval=inputcountv2[0].checked?inputcountv2[0].value:inputcountv2[1].value;
        finaldataobj["gender"]=genderval;
    }
    
    
    for(let i=0;i<inputcountv3.length;i++)
    {
        if(inputcountv3[i].checked)
        {
            fooditems=[...fooditems,inputcountv3[i].value];
        }

    }

    finaldataobj["food"]=fooditems;


    for(let i=0;i<inputcountv4.length;i++)
    {
        if((inputcountv4[i].id==="address1" && inputcountv4[i].value) || (inputcountv4[i].id==="address2"  && inputcountv4[i].value))
        {
            address.push(inputcountv4[i].value);

        }
        else if((inputcountv4[i].id!=="address1") && (inputcountv4[i].id!=="address2"))
        {
            finaldataobj[inputcountv4[i].id]=inputcountv4[i].value;
        }
    }

    finaldataobj["address"]=address;
    console.log(finaldataobj,"and",datalist);
    datalist[count]={"firstname":finaldataobj.firstname,"lastname":finaldataobj.lastname,"address":finaldataobj.address,
    "pin":finaldataobj.pin,"gender":finaldataobj.gender,"food":finaldataobj.food,"state":finaldataobj.state,"country":finaldataobj.country};

    checkforemptydata(finaldataobj);

}

function checkforemptydata(singledata)
{

    let datakeys=Object.keys(singledata);
    let addressstate=false,foodstate=false,elementsstate=true,genderstate=false;
    
    for(let i=0;i<datakeys.length;i++)
    {

        const addressval=datakeys[i]==="address" ||datakeys[i]==="food"? [...singledata[datakeys[i]]]:[];

        ////// address check
        if(datakeys[i]==="address" && addressval.length==0)
        {
        var missinelement=document.getElementById("address1");
        missinelement.style.borderColor="red";
        }else  if(datakeys[i]==="address" && addressval.length>0)
        {
            var missinelement=document.getElementById("address1");
            missinelement.style.borderColor="";
            addressstate=true;

            console.log(`Data entered:${JSON.stringify(singledata)}`);
        }


        ///gender radio box
        if(datakeys[i]==="gender" && !singledata["gender"])
        {
        var missinelement=document.getElementsByClassName("genderclass");
        missinelement[0].style.color="red";
        }else  if(datakeys[i]==="gender" && singledata["gender"])
        {
           // console.log("value test: has array val");
            var missinelement=document.getElementsByClassName("genderclass");
            missinelement[0].style.color="black";
            genderstate=true;
        }




        ////// food check box
        if(datakeys[i]==="food" && addressval.length<2)
        {
        var missinelement=document.getElementsByClassName("checkboxheading");
        missinelement[0].style.color="red";
        }else  if(datakeys[i]==="food" && addressval.length>=2)
        {
           // console.log("value test: has array val");
            var missinelement=document.getElementsByClassName("checkboxheading");
            missinelement[0].style.color="black";
            foodstate=true;
        }


        ////// regulars element    
        
        if((datakeys[i]==="firstname" && singledata["firstname"]) ||
        (datakeys[i]==="lastname" && singledata["lastname"]) ||
        (datakeys[i]==="pin" && singledata["pin"])   || 
        (datakeys[i]==="state" && singledata["state"]) || 
        (datakeys[i]==="country" && singledata["country"]) )
        {
            //console.log("value test: has array val:" +"key:"+datakeys[i]+",value:" +singledata[datakeys[i]]);
            var missinelement=document.getElementById(datakeys[i]);
            missinelement.style.borderColor="";
        }
        
        
        if((datakeys[i]==="firstname" && !singledata["firstname"]) 
            || (datakeys[i]==="lastname" && !singledata["lastname"]) 
            ||(datakeys[i]==="pin" && !singledata["pin"]) 
            || (datakeys[i]==="state" && !singledata["state"])  
            || (datakeys[i]==="country" && !singledata["country"]))
        {
            var missinelement=document.getElementById(datakeys[i]);
            missinelement.style.borderColor="red";
           // console.log("value test:" + datakeys[i]);
            elementsstate=false;
        }
    }


    if(foodstate && addressstate && elementsstate && genderstate)
    {
        console.log(` food:${foodstate},address:${addressstate},eleemnts:${elementsstate},gender:${genderstate}`);
        var tbledata= createDataintable("tr",count,singledata.firstname,singledata.lastname,singledata.address,singledata.pin,singledata.gender,singledata.food,singledata.state,singledata.country);
        tablebdy.append(tbledata);
        count++;
    }else
    {
        alert("please check the Highlighted Element")
        console.log("Data:",singledata);
    }
}

function createheadins(tagname,content)
{
    var header=document.createElement(tagname);
    header.innerHTML=content;
    return header;
}

function createheadinwithstyle(tagname,content,style,stylename)
{
    var header=document.createElement(tagname);
    header.setAttribute(style,stylename);
    header.innerHTML=content;
    return header;
}

function createtable(tagname,tagtype,tagval)
{
    var tabel=document.createElement(tagname);
    tabel.setAttribute(tagtype,tagval);
    return tabel;
}

function createtableHead(tagname)
{
    var tabelhead=document.createElement(tagname);
    return tabelhead;
}

function createtablebody(tagname)
{
    var tabelbody=document.createElement(tagname);
    return tabelbody;
}

function createtablerow(tagname)
{
    var tabelrow=document.createElement(tagname);
    return tabelrow;
}

function createtabledata(tagname,content)
{
    var tabeldata=document.createElement(tagname);
    tabeldata.innerHTML=content;
    return tabeldata;
}


function createOuterbox(tagname,tagtype,tagval)
{
    var box=document.createElement(tagname);
    box.setAttribute(tagtype,tagval);
    return box;
}

function createbox(tagname,tagtype,tagval)
{
    var element=document.createElement(tagname);
    element.setAttribute(tagtype,tagval);

    return element;
}

function createform(tagname,tagtype,tagval,formattri1,attrival1,formattri2,attrival2,formattri3,attrival3)
{
    var element=document.createElement(tagname);
    element.setAttribute(tagtype,tagval);
    element.setAttribute(formattri1,attrival1);
    element.setAttribute(formattri2,attrival2);
    element.setAttribute(formattri3,attrival3);
    return element;
}

function createboxwithid(tagname,tagtype,tagval,id,idname)
{
    var element=document.createElement(tagname);
    element.setAttribute(tagtype,tagval);
    element.setAttribute(id,idname);

    return element;
}

function createButton(tagname,buttnclicktype,buttnfunname)
{
    var element=document.createElement(tagname);
    element.setAttribute(buttnclicktype,buttnfunname);
    element.setAttribute("Onclick","submitData()");
    element.innerHTML="Submit";
    return element;
}

function createinputelement(tagname,tagtype,tagval,innerval)
{
    var inputele=document.createElement(tagname);
    inputele.setAttribute(tagtype,tagval);
    inputele.innerHTML=innerval;
    return inputele;
}

function createinputelement1(tagname,tagtype,tagval,tagsize,sizevalue,tagid,tagidval,tagplacholder,holdername,innerval="")
{
    var inputele=document.createElement(tagname);
    inputele.setAttribute(tagtype,tagval);
    inputele.setAttribute(tagsize,sizevalue);
    inputele.setAttribute(tagid,tagidval);
    inputele.setAttribute(tagplacholder,holdername);
    inputele.innerHTML=innerval;
    return inputele;
}

function createinputelement2(tagname,tagtype,tagval,tagsize,sizevalue,tagid,tagidval,tagplacholder,holdername,innerval="",classtype,classname)
{
    var inputele=document.createElement(tagname);
    inputele.setAttribute(tagtype,tagval);
    inputele.setAttribute(tagsize,sizevalue);
    inputele.setAttribute(tagid,tagidval);
    inputele.setAttribute(tagplacholder,holdername);
    inputele.setAttribute(classtype,classname);
    inputele.innerHTML=innerval;
    return inputele;
}

function createDataintable(rowtype,datacount,data0,data1,data2,data3,data4,data5,data6,data7)
{
    var rowval=createtablerow(rowtype);
    var tabledata=createtabledata("td",data0);
    var tabledata1=createtabledata("td",data1);
    var tabledata2=createtabledata("td",data2);
    var tabledata3=createtabledata("td",data3);
    var tabledata4=createtabledata("td",data4);
    var tabledata5=createtabledata("td",data5);
    var tabledata6=createtabledata("td",data6);
    var tabledata7=createtabledata("td",data7);


    rowval.append(tabledata,tabledata1,tabledata2,tabledata3,tabledata4,tabledata5,tabledata6,tabledata7);
    return rowval;
}

var leftheading=createheadinwithstyle("h1","Form Submission:","id","title");
var rightheading=createheadinwithstyle("h1","submitDataorary DataBase:","id","title");


//var inputboxelement=createinputelement1("input","type","text","name","data","id","firstname","placeholder"," First Name");
// var inputboxelement1=createinputelement1("input","type","text","name","data","id","lastname","placeholder","Last Name");
// var inputboxelement2=createinputelement1("input","type","textarea","name","data","id","address1","placeholder","Address Line 1");
// var inputboxelement3=createinputelement1("input","type","textarea","name","data","id","address2","placeholder","Address Line 2");
// var inputboxelement4=createinputelement1("input","type","text","name","data","id","pin","placeholder","Pin");
// var inputboxelement5=createinputelement1("input","type","text","name","data","id","state","placeholder","State");
// var inputboxelement6=createinputelement1("input","type","text","name","data","id","country","placeholder","Country");

var inputboxelement=createinputelement2("input","type","text","name","data","id","firstname","placeholder"," First Name","","class","inputdata");
var inputboxelement1=createinputelement2("input","type","text","name","data1","id","lastname","placeholder","Last Name","","class","inputdata");
var inputboxelement2=createinputelement2("input","type","textarea","name","data2","id","address1","placeholder","Address Line 1","","class","inputdata");
var inputboxelement3=createinputelement2("input","type","textarea","name","data3","id","address2","placeholder","Address Line 2","","class","inputdata");
var inputboxelement4=createinputelement2("input","type","number","name","data4","id","pin","placeholder","Pin","","class","inputdata");
var inputboxelement5=createinputelement2("input","type","text","name","data5","id","state","placeholder","State","","class","inputdata");
var inputboxelement6=createinputelement2("input","type","text","name","data6","id","country","placeholder","Country","","class","inputdata");



var label0=createinputelement("label","for","firstname","First Name:");
var label1=createinputelement("label","for","lastname","Last Name:");
var label2=createinputelement("label","for","address1","Address Line 1:");
var label3=createinputelement("label","for","address2","Address Line 2:");
var label4=createinputelement("label","for","pin","Pin:");
var label5=createinputelement("label","for","state","State:");
var label6=createinputelement("label","for","country","Country:");

//var submitelement=createinputelement1("input","type","submit","onClick","submitData()","id","sub1","value","Submit");//og
var submitelement=createinputelement1("input","type","submit","id","submit","value","Submit","onClick","");
var inputboxelement10=createinputelement1("input","type","radio","id","radio","value","Male","name","gender");
var inputboxelement11=createinputelement1("input","type","radio","id","radio1","value","Female","name","gender");
var radiobtnhdng=createheadinwithstyle("p","Gender:","class","genderclass");

var inputboxelement12=createinputelement1("input","type","checkbox","id","checkbox","value","North indian","name","foodcheckbox");
var inputboxelement13=createinputelement1("input","type","checkbox","id","checkbox1","value","South indian","name","foodcheckbox");
var inputboxelement14=createinputelement1("input","type","checkbox","id","checkbox2","value","Chinese","name","foodcheckbox");
var inputboxelement15=createinputelement1("input","type","checkbox","id","checkbox3","value","Japanese","name","foodcheckbox");
var inputboxelement16=createinputelement1("input","type","checkbox","id","checkbox4","value","Sea food","name","foodcheckbox");
var checkboxnhdng=createheadins("p","Choice of Food:");
var checkboxnhdng1=createheadinwithstyle("p","(must choose atleast 2 out of 5 options)","style","font-style: italic;font-weight:100");


var labelwithinput=createbox("div","class","inputbox");
var labelwithinput1=createbox("div","class","inputbox");
var labelwithinput2=createbox("div","class","inputbox");
var labelwithinput3=createbox("div","class","inputbox");
var labelwithinput4=createbox("div","class","inputbox");
var labelwithinput5=createbox("div","class","inputbox");
var labelwithinput6=createbox("div","class","inputbox");
var labelwithinput7=createbox("div","class","inputbox");
var labelwithinput11=createbox("div","class","inputbox");
var labelwithinput12=createbox("div","class","inputbox");

var inputboxwithid=createboxwithid("div","class","inputradiobox","id","inputradiobox");
var inputboxwithid1=createboxwithid("div","class","inputcheckbox","id","checkboxcontent");


var radiobox=createbox("div","class","radiobox");
var radiobox1=createbox("div","class","radiobox");


var checkboxheadin=createbox("div","class","checkboxheading");

var checkbox=createbox("div","class","checkbox");
var checkbox1=createbox("div","class","checkbox");
var checkbox2=createbox("div","class","checkbox");
var checkbox3=createbox("div","class","checkbox");
var checkbox4=createbox("div","class","checkbox");


var label10=createinputelement("label","for","radio","Male");
var label11=createinputelement("label","for","radio","Female");

var label12=createinputelement("label","for","checkbox","North indian");
var label13=createinputelement("label","for","checkbox","South indian");
var label14=createinputelement("label","for","checkbox","Chinese");
var label15=createinputelement("label","for","checkbox","Japanese");
var label16=createinputelement("label","for","checkbox","Sea food");



var contentLbox=createbox("div","class","contentbox");
//var contentRbox=createbox("form","id","formdata");//contentbox2
//var contentRbox=createform("form","id","form","method","post","action","#","onsubmit","submitData();return false");// sumbit func set as form submit element
var contentRbox=createform("form","id","form","method","post","action","#","onsubmit",";return false");//to avoid page refresh
var rightbox=createbox("div","class","rightbox");
var leftbox=createbox("div","class","leftbox");
var outerbox=createOuterbox("div","class","outerbox");

var createbtn=createButton("button","id","submit");

var table=createtable("table","class","tablebox");
var tablehead=createtableHead("thead");
var tablebdy=createtablebody("tbody");
var tablerw=createtablerow("tr");

var tabledata=createtabledata("th","First Name");
var tabledata1=createtabledata("th","Last Name");
var tabledata2=createtabledata("th","Address");
var tabledata3=createtabledata("th","Pincode");
var tabledata4=createtabledata("th","Gender");
var tabledata5=createtabledata("th","Food");
var tabledata6=createtabledata("th","state");
var tabledata7=createtabledata("th","Country");


//appending table,tablehead,tablebody
tablerw.append(tabledata,tabledata1,tabledata2,tabledata3,tabledata4,tabledata5,tabledata6,tabledata7);
tablehead.append(tablerw);
table.append(tablehead,tablebdy);


//input elements with labels
labelwithinput.append(label0,inputboxelement);
labelwithinput1.append(label1,inputboxelement1);
labelwithinput2.append(label2,inputboxelement2);
labelwithinput3.append(label3,inputboxelement3);
labelwithinput4.append(label4,inputboxelement4);
labelwithinput5.append(label5,inputboxelement5);
labelwithinput6.append(label6,inputboxelement6);
//labelwithinput7.append(submitelement);
labelwithinput7.append(createbtn);


radiobox.append(inputboxelement10,label10);
radiobox1.append(inputboxelement11,label11);
inputboxwithid.append(radiobox,radiobox1);
labelwithinput11.append(radiobtnhdng,inputboxwithid);

checkbox.append(inputboxelement12,label12);
checkbox1.append(inputboxelement13,label13);
checkbox2.append(inputboxelement14,label14);
checkbox3.append(inputboxelement15,label15);
checkbox4.append(inputboxelement16,label16);
inputboxwithid1.append(checkbox,checkbox1,checkbox2,checkbox3,checkbox4);
checkboxheadin.append(checkboxnhdng,checkboxnhdng1);
labelwithinput12.append(checkboxheadin,inputboxwithid1);



//appending all elements to their parents and to the body.
contentRbox.append(leftheading,labelwithinput,labelwithinput1,labelwithinput2,labelwithinput3,labelwithinput4,labelwithinput11,labelwithinput12,labelwithinput5,labelwithinput6,labelwithinput7);
rightbox.append(contentRbox);

contentLbox.append(rightheading,table);
leftbox.append(contentLbox);

outerbox.append(rightbox,leftbox);
document.body.append(outerbox);

createbg();
