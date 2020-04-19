

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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 col = vec3(.0);

    
    float d = stroke( st.x , 0.3 +cos(st.y*PI + u_time*1.44 )*0.15 ,  0.051);
    col +=  d;

    d = stroke( st.x , 0.5 +cos(st.y*PI + u_time)*0.15 ,  0.051);
    col +=  d;

    d = stroke( st.x , 0.7 +cos(st.y*PI + u_time*0.72)*0.15  ,  0.051);
    col +=  d;

    gl_FragColor = vec4(col,1.0);
}

