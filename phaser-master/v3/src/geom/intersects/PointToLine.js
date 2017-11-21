/**
 * [description]
 *
 * @function Phaser.Geom.Intersects.PointToLine
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Point} point - [description]
 * @param {Phaser.Geom.Line} line - [description]
 *
 * @return {boolean} [description]
 */
var PointToLine = function (point, line)
{
    return ((point.x - line.x1) * (line.y2 - line.y1) === (line.x2 - line.x1) * (point.y - line.y1));
};

module.exports = PointToLine;
