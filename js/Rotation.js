
function Rotation(name, kube, step) {
    this.name = name;
    this.kube = kube;
    this.settings = {
        left: {
            axis: 'x',
            position: kube.selectionGroup.rotation['x'] + 1.57,
            direction: 1,
            kubeEdgeSelector: function() {kube.selectLeft()},
            kubeEdgeUpdateSelector: function() {kube.updateLeft()}
        },
        leftInverse: {
            axis: 'x',
            position: kube.selectionGroup.rotation['x'] - 1.57,
            direction: -1,
            kubeEdgeSelector: function() {kube.selectLeft()},
            kubeEdgeUpdateSelector: function() {kube.updateLeftInverse()}
        },
        right: {
            axis: 'x',
            position: kube.selectionGroup.rotation['x'] + 1.57,
            direction: 1,
            kubeEdgeSelector: function() {kube.selectRight()},
            kubeEdgeUpdateSelector: function() {kube.updateRight()}
        },
        rightInverse: {
            axis: 'x',
            position: kube.selectionGroup.rotation['x'] - 1.57,
            direction: -1,
            kubeEdgeSelector: function() {kube.selectRight()},
            kubeEdgeUpdateSelector: function() {kube.updateRightInverse()}
        },
        front: {
            axis: 'z',
            position: kube.selectionGroup.rotation['z'] + 1.57,
            direction: 1,
            kubeEdgeSelector: function() {kube.selectFront()},
            kubeEdgeUpdateSelector: function() {kube.updateFront()}
        },
        back: {
            axis: 'z',
            position: kube.selectionGroup.rotation['z'] + 1.57,
            direction: 1,
            kubeEdgeSelector: function() {kube.selectBack()},
            kubeEdgeUpdateSelector: function() {kube.updateBack()}
        },
        backInverse: {
            axis: 'z',
            position: kube.selectionGroup.rotation['z'] - 1.57,
            direction: -1,
            kubeEdgeSelector: function() {kube.selectBack()},
            kubeEdgeUpdateSelector: function() {kube.updateBackInverse()}
        },
        frontInverse: {
            axis: 'z',
            position: kube.selectionGroup.rotation['z'] - 1.57,
            direction: -1,
            kubeEdgeSelector: function() {kube.selectFront()},
            kubeEdgeUpdateSelector: function() {kube.updateFrontInverse()}
        },
        top: {
            axis: 'y',
            position: kube.selectionGroup.rotation['y'] + 1.57,
            direction: 1,
            kubeEdgeSelector: function() {kube.selectTop()},
            kubeEdgeUpdateSelector: function() {kube.updateTop()}
        },
        topInverse: {
            axis: 'y',
            position: kube.selectionGroup.rotation['y'] - 1.57,
            direction: -1,
            kubeEdgeSelector: function() {kube.selectTop()},
            kubeEdgeUpdateSelector: function() {kube.updateTopInverse()}
        },
        bottom: {
            axis: 'y',
            position: kube.selectionGroup.rotation['y'] + 1.57,
            direction: 1,
            kubeEdgeSelector: function() {kube.selectBottom()},
            kubeEdgeUpdateSelector: function() {kube.updateBottom()}
        },
        bottomInverse: {
            axis: 'y',
            position: kube.selectionGroup.rotation['y'] - 1.57,
            direction: -1,
            kubeEdgeSelector: function() {kube.selectBottom()},
            kubeEdgeUpdateSelector: function() {kube.updateBottomInverse()}
        }
    };

    this.isInverseOf = function(anotherRotation) {

        if (anotherRotation.name == this.name + 'Inverse' ||
            (
                this.name != anotherRotation.name &&
                anotherRotation.name == this.name.replace('Inverse', '')
            )
        ) {
            return true;
        }
        return false;
    };
    this.selectKubeSide = function() {
        this.settings[this.name].kubeEdgeSelector();
    };

    this.updateKubeSide = function() {
        this.settings[this.name].kubeEdgeUpdateSelector();
    };

    this.isFinished = false;

    this.checkRotated = function() {
        var settings = this.settings[this.name];

        if (settings.direction == 1 &&
            this.kube.selectionGroup.rotation[settings.axis] >= settings.position) {
            return true;
        }

        if (settings.direction == -1 &&
            this.kube.selectionGroup.rotation[settings.axis] <= settings.position) {
            return true;
        }
        return false;
    };

    this.sideIsSelected = false;

    this.rotate = function() {
        if (!this.sideIsSelected) {
            rotation.selectKubeSide();
            this.sideIsSelected = true;
        }
        if (this.isFinished) {
            return;
        }
        var settings = this.settings[this.name];
        this.kube.selectionGroup.rotation[settings.axis] += settings.direction * step;
        if (this.checkRotated()) {
            this.kube.selectionGroup.rotation[settings.axis] = settings.position;
            this.updateKubeSide();
            resetMeshes(boxes);
            this.isFinished = true;
        }
    };



    return this;
}
