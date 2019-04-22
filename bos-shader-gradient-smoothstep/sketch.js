// https://thebookofshaders.com/05

let gradiant;

function preload() {
    // load the shader definitions from files
    gradiant = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1)
    // use the shader
    shader(gradiant);
    noStroke();
    //gradiant.setUniform('w', windowWidth)
    gradiant.setUniform('w', windowWidth)
    gradiant.setUniform('h', windowHeight)


}

function draw() {
    background(0)
    gradiant.setUniform('u_time', sin(millis()/2000)*.09)
    gradiant.setUniform('mouseX', mouseX / windowWidth)
    gradiant.setUniform('mouseY', mouseY / windowHeight)
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    gradiant.setUniform('w', windowWidth)
    gradiant.setUniform('h', windowHeight)
}
