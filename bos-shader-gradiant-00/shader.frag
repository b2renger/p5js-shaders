precision highp float;
varying vec2 vPos;
uniform float w;
uniform float h;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}


void main() {
  vec2 res = vec2(w ,h);
  vec2 st = gl_FragCoord.xy/res;

    float y = st.x;

    vec3 color = vec3(y);

    // Plot a line
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  gl_FragColor = vec4(color,1.0);
}

