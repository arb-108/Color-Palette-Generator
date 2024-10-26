const generateEl=document.getElementById("generate");
const c_generateEl=document.getElementById("c_generate");
const custom_clrEl_div=document.getElementById("custom_clr_div");
const colorsEl=document.getElementById("colors");
const input=document.getElementById("c_input");

const hexs=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
const g_colors=()=>{
    let colorHex="#";
    for(let i=0;i<6;i++){
        let random=Math.floor(Math.random()*(16-0))+0;
         colorHex += hexs[random]; 
        // console.log(random);
    }
    return colorHex;
}
const hideShow=()=>{
    colorsEl.classList.remove("hide");
    colorsEl.classList.add("colors");
    custom_clrEl_div.classList.add("hide");
    custom_clrEl_div.classList.remove("center-div");
    input.value="";
    input.classList.remove("input-control-e");
    input.classList.remove("input-control-s");
    input.focus();
}
const palette=()=>{

    hideShow();
     colorsEl.innerHTML="";
     for(let i=0;i<4;i++)
     {
        const c_div=document.createElement("div");
        const c_p=document.createElement("p");
        let g_hex=g_colors();
        c_p.innerText=g_hex;
        c_p.id=`colorTag${i+1}`;
        c_p.className=`colorTag`;
        c_div.className=`color color${i+1}`;
        c_div.style.background=g_hex;
        c_div.appendChild(c_p);
        colorsEl.appendChild(c_div);
        
    }
    const copy_color=(id)=>{
        const element=document.getElementById(id);
        navigator.clipboard.writeText(element.innerText);
        element.classList.add("active");
        setTimeout(()=>{
            element.classList.remove("active");
        },1000)
        console.log(element.innerText);
    }
    const tags=document.querySelectorAll(".colorTag");
    tags.forEach((colortag,i)=>{
        colortag.addEventListener('click',()=>{
            copy_color(`colorTag${i+1}`);
        })
    })
}
// window.onload=palette();
window.onload=()=>{
    // console.log("window loaded");
    palette();
}
generateEl.addEventListener('click',palette);

const seterror=(element,message)=>{
    element.classList.add("input-control-e");
    const errorEl=document.getElementById("errorid");
    errorEl.innerText=message;
}
const setsuccess=(element)=>{
    element.classList.remove("input-control-e");
    element.classList.add("input-control-s");
    const errorEl=document.getElementById("errorid");
    errorEl.innerText='';

}
const isvalidate=(hexvalue)=>{
    const regexvalue=/^#([a-fA-F0-9]{3}){1,2}$/;
    if(hexvalue.value.trim()==""){
        seterror(hexvalue,"Enter HEX Value");
        return false;
    }else if(!regexvalue.test(hexvalue.value)){
        seterror(hexvalue,"Not a HEX value (i.e #F3F3F3)");
        return false;

    }
    setsuccess(hexvalue);
    return true;
}
const custom_generate=()=>{
    if(isvalidate(input)){
        const custom_clrEl=document.getElementById("custom_clr");
        
        custom_clrEl_div.classList.remove("hide");
        custom_clrEl_div.classList.add("center-div");
        colorsEl.classList.add("hide");
        colorsEl.classList.remove("colors");
        custom_clrEl.style.background=input.value;

    }
}
c_generateEl.addEventListener('click',custom_generate);