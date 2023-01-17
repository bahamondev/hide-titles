var csd = new CsdManager();
var config = new Config();

function init() {
    initScreenEdges();
}

options.configChanged.connect(init);

workspace.clientMaximizeSet.connect(function(client, horizontalMaximized, verticalMaximized) {
    if (config.allowed(client)) {
        if (horizontalMaximized && verticalMaximized) {
            csd.eval(client);
            client.noBorder = true;
        } else {
            client.noBorder = csd.isCsd(client);
        }
    }
});

workspace.clientAdded.connect(function(client) {
    if (config.allowed(client)) {
        csd.eval(client);
        client.noBorder = client.noBorder || isMaximized(client);
    }
});

function isMaximized(client) {
    var area = workspace.clientArea(KWin.MaximizeArea, client);
    return client.width >= area.width && client.height >= area.height;
}

// CsdManager
function CsdManager() {
    this._csdClients = [];
}

CsdManager.prototype.eval = function(client) {
    if (client.noBorder) {
        this._registCsd(client);
    } else {
        this._unregistCsd(client);
    }
};
    
CsdManager.prototype.isCsd = function (client) {
    return this._csdClients.indexOf(client.resourceClass.toString()) >= 0;
}

CsdManager.prototype._unregistCsd = function(client) {
    const index = this._csdClients.indexOf(client.resourceClass.toString());
    if (index >= 0) {
        this._csdClients.splice(index, 1);
    }
}

CsdManager.prototype._registCsd = function(client) {
    const index = this._csdClients.indexOf(client.resourceClass.toString());
    if (index < 0) {
        this._csdClients.push(client.resourceClass.toString());
    }
}

// Config
function Config() {
    this._bannedClients = [
        "yakuake"
    ]
}

Config.prototype.allowed = function(client) {
    return this._bannedClients.indexOf(client.resourceClass.toString()) < 0;
}

// screen borders
function screenEdgeActivated() {
    for (client of workspace.clientList()) {
        if (client.active) {
            if (config.allowed(client) && !csd.isCsd(client) && isMaximized(client)) {
                client.noBorder = false;
            }
            return;
        }
    }
}

// magic code to register a screen edge listener that the user can then configure in screen edges settings
// it's just done this way, there isn't really an explanation in the docs
var registeredBorders = [];

function initScreenEdges() {
    for (var i in registeredBorders) {
        unregisterScreenEdge(registeredBorders[i]);
    }

    registeredBorders = [];

    var borders = readConfig("BorderActivate", "").toString().split(",");
    for (var i in borders) {
        var border = parseInt(borders[i]);
        if (isFinite(border)) {
            registeredBorders.push(border);
            registerScreenEdge(border, screenEdgeActivated);
        }
    }
}

init();