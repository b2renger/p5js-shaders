// https://thebookofshaders.com/05

let lingradiant;

function preload() {
    // load the shader definitions from files
    lingradiant = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // use the shader
    shader(lingradiant);
    noStroke();

    lingradiant.setUniform('w', windowWidth)
    lingradiant.setUniform('h', windowHeight)

}

function draw() {
    background(0)
    //mandel.setUniform('gamma', 1.5 * exp(-6.5 * (1 + sin(millis() / 2000))));
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    lingradiant.setUniform('w', windowWidth)
    lingradiant.setUniform('h', windowHeight)

}
