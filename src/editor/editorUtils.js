
const Victor = require('victor');
const State = require("../hoaObject.js").State;
const Edge = require("../hoaObject.js").Edge;

class EditorUtils {
    /**
     * Calculates midpoint between two points with given offset.
     * 
     * @param {Victor} p1 - First point.
     * @param {Victor} p2 - Second point.
     * @param {Victor} offset - Offset in perpendicular direction.
     * @returns {Victor} Vector between the two points with given offset.
     */
    static calculateMiddleWithOffset(p1, p2, offset) {
        let dir = p1.clone().subtract(p2).multiplyScalar(0.5);
        let midpoint = dir.clone().add(p2);
        let perpendicular = new Victor(dir.y, -dir.x).normalize();
        let angledOffset = offset.clone().rotateDeg(perpendicular.angleDeg()).add(midpoint);
        return angledOffset;
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
     * Calculates point at given cubic curve.
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
    static calculateBlockedAngle(pointOnState, stateCenter) {
        let dirFromCenter = pointOnState.clone().subtract(stateCenter);
        let angle = dirFromCenter.horizontalAngleDeg();

        return this.angle360(angle);
    }
    static angle360(angle) {
        if (angle < 0) {
            angle += 360;
        }
        return angle
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
        if (angles.length==0) {
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
    static calculateLoopbackPoints(position, edgeOffset, circleSize, offset = new Victor(0, 0)) {
        let angle = edgeOffset.angleDeg();
        let left = new Victor(1, 0)
            .rotateDeg(angle - 14)
            .multiplyScalar(circleSize)
            .add(position).add(offset);
        let right = new Victor(1, 0)
            .rotateDeg(angle + 16)
            .multiplyScalar(circleSize)
            .add(position).add(offset);
        let upperLeft = new Victor(1, 0)
            .rotateDeg(angle - 20)
            .multiplyScalar(edgeOffset.length())
            .add(position).add(offset);
        let upperRight = new Victor(1, 0)
            .rotateDeg(angle + 20)
            .multiplyScalar(edgeOffset.length())
            .add(position).add(offset);
        return [left, right, upperLeft, upperRight]
    }
    static calculateMultiedgeLoopbackPoints(angle, originVector, circleSize) {
        let left = new Victor(1, 0)
            .rotateDeg(angle)
            .multiplyScalar(circleSize)
            .add(originVector);
        let right = new Victor(1, 0)
            .rotateDeg(angle - 20)
            .multiplyScalar(circleSize)
            .add(originVector);
        let upperLeft = new Victor(1, 0)
            .rotateDeg(angle)
            .multiplyScalar(circleSize * 4)
            .add(originVector);
        let upperRight = new Victor(1, 0)
            .rotateDeg(angle - 30)
            .multiplyScalar(circleSize * 4)
            .add(originVector);
        return [left, right, upperLeft, upperRight]
    }
    static calculateImplicitLoopbackAngle(loopbackCount, loopbackIndex, interval) {
        let t = (loopbackIndex + 1) / (loopbackCount + 1);
        let distance = (interval[1] - interval[0]);
        distance = distance > 0 ? distance : distance + 360;
        return interval[0] + distance * t
    }

    static calculateLabelPosition(originState, destinationStates, edge, circleSize) {
        if (edge.stateConj.length > 1) {
            let midpoint = this.calculateMultiEdgeMidpoint(originState, destinationStates, edge.offset)[0];
            return this.calculateMultiLabelPosition(originState, destinationStates, midpoint);
        }
        if (originState.number == destinationStates[0].number) {
            return this.calculateLoopbackLabelPosition(originState.position, edge.offset, circleSize)
        }
        return this.calculateSingleLabelPosition(originState, destinationStates[0], edge, circleSize);
    }
    static calculateMultiLabelPosition(originState, destinationStates, midpoint, offset = new Victor(0, 0), scale = 1) {
        let points = [];
        for (const destination of destinationStates) {
            if (destination.numer != originState.number) {
                points.push(this.getPointOnQuadraticBezier(originState.position.clone().add(offset).multiplyScalar(scale), midpoint, destination.position.clone().add(offset).multiplyScalar(scale), 0.5));
            }
        }
        return this.calculateMidpointBetweenVectors(points);
    }
    static calculateSingleLabelPosition(originState, destinationState, edge, circleSize) {
        let originVector = Victor.fromObject(originState.position);
        let destinationVector = Victor.fromObject(destinationState.position);
        let midpoint = EditorUtils.calculateMiddleWithOffset(originVector, destinationVector, edge.offset);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, circleSize);
        let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, circleSize);
        return EditorUtils.getPointOnQuadraticBezier(fromPoint, midpoint, toPoint, 0.5);
    }
    static calculateLabelAnchor(anchor, angle, width, height) {
        let anchorOffset = new Victor(width, height).rotateToDeg(angle);
        anchorOffset = new Victor(EditorUtils.clamp(-width, width, anchorOffset.x), EditorUtils.clamp(-height, height, anchorOffset.y));
        return anchor.clone().add(anchorOffset);
    }
    static calculateLabelSize(ctx, label, extraPadding, scale = 1) {
        let textMeasurements = ctx.measureText(label);
        let height = 20 * scale + extraPadding / 2; // TextMetrics.fontBoundingBox is not widely supported
        let width = (textMeasurements.width + 20 * scale + extraPadding) / 2; // +20 to give further padding
        return [width, height]
    }

    static calculateMultiEdgeMidpoint(originState, destinationStates, offset = new Victor(0, 0), globalOffset = new Victor(0, 0), scale = 1) {
        let originVector = originState.position.clone().add(globalOffset);
        let midpoint = new Victor(0, 0);
        let divider = 0;
        for (const destination of destinationStates) {
            if (destination.number == originState.number) {
                continue;
            }
            let destinationVector = Victor.fromObject(destination.position).add(globalOffset);
            let directionVector = destinationVector.subtract(originVector);
            midpoint.add(directionVector);
            divider++;
        }
        midpoint.add(offset.clone().multiplyScalar(divider * 2));
        let angle = midpoint.angleDeg();
        midpoint.divideScalar(divider * 2); //*2 puts the midpoint close to origin state
        midpoint.add(originVector);
        return [midpoint, angle];
    }
    static calculateLoopbackLabelPosition(position, offset, circleSize) {
        let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(position, offset, circleSize);
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
    static getLabel(state, edgeIndex, aps,translator) {
        if (state.edges[edgeIndex].getLabelString()) {
            return translator(state.edges[edgeIndex].label);
        }
        if (state.edges.length == Math.pow(2, aps.length) && !state.getLabelString()) {
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
    static approxBezierLength(iters, p0, p1, p2, p3 = null) {
        let len = this.getPointsOnBezier(iters, p0, p1, p2, p3).slice(-1)[0];
        return len;
    }
    static getPointsOnBezier(count, p0, p1, p2, p3 = null) {
        let points = [];
        for (let i = 0; i < count-1; i++) {
            let step = 1 / count;
            let segment1;
            let segment2;
            if (p3) {
                segment1 = this.getPointOnCubicBezier(p0, p1, p2, p3, step * i);
                segment2 = this.getPointOnCubicBezier(p0, p1, p2, p3, step * (i + 1));
            }
            else {
                segment1 = this.getPointOnQuadraticBezier(p0, p1, p2, step * i);
                segment2 = this.getPointOnQuadraticBezier(p0, p1, p2, step * (i + 1));
            }
            points.push((points[points.length-1]||0) + segment1.subtract(segment2).length());
        }
        return points
    }
    static getTAtPercentage(arrayOfPoints, percentage) {
        let curveLength = arrayOfPoints.slice(-1)[0];
        let desiredLength = percentage * curveLength;
        let optimalIndex;
        let optimalDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < arrayOfPoints.length; i++) {
            let dist = Math.abs(arrayOfPoints[i] - desiredLength);
            if (dist < optimalDist) {
                optimalDist = dist;
                optimalIndex = i;
            }
        }
        return optimalIndex / (arrayOfPoints.length-1);
    }
    static textStyle(size) {
        size = Math.floor(size);
        return size + "px Arial";
    }
}
exports.EditorUtils = EditorUtils;
