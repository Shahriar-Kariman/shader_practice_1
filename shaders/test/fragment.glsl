// precision mediump float;

uniform vec3 uniform_color;
uniform sampler2D uniform_texture;

// varying float random_varying;
varying vec2 vUv;
varying float v_elevation;

void main(){
  vec4 textureColor = texture2D(uniform_texture, vUv);
  textureColor.rgb *= v_elevation*2.0+0.7;
  gl_FragColor = textureColor;
}