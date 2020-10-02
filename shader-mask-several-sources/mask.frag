

#ifdef GL_ES
  precision mediump float;
precision mediump int;
#endif

// texcoords from the vertex shader
varying vec2 vTexCoord;
// viewport resolution (in pixels)
uniform vec2  sketchSize;      

// Textures to blend
uniform sampler2D source1;    // Source 
uniform sampler2D source2;    // Source 
uniform sampler2D source3;    // Source 
uniform sampler2D drawing;   



void main(void)
{

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

   
  vec4 s1 = texture2D(source1, uv ).rgba;
  vec4 s2 = texture2D(source2, uv ).rgba;
  vec4 s3 = texture2D(source3, uv ).rgba;
  vec4 d = texture2D(drawing, uv ).rgba;


  vec4 col;
  if(d.r == 1.) {col = mix(s1,vec4(0, 0, 0,0), 1.0 - (d.r+d.g+d.b)*0.333 );}
  if(d.g == 1.) col = mix(s2,vec4(0, 0, 0,0), 1.0 - (d.r+d.g+d.b)*0.333 );
  if(d.b == 1.) col = mix(s3,vec4(0, 0, 0,0), 1.0 - (d.r+d.g+d.b)*0.333 );


  gl_FragColor = col; 
}
