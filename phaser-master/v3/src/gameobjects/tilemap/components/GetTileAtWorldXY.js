var GetTileAt = require('./GetTileAt');
var WorldToTileX = require('./WorldToTileX');
var WorldToTileY = require('./WorldToTileY');

var GetTileAtWorldXY = function (worldX, worldY, nonNull, camera, layer)
{
    var tileX = WorldToTileX(worldX, camera, layer);
    var tileY = WorldToTileY(worldY, camera, layer);

    return GetTileAt(tileX, tileY, nonNull, layer);
};

module.exports = GetTileAtWorldXY;
