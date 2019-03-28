
function SceneRotation() {

    //if (side == bottom) {
        var dx = prevRX + 1.57 * 2;
    //}

    this.isFinished = false;

    //scene.rotation.y = prevRY + mouseX / 100;
    //scene.rotation.x = prevRX + mouseY / 100;
    this.rotate = function() {
        if (this.isFinished) {
            return;
        }

        if (prevRX > dx) {
            prevRX =scene.rotation.x - 0.1;
        } else if (scene.rotation.x < dx) {
            prevRX =scene.rotation.x + 0.1;
        }

        if (this.checkRotated()) {
            this.isFinished = true;
        }
    };

    this.checkRotated = function() {
        if(Math.abs(prevRX - dx) <= 0.2) {
            return true;
        }
        return false;
    };
    return this;
}