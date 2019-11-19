// a shader variable
let blends;
let blendOpacity = 1;
// two Pgraphics objects to be blended
let top_pg, low_pg;
let blendType = 17;


function preload() {
  blends = loadShader('blends.vert', 'blends.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  top_pg = createGraphics(width, height, WEBGL);
  low_pg = createGraphics(width, height, WEBGL);



  blends.setUniform("sketchSize", float(width), float(height));
  // Pass the images to the shader
  blends.setUniform("topLayer", top_pg);
  blends.setUniform("lowLayer", low_pg);

  // Pass the resolution of the images to the shader
  blends.setUniform("topLayerResolution", float(width), float(height));
  blends.setUniform("lowLayerResolution", float(width), float(height));
  // You can set the blend mode using the name directly
  blends.setUniform("blendMode", BL_MULTIPLY); // LIGHTERCOLOR
}

function draw() {
  background(220);

  top_pg.background(0)
  top_pg.fill(255, 0, 255)
  top_pg.ellipse(0, 0, height * 0.4, height * 0.4)

  low_pg.background(0)
  low_pg.fill(255, 255, 0)
  low_pg.ellipse(mouseX - width * 0.5, mouseY - height * 0.5, 50, 50)


  blendOpacity = constrain(blendOpacity, 0, 1.5);
  blends.setUniform("blendAlpha", blendOpacity);
  blends.setUniform("blendMode", blendType);
  blends.setUniform("topLayer", top_pg);
  blends.setUniform("lowLayer", low_pg);

  shader(blends);
  // Draw the output of the shader onto a rectangle that covers the whole viewport
  // fill(0)
  rect(-width * 0.5, -height * 0.5, width, height);
  // Call resetShader() so that further geometry remains unaffected by the shader
  resetShader();



}

function keyPressed() {

  if (key == 'a') {
    blendType -= 1
  }
  if (key == 'z') {
    blendType += 1
  }
  blendType = constrain(blendType, 0, 24)
  console.log(blendType);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}




const BL_DARKEN = 0;
const BL_MULTIPLY = 1;

const BL_COLORBURN = 2;
const BL_LINEARBURN = 3;
const BL_DARKERCOLOR = 4;

const BL_LIGHTEN = 5;
const BL_SCREEN = 6;
const BL_COLORDODGE = 7;
const BL_LINEARDODGE = 8;
const BL_LIGHTERCOLOR = 9;

const BL_OVERLAY = 10;
const BL_SOFTLIGHT = 11;
const BL_HARDLIGHT = 12;
const BL_VIVIDLIGHT = 13;
const BL_LINEARLIGHT = 14;
const BL_PINLIGHT = 15;
const BL_HARDMIX = 16;

const BL_DIFFERENCE = 17;
const BL_EXCLUSION = 18;
const BL_SUBSTRACT = 19;
const BL_DIVIDE = 20;

const BL_HUE = 21;
const BL_COLOR = 22;
const BL_SATURATION = 23;
const BL_LUMINOSITY = 24;