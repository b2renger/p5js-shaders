

precision mediump float;



uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926538


// texture position - stroke position - width
float strokeSDF( float x, float s, float w){
    float d = step(s, x + w*.5) - step (s , x - w*.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 col = vec3(.0);

    float w = (sin(u_time ) * 0.5 + 0.49)*0.25;
    float d = 1.0 - step( (1. -strokeSDF((st.y ), .5, w)) * strokeSDF(st.x  , 0.5 , .15 ) , 0.5);
    
    col +=  d;

    gl_FragColor = vec4(col,1.0);
}

