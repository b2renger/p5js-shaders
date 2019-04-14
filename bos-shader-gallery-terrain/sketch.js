// adapted from https://thebookofshaders.com/edit.php?log=161127202429

let terrain;

function preload() {
    // load the shader definitions from files
    terrain = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // use the shader
    shader(terrain);
    noStroke();

    terrain.setUniform('w', windowWidth)
    terrain.setUniform('h', windowHeight)

}

function draw() {
    background(0)
    terrain.setUniform('u_time', sin(millis() / 2000)*1)
    terrain.setUniform('mouseX', map(mouseX, 0, windowWidth, 0, 4))
    terrain.setUniform('mouseY', map(mouseY, 0, windowHeight, 2, 0))
    //mandel.setUniform('gamma', 1.5 * exp(-6.5 * (1 + sin(millis() / 2000))));
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    terrain.setUniform('w', windowWidth)
    terrain.setUniform('h', windowHeight)

}
