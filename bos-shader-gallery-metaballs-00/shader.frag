// based on : https://thebookofshaders.com/edit.php?log=160414040804
// Author @kynd - 2016
// Title: Distance field metaball
// http://www.kynd.info

#ifdef GL_ES
precision mediump float;
#endif

uniform float w;
uniform float h;
uniform float mouseX;
uniform float mouseY;

uniform float u_time;

float smoothen(float d1, float d2) {
    float k = mouseX;
    return -log(exp(-k * d1) + exp(-k * d2)) / k;
}

void main() {
    vec2 u_resolution = vec2(w,h);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 p0 = vec2(sin(u_time) + 1., cos(3.0*u_time) + 1. + 0.);
    vec2 p1 = vec2(-cos(u_time)*sin(2.*u_time) + 1., 1.);
    vec2 p2 = vec2(1. , -cos(u_time) * 1. + 1.);
    vec2 p3 = vec2(cos(sin(2.*u_time)) + 0. , cos(u_time)*sin(3.*u_time) * 1. + 1.);
    float d = smoothen(distance(st, p0) * 15., distance(st, p1) * 15.);
    float d2 = smoothen(distance(st, p0) * 15.0, distance(st, p2) * 15.);
    float d3 = smoothen(distance(st, p1) * 15.0, distance(st, p2) * 15.);
    float d4 = smoothen(distance(st, p3) * 15.0, distance(st, p2) * 15.);
    float d5 = smoothen(distance(st, p0) * 15.0, distance(st, p3) * 15.);
    float d6 = smoothen(distance(st, p1) * 15.0, distance(st, p3) * 15.);
	float ae = 1. / u_resolution.y;
    vec3 color = vec3(smoothstep(mouseY, 0.520+ae, d));
    vec3 color2 = vec3(smoothstep(mouseY, 0.520+ae, d2));
    vec3 color3 = vec3(smoothstep(mouseY, 0.520+ae, d3));
    vec3 color4 = vec3(smoothstep(mouseY, 0.520+ae, d4));
    vec3 color5 = vec3(smoothstep(mouseY, 0.520+ae, d5));
    vec3 color6 = vec3(smoothstep(mouseY, 0.520+ae, d6));
    gl_FragColor = vec4(color+color2+ color3 + color4 + color5 + color6, 1.0);
}
