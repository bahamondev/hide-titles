workspace.clientMaximizeSet.connect(function(client, h, v) {
    client.noBorder = h && v;
});

