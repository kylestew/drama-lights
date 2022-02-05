import * as dat from "dat.gui";

function createGUI(state) {
  const gui = new dat.GUI();

  var optionsFolder = gui.addFolder("Options");
  optionsFolder.open();

  optionsFolder.add(state, "animateCamera").onChange(state.updateFn);

  optionsFolder.add(state, "lightCount", 1, 12, 1).onChange(state.updateFn);

  var postFolder = gui.addFolder("Post Processing");
  // postFolder.open();

  postFolder.add(state, "lutIntensity", 0, 4, 0.01).onChange(state.updateFn);

  postFolder.add(state, "bloomThreshold", 0, 1, 0.01).onChange(state.updateFn);
  postFolder.add(state, "bloomStrength", 0, 5, 0.01).onChange(state.updateFn);
  postFolder.add(state, "bloomRadius", 0, 1, 0.01).onChange(state.updateFn);

  postFolder.add(state, "brightness", -1, 1, 0.01).onChange(state.updateFn);
  postFolder.add(state, "contrast", -1, 1, 0.01).onChange(state.updateFn);
}

export default createGUI;
