
const Victor = require('victor');
const State = require("../hoaData/state").State;
const Edge = require("../hoaData/edge").Edge;
const Automaton = require("../hoaData/automaton").Automaton;

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
    /**
     * Calculates angle relative to a point.
     * 
     * @param {Victor} pointOnState - Point whose angle should be calculated.
     * @param {Victor} stateCenter - The point from which the angle should be calculated.
     * @returns {number} The calculated angle.
     */
    static calculateBlockedAngle(pointOnState, stateCenter) {
        let dirFromCenter = pointOnState.clone().subtract(stateCenter);
        let angle = dirFromCenter.horizontalAngleDeg();

        return this.angle360(angle);
    }
    /**
     * Converts angle from (-180,180) range to (0,360).
     * 
     * @param {number} angle - The angle to be converted.
     * @returns {number} The converted angle.
     */
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
    /**
     * Converts array of states to array of their positions.
     * 
     * @param {State[]} states - Array of states to convert.
     * @returns {Victor[]} Array of positions.
     */
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
    /**
     * Calculates the largest gap between blockd angles.
     * 
     * @param {number[]} angles - Array of blocked angles of a state.
     * @param {number} offset - Opttional. If supplied, function returns the n-th largest gap.
     * @returns {number[]} Array containing the start and end angle of the gap. 
     */
    static getFreeAngleInterval(angles, offset = 0) {
        if (angles.length == 0) {
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
    /**
     * Calculates control points of a bezier curve for a looping edge.
     * 
     * @param {Victor} position - Position of the state that this edge belongs to.
     * @param {Victor} edgeOffset - Offset of the edge.
     * @param {number} circleSize - Radius of state.
     * @param {Victor} offset - Global offset of the renderer.
     * @returns {Victor[]} Array of the four control points (left, right, upperLeft, upperRight).
     */
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
    /**
     * Calculates control points of a bezier curve for a loop in an alternating edge.
     * 
     * @param {number} angle - Angle towards the midpoint of alternating edge.
     * @param {Victor} originVector - Position of origin state of the edge.
     * @param {number} circleSize - Radius of state.
     * @returns {Victor[]} Array of the four control points.
     */
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
    /**
     * Calculates angles for looping edges for automatons without positions.
     * 
     * @param {number} loopbackCount - Total amount of loopbacks.
     * @param {number} loopbackIndex - Index of loopback angle to calculate.
     * @param {number} interval - The angle intervat to which to position the loopback angles.
     * @returns {number} The angle of the loop edge.
     */
    static calculateImplicitLoopbackAngle(loopbackCount, loopbackIndex, interval) {
        let t = (loopbackIndex + 1) / (loopbackCount + 1);
        let distance = (interval[1] - interval[0]);
        distance = distance > 0 ? distance : distance + 360;
        return interval[0] + distance * t
    }
    /**
     * Calculates the positions of label for alternating edges.
     * 
     * @param {State} originState - State from which the alternatin edge leads.
     * @param {State[]} destinationStates - Array of destination states of the edge. 
     * @param {Victor} midpoint - Midpoint of the alternating edge.
     * @param {Victor} offset - Offset of renderer.
     * @param {number} scale - Scale of renderer.
     * @returns {Victor} Position of the label.
     */
    static calculateMultiLabelPosition(originState, destinationStates, midpoint, offset = new Victor(0, 0), scale = 1) {
        let points = [];
        for (const destination of destinationStates) {
            if (destination.numer != originState.number) {
                points.push(this.getPointOnQuadraticBezier(originState.position.clone().add(offset).multiplyScalar(scale), midpoint, destination.position.clone().add(offset).multiplyScalar(scale), 0.5));
            }
        }
        return this.calculateMidpointBetweenVectors(points);
    }
    /**
     * Calculates the positions of label for edge.
     * 
     * @param {State} originState - Origin of the edge.
     * @param {State} destinationState - Destination of the edge.
     * @param {Edge} edge - The edge whose label is being calculated.
     * @param {number} circleSize - Radius of state.
     * @returns {Victor} Position of the label.
     */
    static calculateSingleLabelPosition(originState, destinationState, edge, circleSize) {
        let originVector = Victor.fromObject(originState.position);
        let destinationVector = Victor.fromObject(destinationState.position);
        let midpoint = EditorUtils.calculateMiddleWithOffset(originVector, destinationVector, edge.offset);
        let fromPoint = EditorUtils.getNearestPointOnCircle(originVector, midpoint, circleSize);
        let toPoint = EditorUtils.getNearestPointOnCircle(destinationVector, midpoint, circleSize);
        return EditorUtils.getPointOnQuadraticBezier(fromPoint, midpoint, toPoint, 0.5);
    }
    /**
     * Adjusts the position of the label based on its size.
     * 
     * @param {Victor} anchor - Original anchor position.
     * @param {number} angle - Angle of the label relative to the state.
     * @param {number} width - Width of the label.
     * @param {number} height - Height of the label.
     * @returns {Victor} The adjusted position.
     */
    static calculateLabelAnchor(anchor, angle, width, height) {
        let anchorOffset = new Victor(width, height).rotateToDeg(angle);
        anchorOffset = new Victor(EditorUtils.clamp(-width, width, anchorOffset.x), EditorUtils.clamp(-height, height, anchorOffset.y));
        return anchor.clone().add(anchorOffset);
    }
    /**
     * Calculates size of the label.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     * @param {string} label - Label string.
     * @param {number} extraPadding - Extra padding around the text.
     * @param {number} scale - Scale of the renderer.
     * @returns {number[]} Width and height of the label.
     */
    static calculateLabelSize(ctx, label, extraPadding, scale = 1) {
        let textMeasurements = ctx.measureText(label);
        let height = 20 * scale + extraPadding / 2; // TextMetrics.fontBoundingBox is not widely supported
        let width = (textMeasurements.width + 20 * scale + extraPadding) / 2; // +20 to give further padding
        return [width, height]
    }
    /**
     * Calculates midpoint of alternating edge.
     * 
     * @param {State} originState - Origin state of the edge.
     * @param {State[]} destinationStates - Array of destinations of the edge.
     * @param {Victor} offset - Offset of the edge.
     * @param {Victor} globalOffset - Offset of the renderer.
     * @returns {Victor|number} Vector representing the position of alternating edge and number representing the angle of the midpoint relative to the origin state.
     */
    static calculateMultiEdgeMidpoint(originState, destinationStates, offset = new Victor(0, 0), globalOffset = new Victor(0, 0)) {
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
    /**
     * Calculates position of label of loop edge.
     * 
     * @param {Victor} position - Position of the edge.
     * @param {Victor} offset - Offset of the edge.
     * @param {number} circleSize - Radius of the state.
     * @returns {Victor} The anchor of the label.
     */
    static calculateLoopbackLabelPosition(position, offset, circleSize) {
        let [left, right, upperLeft, upperRight] = EditorUtils.calculateLoopbackPoints(position, offset, circleSize);
        return EditorUtils.getPointOnCubicBezier(left, upperLeft, upperRight, right, 0.5);
    }
    /**
     * Calculates hitbox of the label.
     * 
     * @param {Victor} anchor - Position of the label.
     * @param {number} width - Width of the label.
     * @param {number} height - Height of the label.
     * @param {number} extraPadding - Extra padding of the label.
     * @returns {Victor[]} Upper left and lower right points of the hitbox.
     */
    static calculateLabelBounds(anchor, width, height, extraPadding = 0) {
        let bgwidth = width * 2 - extraPadding;
        let bgheight = height * 2 - extraPadding - 20;
        return [new Victor(anchor.x - bgwidth / 2, anchor.y - bgheight / 2), new Victor(anchor.x + bgwidth / 2, anchor.y + bgheight / 2)]
    }
    /**
     * Checks whether or not given point lies in hitbox.
     * 
     * @param {Victor} min - Upper left point of the hitbox.
     * @param {Victor} max - Lower right point of the hitbox.
     * @param {Victor} point - The point which to check.
     * @returns {boolean} True if point lies in hitbox.
     */
    static isPointWithinBounds(min, max, point) {
        let xlow = min.x < point.x;
        let xhigh = max.x > point.x;
        let ylow = min.y < point.y
        let yhigh = max.y > point.y
        return xlow && xhigh && ylow && yhigh;
    }
    /**
     * Calculates blocked angles of automaton.
     * 
     * @param {Automaton} automaton - The automaton whose angles should be calculated.
     * @param {number} circleSize - Circle size of automaton.
     * @returns {number[][]} Array of arrays representing angles of each state.
     */
    static calculateBlockedAngles(automaton, circleSize) {
        let blockedAngles = [];
        for (const state of automaton.states.values()) {
            blockedAngles[state.number] = [];
        }
        for (const state of automaton.states.values()) {
            for (const edge of state.edges) {
                if (edge.stateConj.length > 1) {
                    let originVector = state.position;
                    let destinationStates = automaton.numbersToStates(edge.stateConj);
                    let midpoint = this.calculateMultiEdgeMidpoint(state, destinationStates)[0];
                    let fromPoint = this.getNearestPointOnCircle(originVector, midpoint, circleSize);
                    for (const destinationState of destinationStates) {
                        if (destinationState.number != state.number) {
                            let destinationVector = destinationState.position;
                            let toPoint = this.getNearestPointOnCircle(destinationVector, midpoint, circleSize);
                            blockedAngles[state.number].push(this.calculateBlockedAngle(fromPoint, originVector));
                            blockedAngles[destinationState.number].push(this.calculateBlockedAngle(toPoint, destinationVector));
                        }
                    }
                }
                else if (edge.stateConj[0] != state.number) {
                    let destinationState = automaton.getStateByNumber(edge.stateConj[0]);
                    let originVector = state.position;
                    let destinationVector = destinationState.position;
                    let midpoint = this.calculateMiddleWithOffset(originVector, destinationVector, edge.offset);
                    let fromPoint = this.getNearestPointOnCircle(originVector, midpoint, circleSize);
                    let toPoint = this.getNearestPointOnCircle(destinationVector, midpoint, circleSize);
                    blockedAngles[state.number].push(this.calculateBlockedAngle(fromPoint, originVector));
                    blockedAngles[destinationState.number].push(this.calculateBlockedAngle(toPoint, destinationVector));
                }
            }
        }
        return blockedAngles;
    }

    /**
     * Calculates angles blocked by loopbackedges for entire automaton.
     * 
     * @param {Automaton} automaton - Automaton which to process.
     * @returns {number[][]} Array containing array of blocked angles for each state.
     */
    static calculateLoopbackAngles(automaton) {
        let blockedAngles = [];
        for (const state of automaton.states.values()) {
            blockedAngles[state.number] = [];
            for (const edge of state.edges) {
                if (edge.stateConj.length == 1 && edge.stateConj[0] == state.number) {
                    let baseAngle = edge.offset.angleDeg();
                    blockedAngles[state.number].push(EditorUtils.angle360(baseAngle + 16));
                    blockedAngles[state.number].push(EditorUtils.angle360(baseAngle - 14));
                }

            }
        }
        return blockedAngles;
    }

    /**
     * Calculates implicit anchors for loopbacks for automatons without positions.
     * 
     * @param {Automaton} automaton - Automaton for which to calculate positions.
     * @param {number[][]} blockedAngles - Array containing occupiend angles for every state.
     * @param {number} circleSize - Radius of state.
     */
    static calculateLoopbackAnchors(automaton, blockedAngles, circleSize) {
        let stateLoopbacks = new Map();
        for (const state of automaton.states.values()) {
            let loopbacks = [];
            for (const edgeIndex of state.edges.keys()) {
                let edge = state.edges[edgeIndex];
                if (edge.stateConj.length == 1 && edge.stateConj[0] == state.number) {
                    loopbacks.push(edge);
                }
            }
            stateLoopbacks.set(state, loopbacks);
        }
        for (let [state, loopbacks] of stateLoopbacks) {
            let interval = this.getFreeAngleInterval(blockedAngles[state.number]);
            let i = 0;
            for (const loopback of loopbacks) {
                let angle = this.calculateImplicitLoopbackAngle(loopbacks.length, i, interval);
                loopback.offset = new Victor(1, 0).rotateDeg(angle).multiplyScalar(circleSize * 4);
                i++;
            }
        }
    }
    /**
     * Calculates angles occupied by start markers.
     * 
     * @param {Automaton} automaton - Automaton for which to calculate the angles.
     * @param {number} circleSize - Rendering radius of state.
     * @returns {number[][]} Array containing array of angles for each state.
     */
    static calculateStartAngles(automaton, circleSize) {
        let blockedAngles = [];
        for (const stateKey of automaton.states.keys()) {
            blockedAngles[stateKey] = [];
        }
        for (const start of automaton.start) {
            if (start.stateConj.length > 1) {
                let destinationStates = automaton.numbersToStates(start.stateConj);
                let statePositions = this.statesToPositions(destinationStates);
                let midpoint = this.calculateMidpointBetweenVectors(statePositions.concat(new Array(start.position)));
                for (const destinationState of destinationStates) {
                    let destinationVector = destinationState.position;
                    let toPoint = this.getNearestPointOnCircle(destinationVector, midpoint, circleSize);
                    blockedAngles[destinationState.number].push(this.calculateBlockedAngle(toPoint, destinationVector));
                }
            }
            else if (start.stateConj.length == 1) {
                let stateNumber = start.stateConj[0];
                let statePosition = automaton.getStateByNumber(stateNumber).position;
                let originVector = start.position;
                let destinationVector = this.getNearestPointOnCircle(statePosition, originVector, circleSize);
                let angle = this.calculateBlockedAngle(destinationVector, statePosition);

                blockedAngles[stateNumber].push(angle);
            }
        }
        return blockedAngles;
    }
    /**
     * Approximates the length of given bezier curve.
     * 
     * @param {number} iters - How many times should the curve be subdivided. Increses accuracy of the approximation.
     * @param {Victor} p0 - Point p0 of bezier the curve.
     * @param {Victor} p1 - Point p1 of bezier the curve.
     * @param {Victor} p2 - Point p2 of bezier the curve.
     * @param {Victor} p3 - Point p3 of bezier the curve, if the curve si cubic.
     * @returns {number} The approximate length.
     */
    static approxBezierLength(iters, p0, p1, p2, p3 = null) {
        let len = this.getPointsOnBezier(iters, p0, p1, p2, p3).slice(-1)[0];
        return len;
    }
    /**
     * Generates the given amount of points along the given bezier curve. The t parameter of the points is evenly spaced.
     * 
     * @param {number} count - How many point should be generated.
     * @param {Victor} p0 - Point p0 of bezier the curve.
     * @param {Victor} p1 - Point p1 of bezier the curve.
     * @param {Victor} p2 - Point p2 of bezier the curve.
     * @param {Victor} p3 - Point p3 of bezier the curve, if the curve si cubic.
     * @returns {Victor[]} Array of points along the curve.
     */
    static getPointsOnBezier(count, p0, p1, p2, p3 = null) {
        let points = [];
        for (let i = 0; i < count - 1; i++) {
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
            points.push((points[points.length - 1] || 0) + segment1.subtract(segment2).length());
        }
        return points
    }
    /**
     * Estimates the t parameter of given Bezier curve at given percentage of length.
     * 
     * @param {Victor[]} arrayOfPoints - Array of points along the curve.
     * @param {number} percentage - The percentage of length to which the t parameter should correspond.
     * @returns {number} The estimated t parameter.
     */
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
        return optimalIndex / (arrayOfPoints.length - 1);
    }

    /**
     * Generates text style string with given size.
     * 
     * @param {number} size - Text size of generated style.
     * @returns {string} Style string for the canvas.
     */
    static textStyle(size) {
        size = Math.floor(size);
        return size + "px Arial";
    }
}
exports.EditorUtils = EditorUtils;
