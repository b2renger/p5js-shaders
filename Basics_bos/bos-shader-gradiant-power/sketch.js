// https://thebookofshaders.com/05

let gradiant;

function preload() {
    // load the shader definitions from files
    gradiant = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // use the shader
    shader(gradiant);
    noStroke();
    //gradiant.setUniform('w', windowWidth)
    gradiant.setUniform('w', windowWidth)
    gradiant.setUniform('h', windowHeight)


}

function draw() {
    background(0)
    gradiant.setUniform('mouseX', mouseX / windowWidth)
    rect(0, 0, windowWidth, windowHeight)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    gradiant.setUniform('w', windowWidth)
    gradiant.setUniform('h', windowHeight)
}
