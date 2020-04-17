

precision mediump float;



uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926538

void main() {


   
    vec2 st = gl_FragCoord.xy/u_resolution.xy;


    vec3 col = vec3(.0);

    float dev = (sin(u_time)*0.5 + 0.5) *0.4;
    
    col += step(0.5, -dev *0.5 + st.x*0.5 + st.y*(0.5 + dev)  ) ;

    gl_FragColor = vec4(col,1.0);
}
