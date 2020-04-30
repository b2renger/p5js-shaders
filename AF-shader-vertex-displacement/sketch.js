// based on https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/6_3d/6-3_vertexDisplacementFromTexture
let myShader;
let plan; // 3D object

// source inputs
let cam;
let img;
// deform input
let mic;

// gui
let menu

let params = {
  "amp": 50,
  "movement_type": 0,
  "source": 0
}

function preload() {
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  myShader = loadShader("shader.vert", "shader.frag");
  img = loadImage("StyleGAN_landscape.jpeg");
  plan = loadModel('bplane7.obj', function () {
    console.log("obj loaded")
  }, function () {});

}

function setup() {
  // shaders require WEBGL mode to work
  let c = createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();


  menu = QuickSettings.create(0, 0, 'Options')
  menu.addHTML("Info ", "<p>You can drag and drop an image of your choice on the canvas.</p>");
  menu.addRange("amplitude", 0, 300, params.amp, 1, function (v) {
    params.amp = v
  })
  menu.addDropDown("movement type", ["noise", "sinus", "audio"], function (v) {
    params.movement_type = v.index ;
    if (v.index == 2){
    mic = new p5.AudioIn();
    mic.start();
    }
  })
  menu.addDropDown("source input", ["image", "webcam"], function (v) {
    params.source = v.index;
  })
 
  c.drop(gotFile);

  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();


}

function draw() {



  background(0);
  orbitControl()
  scale(3)
  shader(myShader);

  myShader.setUniform("amp", params.amp);
  // Send the frameCount to the shader
  if (params.movement_type == 0) {
    myShader.setUniform("uFrameCount", noise(frameCount / 100.));
  } else if (params.movement_type == 1) {
    myShader.setUniform("uFrameCount", sin(frameCount / 100.));
  } else if (params.movement_type == 2) {
    // Get the overall volume (between 0 and 1.0)
    let vol = mic.getLevel();
    console.log(vol)
    myShader.setUniform("uFrameCount", vol * 100.);
  }

  if (params.source == 0) {
    myShader.setUniform("uNoiseTexture", img);
  } else if (params.source == 1) {
    myShader.setUniform("uNoiseTexture", cam);
  }



  strokeWeight(1)
  // Draw some geometry to the screen

  rotateZ(PI)
  rotateX(-PI * 0.75)
  model(plan);


}

function gotFile(file){
  img = createImg(file.data, '').hide();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}