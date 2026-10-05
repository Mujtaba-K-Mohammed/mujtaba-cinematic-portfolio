export const portraitVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/** Localized texture displacement moves the gaze without exposing a second pupil. */
export const portraitFragment = `
  uniform sampler2D uMap;
  uniform vec2 uGaze;
  varying vec2 vUv;
  float eyeMask(vec2 uv, vec2 center) {
    vec2 d = (uv - center) / vec2(0.040, 0.014);
    return 1.0 - smoothstep(0.22, 1.0, length(d));
  }
  void main() {
    vec2 uv = vUv;
    // Coordinates measured against the bundled 1024 x 1536 portrait, UV origin bottom-left.
    float eyes = max(eyeMask(uv, vec2(0.412, 0.843)), eyeMask(uv, vec2(0.539, 0.848)));
    uv -= uGaze * eyes;
    vec4 color = texture2D(uMap, uv);
    if (color.a < 0.02) discard;
    gl_FragColor = color;
    #include <colorspace_fragment>
  }
`
