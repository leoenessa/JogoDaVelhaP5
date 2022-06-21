let tabuleiro = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];

let jogador1 = -1;
let jogador2 = 1;
let vezjogador1 = true;
let casasDisponiveis = []; 

function escreverNoTabuleiro(casa,indice){
  if(indice!=-1){
    casasDisponiveis.splice(indice,1);
    let jogadorDaVez = vezjogador1 ? jogador1 : jogador2;
    tabuleiro[casa[0]][casa[1]] = jogadorDaVez;
    vezjogador1 = !vezjogador1;  
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
        //jogador2 ganhou
        noLoop();
        print("Jogador 2 ganhou!");
      }else if(soma==-3){
        //jogador 1 ganhou
        noLoop();
        print("Jogador 1 ganhou!");
      }else{
        soma=0;
      }
    }
  
  
  //vertical
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        soma+=tabuleiro[j][i];
      }
      if(soma==3){
        //jogador2 ganhou
        noLoop();
        print("Jogador 2 ganhou!");
      }else if(soma==-3){
        //jogador 1 ganhou
        noLoop();
        print("Jogador 1 ganhou!");
      }else{
        soma=0;
      }
    }
  
//   //diagonal
//     for(let i=0;i<3;i++){
//       for(let j=0;j<3;j++){
//         if(i==j){
//           soma+=tabuleiro[i][j];  
//         }
//       }
//     }
//     if(soma==3){
//       //jogador2 ganhou
//         noLoop();
//         print("Jogador 2 ganhou!");
//     }else if(soma==-3){
//       //jogador1 ganhou
//         noLoop();
//         print("Jogador 1 ganhou!");
//     }else{
//       soma=0;
//       if(casasDisponiveis.length=0){
        
//         soma+=tabuleiro[0][2];
//         soma+=tabuleiro[1][1];  
//         soma+=tabuleiro[2][0];

//         if(soma==3){
//           //jogador2 ganhou
//             noLoop();
//             print("Jogador 2 ganhou!");
//         }else if(soma==-3){
//           //jogador1 ganhou
//             noLoop();
//             print("Jogador 1 ganhou!");
//         }else{
//           //empatou
//           noLoop();
//           print("Empatou!");
//         }
//         }
//     }
    
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
      if(tabuleiro[j][i]==0){
        casasDisponiveis.push([j,i]);
      }
    }
  }
}

function checarDisponibilidade(casa){
  
  for(let i=0;i<casasDisponiveis.length;i++){ 
    //print("Casa:"+casa+" Checando:"+casasDisponiveis[i]);
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
}


function mousePressed(){
  print("x:"+mouseX+" y:"+mouseY);
  let casa = getCasaClique(mouseX,mouseY);
  let indice = checarDisponibilidade(casa);
  print(indice);
  escreverNoTabuleiro(casa,indice);
  checarVitoria();
  
}
