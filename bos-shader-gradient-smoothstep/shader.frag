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
   // float w = u_time;
    float w = .01;
  return  smoothstep( pct-w, pct, st.y) -
          smoothstep( pct, pct+w, st.y);
}

void main() {

    vec2 u_resolution = vec2(w,h);
    vec2 st = gl_FragCoord.xy/u_resolution;

   // float y = smoothstep(mouseX, mouseY, st.x);
   float y =smoothstep(mouseX*.5,0.5,st.x) - smoothstep(0.5,mouseY*.5+.5,st.x);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.8,.5,1.0);

    gl_FragColor = vec4(color,1.0);
}
