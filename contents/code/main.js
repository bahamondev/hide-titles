var BANNED_RESOURCES = [
    "plasmashell",
    "yakuake"
];

workspace.clientMaximizeSet.connect(function(client, h, v) {
    if (canRemoveDecoration(client)) {
        client.noBorder = h && v;
    }
});

workspace.clientAdded.connect(function(client) {
    if (canRemoveDecoration(client)) {
        var area = workspace.clientArea(KWin.MaximizeArea, client);
        client.noBorder = client.width >= area.width && client.height >= area.height;
    }
});

function canRemoveDecoration(client) {
    return BANNED_RESOURCES.indexOf(client.resourceClass.toString()) < 0;
}
