function Kube() {
    this.selectionGroup = new THREE.Group();
    this.boxes = {};

    var zDescriptions = ['back', 'center', 'front'];
    var xDescription = ['left', 'center', 'right'];
    var yDescription = ['bottom', 'center', 'top'];
    for(var z = -1; z <= 1; z++) {
        for(var x = -1; x <= 1; x++) {
            for(var y = -1; y <= 1; y++) {
                var box = new Box(x, y, z);
                var key = xDescription[x+1] +'_' + yDescription[y+1] + '_' + zDescriptions[z+1];
                this.boxes[key] = box;
            }
        }
    }


    this.selectTop = function() {
        for(var k in this.boxes) {
            if (this.boxes[k].isTop()) {
                this.selectionGroup.add(this.boxes[k].mesh);
            }
        }
    };
    this.selectBottom = function() {
        for(var k in this.boxes) {
            if (this.boxes[k].isBottom()) {
                this.selectionGroup.add(this.boxes[k].mesh);
            }
        }
    };

    this.selectFront = function() {
        for(var k in this.boxes) {
            if (this.boxes[k].isFront()) {
                this.selectionGroup.add(this.boxes[k].mesh);
            }
        }
    };

    this.selectBack = function() {
        for(var k in this.boxes) {
            if (this.boxes[k].isBack()) {
                this.selectionGroup.add(this.boxes[k].mesh);
            }
        }
    };

    this.selectRight = function() {
        for(var k in this.boxes) {
            if (this.boxes[k].isRight()) {
                this.selectionGroup.add(this.boxes[k].mesh);
            }
        }
    };

    this.selectLeft = function() {
        this.selectionGroup.children = [];
        for(var k in this.boxes) {
            if (this.boxes[k].isLeft()) {
                this.selectionGroup.add(this.boxes[k].mesh);
            }
        }
    };

    this.getLeftTopFrontCorner = function() {
        for(var k in this.boxes) {
            var box = this.boxes[k];
            if (box.isTop() && box.isLeft() && box.isFront()) {
                return box;
            }
        }
    };

    this.getLeftTopBackCorner = function() {
        for(var k in this.boxes) {
            var box = this.boxes[k];
            if (box.isTop() && box.isLeft() && box.isBack()) {
                return box;
            }
        }
    };

    this.getRightTopFrontCorner = function() {
        for(var k in this.boxes) {
            var box = this.boxes[k];
            if (box.isTop() && box.isRight() && box.isFront()) {
                return box;
            }
        }
    };
    this.getRightTopBackCorner = function() {
        for(var k in this.boxes) {
            var box = this.boxes[k];
            if (box.isTop() && box.isRight() && box.isBack()) {
                return box;
            }
        }
    };
    this.getCorners = function() {
        var corners = [];
        for(var k in this.boxes) {
            if (this.boxes[k].isCorner()) {
                corners.push(this.boxes[k]);
            }
        }
        return corners;
    };

    /**
     * получить грани кубика но не углы
     */
    this.getEdges = function() {
        var edges = [];
        for(var k in this.boxes) {
            if(this.boxes[k].isEdge()) {
                edges.push(this.boxes[k]);
            }
        }
        return edges;
    };

    this.updateLeft = function() {
        var leftTopFrontHex = this.boxes['left_top_front'].color.getHexList();

        //corners
        this.boxes['left_top_front'].rotateFront(this.boxes['left_top_back'].color.getHexList());
        this.boxes['left_top_back'].rotateFront(this.boxes['left_bottom_back'].color.getHexList());
        this.boxes['left_bottom_back'].rotateFront(this.boxes['left_bottom_front'].color.getHexList());
        this.boxes['left_bottom_front'].rotateFront(leftTopFrontHex);


        //centers
        var leftTopCenterHex = this.boxes['left_top_center'].color.getHexList();
        this.boxes['left_top_center'].rotateFront(this.boxes['left_center_back'].color.getHexList());
        this.boxes['left_center_back'].rotateFront(this.boxes['left_bottom_center'].color.getHexList());
        this.boxes['left_bottom_center'].rotateFront(this.boxes['left_center_front'].color.getHexList());
        this.boxes['left_center_front'].rotateFront(leftTopCenterHex);
    };

    this.updateLeftInverse = function() {
        var leftTopFrontHex = this.boxes['left_top_front'].color.getHexList();

        //corners
        this.boxes['left_top_front'].rotateFrontInverse(this.boxes['left_bottom_front'].color.getHexList());
        this.boxes['left_bottom_front'].rotateFrontInverse(this.boxes['left_bottom_back'].color.getHexList());
        this.boxes['left_bottom_back'].rotateFrontInverse(this.boxes['left_top_back'].color.getHexList());
        this.boxes['left_top_back'].rotateFrontInverse(leftTopFrontHex);

        //centers
        var leftTopCenterHex = this.boxes['left_top_center'].color.getHexList();
        this.boxes['left_top_center'].rotateFrontInverse(this.boxes['left_center_front'].color.getHexList());
        this.boxes['left_center_front'].rotateFrontInverse(this.boxes['left_bottom_center'].color.getHexList());
        this.boxes['left_bottom_center'].rotateFrontInverse(this.boxes['left_center_back'].color.getHexList());
        this.boxes['left_center_back'].rotateFrontInverse(leftTopCenterHex);
    };


    this.updateRightInverse = function() {
        var leftTopFrontHex = this.boxes['right_top_front'].color.getHexList();

        //corners
        this.boxes['right_top_front'].rotateFrontInverse(this.boxes['right_bottom_front'].color.getHexList());
        this.boxes['right_bottom_front'].rotateFrontInverse(this.boxes['right_bottom_back'].color.getHexList());
        this.boxes['right_bottom_back'].rotateFrontInverse(this.boxes['right_top_back'].color.getHexList());
        this.boxes['right_top_back'].rotateFrontInverse(leftTopFrontHex);

        //centers
        var leftTopCenterHex = this.boxes['right_top_center'].color.getHexList();
        this.boxes['right_top_center'].rotateFrontInverse(this.boxes['right_center_front'].color.getHexList());
        this.boxes['right_center_front'].rotateFrontInverse(this.boxes['right_bottom_center'].color.getHexList());
        this.boxes['right_bottom_center'].rotateFrontInverse(this.boxes['right_center_back'].color.getHexList());
        this.boxes['right_center_back'].rotateFrontInverse(leftTopCenterHex);
    };

    this.updateRight = function() {
        var rightTopFrontHex = this.boxes['right_top_front'].color.getHexList();

        //corners
        this.boxes['right_top_front'].rotateFront(this.boxes['right_top_back'].color.getHexList());
        this.boxes['right_top_back'].rotateFront(this.boxes['right_bottom_back'].color.getHexList());
        this.boxes['right_bottom_back'].rotateFront(this.boxes['right_bottom_front'].color.getHexList());
        this.boxes['right_bottom_front'].rotateFront(rightTopFrontHex);


        //centers
        var rightTopCenterHex = this.boxes['right_top_center'].color.getHexList();
        this.boxes['right_top_center'].rotateFront(this.boxes['right_center_back'].color.getHexList());
        this.boxes['right_center_back'].rotateFront(this.boxes['right_bottom_center'].color.getHexList());
        this.boxes['right_bottom_center'].rotateFront(this.boxes['right_center_front'].color.getHexList());
        this.boxes['right_center_front'].rotateFront(rightTopCenterHex);

    };

    this.updateTop = function() {

        var rightTopFrontHex = this.boxes['right_top_front'].color.getHexList();

        //corners
        this.boxes['right_top_front'].rotateTop(this.boxes['left_top_front'].color.getHexList());
        this.boxes['left_top_front'].rotateTop(this.boxes['left_top_back'].color.getHexList());
        this.boxes['left_top_back'].rotateTop(this.boxes['right_top_back'].color.getHexList());
        this.boxes['right_top_back'].rotateTop(rightTopFrontHex);

        var centerTopFrontHex = this.boxes['center_top_front'].color.getHexList();

        //centers
        this.boxes['center_top_front'].rotateTop(this.boxes['left_top_center'].color.getHexList());
        this.boxes['left_top_center'].rotateTop(this.boxes['center_top_back'].color.getHexList());
        this.boxes['center_top_back'].rotateTop(this.boxes['right_top_center'].color.getHexList());
        this.boxes['right_top_center'].rotateTop(centerTopFrontHex);

    };

    this.updateTopInverse = function() {

        var rightTopFrontHex = this.boxes['right_top_front'].color.getHexList();

        //corners
        this.boxes['right_top_front'].rotateTopInverse(this.boxes['right_top_back'].color.getHexList());
        this.boxes['right_top_back'].rotateTopInverse(this.boxes['left_top_back'].color.getHexList());
        this.boxes['left_top_back'].rotateTopInverse(this.boxes['left_top_front'].color.getHexList());
        this.boxes['left_top_front'].rotateTopInverse(rightTopFrontHex);

        var centerTopFrontHex = this.boxes['center_top_front'].color.getHexList();

        //centers
        this.boxes['center_top_front'].rotateTopInverse(this.boxes['right_top_center'].color.getHexList());
        this.boxes['right_top_center'].rotateTopInverse(this.boxes['center_top_back'].color.getHexList());
        this.boxes['center_top_back'].rotateTopInverse(this.boxes['left_top_center'].color.getHexList());
        this.boxes['left_top_center'].rotateTopInverse(centerTopFrontHex);

    };

    this.updateBottom = function() {

        var rightBottomFrontHex = this.boxes['right_bottom_front'].color.getHexList();

        //corners
        this.boxes['right_bottom_front'].rotateTop(this.boxes['left_bottom_front'].color.getHexList());
        this.boxes['left_bottom_front'].rotateTop(this.boxes['left_bottom_back'].color.getHexList());
        this.boxes['left_bottom_back'].rotateTop(this.boxes['right_bottom_back'].color.getHexList());
        this.boxes['right_bottom_back'].rotateTop(rightBottomFrontHex);

        var centerBottomFrontHex = this.boxes['center_bottom_front'].color.getHexList();

        //centers
        this.boxes['center_bottom_front'].rotateTop(this.boxes['left_bottom_center'].color.getHexList());
        this.boxes['left_bottom_center'].rotateTop(this.boxes['center_bottom_back'].color.getHexList());
        this.boxes['center_bottom_back'].rotateTop(this.boxes['right_bottom_center'].color.getHexList());
        this.boxes['right_bottom_center'].rotateTop(centerBottomFrontHex);

    };

    this.updateBottomInverse = function() {

        var rightBottomFrontHex = this.boxes['right_bottom_front'].color.getHexList();

        //corners
        this.boxes['right_bottom_front'].rotateTopInverse(this.boxes['right_bottom_back'].color.getHexList());
        this.boxes['right_bottom_back'].rotateTopInverse(this.boxes['left_bottom_back'].color.getHexList());
        this.boxes['left_bottom_back'].rotateTopInverse(this.boxes['left_bottom_front'].color.getHexList());
        this.boxes['left_bottom_front'].rotateTopInverse(rightBottomFrontHex);

        var centerBottomFrontHex = this.boxes['center_bottom_front'].color.getHexList();

        //centers
        this.boxes['center_bottom_front'].rotateTopInverse(this.boxes['right_bottom_center'].color.getHexList());
        this.boxes['right_bottom_center'].rotateTopInverse(this.boxes['center_bottom_back'].color.getHexList());
        this.boxes['center_bottom_back'].rotateTopInverse(this.boxes['left_bottom_center'].color.getHexList());
        this.boxes['left_bottom_center'].rotateTopInverse(centerBottomFrontHex);

    };

    this.updateFront = function() {

        var rightTopFrontHex = this.boxes['right_top_front'].color.getHexList();

        //corners
        this.boxes['right_top_front'].rotateLeft(this.boxes['right_bottom_front'].color.getHexList());
        this.boxes['right_bottom_front'].rotateLeft(this.boxes['left_bottom_front'].color.getHexList());
        this.boxes['left_bottom_front'].rotateLeft(this.boxes['left_top_front'].color.getHexList());
        this.boxes['left_top_front'].rotateLeft(rightTopFrontHex);

        var rightCenterFrontHex = this.boxes['right_center_front'].color.getHexList();

        //corners
        this.boxes['right_center_front'].rotateLeft(this.boxes['center_bottom_front'].color.getHexList());
        this.boxes['center_bottom_front'].rotateLeft(this.boxes['left_center_front'].color.getHexList());
        this.boxes['left_center_front'].rotateLeft(this.boxes['center_top_front'].color.getHexList());
        this.boxes['center_top_front'].rotateLeft(rightCenterFrontHex);

    };

    this.updateBack = function() {

        var rightTopBackHex = this.boxes['right_top_back'].color.getHexList();

        //corners
        this.boxes['right_top_back'].rotateLeft(this.boxes['right_bottom_back'].color.getHexList());
        this.boxes['right_bottom_back'].rotateLeft(this.boxes['left_bottom_back'].color.getHexList());
        this.boxes['left_bottom_back'].rotateLeft(this.boxes['left_top_back'].color.getHexList());
        this.boxes['left_top_back'].rotateLeft(rightTopBackHex);

        var rightCenterBackHex = this.boxes['right_center_back'].color.getHexList();

        //corners
        this.boxes['right_center_back'].rotateLeft(this.boxes['center_bottom_back'].color.getHexList());
        this.boxes['center_bottom_back'].rotateLeft(this.boxes['left_center_back'].color.getHexList());
        this.boxes['left_center_back'].rotateLeft(this.boxes['center_top_back'].color.getHexList());
        this.boxes['center_top_back'].rotateLeft(rightCenterBackHex);

    };

    this.updateBackInverse = function() {
        var rightTopHex = this.boxes['right_top_back'].color.getHexList();

        //corners
        this.boxes['right_top_back'].rotateLeftInverse(this.boxes['left_top_back'].color.getHexList());
        this.boxes['left_top_back'].rotateLeftInverse(this.boxes['left_bottom_back'].color.getHexList());
        this.boxes['left_bottom_back'].rotateLeftInverse(this.boxes['right_bottom_back'].color.getHexList());
        this.boxes['right_bottom_back'].rotateLeftInverse(rightTopHex);

        var rightCenterHex = this.boxes['right_center_back'].color.getHexList();

        //corners
        this.boxes['right_center_back'].rotateLeftInverse(this.boxes['center_top_back'].color.getHexList());
        this.boxes['center_top_back'].rotateLeftInverse(this.boxes['left_center_back'].color.getHexList());
        this.boxes['left_center_back'].rotateLeftInverse(this.boxes['center_bottom_back'].color.getHexList());
        this.boxes['center_bottom_back'].rotateLeftInverse(rightCenterHex);
    };

    this.updateFrontInverse = function() {

        var rightTopFrontHex = this.boxes['right_top_front'].color.getHexList();

        //corners
        this.boxes['right_top_front'].rotateLeftInverse(this.boxes['left_top_front'].color.getHexList());
        this.boxes['left_top_front'].rotateLeftInverse(this.boxes['left_bottom_front'].color.getHexList());
        this.boxes['left_bottom_front'].rotateLeftInverse(this.boxes['right_bottom_front'].color.getHexList());
        this.boxes['right_bottom_front'].rotateLeftInverse(rightTopFrontHex);

        var rightCenterFrontHex = this.boxes['right_center_front'].color.getHexList();

        //corners
        this.boxes['right_center_front'].rotateLeftInverse(this.boxes['center_top_front'].color.getHexList());
        this.boxes['center_top_front'].rotateLeftInverse(this.boxes['left_center_front'].color.getHexList());
        this.boxes['left_center_front'].rotateLeftInverse(this.boxes['center_bottom_front'].color.getHexList());
        this.boxes['center_bottom_front'].rotateLeftInverse(rightCenterFrontHex);

    };

    return this;
}

