const listener = require('./generated/hoaListener').hoaListener;
const hoaObject = require('../hoaObject').HOA;

class hoaListenerImpl extends listener {
    constructor() {
        super()
        listener.call(this);
        this.data = new hoaObject();
        this.lastState = null;
        this.positions;
    }
    enterFormatVersion(ctx) {
        this.data.setVersion(ctx.IDENTIFIER().getText());
    }
    enterStates(ctx) {
        this.data.setStateCount(parseInt(ctx.INT().getText()));
    }
    enterStart(ctx) {
        let stateConj = ctx.stateConj().getText();
        let stateConjArray = stateConj.split("&");
        let intArray = stateConjArray.map(x => parseInt(x, 10));
        this.data.addStart(intArray);
    }
    enterAp(ctx) {
        for (let i = 2; i < ctx.getChildCount(); i++) {
            this.data.addAp(ctx.getChild(i).getText().slice(1, -1));
        }
    }
    enterAlias(ctx) {
        this.data.addAlias(ctx.ANAME().getText(), ctx.lexpr().getText());
    }
    enterAcceptance(ctx) {
        this.data.setAcceptance(parseInt(ctx.INT().getText(), 10), ctx.acceptanceCond().getText());
    }
    enterAccname(ctx) {
        let accname = ctx.accstr().getChild(0).getText();
        for (let i = 1; i < ctx.accstr().getChildCount(); i++) {
            accname += " " + ctx.accstr().getChild(i).getText();
        }
        this.data.setAccname(accname);
    }
    enterTool(ctx) {
        this.data.setTool(ctx.toolstr().getText().slice(1, -1));
    }
    enterName(ctx) {
        this.data.setName(ctx.STRING().getText().slice(1, -1));
    }
    enterProps(ctx) {
        for (let i = 0; i < ctx.propval().getChildCount(); i++) {
            this.data.addProp(ctx.propval().getChild(i).getText());
        }
    }
    enterPositions(ctx) {
        this.positions = ctx.STRING().getText();
    }
    enterEtc(ctx) {
        let etc = [];
        for (let i = 0; i < ctx.getChildCount(); i++) {
            etc.push(ctx.getChild(i).getText());
        }
        this.data.addEtc(etc);
    }
    enterStateName(ctx) {
        let state = this.data.addState(parseInt(ctx.INT().getText(), 10));
        if (ctx.label()) {
            state.setLabel(ctx.label().lexpr().getText());
        }
        if (ctx.STRING()) {
            state.setName(ctx.STRING().getText().slice(1, -1));
        }
        if (ctx.accSig()) {
            for (let i = 1; i < ctx.accSig().getChildCount() - 1; i++) {
                state.addAccSet(parseInt(ctx.accSig().getChild(i).getText(), 10));
            }
        }
        this.lastState = state;
    }
    enterEdge(ctx) {
        let stateConj = ctx.stateConj().getText();
        let stateConjArray = stateConj.split("&");
        let intArray = stateConjArray.map(x => parseInt(x, 10));
        let edge = this.lastState.addEdge(intArray);
        if (ctx.label()) {
            edge.setLabel(ctx.label().lexpr().getText());
        }
        if (ctx.accSig()) {
            for (let i = 1; i < ctx.accSig().getChildCount() - 1; i++) {
                edge.addAccSet(parseInt(ctx.accSig().getChild(i).getText(), 10));
            }
        }
    }
    exitBody(ctx) {
        if (this.positions) {
            this.data.importPositions(this.positions);
        }
    }
}
exports.hoaListenerImpl = hoaListenerImpl;