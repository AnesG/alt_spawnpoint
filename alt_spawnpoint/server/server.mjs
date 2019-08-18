import * as alt from 'alt';
import * as chat from 'chat';

const playerSpawn = {
    x: -1042.48,
    y: -2745.96,
    z: 20.43
};

alt.on('playerConnect', SpawnPlayer);

function SpawnPlayer(player) {
    player.model= 'mp_m_freemode_01';
    player.spawn(playerSpawn.x, playerSpawn.y, playerSpawn.z);
}

alt.onClient('spawnStadtpark', (player) => {
    player.spawn(228.00, -878.00, 29.41, 0);
});

alt.onClient('spawnPacific', (player) => {
    player.spawn(301.27, 202.19, 103.37, 180.00);
});