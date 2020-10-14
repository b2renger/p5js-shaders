// a shader variable
let mask;

let source1, source2, source3;
let drawing;
let drawingColor ;


function preload() {
  mask = loadShader('mask.vert', 'mask.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  source1 = createGraphics(width*0.5, height*0.5, WEBGL);
  source2 = createGraphics(width*0.5, height*0.5, WEBGL);
  source3 = createGraphics(width*0.5, height*0.5, WEBGL);
  drawing = createGraphics(width, height, WEBGL);

  drawingColor = color(255,0,0);

  source1.background(0,0,255)
  source1.noStroke()     
  source1.fill(255, 0, 255)
  source1.ellipse(0, 0, height * 0.4, height * 0.4)

  source2.background(0,255,255)
  source2.noStroke()     
  source2.fill(0, 0, 255)
  source2.ellipse(0, 0, height * 0.2, height * 0.2)

  source3.background(255,0,255)
  source3.noStroke()     
  source3.fill(255, 255, 0)
  source3.ellipse(0, 0, height * 0.3, height * 0.3)


}

function draw() {
  background(0);



  drawing.noStroke()
  drawing.noSmooth()
  drawing.fill(drawingColor)
  drawing.ellipse(mouseX - width * 0.5, mouseY - height * 0.5, 50, 50)


  mask.setUniform("source1", source1);
  mask.setUniform("source2", source2);
  mask.setUniform("source3", source3);
  mask.setUniform("drawing", drawing);

  shader(mask);
  // Draw the output of the shader onto a rectangle that covers the whole viewport
  // fill(0)
  rect(-width * 0.5, -height * 0.5, width, height);
  // Call resetShader() so that further geometry remains unaffected by the shader
  resetShader();



}

function keyPressed() {
  if (key == '1') drawingColor = color(255,0,0)
  if (key == '2') drawingColor = color(0,255,0)
  if (key == '3') drawingColor = color(0,0,255)


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}


