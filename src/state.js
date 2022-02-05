import { LUTCubeLoader } from "three/examples/jsm/loaders/LUTCubeLoader";

import lutUrl from "/some-luts/gsg/01_Basics/GSG_LUT_Basic_Contrasy.cube?url";

const state = {
  animateCamera: true,

  lightCount: 6,

  lut: undefined,
  lutIntensity: 0.8,

  bloomThreshold: 0.64,
  bloomStrength: 0.12,
  bloomRadius: 0.2,

  brightness: 0.2,
  contrast: 0.2,
};

/*
 * Pass an update function to be called when state changes
 */
function createState(updateFn) {
  state.updateFn = updateFn;

  // this is a good place for async loaders
  new LUTCubeLoader().load(lutUrl, (lut) => {
    state.lut = lut;
    state.updateFn();
  });

  return state;
}

export default createState;
