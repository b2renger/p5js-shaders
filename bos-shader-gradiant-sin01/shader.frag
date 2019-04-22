// Author: Inigo Quiles
// Title: Expo


precision mediump float;
varying vec2 vPos;

#define PI 3.14159265359

uniform float w;
uniform float h;
uniform float mouseX;
uniform float mouseY;
uniform float u_time;

float plot(vec2 st, float pct){
    float w = sin(u_time*PI)*.3+.6;
  return  smoothstep( pct- w, pct, st.y) -
          smoothstep( pct, pct+w, st.y);
}

void main() {
    vec2 u_resolution = vec2(w,h);
    vec2 st = gl_FragCoord.xy/u_resolution;


    float y = fract((sin(st.x*8.*PI + mouseX*st.x*150.)*.5)) ;


    vec3 color = vec3(y*.8, y*.1, y*1.);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.7,.7,0.9);

    gl_FragColor = vec4(color,1.0);
}
