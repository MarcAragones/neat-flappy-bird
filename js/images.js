class ImageManager {
    constructor() {
        this.images = [];
    }

    get(name) {
        return this.images[name];
    }

    load(names, onLoad) {
        var pendingImages = names.length;

        function onImageLoaded() {
            pendingImages--;
            if (pendingImages <= 0) {
                onLoad();
            }
        }

        for (var i = 0; i < names.length; i++) {
            this.images[names[i]] = new Image();
            this.images[names[i]].src = 'assets/' + names[i] + '.png';
            this.images[names[i]].onload = onImageLoaded;
        }
    }
}
