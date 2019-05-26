let colors;
function preload() {
  // load the shader definitions from files
  colors = loadShader('shader.vert', 'shader.frag');
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // use the shader
  shader(colors);
  noStroke();
    colors.setUniform('u_resolution', [windowWidth, windowHeight])

}

function draw() {
  colors.setUniform('u_mouse',[mouseX,mouseY]);
  colors.setUniform('u_time',millis()/1000);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
}
