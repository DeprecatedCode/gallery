function AIWorld(elId) {
  this.elId = elId;
  this.state = {};
}

AIWorld.prototype = {
  reset: function(w, h) {
    this.canvas = new CanvasElement(this.elId);
    this.canvas.clear();
  }
};