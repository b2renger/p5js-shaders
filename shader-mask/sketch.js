// a shader variable
let mask;
// two Pgraphics objects to be blended
let top_pg, low_pg;


function preload() {
  mask = loadShader('mask.vert', 'mask.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  top_pg = createGraphics(512, 512, WEBGL);
  low_pg = createGraphics(width, height, WEBGL);



}

function draw() {
  background(220);

  top_pg.background(0,0,255)
  top_pg.noSmooth()
  top_pg.noStroke()     
  top_pg.fill(255, 0, 255)
  top_pg.ellipse(0, 0, top_pg.height * 0.4,top_pg. height * 0.4)

  low_pg.noStroke()
  low_pg.noSmooth()
  low_pg.fill(255)
  low_pg.ellipse(mouseX - width * 0.5, mouseY - height * 0.5, 50, 50)


  mask.setUniform("topLayer", top_pg);
  mask.setUniform("lowLayer", low_pg);

  shader(mask);
  // Draw the output of the shader onto a rectangle that covers the whole viewport
  // fill(0)
  rect(-width * 0.5, -height * 0.5, width, height);
  // Call resetShader() so that further geometry remains unaffected by the shader
  resetShader();



}

function keyPressed() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}


