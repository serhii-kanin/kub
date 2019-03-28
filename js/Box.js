function Box(x, y, z)
{
    this.position = {
        x: x,
        y: y,
        z: z
    };

    this.openSides = {
        left: x == -1,
        right: x == 1,
        back: z == -1,
        front: z == 1,
        bottom: y == -1,
        top: y == 1,
    };

    this.rotateFront = function(hexList) {
        this.color.back.setHex(hexList.bottom);
        this.color.bottom.setHex(hexList.front);
        this.color.front.setHex(hexList.top);
        this.color.top.setHex(hexList.back);
        this.color.left.setHex(hexList.left);
        this.color.right.setHex(hexList.right);
        this.mesh.geometry.colorsNeedUpdate = true;
    };

    this.rotateFrontInverse = function(hexList) {
        this.color.back.setHex(hexList.top);
        this.color.top.setHex(hexList.front);
        this.color.front.setHex(hexList.bottom);
        this.color.bottom.setHex(hexList.back);
        this.color.left.setHex(hexList.left);
        this.color.right.setHex(hexList.right);
        this.mesh.geometry.colorsNeedUpdate = true;
    };

    this.rotateLeft = function(hexList) {
        this.color.left.setHex(hexList.top);
        this.color.top.setHex(hexList.right);
        this.color.right.setHex(hexList.bottom);
        this.color.bottom.setHex(hexList.left);
        this.color.front.setHex(hexList.front);
        this.color.back.setHex(hexList.back);

        this.mesh.geometry.colorsNeedUpdate = true;
    };

    this.rotateLeftInverse = function(hexList) {
        this.color.left.setHex(hexList.bottom);
        this.color.bottom.setHex(hexList.right);
        this.color.right.setHex(hexList.top);
        this.color.top.setHex(hexList.left);
        this.color.front.setHex(hexList.front);
        this.color.back.setHex(hexList.back);
        this.mesh.geometry.colorsNeedUpdate = true;
    };

    this.rotateTopInverse = function(hexList) {
        this.color.left.setHex(hexList.front);
        this.color.front.setHex(hexList.right);
        this.color.right.setHex(hexList.back);
        this.color.back.setHex(hexList.left);

        this.color.top.setHex(hexList.top);
        this.color.bottom.setHex(hexList.bottom);
        this.mesh.geometry.colorsNeedUpdate = true;
    };

    this.rotateTop = function(hexList) {
        this.color.left.setHex(hexList.back);
        this.color.back.setHex(hexList.right);
        this.color.top.setHex(hexList.top);
        this.color.right.setHex(hexList.front);
        this.color.bottom.setHex(hexList.bottom);
        this.color.front.setHex(hexList.left);
        this.mesh.geometry.colorsNeedUpdate = true;
    };

    var grayColor = new THREE.Color(0.7,0.7,0.7);
    this.color = {
        top: !this.openSides.top ? grayColor : new THREE.Color(0, 1, 0),
        left: !this.openSides.left ? grayColor : new THREE.Color(1, 0, 0),
        right: !this.openSides.right ? grayColor : new THREE.Color(1, 1, 1),
        back: !this.openSides.back ? grayColor : new THREE.Color(1, 0.5, 0.2),
        bottom: !this.openSides.bottom ? grayColor : new THREE.Color(0, 0, 1),
        front: !this.openSides.front ? grayColor : new THREE.Color(1, 1, 0),
        isSideColor: function(colorHex) {
            var colors = this.getHexList();
            for(var k in colors) {
                if (colors[k] == colorHex && k!='top' && k!='bottom') {
                    return true;
                }
            }
            return false;
        },
        isBottomColor: function(colorHex) {
            return colorHex == this.bottom.getHex();
        },
        isTopColor: function(colorHex) {
            return colorHex == this.top.getHex();
        },
        getHexList: function() {
            return {
                top: this.top.getHex(),
                left: this.left.getHex(),
                right: this.right.getHex(),
                back: this.back.getHex(),
                bottom: this.bottom.getHex(),
                front: this.front.getHex()
            }
        }
    };

    this.createMesh = function() {
        var geometry = this.createGeometry();
        var material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors
        });

        var mesh = new THREE.Mesh( geometry, material);
        mesh.position.x = this.position.x  * (scale + scale * boxMargin);
        mesh.position.y = this.position.y  * (scale + scale * boxMargin);
        mesh.position.z = this.position.z  * (scale + scale * boxMargin);

        return mesh;
    };

    this.createGeometry = function() {
        var geometry = new THREE.BoxGeometry( scale, scale, scale );

        geometry.faces[1].color = geometry.faces[0].color = this.color.right;
        geometry.faces[2].color = geometry.faces[3].color = this.color.left;
        geometry.faces[4].color = geometry.faces[5].color = this.color.top;
        geometry.faces[6].color = geometry.faces[7].color = this.color.bottom;
        geometry.faces[8].color = geometry.faces[9].color = this.color.front;
        geometry.faces[10].color = geometry.faces[11].color = this.color.back;
        return geometry;
    };

    this.isTop = function() {
        return this.position.y == 1;
    };
    this.isBottom = function() {
        return this.position.y == -1;
    };
    this.isFront = function() {
        return this.position.z == 1;
    };
    this.isBack = function() {
        return this.position.z == -1;
    };
    this.isLeft = function() {
        return this.position.x == -1;
    };

    this.getRoundPosition = function()
    {
        if (this.isLeft()) {
            return 'left';
        } else if(this.isRight()) {
            return 'right';
        } else if(this.isBack()) {
            return 'back';
        } else if(this.isFront()) {
            return 'front';
        }
    };

    this.is = function(what) {
        //var allowedList = [
        //    'left', 'right', 'top', 'bottom'
        //];

        var f = 'is' + what.charAt(0).toUpperCase();
        f += what.substr(1, what.length-1);
        return this[f]();
    }

    this.isRight = function() {
        return this.position.x == 1;
    };
    this.isCentral = function() {
        return this.position.y == 0;
    };

    this.isCorner = function() {
        return this.position.x !=0 && this.position.z !=0 && this.position.y != 0;
    };

    this.isEdge = function() {
        return this.position.x!=0 && this.position.z == 0 && this.position.y !=0 ||
            this.position.z !=0 && this.position.x == 0 && this.position.y != 0;
    };

    this.isRotating = function() {
        return (
            Math.abs(this.position.x) +
            Math.abs(this.position.y) +
            Math.abs(this.position.z)
        ) != 1;
    };

    this.isCentralRotatingWithSideColor = function(colorHex) {
        var pos = this.position;
        var isCenter = (pos.x != 0 && pos.z != 0);
        return isCenter && this.isCentral() && this.isRotating() && this.color.isSideColor(colorHex);
    };
    this.isBottomRotatingWithSideColor = function(colorHex) {
        var pos = this.position;
        var isCenter =  ((pos.z != 0 && pos.x == 0) ||
            (pos.x != 0 && pos.z == 0));
        return isCenter && this.isBottom() && this.isRotating() && this.color.isSideColor(colorHex);
    };
    this.isTopRotatingWithSideColor = function(colorHex) {
        var pos = this.position;
        var isCenter =  ((pos.z != 0 && pos.x == 0) ||
            (pos.x != 0 && pos.z == 0));
        return isCenter && this.isTop() && this.isRotating() && this.color.isSideColor(colorHex);
    };
    this.isBottomCentralRotatingWithBottomColor = function(colorHex) {
        var pos = this.position;
        var isCenter =  ((pos.z != 0 && pos.x == 0) ||
            (pos.x != 0 && pos.z == 0));
        return isCenter && this.isBottom() && this.isRotating() && this.color.isBottomColor(colorHex);
    };
    this.isTopCentralRotatingWithTopColor = function(colorHex) {
        var pos = this.position;
        var isCenter =  ((pos.z != 0 && pos.x == 0) ||
            (pos.x != 0 && pos.z == 0));
        return isCenter && this.isTop() && this.isRotating() && this.color.isTopColor(colorHex);
    };

    this.hasColors = function(one, two, three) {
        var colorsToCheck = [one, two, three];

        if (three == null) {
            colorsToCheck.pop();
        }
        var matchCount = 0;
        var hexColors = this.color.getHexList();
        for(var k in hexColors) {
            if (colorsToCheck.indexOf(hexColors[k]) != -1) {
                matchCount++;
            }
        }
        return matchCount == colorsToCheck.length;
    };

    this.hasColor = function(color) {
        var hexColors = this.color.getHexList();
        for(var k in hexColors) {
            if (hexColors[k] == color) {
                return true;
            }
        }
        return false;
    };


    this.mesh = this.createMesh();

    return this;
}
