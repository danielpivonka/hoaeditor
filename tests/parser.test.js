// @ts-nocheck
let parse = require('../src/parser/parser').parse;
let HoaObj = require('../src/hoaObject.js').HOA;


test('correct with etc', () => {
    let hoaIn = 'HOA: v1\
    States: 2\
    Start: 0\
    acc-name: Rabin 1\
    Acceptance: 2 (Fin(0) & Inf(1))\
    AP: 2 "a" "b"\
    additional: property1 property2\
    additional2: "property1" property2\
    --BODY--\
    State: 0 "a U b"   /* An example of named state */\
    [0 & !1] 0 {0}\
    [1] 1 {0}\
    State: 1\
    [t] 1 {1}\
    --END--';
    let hoaOut = 'HOA: v1\nStates: 2\nStart: 0\nacc-name: Rabin 1\nAcceptance: 2 (Fin(0)&Inf(1))\nAP: 2 "a" "b"\nadditional: property1 property2\nadditional2: "property1" property2\n--BODY--\nState: 0 "a U b"\n[0&!1] 0 {0}\n[1] 1 {0}\nState: 1\n[t] 1 {1}\n--END--\n';
    let json = '{"start":[[0]],"positions":[],"aliases":[],"ap":["a","b"],"properties":[],"etc":[["additional:","property1","property2"],["additional2:","\\\"property1\\\"","property2"]],"states":[{"number":0,"accSets":[],"edges":[{"stateConj":[0],"accSets":[0],"label":"0&!1"},{"stateConj":[1],"accSets":[0],"label":"1"}],"name":"a U b"},{"number":1,"accSets":[],"edges":[{"stateConj":[1],"accSets":[1],"label":"t"}]}],"version":"v1","stateCount":2,"accname":"Rabin 1","acceptance":{"count":2,"str":"(Fin(0)&Inf(1))"}}';
    let result = parse(hoaIn);
    expect(result.toHoaString()).toBe(hoaOut);
    expect(result).toEqual(JSON.parse(json));
})

test('correct single line transitions with accepting states', () => {
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
    let hoaOut = 'HOA: v1\nStates: 3\nStart: 0\nacc-name: Rabin 1\nAcceptance: 2 (Fin(0)&Inf(1))\nAP: 2 "a" "b"\n--BODY--\nState: 0 "a U b" {0}\n2\n0\n1\n1\nState: 1 {1}\n1\n1\n1\n1\nState: 2 "sink state" {0}\n2\n2\n2\n2\n--END--\n';
    let json = '{"start":[[0]],"positions":[],"aliases":[],"ap":["a","b"],"properties":[],"etc":[],"states":[{"number":0,"accSets":[0],"edges":[{"stateConj":[2],"accSets":[]},{"stateConj":[0],"accSets":[]},{"stateConj":[1],"accSets":[]},{"stateConj":[1],"accSets":[]}],"name":"a U b"},{"number":1,"accSets":[1],"edges":[{"stateConj":[1],"accSets":[]},{"stateConj":[1],"accSets":[]},{"stateConj":[1],"accSets":[]},{"stateConj":[1],"accSets":[]}]},{"number":2,"accSets":[0],"edges":[{"stateConj":[2],"accSets":[]},{"stateConj":[2],"accSets":[]},{"stateConj":[2],"accSets":[]},{"stateConj":[2],"accSets":[]}],"name":"sink state"}],"version":"v1","stateCount":3,"accname":"Rabin 1","acceptance":{"count":2,"str":"(Fin(0)&Inf(1))"}}';
    let result = parse(hoaIn);
    expect(result.toHoaString()).toBe(hoaOut);
    expect(result).toEqual(JSON.parse(json));
})

test('correct with name and tool', () => {
    let hoaIn = 'HOA: v1\
    name: "GFa & GFb"\
    tool: "tooly"\
    States: 1\
    Start: 0\
    acc-name: generalized-Buchi 2\
    Acceptance: 2 (Inf(0) & Inf(1))\
    AP: 2 "a" "b"\
    --BODY--\
    State: 0\
      0       /* !a  & !b */\
      0 {0}   /*  a  & !b */\
      0 {1}   /* !a  &  b */\
      0 {0 1} /*  a  &  b */\
    --END--';
    let hoaOut = 'HOA: v1\nStates: 1\nStart: 0\nacc-name: generalized-Buchi 2\nAcceptance: 2 (Inf(0)&Inf(1))\nAP: 2 "a" "b"\ntool: "tooly"\nname: "GFa & GFb"\n--BODY--\nState: 0\n0\n0 {0}\n0 {1}\n0 {0 1}\n--END--\n';
    let json = '{"start":[[0]],"positions":[],"aliases":[],"tool":"tooly","ap":["a","b"],"properties":[],"etc":[],"states":[{"number":0,"accSets":[],"edges":[{"stateConj":[0],"accSets":[]},{"stateConj":[0],"accSets":[0]},{"stateConj":[0],"accSets":[1]},{"stateConj":[0],"accSets":[0,1]}]}],"version":"v1","name":"GFa & GFb","stateCount":1,"accname":"generalized-Buchi 2","acceptance":{"count":2,"str":"(Inf(0)&Inf(1))"}}';
    let result = parse(hoaIn);
    expect(result.toHoaString()).toBe(hoaOut);
    expect(result).toEqual(JSON.parse(json));
})

test('correct with labeled', () => {
    let hoaIn = 'HOA: v1\
    name: "GFa & GFb"\
    States: 1\
    Start: 0\
    acc-name: generalized-Buchi 2\
    Acceptance: 2 (Inf(0) & Inf(1))\
    AP: 2 "a" "b"\
    --BODY--\
    State: 0\
      [!0 & !1] 0\
      [0 & !1]  0 {0}\
      [!0 & 1]  0 {1}\
      [0 & 1]   0 {0 1}\
    --END--';
    let hoaOut = 'HOA: v1\nStates: 1\nStart: 0\nacc-name: generalized-Buchi 2\nAcceptance: 2 (Inf(0)&Inf(1))\nAP: 2 "a" "b"\nname: "GFa & GFb"\n--BODY--\nState: 0\n[!0&!1] 0\n[0&!1] 0 {0}\n[!0&1] 0 {1}\n[0&1] 0 {0 1}\n--END--\n';
    let json = '{"start":[[0]],"positions":[],"aliases":[],"ap":["a","b"],"properties":[],"etc":[],"states":[{"number":0,"accSets":[],"edges":[{"stateConj":[0],"accSets":[],"label":"!0&!1"},{"stateConj":[0],"accSets":[0],"label":"0&!1"},{"stateConj":[0],"accSets":[1],"label":"!0&1"},{"stateConj":[0],"accSets":[0,1],"label":"0&1"}]}],"version":"v1","name":"GFa & GFb","stateCount":1,"accname":"generalized-Buchi 2","acceptance":{"count":2,"str":"(Inf(0)&Inf(1))"}}';
    let result = parse(hoaIn);
    expect(result.toHoaString()).toBe(hoaOut);
    expect(result).toEqual(JSON.parse(json));
})
test('correct with aliases', () => {
    let hoaIn = 'HOA: v1\
    name: "GFa & GF(b & c)"\
    States: 1\
    Start: 0\
    acc-name: generalized-Buchi 2\
    Acceptance: 2 (Inf(0) & Inf(1))\
    AP: 3 "a" "b" "c"\
    Alias: @a 0\
    Alias: @bc 1 & 2\
    --BODY--\
    State: 0\
    [!@a & !@bc] 0\
    [@a & !@bc]  0 {0}\
    [!@a & @bc]  0 {1}\
    [@a & @bc]   0 {0 1}\
    --END--';
    let hoaOut = 'HOA: v1\nStates: 1\nStart: 0\nacc-name: generalized-Buchi 2\nAcceptance: 2 (Inf(0)&Inf(1))\nAP: 3 "a" "b" "c"\nname: "GFa & GF(b & c)"\nAlias: @a 0\nAlias: @bc 1&2\n--BODY--\nState: 0\n[!@a&!@bc] 0\n[@a&!@bc] 0 {0}\n[!@a&@bc] 0 {1}\n[@a&@bc] 0 {0 1}\n--END--\n';
    let json = '{"start":[[0]],"positions":[],"aliases":[{"name":"@a","expr":"0"},{"name":"@bc","expr":"1&2"}],"ap":["a","b","c"],"properties":[],"etc":[],"states":[{"number":0,"accSets":[],"edges":[{"stateConj":[0],"accSets":[],"label":"!@a&!@bc"},{"stateConj":[0],"accSets":[0],"label":"@a&!@bc"},{"stateConj":[0],"accSets":[1],"label":"!@a&@bc"},{"stateConj":[0],"accSets":[0,1],"label":"@a&@bc"}]}],"version":"v1","name":"GFa & GF(b & c)","stateCount":1,"accname":"generalized-Buchi 2","acceptance":{"count":2,"str":"(Inf(0)&Inf(1))"}}';
    let result = parse(hoaIn);
    expect(result.toHoaString()).toBe(hoaOut);
    expect(result).toEqual(JSON.parse(json));
})
test('correct with state labels', () => {
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
    let hoaOut = 'HOA: v1\nStates: 2\nStart: 0\nStart: 1\nacc-name: Buchi\nAcceptance: 1 Inf(0)\nAP: 1 "a"\nname: "GFa"\n--BODY--\nState: [0] 0 {0}\n0\n1\nState: [!0] 1\n0\n1\n--END--\n';
    let json = '{"start":[[0],[1]],"positions":[],"aliases":[],"ap":["a"],"properties":[],"etc":[],"states":[{"number":0,"accSets":[0],"edges":[{"stateConj":[0],"accSets":[]},{"stateConj":[1],"accSets":[]}],"label":"0"},{"number":1,"accSets":[],"edges":[{"stateConj":[0],"accSets":[]},{"stateConj":[1],"accSets":[]}],"label":"!0"}],"version":"v1","name":"GFa","stateCount":2,"accname":"Buchi","acceptance":{"count":1,"str":"Inf(0)"}}';
    let result = parse(hoaIn);
    expect(result.toHoaString()).toBe(hoaOut);
    expect(result).toEqual(JSON.parse(json));
})
test('correct with properties', () => {
    let hoaIn = 'HOA: v1\
    name: "GFa | G(b <-> Xa)"\
    Start: 0\
    States: 4\
    acc-name: Buchi\
    Acceptance: 1 Inf(0)\
    AP: 2 "a" "b"\
    properties: explicit-labels trans-labels\
    --BODY--\
    State: 0\
    [t] 1\
    [1] 2\
    [!1] 3\
    State: 1 "GFa"\
    [0] 1 {0}\
    [!0] 1\
    State: 2 "a & G(b <-> Xa)" {0}\
    [0&1] 2\
    [0&!1] 3\
    State: 3 "!a & G(b <-> Xa)" {0}\
    [!0&1] 2\
    [!0&!1] 3\
    --END--';
    let hoaOut = 'HOA: v1\nStates: 4\nStart: 0\nacc-name: Buchi\nAcceptance: 1 Inf(0)\nAP: 2 "a" "b"\nname: "GFa | G(b <-> Xa)"\nproperties: explicit-labels trans-labels\n--BODY--\nState: 0\n[t] 1\n[1] 2\n[!1] 3\nState: 1 "GFa"\n[0] 1 {0}\n[!0] 1\nState: 2 "a & G(b <-> Xa)" {0}\n[0&1] 2\n[0&!1] 3\nState: 3 "!a & G(b <-> Xa)" {0}\n[!0&1] 2\n[!0&!1] 3\n--END--\n';
    let json = '{"start":[[0]],"positions":[],"aliases":[],"ap":["a","b"],"properties":["explicit-labels","trans-labels"],"etc":[],"states":[{"number":0,"accSets":[],"edges":[{"stateConj":[1],"accSets":[],"label":"t"},{"stateConj":[2],"accSets":[],"label":"1"},{"stateConj":[3],"accSets":[],"label":"!1"}]},{"number":1,"accSets":[],"edges":[{"stateConj":[1],"accSets":[0],"label":"0"},{"stateConj":[1],"accSets":[],"label":"!0"}],"name":"GFa"},{"number":2,"accSets":[0],"edges":[{"stateConj":[2],"accSets":[],"label":"0&1"},{"stateConj":[3],"accSets":[],"label":"0&!1"}],"name":"a & G(b <-> Xa)"},{"number":3,"accSets":[0],"edges":[{"stateConj":[2],"accSets":[],"label":"!0&1"},{"stateConj":[3],"accSets":[],"label":"!0&!1"}],"name":"!a & G(b <-> Xa)"}],"version":"v1","name":"GFa | G(b <-> Xa)","stateCount":4,"accname":"Buchi","acceptance":{"count":1,"str":"Inf(0)"}}';
    let result = parse(hoaIn);
    expect(result.toHoaString()).toBe(hoaOut);
    expect(result).toEqual(JSON.parse(json));
})
