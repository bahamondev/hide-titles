workspace.clientMaximizeSet.connect((client, h, v) => {
    client.noBorder = h && v;
});

