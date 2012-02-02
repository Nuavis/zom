var Class = function(exs, init, proto) {
    init.prototype = {};
    if (exs[1]) {
        for (var i in exs) {
            for (var u in exs[i].prototype) {
                init.prototype[u] = exs[i].prototype[u];
            }
        }
    }
    else {
        for (var u in exs.prototype) {
            init.prototype[u] = exs.prototype[u];
        }
    }
    for (var u in proto) {
        init.prototype[u] = proto[u];
    }
    return init;
};