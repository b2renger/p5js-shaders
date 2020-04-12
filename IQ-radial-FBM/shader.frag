//https://www.shadertoy.com/view/lsfGRr

precision highp float;
varying vec2 vPos;
uniform float w;
uniform float h;
uniform float u_time;
uniform vec2 u_mouse;


const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float hash( float n )
{
    return fract(sin(n)*43758.5453);
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

float fbm( vec2 p )
{
    float f = 0.0;

    f += 0.50000*noise( p ); p = m*p*2.02;
    f += 0.25000*noise( p ); p = m*p*2.03;
    f += 0.12500*noise( p ); p = m*p*2.01;
    f += 0.06250*noise( p ); p = m*p*2.04;
    f += 0.03125*noise( p );

    return f/0.984375;
}

float length2( vec2 p )
{
    vec2 q = p*p*p*p;
    return pow( q.x + q.y, 1.0/4.0 );
}


void main() {
    vec2 u_resolution = vec2(w,h);
   
   
    vec2 q = gl_FragCoord.xy/u_resolution.xy*.5;
    vec2 p = -1.0 + 2.0 * q;
    p.x *= u_resolution.x/u_resolution.y;

   


    float r = length( p * 0.75);
    float a = atan( p.y, p.x );

    

    vec3 col = vec3(0.64,0.25,0 );

    float f = fbm( 7.0*p );
    col = mix( col, vec3(0.83,0.53,0.21), f );

    float n = noise(vec2(cos(a)+ u_time*0.04, sin(a)  + u_time*0.025 ))*( length(u_mouse.x))*30.;
    a += n *fbm( p  );

    
    // white artefacts
    f = smoothstep( 0.3, 1.0, fbm( vec2(cos(a)*7.12345,6.28318*r) ) );
    col = mix( col, vec3(1.0,.9,.17), f );

    // black artefacts
    f = smoothstep( 0.4, 0.9, fbm( vec2(cos(a)*3.123, r) ) );
    col *= 1.0-0.5*f;

     col *= 1.0-0.25*smoothstep( 0.6,0.8,r );

    // reflection (size1 / size2)
    f = 1.0-smoothstep( 0.1, 0.8, length2( mat2(0.6,0.8,-0.8,0.6)*(p-vec2(0.0,0.05) )*vec2(1.50,1.0)) );
    col += vec3(1.0,0.9,0.9)*f*0.815;

    //col *= vec3(0.8+0.2*cos(r*a));

    f = 1.0-smoothstep( 0.2, 0.25, r );
    //col = mix( col, vec3(0.0), f );

    f = smoothstep( 0.79, 0.82, r );
    col = mix( col, vec3(1.0), f );

    col *= 0.5 + 0.5*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.1);
 
	gl_FragColor = vec4( col, 1.0 );
}
