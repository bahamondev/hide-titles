.PHONY = clean build uninstall install

clean:
	@echo "Cleaning..."
	@rm -f hide-titles.kwinscript

build: clean
	@echo "Building..."
	@zip hide-titles.kwinscript -r contents LICENSE metadata.desktop

uninstall:
	@echo "Removing hide-titles script..."
	@-plasmapkg2 -t kwinscript -r hide-titles.kwinscript

install: uninstall build
	@echo "Installing hide-titles..."
	@plasmapkg2 -t kwinscript -i hide-titles.kwinscript
	@rm -f hide-titles.kwinscript

debug:
	qdbus org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.showInteractiveKWinConsole