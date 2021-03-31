
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
    static statesToVectors(states) {
        return states.map((state) => {
            return Victor.fromObject(state.position);
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
        if (angles == null) {
            return [0, 359];
        }
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
    static calculateLoopbackPoints(state, angle, circleSize, offset = new Victor(0, 0)) {
        let left = new Victor(1, 0)
            .rotateDeg(angle - 14)
            .multiplyScalar(circleSize)
            .add(state.position).add(offset);
        let right = new Victor(1, 0)
            .rotateDeg(angle + 16)
            .multiplyScalar(circleSize)
            .add(state.position).add(offset);
        let upperLeft = new Victor(1, 0)
            .rotateDeg(angle - 20)
            .multiplyScalar(circleSize * 4)
            .add(state.position).add(offset);
        let upperRight = new Victor(1, 0)
            .rotateDeg(angle + 20)
            .multiplyScalar(circleSize * 4)
            .add(state.position).add(offset);
        return [left, right, upperLeft, upperRight]
    }
    static calculateImplicitLoopbackAngle(loopbackCount, loopbackIndex, interval) {
        let t = (loopbackIndex + 1) / (loopbackCount + 1);
        let distance = (interval[1] - interval[0]);
        distance = distance > 0 ? distance : distance + 360;
        return interval[0] + distance * t
    }

    static calculateLabelPosition(originState, destinationStates, edge, i = 0) {

        if (edge.stateConj.count > 1) {
            return this.calculateMultiLabelPosition(originState, destinationStates);
        }
        if (originState.number == destinationStates[0].number) {
            this.calculateLoopbackLabelPosition(originState, [edge], i, i)
        }
        return this.calculateSingleLabelPosition(originState, destinationStates[0], edge);



    }
    static calculateSingleLabelPosition(originState, destinationState, edge) {
        let originVector = Victor.fromObject(originState.position);
        let destinationVector = Victor.fromObject(destinationState.position);
        let midpoint = EditorUtils.calculateMiddleWithOffset(originVector, destinationVector, edge.offset);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, this.circleSize);
        let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, this.circleSize);
        return EditorUtils.getPointOnQuadraticBezier(fromPoint, midpoint, toPoint, 0.5);
    }
    static calculateLabelAnchor(anchor, angle, width, height) {
        let anchorOffset = new Victor(width, height).rotateToDeg(angle);
        anchorOffset = new Victor(EditorUtils.clamp(-width, width, anchorOffset.x), EditorUtils.clamp(-height, height, anchorOffset.y));
        return anchor.clone().add(anchorOffset);
    }
    static calculateLabelSize(ctx, label, extraPadding) {
        let textMeasurements = ctx.measureText(label);
        let height = 20 + extraPadding / 2; // TextMetrics.fontBoundingBox is not widely supported
        let width = (textMeasurements.width + 20 + extraPadding) / 2; // +20 to give further padding
        return [width, height]
    }

    static calculateMultiLabelPosition(originState, destinationStates) {
        let originVector = Victor.fromObject(originState.position);
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const destination of destinationStates) {
            if (destination.number == originState.number) {
                continue;
            }
            let destinationVector = Victor.fromObject(destination.position);
            let directionVector = destinationVector.subtract(originVector);
            midpoint.add(directionVector);
            divider++;
        }
        midpoint.divideScalar(divider * 2); //*2 puts the midpoint close to origin state
        midpoint.add(originVector);
        return midpoint;
    }
    static calculateLoopbackLabelPosition(state, loopbacks, interval, i) {
        let angle = EditorUtils.calculateImplicitLoopbackAngle(loopbacks, i, interval);
        let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(state, angle, this.circleSize);
        return EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
    }
    static calculateLabelBounds(anchor, width, height, extraPadding = 0) {
        let bgwidth = width * 2 - extraPadding;
        let bgheight = height * 2 - extraPadding - 20;
        return [new Victor(anchor.x - bgwidth / 2, anchor.y - bgheight / 2), new Victor(anchor.x + bgwidth / 2, anchor.y + bgheight / 2)]
    }
    static isPointWithinBounds(min, max, point) {
        let xlow = min.x < point.x;
        let xhigh = max.x > point.x;
        let ylow = min.y < point.y
        let yhigh = max.y > point.y
        return xlow && xhigh && ylow && yhigh;
    }

    /**
     * Gets label of given edge.
     * 
     * @param {State} state - State from which the edge originates.
     * @param {number} edgeIndex - Index of the edge.
     * @param {any[]} aps - Atomic propositions.
     * @returns {Victor[]} Vectors with state positions.
     */
    static getLabel(state, edgeIndex, aps) {
        if (state.edges[edgeIndex].label) {
            return state.edges[edgeIndex].label;
        }
        if (state.edges.length == Math.pow(2, aps.length) && !state.label) {
            return this.calculateImplicitLabel(edgeIndex, aps.length);
        }
        return "";
    }

    static calculateImplicitLabel(edgeIndex, propositionCount) {
        let result = "";
        for (let i = 0; i < propositionCount; i++) {
            let mask = 1 << i;
            if (!(mask & edgeIndex)) {
                result += "!";
            }
            result += i
            if (i + 1 < propositionCount) {
                result += "&"
            }
        }
        return result;
    }
}
exports.EditorUtils = EditorUtils;
