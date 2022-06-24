function IAJogaMiniMax(){
  let qtdecasasvazias=0;
  
  let bestScore = -1000;
  let move = {};
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if(tabuleiro[i][j]==''){
        qtdecasasvazias++;
        tabuleiro[i][j]=jogador1;
        
        let score = minimax(tabuleiro,0,false);
        tabuleiro[i][j]='';
        
        print('Casa:'+i+" "+j+" Score:"+score);
        if(score>bestScore){
          bestScore = score;
          move = {i,j};
        }
      }      
    }
  }
  print("BestScore Geral:"+bestScore+"\n["+move.i+"],["+move.j+"]:");
  let casaTemp = [];
  casaTemp[0]  =move.i;
  casaTemp[1]  =move.j;
  indiceCasaTemp = checarDisponibilidade(casaTemp);
  escreverNoTabuleiro(casaTemp,indiceCasaTemp);
  print("Qtde casas vazias:"+qtdecasasvazias);
  //tabuleiro[move.i][move.j]=jogador1;  
  mudarTurno();
}


function minimax(tabuleiro, depth, isMaximizing){
  let resultado = checarVitoria();
  if(resultado!=null){
    
    //print("RETORNANDO: "+resultado*10);
    return resultado*10;
  }
  //print("Resultado checarvitoria:"+resultado);
  //////////////////
  
  if(isMaximizing){
    let bestScore = -1000;
    
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(tabuleiro[i][j]==''){
          tabuleiro[i][j]=jogador1;
          let score = minimax(tabuleiro,depth+1,false);
          tabuleiro[i][j]='';
          bestScore = max(score,bestScore);
        }        
      }
    }
    
    return bestScore;
  }else{
    let bestScore = 1000;
    
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(tabuleiro[i][j]==''){
          tabuleiro[i][j]=jogador2;
          let score = minimax(tabuleiro,depth+1,true);
          tabuleiro[i][j]='';
          //print("Interno score:"+score+" BEST:"+bestScore);
          bestScore = min(score,bestScore);
        }        
      }
    }
    
    return bestScore;
  }
  
}