// adapted from https://thebookofshaders.com/edit.php#12/metaballs.frag

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
    meta.setUniform('u_time',   (millis() / 2000)*1)
    meta.setUniform('mouseX', map(mouseX, 0, windowWidth, 0.1, 50))
    meta.setUniform('mouseY', map(mouseY, 0, windowHeight, 1, 0.1))
    //mandel.setUniform('gamma', 1.5 * exp(-6.5 * (1 + sin(millis() / 2000))));
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    meta.setUniform('w', windowWidth)
    meta.setUniform('h', windowHeight)

}
