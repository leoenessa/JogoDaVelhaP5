let tabuleiro = [
  ['','',''],
  ['','',''],
  ['','','']
];
// let tabuleiro = [
//   [-1,'',1],
//   [1,-1,-1],
//   [1,'','']
// ];
let jogador1 = 1;
let jogador2 = -1;
let vezjogador1 = true;
let casasDisponiveis = []; 

function mudarTurno(){
   vezjogador1 = !vezjogador1; 
}
function escreverNoTabuleiro(casa,indice){
  if(indice!=-1){
    casasDisponiveis.splice(indice,1);
    let jogadorDaVez = vezjogador1 ? jogador1 : jogador2;
    tabuleiro[casa[0]][casa[1]] = jogadorDaVez; 
  } 
}

function checarVitoria(){
  //horizontal
    let soma=0;
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        soma+=tabuleiro[i][j];
      }
      if(soma==3){
        //jogador1 ganhou
        return jogador1;
      }else if(soma==-3){
        //jogador 2 ganhou
        return jogador2;
      }else{
        // print("soma horizontal q nao deu vitoria:"+soma);
        soma=0;
      }
    }
  
  //vertical
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        soma+=tabuleiro[j][i];
      }
      if(soma==3){
        //jogador1 ganhou
        return jogador1;
      }else if(soma==-3){
        //jogador 2 ganhou
        return jogador2;
      }else{
        // print("soma vertical q nao deu vitoria:"+soma);
        soma=0;
      }
    }
  
  //diagonal1
    soma+=tabuleiro[0][0];
    soma+=tabuleiro[1][1];  
    soma+=tabuleiro[2][2];
    if(soma==3){
      //jogador1 ganhou
      return jogador1;
    }else if(soma==-3){
      //jogador2 ganhou
      return jogador2;
    }else{
      // print("soma diagoan lq nao deu vitoria:"+soma);
      soma=0;
    }
  
  //diagonal2
    soma+=tabuleiro[0][2];
    soma+=tabuleiro[1][1];  
    soma+=tabuleiro[2][0];

    if(soma==3){
      //jogador1 ganhou
        
      return jogador1;
    }else if(soma==-3){
      //jogador2 ganhou
        
      return jogador2;
    }else{
      // print("soma diagonal 2 q nao deu vitoria:"+soma);
      soma=0;
    }   
    if(casasDisponiveis.length==0){
      
      return 0;
    }
    return null;
}

function desenharTabuleiro(){
  let w = width/3;
  let h = width/3;
  strokeWeight(5);
  stroke(0);
  for(let c=1;c<3;c++){ 
    line(0,c*h,width,c*h);
  }
  for(let c=1;c<3;c++){
    line(c*w,0,c*w,height);
  }
}

function getCasasDisponiveis(){
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if(tabuleiro[j][i]==''){
        casasDisponiveis.push([j,i]);
      }
    }
  }
}

function checarDisponibilidade(casa){
  for(let i=0;i<casasDisponiveis.length;i++){ 
    if(casa[0] ==casasDisponiveis[i][0] && casa[1] ==casasDisponiveis[i][1] ){
      return i;
    }
  }
  return -1;
}

function getCasaClique(x,y){
  
  let casa = []
  
  if(x<=200){
    casa[1]=0;
  }else if(x>=201 && x<=400){
    casa[1]=1;
  }else if(x>=401){
    casa[1]=2;
  }
  
  if(y<=200){
    casa[0]=0;
  }else if(y>=201 && y<=400){
    casa[0]=1;
  }else if(y>=401){
    casa[0]=2;
  }
  
  return (casa);
}

function IAJoga(){
    let proxJogada = random(casasDisponiveis);
    let indiceEscolhido = casasDisponiveis.indexOf(proxJogada); 
    escreverNoTabuleiro(proxJogada,indiceEscolhido);
    mudarTurno();
}

function printResultado(resultado){
  if(resultado!=null){
      noLoop();
      if(resultado==-1){
        print("JOGADOR 1 GANHOU");
      }
      if(resultado==1){
        print("JOGADOR 2 GANHOU");
      }
      if(resultado==0){
        print("EMPATE");
      }
  }
}

function setup() {
  createCanvas(600, 600);
  getCasasDisponiveis();
}

function draw() {
  background(255,255,255);
  desenharTabuleiro();
  let w = width/3;
  let h = width/3; 
  
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      
      let alvo = tabuleiro[j][i];
      let x = i*w+w/2;
      let y = j*h+h/2;
      let xraio = w/4; 
      strokeWeight(4);
      
      if(alvo==jogador1){
        stroke(color('blue'));
        line(x-xraio,y-xraio,x+xraio,y+xraio);
        line(x+xraio,y-xraio,x-xraio,y+xraio);
      }else if(alvo==jogador2){
        stroke(color('green'));
        circle(x,y,xraio);
      }
      
    }
  }
  let resultado =  checarVitoria();
  printResultado(resultado);
  if(vezjogador1){
    //IAJoga();  
    IAJogaMiniMax();
  }
  
}


function mousePressed(){
  if(!vezjogador1){
    //print("x:"+mouseX+" y:"+mouseY);
    let casa = getCasaClique(mouseX,mouseY);
    let indice = checarDisponibilidade(casa);
    if(indice!=-1){
      escreverNoTabuleiro(casa,indice); 
    
    mudarTurno();  
    }
    
  }
  
}
