

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926538


// texture position - stroke position - width
float stroke (float x, float s, float w){
    float d = step(s, x + w*.5) - step (s , x - w*.5);
    return clamp(d, 0.0, 1.0);
}

float circleSDF(vec2 p, float r){
    return length(p) - r;
}

float fill(float x, float size){
    return 1. - step(size,x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 p = -1.0 + 2.0 * st;
    p.x *= u_resolution.x/u_resolution.y;

    vec3 col = vec3(.0);

    float d = fill(circleSDF(p , 0.2), .65);
    col +=  d;

    float t = mod(u_time*0.5 , PI);
    float w1 = -cos(t);
    float w2 = sin(t * PI) + 1.;

    vec2 offset = vec2(2. *w1, .5 *w2);

    col -= fill(circleSDF(p - offset , 0.17), .65);
    
    gl_FragColor = vec4(col, 1.0);
}

