// adapted from https://thebookofshaders.com/edit.php?log=160414040804
let meta;

function preload() {
    // load the shader definitions from files
    meta = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // use the shader
    shader(meta);
    noStroke();

    meta.setUniform('w', windowWidth)
    meta.setUniform('h', windowHeight)

}

function draw() {
    background(0)
    meta.setUniform('u_time',   (millis() / 1000)*1)
    meta.setUniform('mouseX', map(mouseX, 0, windowWidth, 0.1, 0.5))
    meta.setUniform('mouseY', map(mouseY, 0, windowHeight, 10., 0.81))
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    meta.setUniform('w', windowWidth)
    meta.setUniform('h', windowHeight)

}
