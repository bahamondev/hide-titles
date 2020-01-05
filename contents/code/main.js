workspace.clientMaximizeSet.connect(function(client, h, v) {
    client.noBorder = h && v;
});

workspace.clientAdded.connect(function(client) {
    var area = workspace.clientArea(KWin.MaximizeArea, client);
    client.noBorder = client.width >= area.width && client.height >= area.height;
});
