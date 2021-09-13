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

  top_pg = createGraphics(128, 128, WEBGL);
  low_pg = createGraphics(512, 512, WEBGL);



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
  background(0);

  top_pg.background(0)
  // top_pg.fill(255, 255,0)
  top_pg.stroke(255)
  //top_pg.ellipse(0, 0, 256 * 0.4, 256 * 0.4)
  for (let i = -top_pg.width * .5; i < top_pg.width * 0.5; i += 2) {
    //top_pg.strokeWeight(map(i, -top_pg.width * .5, top_pg.width * .5, 10, 0.5))
    top_pg.line(i, -top_pg.height * .5, i, top_pg.height * .5)
  }

  low_pg.background(0)
  
  low_pg.noFill()
  //for (let i = -low_pg.width * .5; i < low_pg.width * .5; i += 4) {

    for (let j = low_pg.width; j > 0; j -= 25) {
      low_pg.stroke(map(j, low_pg.width, 0, 0, 255),255,0)
      low_pg.strokeWeight(map(j, low_pg.width, 0, 10, 0.15))
      let rad = (j * abs(sin( + millis()/ 1000) + 1) /2 + 50 )* map(mouseX, 0, width, 1, 0.7)
      low_pg.ellipse(0, 0, rad, rad)
    }
    //low_pg.line(map(mouseX, 0, width, -low_pg.width*0.5, low_pg.width*.5),map(mouseY, 0, height, -low_pg.height*.5, low_pg.height*.5),i,low_pg.height*.5)
  //}

  //low_pg.fill(255, 255, 0)
  //low_pg.noStroke()
  //low_pg.ellipse(mouseX - width * 0.5, mouseY - height * 0.5, 50, 50)


  blendOpacity = constrain(blendOpacity, 0, 1.5);
  blends.setUniform("blendAlpha", 1);
  blends.setUniform("blendMode", 17);
  blends.setUniform("topLayer", top_pg);
  blends.setUniform("lowLayer", low_pg);

  shader(blends);
  // Draw the output of the shader onto a rectangle that covers the whole viewport
  // fill(0)
  //rect(width * 0.5, height * 0.5, width, height);
  rect(0, 0, width, height)
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

function windowResized() {
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