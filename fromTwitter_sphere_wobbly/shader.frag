
//https://www.twitch.tv/videos/579385836
precision mediump float;



uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926538

float map(vec3 p) {
    vec3 q = p;
    float rad = 5. + (sin(q.x*4.*(u_mouse.x*2. -1.) + u_time*1.5)  *
      cos(q.y*(u_mouse.y*2. -1.)*4. + u_time*1.2) * sin(q.z*1. + u_time*.53) )*0.35 ;

    float d = length(p)-rad;
    d = min(d, -p.y + 5.95);
  return d;
}

float sss(vec3 p, vec3 l, float d) {
  return smoothstep(0.,1.,map(p+l*d)/d);
}


void main(){
   vec2 uv = vec2(gl_FragCoord.x / u_resolution.x, gl_FragCoord.y / u_resolution.y);
    uv -= 0.5;
    uv /= vec2(u_resolution.y / u_resolution.x, 1);

    vec3 s = vec3(0., -10., -20);
    vec3 t = vec3(0);
    vec3 cz = normalize(t-s);
    vec3 cx = normalize(cross(cz, vec3(.0,1.,0.)));
    vec3 cy = normalize(cross(cz, cx));
    float fov = 1.0;
    vec3 r=normalize(cx*uv.x + cy*uv.y + fov*cz);

    vec3 p=s;

    for(int i=0; i<100; ++i) {
        float d=map(p);
        if(d<0.001) break;
       
        p+=r*d;
    }
    
      
     vec3 l=normalize(-vec3(1,1.3,2));

     float sub = sss(p,l, 0.5);
     float fog = 1. - clamp(length(p-s) / 200., 0.0, 1.)*2.5;

     vec3 col = vec3(0.);
     col += sub * vec3(1., 0.28, 0.3);
     col += fog;
     gl_FragColor = vec4(col, 1.);
  
}