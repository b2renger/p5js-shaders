// Author: Inigo Quiles
// Title: Expo


precision mediump float;
varying vec2 vPos;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float hash( float n )
{
    return fract(sin(n)*43558.5453);
}

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = p.x + p.y*57.0;

    return mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
               mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
}




void main() {

   
    vec2 st = gl_FragCoord.xy/u_resolution;

    //float y = step(0.5 +  noise (vec2(u_time*0.8, 0)), st.x);
   
    // for a more "bendy" justice
    float y = step(0.5 +  noise (vec2(u_time*0.1, st.y*1.)), st.x);
    //float y = step(0.5 +  noise (vec2(u_time*0.1, st.y*100.)), st.x);


    vec3 color = vec3(y);

    gl_FragColor = vec4(color,1.0);
}
