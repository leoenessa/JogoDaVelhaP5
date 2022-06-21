class Cobra{
  
  constructor(){
    this.vetorCobra = createVector(width/2,height/2);  
    this.vetorVelocidade = createVector(0,0);
    this.lado = 20;
    this.andandoX = true;
    this.andandoY = false;
    this.sentidoX = 1;
    this.sentidoY = 1;
  }
  
  desenhar(){
    fill(100,100,100);
    rect(this.vetorCobra.x, this.vetorCobra.y,this.lado);
  }
  
  andar(){
    if(this.andandoX){
      this.vetorVelocidade = createVector((this.lado/5)*this.sentidoX,0);
      this.vetorCobra.add(this.vetorVelocidade);
      
      if(this.vetorCobra.x>width){
        this.vetorCobra.x=0;
      }else if(this.vetorCobra.x<0){
        this.vetorCobra.x = width;
      }
      
    }else if(this.andandoY){
      this.vetorVelocidade = createVector(0,(this.lado/5)*this.sentidoY);
      this.vetorCobra.add(this.vetorVelocidade);
      
      if(this.vetorCobra.y>height){
        this.vetorCobra.y=0;
      }else if(this.vetorCobra.y<0){
        this.vetorCobra.y = height;
      }
    }
  }
  
  movimentar(){
    if(keyIsDown(UP_ARROW)){
      this.andandoX = false;
      this.andandoY = true;
      this.sentidoY = -1;
    }
    if(keyIsDown(DOWN_ARROW)){
      this.andandoX = false;
      this.AndandoY = true;
      this.sentidoY = 1;
    }
    if(keyIsDown(LEFT_ARROW)){
      this.andandoX = true;
      this.AndandoY = false;
      this.sentidoX = -1;
    }
    if(keyIsDown(RIGHT_ARROW)){
      this.andandoX = true;
      this.AndandoY = false;
      this.sentidoX = 1;
    }
  }
}

function setup() {
  createCanvas(600, 600);
  cobra = new Cobra();
}

function draw() {
  background(220);
  cobra.desenhar();
  cobra.movimentar();
  cobra.andar();
  
}