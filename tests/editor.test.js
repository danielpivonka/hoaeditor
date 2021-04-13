// @ts-nocheck
let parse = require('../src/parser/parser').parse;
const EditorCanvas = require('../src/editor/editorCanvas').EditorCanvas;
let canvas;
let ctx;
let editor;
beforeEach(() => {
  canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  ctx = canvas.getContext("2d");
  editor = new EditorCanvas(canvas);
});
test('implicit state labels', () => {
  let hoaIn = 'HOA: v1\
    States: 3\
    Start: 0\
    acc-name: Rabin 1\
    Acceptance: 2 (Fin(0) & Inf(1))\
    AP: 2 "a" "b"\
    --BODY--\
    State: 0 "a U b" { 0 }\
    2  /* !a  & !b */\
    0  /*  a  & !b */\
    1  /* !a  &  b */\
    1  /*  a  &  b */\
    State: 1 { 1 }\
    1 1 1 1       /* four transitions on one line */\
    State: 2 "sink state" { 0 }\
    2 2 2 2\
    --END--';

  let result = parse(hoaIn);
  editor.setAutomaton(result);
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
})
test('alternating start', () => {
  let hoaIn = 'HOA: v1\
    name: "(Fa & G(b&Xc)) | c"\
    States: 4\
    Start: 0&2\
    Start: 3\
    acc-name: co-Buchi\
    Acceptance: 1 Fin(0)\
    AP: 3 "a" "b" "c"\
    --BODY--\
    State: 0 "Fa"\
    [t] 0 {0}\
    [0] 1\
    State: 1 "true"\
    [t] 1\
    State: 2 "G(b&Xc)"\
    [1] 2&3\
    State: 3 "c"\
    [2] 1\
    --END--';

  let result = parse(hoaIn);
  editor.setAutomaton(result);
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
})
test('alternating edge', () => {
  let hoaIn = 'HOA: v1\
    name: "GFa | G(b <-> Xa)"\
    Start: 0\
    acc-name: Buchi\
    Acceptance: 1 Inf(0)\
    AP: 2 "a" "b"\
    properties: explicit-labels trans-labels trans-acc\
    --BODY--\
    State: 0\
     [t] 1\
     [1] 2\
     [!1] 3\
    State: 1 "GFa"\
     [0] 1 {0}\
     [!0] 1\
    State: 2 "a & G(b <-> Xa)"\
     [0&1] 2 {0}\
     [0&!1] 3 {0}\
    State: 3 "!a & G(b <-> Xa)"\
     [!0&1] 2 {0}\
     [!0&!1] 3 {0}\
    --END--';

  let result = parse(hoaIn);
  editor.setAutomaton(result);
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
})

test('unlabeled edge', () => {
  let hoaIn = 'HOA: v1\
    Start: 0\
    Acceptance: 1 Inf(0)\
    AP: 2 "a" "b"\
    --BODY--\
    State: 0\
     [t] 1\
     2\
    State: 1\
     [0] 1 {0}\
     1\
    State: 2\
     [0&1] 2 {0}\
    --END--';

  let result = parse(hoaIn);
  editor.setAutomaton(result);
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
})

test('state label', () => {
  let hoaIn = 'HOA: v1\
    name: "GFa"\
    States: 2\
    Start: 0\
    Start: 1\
    acc-name: Buchi\
    Acceptance: 1 Inf(0)\
    AP: 1 "a"\
    --BODY--\
    State: [0] 0 {0}\
      0 1\
    State: [!0] 1\
      0 1\
    --END--';

  let result = parse(hoaIn);
  editor.setAutomaton(result);
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
})
test('move state', () => {
  let hoaIn = 'HOA: v1\
    name: "GFa"\
    States: 2\
    Start: 0\
    Start: 1\
    acc-name: Buchi\
    Acceptance: 1 Inf(0)\
    AP: 1 "a"\
    --BODY--\
    State: [0] 0 {0}\
      0 1\
    State: [!0] 1\
      0 1\
    --END--';

  let result = parse(hoaIn);
  editor.setAutomaton(result);
  var downEvt = new MouseEvent("mouseDown", {
    clientX: 270,
    clientY: 300,
  });
  editor.mouseDown(downEvt);
  var moveEvt = new MouseEvent("mouseDown", {
    clientX: 400,
    clientY: 400,
  });
  editor.mouseMove(moveEvt);
  editor.mouseUp(moveEvt);
  let automaton = editor.getAutomaton();
  let position = automaton.getStateByNumber(0).position;
  expect(position.x).toBeLessThan(400 + editor.circleSize / 2);
  expect(position.y).toBeLessThan(400 + editor.circleSize / 2);
  expect(position.x).toBeGreaterThan(400 - editor.circleSize / 2);
  expect(position.y).toBeGreaterThan(400 - editor.circleSize / 2);
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
})

test('move start', () => {
  let hoaIn = 'HOA: v1\
    name: "GFa"\
    States: 2\
    Start: 0\
    Start: 1\
    acc-name: Buchi\
    Acceptance: 1 Inf(0)\
    AP: 1 "a"\
    --BODY--\
    State: [0] 0 {0}\
      0 1\
    State: [!0] 1\
      0 1\
    --END--';

  let result = parse(hoaIn);
  editor.setAutomaton(result);
  let automaton = editor.getAutomaton();
  let oldPosition = automaton.start[0].position.clone();
  var downEvt = new MouseEvent("mouseDown", {
    clientX: oldPosition.x,
    clientY: oldPosition.y,
  });
  editor.mouseDown(downEvt);
  var moveEvt = new MouseEvent("mouseDown", {
    clientX: oldPosition.x+10,
    clientY: oldPosition.y+10,
  });
  editor.mouseMove(moveEvt);
  editor.mouseUp(moveEvt);
  let newPosition = automaton.start[0].position;
  console.log(oldPosition.toString());
  console.log(newPosition.toString());
  expect(newPosition.x).toBeLessThan(oldPosition.x+10 + editor.circleSize / 5);
  expect(newPosition.y).toBeLessThan(oldPosition.y+10 + editor.circleSize / 5);
  expect(newPosition.x).toBeGreaterThan(oldPosition.x+10 - editor.circleSize / 5);
  expect(newPosition.y).toBeGreaterThan(oldPosition.y+10 - editor.circleSize / 5);
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
})
test('move miss', () => {
  let hoaIn = 'HOA: v1\
    name: "GFa"\
    States: 2\
    Start: 0\
    Start: 1\
    acc-name: Buchi\
    Acceptance: 1 Inf(0)\
    AP: 1 "a"\
    --BODY--\
    State: [0] 0 {0}\
      1\
    State: [!0] 1\
      0\
    --END--';

  let result = parse(hoaIn);
  editor.setAutomaton(result);
  var downEvt = new MouseEvent("mouseDown", {
    clientX: 100,
    clientY: 100,
  });
  editor.mouseDown(downEvt);
  var moveEvt = new MouseEvent("mouseDown", {
    clientX: 200,
    clientY: 200,
  });
  editor.mouseMove(moveEvt);
  editor.mouseUp(moveEvt);
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
})