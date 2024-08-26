var board;
var score=0;
var rows=4;
var columns=4;
window.onload=function(){
    setGame();
}
function setGame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    // board=[
    //     [0,4,0,0],
    //     [8,0,0,64],
    //     [0,0,0,0],
    //     [0,2048,0,0]
    // ]
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            let tile=document.createElement('div');
            tile.id=r.toString()+'-'+c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById('board').append(tile);
        }
    }

    setTwo();
     setTwo();
}
function updateTile(tile,num){
    tile.innerText='';
    tile.classList.value='';
    tile.classList.add('tile');
    if(num > 0){
        tile.innerText=num;
        if (num<=4096){
            tile.classList.add('x'+num.toString());
        }
        else{
            tile.classList.add('x8192');
        }
    }
}
document.addEventListener('keyup',(e)=>{
        if(e.code=='ArrowLeft'){
            slideLeft();
            setTwo();
        }
        else if(e.code=='ArrowRight'){
            slideRight();
            setTwo();
        }
        else if(e.code== 'ArrowUp'){
            slideUp();
            setTwo();
        }
        else if(e.code== 'ArrowDown'){
            slideDown();
            setTwo();
        }
       document.getElementById('score').innerText= score;
    }
);

function filterZero(row){
    return row.filter(num => num!=0);
}

function slide(row){
    row = filterZero(row);              // remove zeros [2,2,2,0]=>[2,2,2]
    for(let i=0;i< row.length-1;i++){
        if(row[i]==row[i+1]){
            row[i]=row[i]*2;
            row[i+1]=0;
            score+=row[i];
        }
    }                                  // adding: [4,0,2]
    row=filterZero(row);               // remove zeros [4,2]
    while(row.length< columns){
        row.push(0);
    }                                   //[4,2,0,0]
    return row;                         // return new row
}

function slideLeft(){
    for(let r=0;r<rows;r++){
        let row=board[r];
        row=slide(row);
        board[r]=row;

        for(let c=0;c< columns;c++){
            let tile=document.getElementById(r.toString()+'-'+c.toString());
            let num= board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideRight(){
    for(let r=0;r< rows;r++){
        let row=board[r];            
        row.reverse();                   //reverse row
        row=slide(row);                  // apply left slide
        board[r]=row.reverse();          //reverse row => right slide

        for(let c=0;c< columns;c++){
            let tile=document.getElementById(r.toString()+'-'+c.toString());
            let num= board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp(){
    for(let c=0;c< columns;c++){
        let row=new Array(board[0][c],board[1][c],board[2][c],board[3][c]);
        row=slide(row);
        
        for(let r=0;r<rows;r++){
            board[r][c] = row[r];
            let tile=document.getElementById(r.toString()+'-'+c.toString());
            let num= board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    for(let c=0;c< columns;c++){
        let row=new Array(board[0][c],board[1][c],board[2][c],board[3][c]);
        row.reverse();
        row=slide(row);
        row.reverse();
        
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString()+'-'+c.toString());
            let num= board[r][c];
            updateTile(tile,num);
        }
    }
}

function hasEmptyTile(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
}

let flag=0;

function setTwo(){
    if(!hasEmptyTile()){
        document.getElementById('s2').style.opacity=1;
        document.getElementById('s2').style.display='flex';
        document.getElementById('sc').innerText= score;
        console.log(score);
        return;
    }
    let found=false;
    while(!found){
        let c=Math.floor(Math.random()*columns);
        let r=Math.floor(Math.random()*rows);

        if(board[r][c]==0){
            board[r][c]=2;
            let tile=document.getElementById(r.toString()+'-'+c.toString());
            tile.innerText='2';
            tile.classList.add('x2');
            found=true;
        }
    }
}

function retry(){
    document.getElementById('s2').style.opacity=0;
}

function exit(){
    window.open('exit.html');
}

function up(){
    slideUp();
    setTwo();
    document.getElementById('score').innerText= score;
}
function left(){
    slideLeft();
    setTwo();
    document.getElementById('score').innerText= score;
}
function down(){
    slideDown();
    setTwo();
    document.getElementById('score').innerText= score;
}
function right(){
    slideRight();
    setTwo();
    document.getElementById('score').innerText= score;
}


