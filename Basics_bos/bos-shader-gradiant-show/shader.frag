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
    float w =.1;
  return  smoothstep( pct- w, pct, st.y) -
          smoothstep( pct, pct+w, st.y);
}

void main() {
    vec2 u_resolution = vec2(w,h);
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = 0.0;

    if (int(mod(u_time , 10.))== 0){
        y = mod(st.x,0.5); // return x modulo of 0.5
    }
    else if (int(mod(u_time , 10.))== 1){
        y = fract(st.x); // return only the fraction part of a number
    }
    else if (int(mod(u_time , 10.))== 2){
        y = ceil(st.x);  // nearest integer that is greater than or equal to x
    }
    else if (int(mod(u_time , 10.))== 3){
        y = floor(st.x); // nearest integer less than or equal to x
    }
    else if (int(mod(u_time , 10.))== 4){
        y = sign(st.x);  // extract the sign of x
    }
    else if (int(mod(u_time , 10.))== 5){
        y = abs(st.x);   // return the absolute value of x
    }
    else if (int(mod(u_time , 10.))== 6){
        y = clamp(st.x,0.0,1.0); // constrain x to lie between 0.0 and 1.0
    }
    else if (int(mod(u_time , 10.))== 7){
        y = min(0.0,st.x);   // return the lesser of x and 0.0
    }
    else if (int(mod(u_time , 10.))== 8){
        y = max(0.0,st.x);   // return the greater of x and 0.0
    }

    vec3 color = vec3(y*.8, y*.1, y*1.);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.7,.7,0.9);

    gl_FragColor = vec4(color,1.0);
}
