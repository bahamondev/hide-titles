# Hide titles

A Kwin script which hides the window titles when they are maximized.

## Setup

### Build

Just run the build script. That will create a zip file with plugin contents and rename it to the `.kwinscript` exception.
If you want to manually build the script then:

1. Compress de `contents` folder and the `metadata.desktop` file into a zip.
2. Rename de zip to `hide-titles.kwinscript`.

### Install

Go to the project folder and run:

``` sh
.\installation.sh
```

That should clean, build and instal the plugin in the system.

If you want to manually install the script:

```bash
plasmapkg2 -t kwinscript -i hide-titles.kwinscript
```

### Uninstall

To uninstall run:

```bash
plasmapkg2 -t kwinscript -r hide-titles.kwinscript
```

## Features

Removes the window title on:

* New windows that starts maximized
* Open windows when the user maximize then.
* Open windows that are already maximized, when the plugin is activated.

And never applies on windows that always start without window borders (ie, latte dock, Application Menu widget...)

To-do list:

* Let the user configure application exceptions

## Contact

Created by [@bahamondev](https://bahamonde.dev) - feel free to contact me!

## License

This project is licensed under the GPLv3 License - see the LICENSE.md file for details
