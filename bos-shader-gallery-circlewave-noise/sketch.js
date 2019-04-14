// adapted from https://thebookofshaders.com/edit.php#11/circleWave-noise.frag

let circleWave;

function preload() {
    // load the shader definitions from files
    circleWave = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // use the shader
    shader(circleWave);
    noStroke();

    circleWave.setUniform('w', windowWidth)
    circleWave.setUniform('h', windowHeight)

}

function draw() {
    background(0)
    circleWave.setUniform('u_time', (millis() / 1000)*1)
    circleWave.setUniform('mouseX', map(mouseX, 0, windowWidth, 0, 1))
    circleWave.setUniform('mouseY', map(mouseY, 0, windowHeight, 0, 1))

    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    circleWave.setUniform('w', windowWidth)
    circleWave.setUniform('h', windowHeight)

}
