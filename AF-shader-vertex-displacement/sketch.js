// based on https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/6_3d/6-3_vertexDisplacementFromTexture
let myShader;
let noise;
let plan;
let cam;

function preload() {
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  myShader = loadShader("shader.vert", "shader.frag");
  noise = loadImage("StyleGAN_landscape.jpeg");
  plan = loadModel('bplane7.obj', function () {
    console.log("obj loaded")
  }, function () {});

}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  //noise.resize(100, 100)

  cam = createCapture(VIDEO);
  cam.size(640, 480);

  cam.hide();
}

function draw() {

  background(0);
  orbitControl()
  scale(3)
  shader(myShader);
  // Send the frameCount to the shader
  myShader.setUniform("uFrameCount", frameCount / 100.);
  myShader.setUniform("uNoiseTexture", noise);
  strokeWeight(1)
  // Draw some geometry to the screen




  rotateZ(PI)
  rotateX(-PI * 0.75)
  model(plan);


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}