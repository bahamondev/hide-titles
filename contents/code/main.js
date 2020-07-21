var BANNED_RESOURCES = [
    "yakuake"
];

var CSD_CLIENTS = [];

workspace.clientMaximizeSet.connect(function(client, horizontalMaximized, verticalMaximized) {
    if (canRemoveDecoration(client)) {
        if (horizontalMaximized && verticalMaximized) {
            if (client.noBorder) {
                registCsd(client);
            }
            client.noBorder = true;
        } else {
            client.noBorder = isCsd(client);
            unregistCsd(client);
        }
    }
});

function isCsd(client) {
    return CSD_CLIENTS.indexOf(client.resourceClass.toString()) >= 0;
}

function unregistCsd(client) {
    const index = CSD_CLIENTS.indexOf(client.resourceClass.toString());
    if (index >= 0) {
        CSD_CLIENTS.slice(index, 1);
    }
}

function registCsd(client) {
    const index = CSD_CLIENTS.indexOf(client.resourceClass.toString());
    if (index < 0) {
        CSD_CLIENTS.push(client.resourceClass.toString());
    }
}

workspace.clientAdded.connect(function(client) {
    if (canRemoveDecoration(client)) {
        var area = workspace.clientArea(KWin.MaximizeArea, client);
        var isMaximized = client.width >= area.width && client.height >= area.height;
        
        client.noBorder = client.noBorder || isMaximized;
    }
});

function canRemoveDecoration(client) {
    return BANNED_RESOURCES.indexOf(client.resourceClass.toString()) < 0;
}
