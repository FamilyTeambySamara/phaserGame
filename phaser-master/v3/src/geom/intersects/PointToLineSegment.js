var PointToLine = require('./PointToLine');

/**
 * [description]
 *
 * @function Phaser.Geom.Intersects.PointToLineSegment
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Point} point - [description]
 * @param {Phaser.Geom.Line} line - [description]
 *
 * @return {boolean} [description]
 */
var PointToLineSegment = function (point, line)
{
    if (!PointToLine(point, line))
    {
        return false;
    }

    var xMin = Math.min(line.x1, line.x2);
    var xMax = Math.max(line.x1, line.x2);
    var yMin = Math.min(line.y1, line.y2);
    var yMax = Math.max(line.y1, line.y2);

    return ((point.x >= xMin && point.x <= xMax) && (point.y >= yMin && point.y <= yMax));
};

module.exports = PointToLineSegment;
