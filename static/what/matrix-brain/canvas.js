// Animation frame API
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// Get canvas info
function CanvasElement(id) {
    this.element = document.getElementById(id);
    this.context = this.element.getContext('2d');
    this.height = this.element.height = this.element.clientHeight;
    this.width = this.element.width = this.element.clientWidth;
}

CanvasElement.prototype = {
  clear: function() {
    this.context.clearRect(0, 0, this.width, this.height);
    return this;
  },
  color: function(col) {
    this.context.fillStyle = col;
    return this;
  },
  square: function(x, y, s) {
    this.context.fillRect(x, y, s, s);
    return this;
  },
  circle: function(x, y, s) {
    this.context.beginPath();
    this.context.arc(x, y, s, 0, Math.PI*2, true); 
    this.context.closePath();
    this.context.fill();
  }
  
};