var nf = {des: [], fx: [], cs: [], hx: '23456789abcd', l: $('<div>').addClass('fx-layer')};
nf.rn = function(x) {
    return Math.abs(Math.floor(x * Math.random() - 0.001));
};
nf.rx = function() {
    return nf.hx[nf.rn(nf.hx.length)];
};
for(var i=0; i<6; i++) {
    nf.cs.push('#' + nf.rx() + nf.rx() + nf.rx());
}
nf.rs = function(pt) {
    var c = (nf.rn(100) > 50 ? 1 : -1);
    pt[4].css('background-color', c == 1 ? '#ace' : '#eaa');
    var w = document.body.offsetWidth, h = document.body.offsetHeight;
    pt[0] = (nf.rn(10) - 5) / 3;
    pt[1] = (nf.rn(10) - 5) / 3;
    pt[2] = nf.rn(w) - w / 2;
    pt[3] = nf.rn(h) - h / 2;
    pt[5] = c * (3 + nf.rn(3));
    return pt;
};
nf.pt = function() {
    var x = $('<div>').addClass('fx-pt');
    pt = nf.rs([0, 0, 0, 0, x, 0]);
    nf.fx.push(pt);
    nf.l.append(x);
};
nf.run = function() {
    if(nf.fx.length < 40) {
        if(nf.rn(2) == 1) {
            nf.pt();
        }
    }
    var _done = {};
    var w = document.body.offsetWidth;
    var h = document.body.offsetHeight;
    for(var i=nf.fx.length-1; i>=0; i--) {
        if(_done[i]) {
            continue;
        }
        var v = nf.fx[i];
        var dx = 0, dy = 0;
        for(var j=nf.fx.length-1; j>=0; j--) {
            if(j >= i) {
                continue;
            }
            var q = nf.fx[j];
            if(!q) {
                continue;
            }
            var ddx = v[2] - q[2], ddy = v[3] - q[3];
            dd = ddx*ddx + ddy*ddy;
            var ds = Math.sqrt(dd);
            if(ds > 250) {
                continue;
            }
            ddx = ddx / ds;
            ddy = ddy / ds;
            var cq = 10;
            var zx = cq * v[5] * q[5] * ddx / dd;
            var zy = cq * v[5] * q[5] * ddy / dd;
            v[0] += zx / Math.abs(v[5]);
            v[1] += zy / Math.abs(v[5]);
            q[0] -= zx / Math.abs(q[5]);
            q[1] -= zy / Math.abs(q[5]);
        }
        v[2] += v[0];
        v[3] += v[1];
        if(Math.abs(v[2]) > 1000 || Math.abs(v[3]) > 1000) {
            v = nf.rs(v);
        }
        var s = Math.abs(v[5]) / 5;
        var tr = 'scale('+s+', '+s+') translate(' + v[2] + 'px, ' + v[3] + 'px' + ')';
        v[4][0].style.webkitTransform = tr;
        v[4][0].style.transform = tr;
    }
};
$(function() {
    if(window._fx_off) {
        return;
    }
    $('body').append(nf.l);
    window.setInterval(nf.run, 20);
});