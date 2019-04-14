// adapted from : https://github.com/aferriss/p5jsShaderExamples/blob/gh-pages/4_image-effects/4-11_bloom/sketch.js
let blurH, blurV, bloom;

// the camera variable

let pg;

// we need three createGraphics layers for our blur algorithm
let pass1, pass2, bloomPass;

function preload() {
    // load the shaders, we will use the same vertex shader and frag shaders for both passes
    blurH = loadShader('base.vert', 'blur.frag');
    blurV = loadShader('base.vert', 'blur.frag');
    bloom = loadShader('base.vert', 'bloom.frag');

}

function setup() {
    // shaders require WEBGL mode to work
    // at present time, there is no WEBGL mode image() function so we will make our createGraphics() in WEBGL, but the canvas renderer will be P2D (the default)
    createCanvas(windowWidth, windowHeight);
    noStroke();



    // initialize the createGraphics layers
    pass1 = createGraphics(windowWidth, windowHeight, WEBGL);
    pass2 = createGraphics(windowWidth, windowHeight, WEBGL);
    bloomPass = createGraphics(windowWidth, windowHeight, WEBGL);

    // turn off the cg layers stroke
    pass1.noStroke();
    pass2.noStroke();
    bloomPass.noStroke();

    pg = createGraphics(windowWidth, windowHeight, WEBGL);
}

function draw() {

    let locX = mouseX - height / 2;
    let locY = mouseY - width / 2;

    pg.ambientLight(60, 60, 60);
    pg.pointLight(255, 255, 255, locX, locY, 100);

    pg.background(0);
    //pg.ambientMaterial(250);
    pg.specularMaterial(250);
    // pg.normalMaterial();
    //pg.strokeWeight(1)
    //pg.stroke(255)
    pg.noStroke()
    pg.rotateX(map(mouseY, 0, windowHeight, -0.05, 0.05));
    pg.rotateY(map(mouseX, 0, windowWidth, 0.05, -0.05));
    pg.fill(50, 50, 255)
    pg.box(250);
    pg.fill(255, 0, 120)
    pg.sphere(160)
    // set the shader for our first pass
    pass1.shader(blurH);

    // send the camera texture to the horizontal blur shader
    // send the size of the texels
    // send the blur direction that we want to use [1.0, 0.0] is horizontal
    blurH.setUniform('tex0', pg);
    blurH.setUniform('texelSize', [1.0 / width, 1.0 / height]);
    blurH.setUniform('direction', [1.0, 0.0]);

    // we need to make sure that we draw the rect inside of pass1
    pass1.rect(0, 0, width, height);

    // set the shader for our second pass
    pass2.shader(blurV);

    // instead of sending the webcam, we will send our first pass to the vertical blur shader
    // texelSize remains the same as above
    // direction changes to [0.0, 1.0] to do a vertical pass
    blurV.setUniform('tex0', pass1);
    blurV.setUniform('texelSize', [1.0 / width, 1.0 / height]);
    blurV.setUniform('direction', [0.0, 1.0]);

    // again, make sure we have some geometry to draw on in our 2nd pass
    pass2.rect(0, 0, width, height);

    // set the bloom shader for the bloom pass
    bloomPass.shader(bloom);

    // send both the camera and the blurred camera to the bloom shader
    bloom.setUniform('tex0', pg);
    bloom.setUniform('tex1', pass2);

    // also send the mouse to control the amount of bloom
    bloom.setUniform('mouseX', .5);

    // we need some geometry for the bloom pass
    bloomPass.rect(0, 0, width, height);

    // draw the second pass to the screen
    image(bloomPass, 0, 0, width, height);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
