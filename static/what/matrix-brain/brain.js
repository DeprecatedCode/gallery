function AIBrain(elId) {
  this.bits = 16;
  this.elId = elId;
  this.state = {};
  this.nodes = {};
}

function AIBrainNode(dna) {
  this.dna = dna;
  
  // Determine color from DNA
  var c = [0, 0, 0];
  var total = 0;
  for(var i = 0; i < dna.length; i++) {
    c[i % 3] += parseInt(dna.charAt(i), 10);
    total++;
  }
  for(i = 0; i < 3; i++) {
    // * 3 for full color range
    c[i] = c[i] / total * 3 * 256;
    c[i] = c[i].toString(16);
    if(c[i].length == 1) c[i] = '0' + c[i];
  }
  this.color = '#'+c.join('');
}

AIBrain.prototype = {
  reset: function(w, h) {
    window.clearTimeout(AIBrain.runtimeout);
    this.width = w;
    this.height = h;
    this.cycle = 0;
    this.genNodes('random');
    this.canvas = new CanvasElement(this.elId);
    
    var dX = Math.floor((this.canvas.width) / w);
    var dY = Math.floor((this.canvas.height) / h);
    
    this.oX = (this.canvas.width - w * dX)/2;
    this.oY = (this.canvas.height - h * dY)/2;
    
    this.dS = Math.min(dX, dY);
    this.canvas.clear();
    this.step();
  },
  genNodes: function(type) {
    
    // Reset
    this.state = {};
    this.nodes = {};
    
    // Loop
    for(var i = 0; i < this.width; i++) {
      for(var j = 0; j < this.height; j++) {
        var slug = '_'+i+'_'+j;
        this.nodes[slug] = this.genNode(type);
        this.state[slug] = 0;
      }
    }
    
  },
  genNode: function(type) {
    var dna = '', i;
    switch(type) {
      case 'random':
        for(i = 0; i < this.bits; i++)
          dna+=Math.round(Math.random());
        break;
      default:
        for(i = 0; i < this.bits; i++)
          dna+='0';
    }
    return new AIBrainNode(dna);
  },
  step: function() {
    // Buffer changes
    var changes = {};
    var slug;
    
    for(var i = 0; i < this.width; i++) {
      for(var j = 0; j < this.height; j++) {
        
        // Get current state
        slug = '_'+i+'_'+j;
        var current = this.state[slug];
        
        // Get surrounding environment
        var env = 0;
        if(i > 0)
          env += 1*this.state['_'+(i-1)+'_'+j];
        
        if(j > 0)
          env += 2*this.state['_'+i+'_'+(j-1)];
        
        if(i < this.width - 1)
          env += 4*this.state['_'+(i+1)+'_'+j];
        
        if(j < this.height - 1)
          env += 8*this.state['_'+i+'_'+(j+1)];
        
        var newstate = parseInt(this.nodes[slug].dna.charAt(env), 10);
        if(newstate !== current)
          changes[slug] = Math.round(Math.random());
      }
    }
        
    // Apply changes
    for(slug in changes) {
      this.state[slug] = changes[slug]; 
    }
    
    // Increment cycle count
    this.cycle++;
    
    // Run again
    AIBrain.runtimeout = window.setTimeout(function(){brain.step();}, 0);
  },
  draw: function() {
    for(var i = 0; i < this.width; i++) {
      for(var j = 0; j < this.height; j++) {
        var slug = '_'+i+'_'+j;
        var node = this.nodes[slug];
        var state = this.state[slug];
        this.canvas.color(state ? node.color : '#000')
          .square(this.oX + i * this.dS, this.oY + j * this.dS, this.dS);
        
        // Circle nodes
        /*var cx = this.oX + i * this.dS + 0.5 * this.dS,
          cy = this.oY + j * this.dS + 0.5 * this.dS;
        this.canvas.color('#000')
          .circle(cx, cy, 0.35 * this.dS);
        this.canvas.color(state ? '#0f4' : '#111')
          .circle(cx, cy, 0.35 * this.dS - 1.5);
        this.canvas.color(state ? '#efe' : '#aaa')
          .circle(cx + 0.05 * this.dS, cy - 0.05 * this.dS, 0.075 * this.dS);*/
      }
    }
  },
  stats: function() {
    var s = 2 * this.width * this.height;
    return 'This brain\'s program is ' + s + ' bytes and has run for ' + this.cycle + ' cycles';  
  }
};