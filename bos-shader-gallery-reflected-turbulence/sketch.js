//https://thebookofshaders.com/edit.php?log=161127201905

let turbulence;

function preload() {
    // load the shader definitions from files
    turbulence = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // use the shader
    shader(turbulence);
    noStroke();
    turbulence.setUniform('u_time', random(10))
    turbulence.setUniform('w', windowWidth)
    turbulence.setUniform('h', windowHeight)

}

function draw() {
    background(0)

    turbulence.setUniform('mouseX', 0.1+ mouseX/windowWidth)
    turbulence.setUniform('mouseY', 0.1+ mouseY/windowHeight)

    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function mouseReleased(){
    turbulence.setUniform('u_time',random(10))
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    turbulence.setUniform('w', windowWidth)
    turbulence.setUniform('h', windowHeight)

}
