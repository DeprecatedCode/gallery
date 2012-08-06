# [Nate Ferrero](/) / [Brainsssss](/what/matrix-brain)

{{follow-buttons}}

# AI Matrix Brain Selection
By Nate Ferrero, Oct 18th, 2011

<script src="/static/what/matrix-brain/canvas.js"></script>
<script src="/static/what/matrix-brain/brain.js"></script>
<script src="/static/what/matrix-brain/world.js"></script>
<script src="/static/what/matrix-brain/simulation.js"></script>
<link rel="stylesheet" type="text/css" href="/static/what/matrix-brain/style.css" />
<script>_fx_off = true</script>

<div class="mb">
  <script>
    function showStory() {
      if(!$('#story table').length)
        $('#story').load('/what/matrix-brain-story');
      $('#shst').hide(); $('#story').show();
      return false;
    }
  </script>
  <a href="#" id="shst" onclick="return showStory();">Read the story &rArr;</a>
  <div id="story" style="display:none;">Loading story...</div>
  <h1>Simulation</h1>
  <h3>Brain Visualization (colored neurons are active)</h3>
  <h3>&nbsp;</h3>
  <canvas id="brain"></canvas>
  <p>
  <button onclick="simulation.reset()">New Random Brain</button>
  <button onclick="simulation.mutate()">Mutate Brain</button>
  Size
  <select id="size" onchange="simulation.size(this.value);">
    <option value="1">1x1</option>
    <option value="2">2x2</option>
    <option value="4">4x4</option>
    <option value="5">5x5</option>
    <option value="8">8x8</option>
    <option value="10" selected="selected">10x10</option>
    <option value="16">16x16</option>
    <option value="20">20x20</option>
    <option value="25">25x25</option>
    <option value="40">40x40</option>
    <option value="50">50x50</option>
    <option value="80">80x80</option>
    <option value="100">100x100</option>
  </select>
  </p><p id="braininfo"></p>
</div>
<div>
  <h3>World Visualization</h3>
  <canvas id="world"></canvas>
  <p>Environment:
  <select id="environment">
    <option value="robot">Robot in Room</option>
    <option value="math-add">Math: Addition</option>
    <option value="math-subtract">Math: Subtraction</option>
    <option value="math-multiply">Math: Multiplication</option>
    <option value="math-divide">Math: Division</option>
  </select><br/>
  Metric:
  <select id="metric">
    <option value="collected">Coins Collected</option>
  </select>
  <select id="duration">
    <option value="1k">1K cycles</option>
    <option value="5k">5K cycles</option>
    <option value="10k">10K cycles</option>
    <option value="50k">50K cycles</option>
    <option value="10k">100K cycles</option>
    <option value="500k">500K cycles</option>
    <option value="1m">1M cycles</option>
    <option value="5m">5M cycles</option>
    <option value="10m">10M cycles</option>
  </select>
  <button onclick="simulation.test()">Run Test</button></p>
</div>