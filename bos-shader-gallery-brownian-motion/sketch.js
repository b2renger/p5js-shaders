//https://thebookofshaders.com/13/?lan=fr

let brownian;

function preload() {
    // load the shader definitions from files
    brownian = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // use the shader
    shader(brownian);
    noStroke();

    brownian.setUniform('w', windowWidth)
    brownian.setUniform('h', windowHeight)

}

function draw() {
    background(0)
    brownian.setUniform('u_time', millis()/ 1000)
    //mandel.setUniform('gamma', 1.5 * exp(-6.5 * (1 + sin(millis() / 2000))));
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    brownian.setUniform('w', windowWidth)
    brownian.setUniform('h', windowHeight)

}
