/**
 * Copies the `x`, `y` and `radius` properties from the `source` Circle
 * into the given `dest` Circle, then returns the `dest` Circle.
 *
 * @function Phaser.Geom.Circle.CopyFrom
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Circle} source - The source Circle to copy the values from.
 * @param {Phaser.Geom.Circle} dest - The destination Circle to copy the values in to.
 *
 * @return {Phaser.Geom.Circle} The dest Circle.
 */
var CopyFrom = function (source, dest)
{
    return dest.setTo(source.x, source.y, source.radius);
};

module.exports = CopyFrom;
