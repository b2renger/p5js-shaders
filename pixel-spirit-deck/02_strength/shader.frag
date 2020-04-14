// Author: Inigo Quiles
// Title: Expo


precision mediump float;



uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926538

void main() {


   
    vec2 st = gl_FragCoord.xy/u_resolution.xy;


    vec3 col = vec3(.0);
    
    col += step(0.5+ cos(st.y* PI + u_time) *0.25, st.x  ) ;

    gl_FragColor = vec4(col,1.0);
}
