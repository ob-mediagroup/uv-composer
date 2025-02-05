let muldiv = document.querySelector('#multiplediv');
let singdiv = document.querySelector('#singlediv');
let insingle = document.querySelector('[value="single"]');
let inmultiple = document.querySelector('[value="multiple"]');
let mymultidialog = document.querySelector('#mymultidialog');
let diagopenbtn = document.querySelector('#multiplediv button');
let diagclosebtn = document.querySelector('#mymultidialog button:nth-of-type(2)');
let multiappopenbtn = document.querySelector('#mymultidialog button:nth-of-type(1)');

let singbutton = document.querySelector('#singlediv button');
let gridsize = document.querySelector('#gridsize'); let multimageinitialgrid = 0;

let multiimagesize = singleimagesize = [0,0];
let clickcount = 0, shapearray = []; let textarray = [];  let singtext;



let singtextevt1 = new Event('singtextevtadd');
let singtextevt2 = new Event('singtextevtremove');

let numcheck = document.querySelector('#mymultidialog span');
let myfilesingle = document.querySelector('#myfilesingle');
let myfilemultiple = document.querySelector('#myfilemultiple');
let singblob = null, multiblob = [];
let multimagearray = [];
window.onload = function (){
    muldiv.style.display = "none";
}


let gridradios = document.querySelectorAll('#multiplediv [name="imagesize"]');
for(let j=0;j<=(gridradios.length-1);j++){
    gridradios[j].addEventListener('change',(evt)=>{
       if(gridradios[j].checked){
        let stingval = gridradios[j].value;
        let stingvalarr = stingval.split('x');
        multiimagesize = [stingvalarr[0],stingvalarr[1]];
       } 
    });
}


insingle.addEventListener('change',(evt)=>{
    
    muldiv.style.display = "none";
    singdiv.style.display = "block";
})
inmultiple.addEventListener('change',(evt)=>{
    
    muldiv.style.display = "block";
    singdiv.style.display = "none";
})
diagopenbtn.addEventListener('click',function(evt){
    mymultidialog.showModal();
})
diagclosebtn.addEventListener('click',function(evt){
    mymultidialog.close();
})
gridsize.addEventListener('change',function(evt){
    numcheck.innerText = ""+ gridsize.value+"x"+gridsize.value+" grid";
    multimageinitialgrid = gridsize.value;
})



let maincanvas = document.getElementById('maincanvas');
let shapes1 = document.getElementById('shapes1');
let result1 = document.getElementById('result1'); //the result1 elem
let export1div = document.getElementById('export1div');
let export1btn =  document.querySelector('#export1div button');


let maincanvas2 = document.getElementById('maincanvas2');
let shapes2 = document.getElementById('shapes2');
let result2 = document.getElementById('result2'); //the result1 elem
let export2div = document.getElementById('export2div');
let export2btn =  document.querySelector('#export2div button');


let cheight = maincanvas.clientHeight; let sheight = shapes1.clientHeight;
result1.style.height = ""+((80/100)*(cheight - sheight))+"px";  export1div.style.height = ""+((20/100)*(cheight - sheight))+"px";


let cheight2 = maincanvas2.clientHeight; let sheight2 = shapes2.clientHeight;
result2.style.height = ""+((80/100)*(cheight2 - sheight2))+"px";  export2div.style.height = ""+((20/100)*(cheight2 - sheight2))+"px";


let im1, im1width, im1height; let im1okay = false;

let im2, im2width, im2height; let im2okay = false;

//let singcanv = document.querySelector('#maincanvas');
let singapp =  document.querySelector('#singleapp');
let multiapp = document.querySelector('#multiapp');
let welcomdiv = document.querySelector('#welcome');
let myapp = document.querySelector('#myapp');
let singappcanv = document.querySelector('#drawarea1');
let singcanvdiv = document.querySelector('#canvarea');
let singappctx = singappcanv.getContext('2d');
let singappcolorinp = document.querySelector('#shapecol1');
let singappcolor =  singappcolorinp.value; let singappcolorrgb = hex2rgba(singappcolor,0.6);
let singoffcanv = document.createElement('canvas');let singoffcanvctx = singoffcanv.getContext('2d');
// the multiapp menu buttons

let imagechooser = document.querySelector('#imagechooser1');
let dlist = document.querySelector('#dlist');
let imdiagok = document.querySelector('#imdiagok');
let imdiagclose = document.querySelector('#imdiagclose');
let imwhole = document.querySelector('#imwhole');
let impart = document.querySelector('#impart');


let selectmd = document.querySelector('#selectmd');
let assignall = document.querySelector('#assignall');
let assign1 = document.querySelector('#assign1');
let splithorz = document.querySelector('#splithorz');
let splitvert = document.querySelector('#splitvert');
let splitgrid = document.querySelector('#splitgrid');




let activeregion = null;

function regions(topleft,bottomright,rows,columns,type){
    this.topleft = topleft; this.bottomright = bottomright;
    this.rows = rows; this.columns = columns;
    this.type = type;
    this.left = null; this.right = null; this.middle = null;
}
let correctregions = null; let leafnodes = [];
function splitregions(myregion){
    if((myregion.type == 'even') && (myregion.rows != 1)){
        let ht = (myregion.bottomright[1]-myregion.topleft[1])/2; 
        let nrows = (myregion.rows/2);
        
        let lefttop = [myregion.topleft[0],myregion.topleft[1]]; let leftbottom = [myregion.bottomright[0],myregion.topleft[1]+ht];
        let righttop = [myregion.topleft[0],myregion.topleft[1]+ht]; let rightbottom = [myregion.bottomright[0],myregion.bottomright[1]];
        let leftchild = new regions(lefttop,leftbottom,nrows,myregion.columns,'even');
        let rightchild = new regions(righttop,rightbottom,nrows,myregion.columns,'even');
        return [leftchild,rightchild];
    }
    else if((myregion.type == 'even') && (myregion.rows == 1)){
        let wt = (myregion.bottomright[0]-myregion.topleft[0])/2;
        let ncols = (myregion.columns/2);
        let lefttop = [myregion.topleft[0],myregion.topleft[1]]; let leftbottom = [myregion.topleft[0]+wt,myregion.bottomright[1]];
        let righttop = [myregion.topleft[0]+wt,myregion.topleft[1]]; let rightbottom = [myregion.bottomright[0],myregion.bottomright[1]];
        let leftchild = new regions(lefttop,leftbottom,myregion.rows,ncols,'even');
        let rightchild = new regions(righttop,rightbottom,myregion.rows,ncols,'even');
        return [leftchild,rightchild]; 
    }
    else if((myregion.type == 'odd') && (myregion.rows != 1)){
        let evenpart = myregion.rows - 1; let rowdiv = evenpart/2;
        let topht = (rowdiv/((2*(rowdiv)) + 1)) * (myregion.bottomright[1]-myregion.topleft[1]);
        let midht = (1/((2*(rowdiv)) + 1)) * (myregion.bottomright[1]-myregion.topleft[1]);
        let lefttop = [myregion.topleft[0],myregion.topleft[1]]; let leftbottom = [myregion.bottomright[0],myregion.topleft[1]+topht];
        let midtop = [myregion.topleft[0],myregion.topleft[1]+topht]; let midbottom = [myregion.bottomright[0],myregion.topleft[1]+(topht+midht)];
        let righttop = [myregion.topleft[0],myregion.topleft[1]+(topht+midht)]; let rightbottom = [myregion.bottomright[0],myregion.bottomright[1]];
        let leftchild,rightchild;
        if(rowdiv != 1){
            leftchild = new regions(lefttop,leftbottom,rowdiv,myregion.columns,'even');
            rightchild = new regions(righttop,rightbottom,rowdiv,myregion.columns,'even');
        }  
        else if(rowdiv == 1){
            leftchild = new regions(lefttop,leftbottom,rowdiv,myregion.columns,'odd');
            rightchild = new regions(righttop,rightbottom,rowdiv,myregion.columns,'odd');
        }
        let midchild = new regions(midtop,midbottom,1,myregion.columns,'odd');
        return [leftchild,midchild,rightchild]; 
    }
    else if((myregion.type == 'odd') && (myregion.rows == 1)){
        let evenpart = myregion.columns - 1; let coldiv = evenpart/2;
        let topht = (coldiv/((2*(coldiv)) + 1)) * (myregion.bottomright[0]-myregion.topleft[0]);
        let midht = (1/((2*(coldiv)) + 1)) * (myregion.bottomright[0]-myregion.topleft[0]);
        let lefttop = [myregion.topleft[0],myregion.topleft[1]]; let leftbottom = [myregion.topleft[0]+(topht),myregion.bottomright[1]];
        let midtop = [myregion.topleft[0]+(topht),myregion.topleft[1]]; let midbottom = [myregion.topleft[0]+(topht+midht),myregion.bottomright[1]];
        let righttop = [myregion.topleft[0]+(topht+midht),myregion.topleft[1]]; let rightbottom = [myregion.bottomright[0],myregion.bottomright[1]];
        let leftchild,rightchild;
        if(coldiv == 1){
            leftchild = new regions(lefttop,leftbottom,1,1,'odd');
            rightchild = new regions(righttop,rightbottom,1,1,'odd');
        }  
        else if(coldiv != 1){
            leftchild = new regions(lefttop,leftbottom,1,coldiv,'even');
            rightchild = new regions(righttop,rightbottom,1,coldiv,'even');
        }
        let midchild = new regions(midtop,midbottom,1,1,'odd');
        return [leftchild,midchild,rightchild]; 
    }
}

function classifyregion(myregion){
    if((iseven(myregion.rows))) return 'even';
    else if(!(iseven(myregion.rows)) && (myregion.rows != 1)) return 'odd';
    else if(!(iseven(myregion.columns)) && (myregion.rows == 1)) return 'odd';
    else if((iseven(myregion.columns)) && (myregion.rows == 1)) return 'even';
}

function creategriddivide(gridsize,elem){
    let nrows = Number(gridsize.value);
    let myregion;
    if(iseven(nrows)) myregion = new regions([0,0],[elem.width,elem.height],nrows,nrows,'even');
    else myregion = new regions([0,0],[elem.width,elem.height],nrows,nrows,'odd');

    //console.log(myregion);
    let queue = [myregion];
    
    let targetleafnodes = myregion.rows * myregion.columns;
    
    while ((leafnodes.length < targetleafnodes) && (queue.length > 0)){
       let currentregion = queue.pop();
       let resultarr = splitregions(currentregion);
       
       if(classifyregion(currentregion) == 'even'){
          currentregion.left = resultarr[0];
          //console.log(resultarr[0]);
          currentregion.right = resultarr[1];
          for(let j=0;j<=(resultarr.length-1);j++){
             
            if((resultarr[j].rows != 1)){
                queue.push(resultarr[j]);
             } 
             else if((resultarr[j].rows == 1) && ((resultarr[j].columns == 1))){
                leafnodes.push(resultarr[j]); 
             } 
             else if((resultarr[j].rows == 1) && ((resultarr[j].columns != 1))){
                queue.push(resultarr[j]); 
             } 
             //queue.push(resultarr[j]); leafnodes.push(resultarr[j]);
          }
       }
       else if(classifyregion(currentregion) == 'odd'){
           currentregion.left = resultarr[0]; currentregion.middle = resultarr[1];
           currentregion.right = resultarr[2];
           for(let j=0;j<=(resultarr.length-1);j++){
            if((resultarr[j].rows != 1)) queue.push(resultarr[j]);
            else if((resultarr[j].rows == 1) && ((resultarr[j].columns == 1))) leafnodes.push(resultarr[j]);
            else if((resultarr[j].rows == 1) && ((resultarr[j].columns != 1))){
                queue.push(resultarr[j]); 
             } 
            //queue.push(resultarr[j]); leafnodes.push(resultarr[j]);
         }
       }

    }
    
    return myregion;
}
function iswithinbounds(myregion,point){
    let xxp = point[0],yyp = point[1],rrx1 = myregion.topleft[0],rrx2 = myregion.bottomright[0];
    let rry1 = myregion.topleft[1],rry2 = myregion.bottomright[1];
    if(((xxp>rrx1) && (xxp<rrx2)) && (((yyp>rry1) && (yyp<rry2)))) return true;
    else return false;
}

function searchregion(myregion,point){
    let matchregion = false; let queue = [myregion]; let currentregion;
    while(matchregion == false){
        currentregion = queue.pop();
        console.log('okay here');
        console.log(currentregion);
        if(iswithinbounds(currentregion,point)){
           if(currentregion.type == 'even'){
              let kids = [];
              kids.push(currentregion.left); kids.push(currentregion.right);
              if((kids[0]==null) && (kids[1]==null)){
                  matchregion = true;
                  
               }
              else{
                  for(let k=0;k<=(kids.length-1);k++){
                      if(iswithinbounds(kids[k],point)){
                          queue.push(kids[k]);
                       }
                }
            }
           }
           else if(currentregion.type == 'odd'){
               let kids = [];
               kids.push(currentregion.left); kids.push(currentregion.right);
               kids.push(currentregion.middle);
               if((kids[0]==null) && (kids[1]==null) && (kids[2]==null)){
                   matchregion = true;
                   //return currentregion;
               }
               else{
                  for(let k=0;k<=(kids.length-1);k++){
                      if(iswithinbounds(kids[k],point)){
                        queue.push(kids[k]);
                       }
                   }
               }
           }
        }
    }

    return currentregion;
}


function iseven(num){
    let res = num % 2;
    if(res == 0) return true;
    else return false;
}


let multiappcanv = document.querySelector('#drawarea2');
let multicanvdiv = document.querySelector('#canvarea2');
let multiappctx = multiappcanv.getContext('2d');
let multiappcolorinp = document.querySelector('#shapecol2');
let multiappcolor =  multiappcolorinp.value; let multiappcolorrgb = hex2rgba(multiappcolor,0.6);
let multioffcanv = document.createElement('canvas');let multioffcanvctx = multioffcanv.getContext('2d');


let circledialog,circlepts,circleptsok;   let ptsofcircle = 0; 
circledialog = document.querySelector('#circledialog'); circlepts = document.querySelector('#circlepts');
circleptsok = document.querySelector('#circleptsok'); 


let rectbtns = document.querySelectorAll('.rectbtn');
let circlebtns = document.querySelectorAll('.circlebtn');
let polybtns = document.querySelectorAll('.polybtn');


let singpageevt = new Event("singpageshow");
singbutton.addEventListener('click',(evt)=>{
    if(myfilesingle.files[0]){
        singblob = myfilesingle.files[0];
        im1 = new Image(); im1.src = URL.createObjectURL(singblob);
        
        im1.onload = (evt)=>{
           im1width = im1.naturalWidth; im1height = im1.naturalHeight;
           if((im1width == im1height) && (Number.isInteger(Math.log2(im1width))) ){
            im1okay = true; singleimagesize = [im1width,im1height];
            singapp.dispatchEvent(singpageevt);
           }
           else{
            alert('Please select a square image (eg. 512 x 512) that is a power of 2 (eg. 512,1024,..etc)');
           }
            
        }
    }
});

let multipageevt = new Event("multipageshow");
multiappopenbtn.addEventListener('click',(evt)=>{
    
    mymultidialog.close();
    if(myfilemultiple.files.length != 0){
        multimagearray = [];
        for(let j=0;j<=(myfilemultiple.files.length-1);j++){
            multiblob.push(myfilemultiple.files[j]);
            let nblob = multiblob[multiblob.length-1]; let ndataurl = URL.createObjectURL(nblob);
            let blobname = nblob.name;
            let nimage = document.createElement('img'); nimage.src = ndataurl;
            nimage.onload = (evt)=>{
                if(j != (myfilemultiple.files.length-1)) multimagearray.push({image:nimage,width:nimage.naturalWidth,height:nimage.naturalHeight,fname:blobname});
                else{
                    multimagearray.push({image:nimage,width:nimage.naturalWidth,height:nimage.naturalHeight,fname:blobname});
                    
                    //imagechooser.close();
                    multiapp.dispatchEvent(multipageevt);
                    
                }
            };
            
            
        }
    }
    else{
        alert("Please select your image grid size");
    }
});



let func = null, funcarray = ['rectangle','circle','polygon'],funcstate = false;
let apps = ['single','multiple']; let currentapp = apps[0]; let firstpoint = [null,null];

let ip1,ip2,ip3,ip4;
ip1 = document.querySelector('#u1');
ip2 = document.querySelector('#v1');
ip3 = document.querySelector('#x1');
ip4 = document.querySelector('#y1');

let inp1,inp2,inp3,inp4;
inp1 = document.querySelector('#u2');
inp2 = document.querySelector('#v2');
inp3 = document.querySelector('#x2');
inp4 = document.querySelector('#y2');


let removeallbtn = document.querySelectorAll(".remove1");
let removelastbtn = document.querySelectorAll(".remove2");


multiapp.addEventListener('multipageshow',(evt)=>{
    
    im2width = multiimagesize[0];im2height = multiimagesize[1];
    currentapp = apps[1]; shapearray = []; textarray = [];
    welcomdiv.style.display = "none"; myapp.style.display = "block";
    singapp.style.display = "none"; multiapp.style.display = "grid";
    cheight2 = maincanvas2.clientHeight; sheight2 = shapes2.clientHeight;
    result2.style.height = ""+((80/100)*(cheight2 - sheight2))+"px";  export2div.style.height = ""+((20/100)*(cheight2 - sheight2))+"px";
    if(im2width >= 512){
        multiappcanv.width = 512;  multiappcanv.height = 512;
    }
    else{
        multiappcanv.width = im2width;  multiappcanv.height = im2width; 
    }

    if(multicanvdiv.clientHeight < multicanvdiv.clientWidth){
        multiappcanv.style.height = `${(multicanvdiv.clientHeight)-1}px`;
        multiappcanv.style.width = `${(multicanvdiv.clientHeight)-1}px`;
    }
    if(multicanvdiv.clientHeight > multicanvdiv.clientWidth){
        multiappcanv.style.height = `${(multicanvdiv.clientWidth)-1}px`;
        multiappcanv.style.width = `${(multicanvdiv.clientWidth)-1}px`;
    }

    multicanvdiv.style.textAlign = "center"; multicanvdiv.style.backgroundColor = "rgb(40, 54, 54)";
    let multiappctx = multiappcanv.getContext('2d');
    drawmultigrid(multiappctx,multiappcanv,multimageinitialgrid);
    //let myregion = new regions([0,0],[multiappcanv.width,multiappcanv.height],gridsize,gridsize,'odd');
    correctregions = creategriddivide(gridsize,multiappcanv);
    
    assign1.addEventListener('click',(evt)=>{
    
        imagechooser.showModal();
    });
    imdiagclose.addEventListener('click',(evt)=>{
        imagechooser.close();
    });
    
    imdiagok.addEventListener('click',(evt)=>{
        imagechooser.close();
    });
    
    
    
});




singapp.addEventListener('singpageshow',(evt)=>{
    currentapp = apps[0]; shapearray = []; textarray = [];
    welcomdiv.style.display = "none"; myapp.style.display = "block";
    singapp.style.display = "grid"; multiapp.style.display = "none";
    cheight = maincanvas.clientHeight; sheight = shapes1.clientHeight;
    result1.style.height = ""+((80/100)*(cheight - sheight))+"px";  export1div.style.height = ""+((20/100)*(cheight - sheight))+"px";
    if(im1width >= 512){
        singappcanv.width = 512;  singappcanv.height = 512;
    }
    else{
        singappcanv.width = im1width;  singappcanv.height = im1width; 
    }

    if(singcanvdiv.clientHeight < singcanvdiv.clientWidth){
        singappcanv.style.height = `${(singcanvdiv.clientHeight)-3}px`;
        singappcanv.style.width = `${(singcanvdiv.clientHeight)-3}px`;
    }
    if(singcanvdiv.clientWidth < singcanvdiv.clientHeight){
        singappcanv.style.height = `${(singcanvdiv.clientWidth)-3}px`;
        singappcanv.style.width = `${(singcanvdiv.clientWidth)-3}px`;
    }
    singcanvdiv.style.textAlign = "center"; singcanvdiv.style.backgroundColor = "rgb(40, 54, 54)";
    let singappctx = singappcanv.getContext('2d');
    singappctx.drawImage(im1,0,0,im1width,im1height,0,0,singappcanv.width,singappcanv.height);
    
    
    singoffcanv.width =  singappcanv.width; singoffcanv.height = singappcanv.height;
    singoffcanvctx.drawImage(singappcanv,0,0);
    singappcanv.addEventListener('mousemove',hoverhandler);

    for(let j=0;j<=(rectbtns.length-1);j++){
       rectbtns[j].addEventListener('click',(evt)=>{
        func = funcarray[0]; funcstate = true; clickcount = 0;
        singappcanv.removeEventListener('click',circlehandler);
        singappcanv.removeEventListener('click',polyhandler);
        singappcanv.addEventListener('dblclick',(evt)=>{
               
        });
        singappcanv.addEventListener('click',rechandler);
       }); 
    }
    for(let j=0;j<=(circlebtns.length-1);j++){
        circlebtns[j].addEventListener('click',(evt)=>{
            func = funcarray[1]; funcstate = true; clickcount = 0;
            singappcanv.removeEventListener('click',polyhandler);
            singappcanv.addEventListener('dblclick',(evt)=>{
               
            });
            singappcanv.removeEventListener('click',rechandler);
            singappcanv.addEventListener('click',circlehandler);
           }); 
    }
    for(let j=0;j<=(polybtns.length-1);j++){
        polybtns[j].addEventListener('click',(evt)=>{
            func = funcarray[2]; funcstate = true; clickcount = 0;
            singappcanv.removeEventListener('click',rechandler);
            singappcanv.removeEventListener('click',circlehandler);
            singappcanv.addEventListener('click',polyhandler);
            singappcanv.addEventListener('dblclick',(evt)=>{
                drawpoly(singappctx,singappcanv);
            });
           }); 
    }

    for(let j=0;j<=(removelastbtn.length-1);j++){
        removelastbtn[j].addEventListener('click',removelasthandler); 
    }
    for(let j=0;j<=(removeallbtn.length-1);j++){
        removeallbtn[j].addEventListener('click',removeallhandler); 
    }
    export1btn.addEventListener('click',exporthandler);

})

singappcolorinp.addEventListener('change',(evt)=>{
    singappcolor =  singappcolorinp.value; singappcolorrgb = hex2rgba(singappcolor,0.6);
});


result1.addEventListener('singtextevtadd',(evt)=>{
    if(textarray.length != 0){
        if(result1.children.length > 1){
            result1.removeChild(singtext);
            singtext = ''; 
        }
        
        singtext = document.createElement('h5');
        for(let i=0;i<= (textarray.length-1);i++){
            switch(textarray[i].shape){
               case 'rectangle':{
                let samptext3;
                let mytext = `\n ${textarray[i].shapeno} = { shape = ${textarray[i].shape},
                           topleft = [${textarray[i].topleft}], width = ${textarray[i].width}
                           height = ${textarray[i].height},\n uvarray = [
                ` ;
                let texthold = new Array((textarray[i].uvarray).length);
                for(let j=0;j<=((textarray[i].uvarray).length)-1;j++){
                    if(j == 0){
                        texthold[j] = mytext.concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}], `);
                        
                    }
                    else if((j != ((textarray[i].uvarray).length)-1) && (j != 0)){
                        texthold[j] = texthold[j-1].concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}], `);
                    }
                    else{
                        texthold[j] =  texthold[j-1].concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}] \n`);
                        samptext3 =  texthold[j].concat(']}') ;
                    }
                }
                let himtext = document.createTextNode(samptext3);
                singtext.appendChild(himtext);
                singtext.appendChild(document.createElement('p'));
                result1.appendChild(singtext);
                break;
               }

               case  'circle': {
                let samptext3;
                let mytext = `\n ${textarray[i].shapeno} = { shape = ${textarray[i].shape},
                           center = [${textarray[i].center}], radius = ${textarray[i].radius},
                           points = ${textarray[i].points},\n uvarray = [
                ` ;
                let texthold = new Array((textarray[i].uvarray).length);
                for(let j=0;j<=((textarray[i].uvarray).length)-1;j++){
                    if(j == 0){
                        texthold[j] = mytext.concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}], `);
                        
                    }
                    else if((j != ((textarray[i].uvarray).length)-1) && (j != 0)){
                        texthold[j] = texthold[j-1].concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}], `);
                    }
                    else{
                        texthold[j] =  texthold[j-1].concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}] \n`);
                        samptext3 =  texthold[j].concat(']}') ;
                    }
                }
                let himtext = document.createTextNode(samptext3);
                singtext.appendChild(himtext);
                singtext.appendChild(document.createElement('p'));
                result1.appendChild(singtext);
                break;
               }

               case  'polygon':{
                let samptext3;
                let mytext = `\n ${textarray[i].shapeno} = { shape = ${textarray[i].shape},
                           firstpoint = [${textarray[i].firstpoint}], lastpoint = ${textarray[i].lastpoint},
                           points = ${textarray[i].points},\n uvarray = [
                ` ;
                let texthold = new Array((textarray[i].uvarray).length);
                for(let j=0;j<=((textarray[i].uvarray).length)-1;j++){
                    if(j == 0){
                        texthold[j] = mytext.concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}], `);
                        
                    }
                    else if((j != ((textarray[i].uvarray).length)-1) && (j != 0)){
                        texthold[j] = texthold[j-1].concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}], `);
                    }
                    else{
                        texthold[j] =  texthold[j-1].concat(`[${(textarray[i].uvarray)[j][0]},${(textarray[i].uvarray)[j][1]}] \n`);
                        samptext3 =  texthold[j].concat(']}') ;
                    }
                }
                let himtext = document.createTextNode(samptext3);
                singtext.appendChild(himtext);
                singtext.appendChild(document.createElement('p'));
                result1.appendChild(singtext);
                break;
               }
            }
        }
    }
});

//result1.addEventListener('singtextevtremove',(evt)=>{});

function drawmultigrid(ctx,elem,gridsize){
    let width = elem.width, height = elem.height;
    let widthoffset = width/gridsize, heightoffset = height/gridsize;
    ctx.beginPath(); ctx.strokeStyle = 'rgb(255,0,0)';
    //draw horizontal grid
    for(let j=0;j<=(gridsize);j++){
        ctx.moveTo(0 + (j*widthoffset),0);
        ctx.lineTo(0 + (j*widthoffset),height);
        ctx.stroke();
    }
    //draw vertical grid
    for(let j=0;j<=(gridsize);j++){
        ctx.moveTo(0 ,0 + (j*heightoffset));
        ctx.lineTo(width,0 + (j*heightoffset));
        ctx.stroke();
    }
    
    
    

}


function rechandler(evt){
    let imwidth,imheight,elem,ctx;
    let secondpoint = [0,0];  let hz,vz,u,vzratio,v,xval,yval;
    if(currentapp == apps[0]){
        imwidth = im1width, imheight = im1height, elem = singappcanv,ctx = singappctx;
       
    }
      
    if(clickcount == 0){
        clickcount += 1;
        hz = evt.clientX - elem.getBoundingClientRect().left;
        vz = evt.clientY - elem.getBoundingClientRect().top; 
        let ccoord = canv2imcoord([hz,vz],elem.clientWidth,elem.clientHeight,elem);
        firstpoint[0] = ccoord[0]; firstpoint[1] = ccoord[1];
        u = hz/(elem.clientWidth); vzratio = vz/(elem.clientHeight); v = 1 - vzratio;
        xval = u * imwidth; yval = vzratio * imheight;
    }
    else{
        if((firstpoint[0] != null) && (firstpoint[1] != null)){
            let hzz =  evt.clientX - elem.getBoundingClientRect().left; 
            let vzz =  evt.clientY - elem.getBoundingClientRect().top;
            let ccoord = canv2imcoord([hzz,vzz],elem.clientWidth,elem.clientHeight,elem);
            secondpoint[0] = ccoord[0]; 
            secondpoint[1] = ccoord[1];
            if(func == funcarray[0]){
                let wt = secondpoint[0] - firstpoint[0];
                let ht = secondpoint[1] - firstpoint[1];
                let uvfp = im2uvcoord([firstpoint[0],firstpoint[1]],elem);
                let uvsp = im2uvcoord([secondpoint[0],secondpoint[1]],elem);
                
                uvfp[0] = Number((uvfp[0]).toFixed(4)); uvfp[1] = Number((uvfp[1]).toFixed(4));
                uvsp[0] = Number((uvsp[0]).toFixed(4)); uvsp[1] = Number((uvsp[1]).toFixed(4));
                let uvwt = (uvsp[0] - uvfp[0]); let uvht = Math.abs((uvsp[1] - uvfp[1]));
                uvht = Number(uvht.toFixed(4)); uvwt = Number(uvwt.toFixed(4));

                let fillstyle = `rgba(${singappcolorrgb[0]},${singappcolorrgb[1]},${singappcolorrgb[2]},${singappcolorrgb[3]})`;
                drawrect(ctx,firstpoint,wt,ht,fillstyle);
                drawrectpts(ctx,firstpoint,wt,ht);
                shapearray.push(['rectangle',fillstyle,[firstpoint[0],firstpoint[1]],wt,ht]);
                textarray.push({shape:'rectangle',
                                shapeno:0,
                                topleft:uvfp,
                                width:uvwt,
                                height:uvht,
                                uvarray:[
                                    [uvfp[0],uvfp[1]],[Number((uvfp[0]+uvwt).toFixed(4)),uvfp[1]],[uvfp[0],Number((uvfp[1]-uvht).toFixed(4))],[Number((uvfp[0]+uvwt).toFixed(4)),Number((uvfp[1]-uvht).toFixed(4))]
                                ]
                        });

                let textindex = textarray.length - 1;
                textarray[textindex].shapeno = textindex;
                
                result1.dispatchEvent(singtextevt1);
                clickcount = 0;
            }
        }
        
    }
    evt.stopPropagation();
}


function circlehandler(evt){
    let imwidth,imheight,elem,ctx;
    let secondpoint = [0,0];  let hz,vz,u,vzratio,v,xval,yval;
    if(currentapp == apps[0]){
        imwidth = im1width, imheight = im1height, elem = singappcanv,ctx = singappctx;
       
    }

    if(clickcount == 0){
        clickcount += 1;
        hz = evt.clientX - elem.getBoundingClientRect().left;
        vz = evt.clientY - elem.getBoundingClientRect().top; 
        let ccoord = canv2imcoord([hz,vz],elem.clientWidth,elem.clientHeight,elem);
        firstpoint[0] = ccoord[0]; firstpoint[1] = ccoord[1];
        u = hz/(elem.clientWidth); vzratio = vz/(elem.clientHeight); v = 1 - vzratio;
        xval = u * imwidth; yval = vzratio * imheight;
    }
    else{
        if((firstpoint[0] != null) && (firstpoint[1] != null)){
            
            let circledialogstate = false;
            let hzz =  evt.clientX - elem.getBoundingClientRect().left; 
            let vzz =  evt.clientY - elem.getBoundingClientRect().top;
            let ccoord = canv2imcoord([hzz,vzz],elem.clientWidth,elem.clientHeight,elem);
            secondpoint[0] = ccoord[0]; 
            secondpoint[1] = ccoord[1];
            if(func == funcarray[1]){
                let circlereport = new Event('circlereport');
                let rad = Math.sqrt((Math.pow((secondpoint[0]-firstpoint[0]),2) + Math.pow((secondpoint[1]-firstpoint[1]),2)));
                let uvfp = im2uvcoord([firstpoint[0],firstpoint[1]],elem);
                let uvsp = im2uvcoord([secondpoint[0],secondpoint[1]],elem);
                uvfp[0] = Number((uvfp[0]).toFixed(4)); uvfp[1] = Number((uvfp[1]).toFixed(4));
                uvsp[0] = Number((uvsp[0]).toFixed(4)); uvsp[1] = Number((uvsp[1]).toFixed(4));
                let uvwt = (uvsp[0] - uvfp[0]); let uvht = Math.abs((uvsp[1] - uvfp[1]));
                uvht = Number(uvht.toFixed(4)); uvwt = Number(uvwt.toFixed(4));
                let uvrad = Math.sqrt(Math.pow(uvwt,2) + Math.pow(uvht,2));
                uvrad = Number((uvrad).toFixed(4));
                
                elem.addEventListener('circlereport',(evt)=>{
                    if(circledialogstate){
                        shapearray.push(['circle',fillstyle,[firstpoint[0],firstpoint[1]],rad,true,ptsofcircle]);
    
                        textarray.push({shape:'circle',
                            shapeno:0,
                            center:uvfp,
                            radius:uvrad,
                            points:ptsofcircle,
                            uvarray:[
                               ]
                    });
    
                    let textindex = textarray.length - 1;
                    textarray[textindex].shapeno = textindex;
                    let anglestep = (2 * Math.PI)/ptsofcircle;
                    for(let h=0;h<=(ptsofcircle-1);h++){
                        textarray[textindex].uvarray.push(
                            [Number((uvfp[0] + (uvrad * Math.cos(h*anglestep))).toFixed(4)),Number((uvfp[1] + (uvrad * Math.sin(h*anglestep))).toFixed(4))]
                        );
                    }
            
                    result1.dispatchEvent(singtextevt1);
                        clickcount = 0;
                    }
                });

                circledialog.showModal();
                circlepts.addEventListener('change',(evt)=>{
                ptsofcircle = circlepts.value;
                })
                circleptsok.addEventListener('click',(evt)=>{
                circledialog.close();
                drawcirclepts(ctx,firstpoint,rad,ptsofcircle); circledialogstate = true;
                elem.dispatchEvent(circlereport);
                })


                let fillstyle = `rgba(${singappcolorrgb[0]},${singappcolorrgb[1]},${singappcolorrgb[2]},${singappcolorrgb[3]})`;
                drawcircle(ctx,firstpoint,secondpoint,fillstyle);
                
                
            }
        }
        
    }
    evt.stopPropagation();
}


function polyhandler(evt){
    let imwidth,imheight,elem,ctx;
    let secondpoint = [0,0];  let hz,vz,u,vzratio,v,xval,yval;
    if(currentapp == apps[0]){
        imwidth = im1width, imheight = im1height, elem = singappcanv,ctx = singappctx;
       
    }
    if(clickcount == 0){
        clickcount += 1;
        hz = evt.clientX - elem.getBoundingClientRect().left;
        vz = evt.clientY - elem.getBoundingClientRect().top; 
        let ccoord = canv2imcoord([hz,vz],elem.clientWidth,elem.clientHeight,elem);
        firstpoint[0] = ccoord[0]; firstpoint[1] = ccoord[1];
        u = hz/(elem.clientWidth); vzratio = vz/(elem.clientHeight); v = 1 - vzratio;
        xval = u * imwidth; yval = vzratio * imheight;
    }
    else{
        if((firstpoint[0] != null) && (firstpoint[1] != null)){
            let hzz =  evt.clientX - elem.getBoundingClientRect().left; 
            let vzz =  evt.clientY - elem.getBoundingClientRect().top;
            let ccoord = canv2imcoord([hzz,vzz],elem.clientWidth,elem.clientHeight,elem);
            secondpoint[0] = ccoord[0]; 
            secondpoint[1] = ccoord[1];
            if(func == funcarray[2]){
                let fillstyle = `rgba(${singappcolorrgb[0]},${singappcolorrgb[1]},${singappcolorrgb[2]},${singappcolorrgb[3]})`;
                if(clickcount==1){
                    drawpolygon(ctx,firstpoint,secondpoint,fillstyle);
                    shapearray.push(['polygon',fillstyle,[firstpoint[0],firstpoint[1]],[ secondpoint[0],secondpoint[1]]]);
                    firstpoint[0] = secondpoint[0]; firstpoint[1] = secondpoint[1];
                     clickcount += 1;
                }
                if(clickcount > 1){
                    drawpolygon(ctx,firstpoint,secondpoint,fillstyle);
                    shapearray[shapearray.length-1].push([secondpoint[0],secondpoint[1]]);
                    firstpoint[0] = secondpoint[0]; firstpoint[1] = secondpoint[1];
                    secondpoint = [0,0];
                } 
                
                
                
            }
        }
        
    }
    evt.stopPropagation();
}

function removelasthandler(evt){
    let imwidth,imheight,elem,ctx,offcanv; let imageloaded;
    if(currentapp == apps[0]){
        imwidth = im1width, imheight = im1height, elem = singappcanv,ctx = singappctx;
        offcanv = singoffcanv;
        if(im1okay == true){
            imageloaded = true;
        }
      }
   if(imageloaded){
    if(shapearray.length != 0){
        ctx.clearRect(0,0,imwidth,imheight);
        ctx.drawImage(offcanv,0,0);
        shapearray.pop();
        textarray.pop();
        for(let j=0;j<=(shapearray.length-1);j++){
            switch(shapearray[j][0]){
                case "rectangle":{
                    ctx.fillStyle = shapearray[j][1];
                    ctx.fillRect((shapearray[j][2])[0],(shapearray[j][2])[1],shapearray[j][3],shapearray[j][4]);
                    drawrectpts(ctx,(shapearray[j][2]),shapearray[j][3],shapearray[j][4]);
                    break;
                }
                case "circle":{
                    ctx.fillStyle = shapearray[j][1];
                    //ctx.fillRect((shapearray[j][2])[0],(shapearray[j][2])[1],shapearray[j][3],shapearray[j][4]);
                    ctx.beginPath();
                    ctx.arc((shapearray[j][2])[0],(shapearray[j][2])[1],shapearray[j][3],0,2*Math.PI,true);
                    ctx.fill();
                    drawcirclepts(ctx,[(shapearray[j][2])[0],(shapearray[j][2])[1]],shapearray[j][3],(shapearray[j]).length-1);
                    break;
                }
                case "polygon":{
                    ctx.fillStyle = shapearray[j][1];
                    ctx.beginPath();
                    ctx.moveTo((shapearray[j][2])[0],(shapearray[j][2])[1]);
                    for(let k=2;k<=(shapearray[j].length-1);k++){
                        if(k != (shapearray[j].length-1)){
                            ctx.lineTo((shapearray[j][k+1])[0],(shapearray[j][k+1])[1]);
                        }
                        else{
                            ctx.lineTo((shapearray[j][2])[0],(shapearray[j][2])[1]);
                            ctx.fill(); 
                        }
                    }
                    ctx.fillRect((shapearray[j][2])[0],(shapearray[j][2])[1],shapearray[j][3],shapearray[j][4]);
                    break;
                }
            }
        }
        result1.dispatchEvent(singtextevt1);   
      }
   }
}



function removeallhandler(evt){
    let imwidth,imheight,elem,ctx,offcanv; let imageloaded;
    if(currentapp == apps[0]){
        imwidth = im1width, imheight = im1height, elem = singappcanv,ctx = singappctx;
        offcanv = singoffcanv;
        if(im1okay == true){
            imageloaded = true;
        }
      }
    if(imageloaded){
        if(shapearray.length != 0){
            ctx.clearRect(0,0,imwidth,imheight);
            ctx.drawImage(offcanv,0,0);
            shapearray = [];
            if(textarray.length != 0){
                if(result1.children.length > 1){
                    result1.removeChild(singtext);
                    singtext = ''; 
                }
                textarray = [];
            }
        }
    }
}


function hoverhandler(evt){
    let imwidth,imheight,elem,ctx;
    if(currentapp == apps[0]){
      imwidth = im1width, imheight = im1height, elem = singappcanv,ctx = singappctx;
      
     
    }
    
    let hz = evt.clientX - elem.getBoundingClientRect().x;
    let vz = evt.clientY - elem.getBoundingClientRect().y;

    let u = hz/(elem.clientWidth); let vzratio = vz/(elem.clientHeight); let v = 1 - vzratio;
    let xval = u * imwidth; let yval = vzratio * imheight;
    ip1.value = ""+u.toFixed(4); ip2.value = ""+ v.toFixed(4); ip3.value = ""+ Math.round(xval); ip4.value = ""+ Math.round(yval);
}
function hoverouthandler(evt,elem,ctx,ip1,ip2,ip3,ip4){
    
}
function movehandler(evt,elem,ctx,ip1,ip2,ip3,ip4){
    
}

function exporthandler(evt){
    let imwidth,imheight,elem,ctx,bgimage;
    
    if(currentapp == apps[0]){
        imwidth = im1width, imheight = im1height, elem = singappcanv,ctx = singappctx;
        bgimage = im1;
    }
    let drawevent = new Event('drawevent');
    let finalshapearray = [];
    let newcanv = document.createElement('canvas');
    newcanv.width = imwidth; newcanv.height = imheight;

    ctx = newcanv.getContext('2d');
    if(shapearray.length != 0){
       ctx.drawImage(bgimage,0,0);
       for(let j=0;j<=(shapearray.length-1);j++){
         if((shapearray[j])[0] == "rectangle"){
               let ratiox1 =  ((shapearray[j])[2])[0]/elem.width; let ratioy1 =  ((shapearray[j])[2])[1]/elem.height;
               let firstpoint = [Math.round(ratiox1*newcanv.width),Math.round(ratioy1*newcanv.height)];
               let secondpointxx1 = ((shapearray[j])[2])[0] + (shapearray[j])[3];
               let secondpointyy1 = ((shapearray[j])[2])[1] + (shapearray[j])[4];
               let ratiox2 = secondpointxx1/elem.width;  let ratioy2 = secondpointyy1/elem.height;
               let secondpoint = [Math.round(ratiox2*newcanv.width),Math.round(ratioy2*newcanv.height)];
               let wt = secondpoint[0] - firstpoint[0], ht = Math.abs(secondpoint[1] - firstpoint[1]);
               finalshapearray.push(['rectangle',(shapearray[j])[1],firstpoint,wt,ht]);
               drawrect(ctx,firstpoint,wt,ht,(shapearray[j])[1]);
               drawrectpts(ctx,firstpoint,wt,ht);
         }
         else if((shapearray[j])[0] == "circle"){
               let ratiox1 =  ((shapearray[j])[2])[0]/elem.width; let ratioy1 =  ((shapearray[j])[2])[1]/elem.height;
               let firstpoint = [Math.round(ratiox1*newcanv.width),Math.round(ratioy1*newcanv.height)];
               let secondpointxx1 = ((shapearray[j])[2])[0] + (shapearray[j])[3];
               let secondpointyy1 = ((shapearray[j])[2])[1] + (shapearray[j])[4];
               let ratiox2 = secondpointxx1/elem.width;  let ratioy2 = secondpointyy1/elem.height;
               let secondpoint = [Math.round(ratiox2*newcanv.width),Math.round(ratioy2*newcanv.height)];
               let wt = secondpoint[0] - firstpoint[0], ht = Math.abs(secondpoint[1] - firstpoint[1]);
               let radius = Math.sqrt(Math.pow(wt,2) + Math.pow(ht,2));
               drawcircle(ctx,firstpoint,secondpoint,(shapearray[j])[1]);
               finalshapearray.push(['rectangle',(shapearray[j])[1],firstpoint,radius,true,((shapearray[j])[shapearray[j].length-1])]);
               drawcirclepts(ctx,firstpoint,radius,((shapearray[j])[shapearray[j].length-1]));
         }
         else if((shapearray[j])[0] == "polygon"){
                let mystore = [];
                //console.log('value is '+ (shapearray[j])[shapearray[j].length - 1]);
                let fillstyle =  (shapearray[j])[1];
                for(let i=2;i<=((shapearray[j]).length - 1);i++){
                 let xxratio = ((shapearray[j])[i])[0]/elem.width;  let yyratio = ((shapearray[j])[i])[1]/elem.height;
                 let xx = Math.round(xxratio * newcanv.width); let yy = Math.round(yyratio * newcanv.height);
                 
                 mystore.push([xx,yy]);
               }
               ctx.beginPath();
               ctx.fillStyle = fillstyle;
               ctx.moveTo(...mystore[0]);
               for(let k=0;k<=(mystore.length-1);k++){
                  if(k != (mystore.length-1)){
                    ctx.lineTo(...mystore[k+1]);
                  }
                  else{
                    ctx.lineTo(...mystore[0]);
                  }
               }
               ctx.fill();
               finalshapearray.push(['polygon',fillstyle,...mystore]);
         }
        
        
        
       } 
       elem.dispatchEvent(drawevent);
    }
    elem.addEventListener('drawevent',(evt)=>{
        
        let ddata = newcanv.toBlob((mblob)=>{
            let mylink = document.createElement("a"); let datalink = URL.createObjectURL(mblob);
            mylink.href = datalink;
            mylink.download = 'yourimage.png';
            mylink.click();
            URL.revokeObjectURL(datalink);
        });
       
    });
}

function drawcirclepts(ctx,center,radius,numpts){
  ctx.fillStyle = 'rgb(0,0,0)';
  let anglestep = (2 * Math.PI)/numpts; 
  for(let i=0;i<=(numpts-1);i++){
    let pos = [center[0] + ((radius)*Math.cos(i*anglestep)),center[1] - ((radius)*Math.sin(i*anglestep))];
    ctx.fillRect(...pos,4,4);
  } 
}
function drawrectpts(ctx,topleft,width,height){
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(...topleft,4,4);  ctx.fillRect(topleft[0]+width,topleft[1],4,4);
    ctx.fillRect(topleft[0],topleft[1]+height,4,4); ctx.fillRect(topleft[0]+width,topleft[1]+height,4,4);
}

function drawrect(ctx,firstpoint,wt,ht,fillStyle){
    ctx.fillStyle = fillStyle;
    ctx.fillRect(firstpoint[0],firstpoint[1],wt,ht);
}
function drawcircle(ctx,firstpoint,secondpoint,fillStyle){
    ctx.fillStyle = fillStyle;
    let rad = Math.sqrt((Math.pow((secondpoint[0]-firstpoint[0]),2) + Math.pow((secondpoint[1]-firstpoint[1]),2)));
    ctx.beginPath();
    ctx.arc(firstpoint[0],firstpoint[1],rad,0,2*Math.PI,true);
    ctx.fill();
    //ctx.fillRect(firstpoint[0],firstpoint[1],wt,ht);
}

function drawpolygon(ctx,firstpoint,secondpoint,fillStyle){
    ctx.fillStyle = fillStyle; ctx.lineWidth = 2;
    ctx.strokeStyle = fillStyle;
    ctx.beginPath();
    //if(clickcount == 1){ctx.moveTo(firstpoint[0],firstpoint[1]);}
    ctx.moveTo(firstpoint[0],firstpoint[1]);
    ctx.lineTo(secondpoint[0],secondpoint[1]);
    ctx.stroke();
    //ctx.fillRect(firstpoint[0],firstpoint[1],wt,ht);
}

function canv2imcoord(canvcoord,csswt,cssht,elem){
    let xxratio = canvcoord[0]/csswt; let yyratio = canvcoord[1]/cssht;
    let xx = Math.round(xxratio * (elem.width)); let yy = Math.round(yyratio * (elem.height));
    return [xx,yy];
}

function im2uvcoord(imcoord,elem){
    let uratio = imcoord[0]/(elem.width); let yyratio = imcoord[1]/(elem.height);
    return [uratio,1-yyratio];
}

function drawpoly(ctx,elem){
    if((shapearray.length != 0) && ((shapearray[shapearray.length-1])[0] == "polygon")){
        let newcanv = document.createElement('canvas');
        newcanv.width = elem.width; newcanv.height = elem.height; let newcanvctx =  elem.getContext('2d');
        newcanvctx.fillStyle = (shapearray[shapearray.length-1])[1]; newcanvctx.strokeStyle = (shapearray[shapearray.length-1])[1];
        newcanvctx.beginPath();
                    //newcanvctx.moveTo(...(shapearray[shapearray.length-1])[2]);
                    newcanvctx.moveTo(((shapearray[shapearray.length-1])[2])[0],((shapearray[shapearray.length-1])[2])[1]);
                    for(let j=2;j<=((shapearray[shapearray.length-1]).length - 1);j++){
                        if(j != ((shapearray[shapearray.length-1]).length - 1)){
                            //newcanvctx.lineTo(...(shapearray[shapearray.length-1])[j+1]);
                            newcanvctx.lineTo(((shapearray[shapearray.length-1])[j+1])[0],((shapearray[shapearray.length-1])[j+1])[1]);
                        }
                        else{
                            //newcanvctx.lineTo(...(shapearray[shapearray.length-1])[2]);
                            newcanvctx.lineTo(((shapearray[shapearray.length-1])[2])[0],((shapearray[shapearray.length-1])[2])[1]);
                        }
                    } 
                    newcanvctx.closePath(); newcanvctx.fill();
        ctx.drawImage(newcanv,0,0); 
        let uvfp = [Number((im2uvcoord(((shapearray[shapearray.length-1])[2]),elem)[0]).toFixed(4)),Number((im2uvcoord(((shapearray[shapearray.length-1])[2]),elem)[1]).toFixed(4))]
        let uvlp = [Number((im2uvcoord(((shapearray[shapearray.length-1])[(shapearray[shapearray.length-1]).length - 1]),elem)[0]).toFixed(4)),Number((im2uvcoord(((shapearray[shapearray.length-1])[(shapearray[shapearray.length-1]).length - 1]),elem)[1]).toFixed(4))];
        textarray.push({shape:'polygon',
            shapeno:0,
            firstpoint:[uvfp[0],uvfp[1]],
            lastpoint:[uvlp[0],uvlp[1]],
            points:(shapearray[shapearray.length-1]).length-2,
            uvarray:[
               ]
         });
        let lasttext =  textarray.length-1;
        textarray[textarray.length-1].shapeno = lasttext;
        for(let j=2;j<=((shapearray[shapearray.length-1]).length - 1);j++){
            let uvim = (shapearray[shapearray.length-1])[j];
            let uv = im2uvcoord(uvim,elem);
            uv = [Number((uv[0]).toFixed(4)),Number((uv[1]).toFixed(4))];
            textarray[textarray.length-1].uvarray.push(uv);
        }
        result1.dispatchEvent(singtextevt1);
    }
}

function hex2rgba(inp,alpha){
    let holder = []; let rr,gg,bb;
    if(inp.length != 0){
        for(let j=1;j<=(inp.length-1);j++){
            holder.push(inp[j]);
        }
        if(holder.length == 6){ 
             rr = [holder[0],holder[1]]; gg = [holder[2],holder[3]]; bb = [holder[4],holder[5]];
             let rd = "0x"+ rr.join(''); let gr = "0x"+ gg.join(''); let bl = "0x"+ bb.join('');
             let rgba = [Number(rd),Number(gr),Number(bl),alpha];
             return rgba;
            }
         else return "";    
    }
}