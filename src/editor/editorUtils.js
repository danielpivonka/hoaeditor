
const Victor = require('victor');
class EditorUtils {
    /**
     * @param  {Victor} p1 first point
     * @param  {Victor} p2 second point
     * @param  {number} offset offset in pixels, perpendicular to the line form p1 to p2
     */
    static calculateMiddleWithOffset(p1, p2, offset) {
        let dir = p1.clone().subtract(p2).multiplyScalar(0.5);
        let midpoint = dir.clone().add(p2);
        let perpendicular = new Victor(dir.y, -dir.x).normalize();
        perpendicular.multiplyScalar(offset);
        perpendicular.add(midpoint);
        return perpendicular;
    }
    /**
     * Clamps the given value between the min and max values
     * @param  {number} min
     * @param  {number} max
     * @param  {number} value the value to be clamped
     * @return {number} value clamped between min and max
     */
    static clamp(min, max, value) {
        return Math.min(max, Math.max(min, value));
    }
    /**
     * @param  {Victor} p1 first point
     * @param  {Victor} p2 second point
     * @return {Victor} vector with direction perpendicular to line form p1 to p2
     */
    static calculatePerpendicular(p1, p2) {
        let dir = p2.clone().subtract(p1);
        return new Victor(dir.y, -dir.x).normalize();
    }
    /**
     * @param  {Victor[]} vectors
     * @returns {Victor} vector representing midpoint
     */
    static calculateMidpointBetweenVectors(vectors) {
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const vector of vectors) {
            midpoint.add(vector);
            divider++;
        }
        midpoint.divideScalar(divider);
        return midpoint
    }
    /**
     * @param  {Victor} p0 first point
     * @param  {Victor} p1 second point
     * @param  {Victor} p2 third point
     * @param  {number} t
     * @returns {Victor} vector representing point on bezier curve for given t
     */
    static getPointOnQuadraticBezier(p0, p1, p2, t) {
        let b0 = (1 - t) * (1 - t);
        let b1 = 2 * (1 - t) * t;
        let b2 = t * t;
        let x = b0 * p0.x + b1 * p1.x + b2 * p2.x;
        let y = b0 * p0.y + b1 * p1.y + b2 * p2.y;
        return new Victor(x, y);
    }
    /**
     * @param  {Victor} p0 first point
     * @param  {Victor} p1 second point
     * @param  {Victor} p2 third point
     * @param  {Victor} p3 fourth point
     * @param  {number} t
     * @returns {Victor} vector representing point on bezier curve for given t
     */
    static getPointOnCubicBezier(p0, p1, p2, p3, t) {
        let b0 = (1 - t) * (1 - t) * (1 - t);
        let b1 = 3 * t * (1 - t) * (1 - t);
        let b2 = 3 * t * t * (1 - t);
        let b3 = t * t * t;
        let x = b0 * p0.x + b1 * p1.x + b2 * p2.x + b3 * p3.x;
        let y = b0 * p0.y + b1 * p1.y + b2 * p2.y + b3 * p3.y;
        return new Victor(x, y);
    }
    /**
     * @param  {number} a1 first angle in degrees
     * @param  {number} a2 second angle in degrees
     * @returns {number} the difference between a1 and a2 in degrees, between 0 and 360
     */
    static angleDistance(a1, a2) {
        let distance = a1 - a2;
        return distance > 0 ? distance : distance + 360;
    }
}
exports.EditorUtils = EditorUtils;
