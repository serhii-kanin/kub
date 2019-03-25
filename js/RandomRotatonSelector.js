function RandomRotationSelector()
{

    var step = rotationSpeed;
    var createPossibleRotations = function() {
        return [
            new Rotation('left', kube, step),
            new Rotation('leftInverse', kube, step),
            new Rotation('right', kube, step),
            new Rotation('rightInverse', kube, step),
            new Rotation('top', kube, step),
            new Rotation('topInverse', kube, step),
            new Rotation('bottom', kube, step),
            new Rotation('front', kube, step),
            new Rotation('frontInverse', kube, step),
            new Rotation('back', kube, step)
        ];
    };

    var rotation;
    var rotations;
    var selectionSerialNumber = 0;

    var selectRotation = function() {
        var selectedRotation = Math.round(Math.random() * 100) % rotations.length;
        if (rotation &&
            (
                rotation.name == rotations[selectedRotation].name ||
                rotation.isInverseOf(rotations[selectedRotation])
            )
        ) {
            selectionSerialNumber++;
        } else {
            selectionSerialNumber = 0;
        }

        if (selectionSerialNumber > 0) {
            return selectRotation();
        }
        return selectedRotation;
    };

    this.getNextRotation = function() {
        rotations = createPossibleRotations();
        rotation = rotations[selectRotation()];
        return rotation;
    };

    return this;
}
