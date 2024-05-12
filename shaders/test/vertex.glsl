// uniform mat4 modelMatrix;
// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
uniform vec2 uniform_frequency;
uniform float uniform_time;

// attribute vec3 position;
// attribute vec2 uv;

// attribute float random_attribute;

// varying float random_varying;
varying vec2 vUv;
varying float v_elevation;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float elevation = sin(modelPosition.x * uniform_frequency.x + uniform_time)/10.0;
  elevation += sin(modelPosition.y * uniform_frequency.y + uniform_time)/10.0;
  modelPosition.z += elevation;
  // modelPosition.z += random_attribute/10.0;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  // random_varying = random_attribute;
  vUv = uv;
  v_elevation = elevation;
}