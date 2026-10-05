import { portraitVertex } from './portrait'
export const atmosphereVertex = portraitVertex
export const atmosphereFragment = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  void main() {
    vec2 p = (vUv - 0.5) * vec2(1.05, 1.0);
    p -= uPointer * 0.018;
    float angle = atan(p.y, p.x);
    float distance = length(p);
    float ripple = sin(angle * 3.0 + uTime * 0.15) * 0.009;
    float contour = 1.0 - smoothstep(0.0015, 0.004, abs(distance - 0.33 + ripple));
    float outer = 1.0 - smoothstep(0.001, 0.003, abs(distance - 0.40 - ripple * 0.5));
    float mist = exp(-distance * distance * 13.0) * 0.12;
    vec3 blue = vec3(0.12, 0.25, 0.72);
    vec3 violet = vec3(0.28, 0.12, 0.50);
    vec3 color = mix(blue, violet, vUv.x);
    float edge = 1.0 - smoothstep(0.40, 0.67, distance);
    gl_FragColor = vec4(color + contour * vec3(0.10, 0.22, 0.36), (mist + contour * 0.26 + outer * 0.11) * edge);
    #include <colorspace_fragment>
  }
`
