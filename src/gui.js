import * as dat from "dat.gui";

function createGUI(state) {
  const gui = new dat.GUI();

  var optionsFolder = gui.addFolder("Options");
  optionsFolder.open();

  optionsFolder
    .addColor(state, "backgroundColor")
    .name("Background")
    .onChange(state.updateFn);

  optionsFolder.add(state, "animateCamera").onChange(state.updateFn);

  optionsFolder.add(state, "lutIntensity", 0, 4, 0.01).onChange(state.updateFn);

  optionsFolder
    .add(state, "bloomThreshold", 0, 1, 0.01)
    .onChange(state.updateFn);
  optionsFolder
    .add(state, "bloomStrength", 0, 5, 0.01)
    .onChange(state.updateFn);
  optionsFolder.add(state, "bloomRadius", 0, 1, 0.01).onChange(state.updateFn);

  optionsFolder.add(state, "brightness", -1, 1, 0.01).onChange(state.updateFn);
  optionsFolder.add(state, "contrast", -1, 1, 0.01).onChange(state.updateFn);
}

export default createGUI;
