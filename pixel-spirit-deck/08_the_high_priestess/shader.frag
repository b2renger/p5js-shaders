

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926538


// texture position - stroke position - width
float stroke( float x, float s, float w){
    float d = step(s, x + w*.5) - step (s , x - w*.5);
    return clamp(d, 0.0, 1.0);
}

float circleSDF(vec2 p, float r){
    return length(p) - r;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 p = -1.0 + 2.0 * st;
    p.x *= u_resolution.x/u_resolution.y;

    vec3 col = vec3(.0);

   
    float w =  (sin(u_time*.66)*.025);


    float rad =  (sin(p.x*w*10000. + u_time*1.5)*cos(p.y*w*1102. + u_time*1.2) )*.015 + w;

    float d = stroke(circleSDF(p ,  .025), .5, rad + 0.01);
    col +=  d;

    
    gl_FragColor = vec4(col, 1.0);
}

