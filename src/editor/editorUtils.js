
const Victor = require('victor');
class EditorUtils {
    /**
     * Calculates midpoint between two points with given offset.
     * 
     * @param {Victor} p1 - First point.
     * @param {Victor} p2 - Second point.
     * @param {number} offset - Offset in pixels, perpendicular to the line form p1 to p2.
     * @returns {Victor} Vector between the two points with given offset.
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
     * Clamps the given value between the min and max values.
     * 
     * @param {number} min - Minimum value.
     * @param {number} max - Maximum value.
     * @param {number} value - The value to be clamped.
     * @returns {number} Value clamped between min and max.
     */
    static clamp(min, max, value) {
        return Math.min(max, Math.max(min, value));
    }
    /**
     * Calculates vector perpendicular to line between p1 and p2.
     * 
     * @param {Victor} p1 - First point.
     * @param {Victor} p2 - Second point.
     * @returns {Victor} Vector with direction perpendicular to line form p1 to p2.
     */
    static calculatePerpendicular(p1, p2) {
        let dir = p2.clone().subtract(p1);
        return new Victor(dir.y, -dir.x).normalize();
    }
    /**
     * Calculates the midpoint between multiple points.
     * 
     * @param {Victor[]} vectors - Array of points.
     * @returns {Victor} Vector representing midpoint.
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
     * Calculates point at given quadratic curve.
     *
     * @param {Victor} p0 - First point.
     * @param {Victor} p1 - Second point.
     * @param {Victor} p2 - Third point.
     * @param {number} t - Progress along the path.
     * @returns {Victor} Vector representing point on bezier curve for given t.
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
     * Calculates point at given quadratic curve.
     * 
     * @param {Victor} p0 - First point.
     * @param {Victor} p1 - Second point.
     * @param {Victor} p2 - Third point.
     * @param {Victor} p3 - Fourth point.
     * @param {number} t - Progress along the path.
     * @returns {Victor} Vector representing point on bezier curve for given t.
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
     * Calculates distance between two angles.
     * 
     * @param {number} a1 - First angle in degrees.
     * @param {number} a2 - Second angle in degrees.
     * @returns {number} The difference between a1 and a2 in degrees, between 0 and 360.
     */
    static angleDistance(a1, a2) {
        let distance = a1 - a2;
        return distance > 0 ? distance : distance + 360;
    }
    static statesToPositions(states) {
        return states.map((state) => {
            return state.position;
        });
    }
    /**
     * Finds the nearest point to given point on a given circle with an optional rotation around the circle.
     * 
     * @param {Victor} center - The center of the circle.
     * @param {Victor} point - The point to which the resulting point will be the nearest on circle.
     * @param {number} size - Circle radius.
     * @param {number} [offset=0] - How much to rotate the point around the circle center in radians.
     * @returns {Victor} Nearest point to given point on a given circle.
     */
    static getNearestPointOnCircle(center, point, size, offset = 0) {
        let direction = point.clone().subtract(center).normalize();
        //No idea why this must be cloned so many times, but it does not work otherwise
        direction = direction.clone().multiplyScalar(size).clone().rotate(offset);
        return direction.clone().add(center);
    }

    static getFreeAngleInterval(angles, offset = 0) {
        angles.sort((a, b) => { return a - b });
        let intervals = [];
        for (let i = 0; i < angles.length; i++) {
            let a1 = angles[i];
            let a2 = angles[(i + 1) % angles.length] //modulo is used to compare last element with first
            intervals.push([a1, a2]);
        }
        intervals.sort((a, b) => { return EditorUtils.angleDistance(a[0], a[1]) - EditorUtils.angleDistance(b[0], b[1]) });
        return intervals[offset];
    }
}
exports.EditorUtils = EditorUtils;
