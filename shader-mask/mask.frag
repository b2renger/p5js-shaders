

#ifdef GL_ES
  precision mediump float;
precision mediump int;
#endif

// texcoords from the vertex shader
varying vec2 vTexCoord;
// viewport resolution (in pixels)
uniform vec2  sketchSize;      

// Textures to blend
uniform sampler2D topLayer;    // Source (top layer)
uniform sampler2D lowLayer;    // Destination (bottom layer)



void main(void)
{

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

   
  vec4 s = texture2D(topLayer, uv ).rgba;
  vec4 d = texture2D(lowLayer, uv ).rgba;

  gl_FragColor = mix(s, vec4(0, 0, 0,0), 1.0 - (d.r+d.g+d.b)*0.333); 
}
