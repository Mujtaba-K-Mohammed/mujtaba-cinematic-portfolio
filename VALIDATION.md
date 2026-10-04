# Validation — 4 October 2026

## Build and installation

The project was installed, run in development, inspected in the browser, and built with Vite and strict TypeScript. A separate clean source copy was also installed and built. The supplied lockfile records the tested dependency versions. Temporary audit pages, audit dependencies and preview middleware were removed from the delivered source.

## Browser checks

Both the development application and compiled production application were inspected in Chrome. Production inspection used the generated JavaScript bundles, rather than the Vite development entry point.

| Viewport | Horizontal overflow | Failed loaded images | axe WCAG 2 A/AA + 2.1 AA violations |
| --- | --- | --- | --- |
| 1920 × 1080 | None | None | 0 |
| 1440 × 900 | None | None | 0 |
| 1280 × 800 | None | None | 0 |
| 768 × 1024 | None | None | 0 |
| 412 × 915 | None | None | 0 |
| 390 × 844 | None | None | 0 |
| 320 × 800 | None | None | 0 |

These are browser viewport checks, including Android- and iPhone-sized layouts, not tests on physical phones. Automated accessibility checks do not constitute a complete accessibility certification.

The checks also covered:

- Section navigation and synchronized Lenis / ScrollTrigger scrolling. Final navigation correction uses CSS scroll padding once; the Work anchor settles with its section 90px below the viewport top.
- Project filters, the complete 16-project index, native project dialog, Escape dismissal and keyboard focus restoration.
- Technology-tab keyboard navigation and mobile-menu focus wrapping / Escape dismissal.
- Required-field and email validation, visible email-draft preparation, encoded mailto link and copy-draft feedback. No email was transmitted during testing.
- Desktop fallback eye / face movement and return toward neutral.
- The reduced-motion application branch, exercised with a development-only QA flag, and 200% text enlargement without horizontal overflow or clipped controls.
- No observed portfolio runtime console errors. Browser-extension messages were excluded from application results.

All 16 project demo URLs returned HTTP 200 during verification. Screenshots are from the actual demo interfaces. This verifies link availability; external project backends and third-party APIs are outside this portfolio's control.

## New CV

Every CV button points to the newly supplied PDF. The production asset returned HTTP 200 with `application/pdf`, a valid PDF signature, and 1,094,376 bytes. The download attribute and relative URL were checked. The cloud browser's download-event API did not return a completed download event, so that event is not claimed as a pass.

The bundled file and supplied file have the same SHA-256:

`1ac6c366967309e65d213667919f3b931e9ad42bcb170ae562d8568b4dbad0d4`

## 3D and performance scope

The inspection browser did not provide WebGL2. The working, interactive portrait fallback was therefore tested in-browser. Both actual GLSL shaders were compiled, linked and rendered separately using Mesa OpenGL ES 3.2 software rendering. Localized eye movement, atmospheric animation and zero OpenGL errors were verified in that shader test.

The full React Three Fiber scene and hardware-GPU frame rate could not be exercised in this browser. There is no claimed Lighthouse score or measured hardware performance result. Scene cleanup, lazy loading, adaptive/capped DPR, hidden/offscreen render suspension and reduced-motion fallback were reviewed in the implementation.

The main application is about 47 kB before compression; the large Three.js and R3F chunks are dynamically loaded only for eligible devices. The hero WebP is about 180 kB. Source PNG artwork is bundled for editing and is not loaded by the website.

The delivered visual previews are browser screenshots of the finished application using its WebGL fallback; they are not generated website mockups.
