import * as alt  from 'alt';
import * as game from 'natives';
import * as native from 'natives';

const getDistance = (vector1, vector2) => {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2));
}

const view = new alt.WebView("http://resources/alt_roleplay/client/html/index.html");

alt.on('connectionComplete', (player) => {
    game.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', -1042.00, -2745.96, 121.34, 0, 0, 0, 90, true, 0);
    game.renderScriptCams(true, false, 0, true, true);
    native.transitionToBlurred(0);
    game.doScreenFadeIn(5000);
    game.displayRadar(false);
    game.displayHud(false);
    alt.showCursor(true);
    view.focus();
    view.emit("show");
    native.getPedConfigFlag(player, 73, true);
});

view.on('spawnFlug', (player) => {
    game.destroyAllCams(true);
    game.renderScriptCams(false, true, 0, true, true);
    view.emit("hide");
    view.unfocus();
    alt.showCursor(false);
    game.displayRadar(true);
    game.displayHud(true);
    native.transitionFromBlurred(0);
    game.doScreenFadeOut(3000);
    game.doScreenFadeIn(3000);
});

view.on('spawnStad', (player) => {
    game.destroyAllCams(true);
    game.renderScriptCams(false, true, 0, true, true);
    view.emit("hide");
    view.unfocus();
    alt.showCursor(false);
    game.displayRadar(true);
    game.displayHud(true);
    native.transitionFromBlurred(0);
    alt.emitServer('spawnStadtpark', player);
});

view.on('spawnPaci', (player) => {
    game.destroyAllCams(true);
    game.renderScriptCams(false, true, 0, true, true);
    view.emit("hide");
    view.unfocus();
    alt.showCursor(false);
    game.displayRadar(true);
    game.displayHud(true);
    native.transitionFromBlurred(0);
    alt.emitServer('spawnPacific', player);
});

alt.on('keydown', (key) => {
    if (key == 'G'.charCodeAt(0)) {
      const playerPed = alt.Player.local.scriptID;
      if (!native.isPedSittingInAnyVehicle(playerPed)) {
        const coords = native.getEntityCoords(playerPed);
        const offset = native.getOffsetFromEntityInWorldCoords(playerPed, 0.0, 1.0, 0.0);
        const rayHandle = native.startShapeTestCapsule(coords.x, coords.y, coords.z - 0.5, offset.x, offset.y, offset.z, 0.8, 10, playerPed, 7);
        const result = native.getShapeTestResult(rayHandle)[4];
        if (!result) return;
        if (native.doesEntityExist(result)) {
          const seatBones = ['seat_pside_f', 'seat_dside_r', 'seat_pside_r'];
          let closestSeat = [null, 3.0];
          seatBones.forEach((item, i) => {
            if (native.getEntityBoneIndexByName(result, item) != -1 && !native.getPedInVehicleSeat(result, i)) {
              const boneIndex = native.getEntityBoneIndexByName(result, item);
              const boneCoords = native.getWorldPositionOfEntityBone(result, boneIndex);
              const distance = getDistance(coords, boneCoords);
              if (distance < closestSeat[1]) {
                closestSeat = [i, distance];
              }
            }
          });
          if (closestSeat[0] !== null) {
            native.setPedConfigFlag(playerPed, 184, true);
            native.taskEnterVehicle(playerPed, result, -1, closestSeat[0], 1.0, 1, 0);
          }
        }
      }
    }
  });