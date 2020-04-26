
//https://twitter.com/kasari39/status/1250327370084397062
precision mediump float;



uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926538

vec4 r,c,p,s;
float z,d,u,v;

void main(){
    r=gl_FragCoord/8e2-.75;
    c.z-=u_time*2.;
    for(int i=0;i<11;i++){
        p=c+r*z;
        u=u_mouse.x *.75  + 0.25;
        v=u_mouse.y *.5 ; 

        d=p.y+5.;
        d+= sin(p.z*(u/=1.56)+cos(p.x*u+sin(p.z*v*PI*.25)));
        d+= sin(p.z*(u/=1.56)+cos(p.x*u+sin(p.z*v*PI*0.33)));
        d+= sin(p.z*(u/=1.56)+cos(p.x*u+sin(p.z*v)));
        s+=d*10.2;
        z+=d*1.95;
    }
    gl_FragColor=s/10e2*vec4(z*0.3,z*0.2, .15,1e2);
}