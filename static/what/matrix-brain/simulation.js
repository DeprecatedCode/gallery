// Setup components
var brain = new AIBrain('brain');
var world = new AIWorld('world');

// Simulation
var simulation = {
  _size: 10,
  size: function(s) {
    simulation._size = s;
    simulation.reset();
  },
  reset: function() {
    brain.reset(simulation._size, simulation._size);
    world.reset(40, 40);
  },
  frame: function() {
    
    // Draw brain
    brain.draw();
    
        // Continue drawing
        requestAnimFrame(simulation.frame);
  }
};

$(simulation.reset);
$(simulation.frame);
setInterval(function() {
  $('#braininfo').html(brain.stats());
}, 100);