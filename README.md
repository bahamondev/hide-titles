# Hide titles

A KWin script which hides the window titles when they are maximized.

## Setup

### Build

Just run `make build`. That will create a zip file with plugin contents and rename it to the `.kwinscript` extension.
If you want to manually build the script then:

1. Compress the `contents` folder and the `metadata.desktop` file into a zip
2. Rename the zip to `hide-titles.kwinscript`

### Install

Go to the project folder and run `make install`. That should clean and uninstall previous builds, perform a new build and install the plugin in the system.

If you want to manually install the script:

```sh
plasmapkg2 -t kwinscript -i hide-titles.kwinscript
```

### Uninstall

Run `make uninstall`.

## Features

Removes the window title on:

* New windows that starts maximized.
* Open windows when the user maximized then.
* Open windows that are already maximized, when the plugin is activated.

And never applies on windows that always start without window borders (ie, latte dock, Application Menu widget...).

To-do list:

* Let the user set up application exceptions.
* Apply the script only in pre-set screens.

## Contact

Created by [@bahamondev](https://bahamonde.dev) - feel free to contact me!

## License

This project is licensed under the GPLv3 License - see the LICENSE.md file for details.
