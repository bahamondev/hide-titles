
var BANNED_RESOURCES = [
    "yakuake"
];

var csd = new CsdManager();

workspace.clientMaximizeSet.connect(function(client, horizontalMaximized, verticalMaximized) {
    if (canRemoveDecoration(client)) {
        if (horizontalMaximized && verticalMaximized) {
            csd.eval(client);
            client.noBorder = true;
        } else {
            client.noBorder = csd.isCsd(client);
            csd.eval(client);
        }
    }
});

workspace.clientAdded.connect(function(client) {
    if (canRemoveDecoration(client)) {
        var area = workspace.clientArea(KWin.MaximizeArea, client);
        var isMaximized = client.width >= area.width && client.height >= area.height;
        
        csd.eval(client);
        client.noBorder = client.noBorder || isMaximized;
    }
});

function canRemoveDecoration(client) {
    return BANNED_RESOURCES.indexOf(client.resourceClass.toString()) < 0;
}

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