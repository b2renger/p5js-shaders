
//https://twitter.com/NuSan_fx/status/1250801601419382784
precision mediump float;



uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926538

void main(){
    vec2 p=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y*1.75;
    vec2 w=p;

    for(float i=4.;i<15.;++i){
        w.xy+=sin(sin(w.yx*vec2(72./i,2)+u_time*3./i+i)*2.5+u_time*1.5/i)*vec2(.04,.03);
    }
    float g=abs(w.y + 0.45   )*.15-.0011; // white wave
    
    // wavy reflection
    
    if(p.y< -.25) {
        p=w;
        p.y-=sign(p.y)*.49;
    }

    gl_FragColor= 1. - vec4(.9,.9,.92,1)*(1.-max(sin(u_time) * 0.03 + 0.06,length(p)-.55));
   // gl_FragColor=vec4(.013,.1,.12,1)*g/max(.01,length(p)-.35);
        
}
