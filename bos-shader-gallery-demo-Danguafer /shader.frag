// http://www.pouet.net/prod.php?which=57245
// If you intend to reuse this shader, please add credits to 'Danilo Guanabara'
precision mediump float;
varying vec2 vPos;

uniform float u_time;
uniform float w;
uniform float h;


#define PI 3.14159265359


void main(){
    float t = u_time;
    vec2 u_resolution = vec2(w,h);
    vec2 r = u_resolution;
	vec3 c;
	float l,z=t;
	for(int i=0;i<3;i++) {
		vec2 uv,p=gl_FragCoord.xy/r;
		uv=p;
		p-=.5;
		p.x*=r.x/r.y;
		z+=.07;
        p.x = (2.*sin(p.x*PI*2.));
        p.y = (2.*cos(p.y*PI*2.));
		l=length(p);
		uv+=p/l*(sin(z*.5)+1.)*ceil(sin(l*11.-z*5.));
		c[i]=.025/length((mod(uv,1.)-.5));
	}
	gl_FragColor=vec4(c/l,t);
}