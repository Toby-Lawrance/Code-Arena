var scale = 100;
function toLocal(point) {
    var cv = document.querySelector("#gameCanvas");
    var height = cv.getAttribute("height");
    var width = cv.getAttribute("width");

    return new Point((point.x / width) * scale, (point.y / height) * scale);
}

function toWorld(point) {
    var canvas = document.querySelector("#gameCanvas");
    var height = canvas.getAttribute("height");
    var width = canvas.getAttribute("width");

    return new Point((point.x/scale)*width,(point.y/scale)*height);
}

var size = 10;

var crossV = new Path();
crossV.add(new Point(0, size));
crossV.add(new Point(0, -size));
var crossH = new Path();
crossH.add(new Point(size, 0));
crossH.add(new Point(-size, 0));

var cross = new Group();
cross.addChild(crossV);
cross.addChild(crossH);
cross.strokeColor = 'black';

//Following tank
var tank = {
    collection: new Group(),
    turret: new Path.Line({
        from: [0, 0],
        to: [0, -15],
        strokeColor: 'red',
        strokeWidth: 2
    }),
    body: new Path.Rectangle({
        from: [-10, 12.5],
        to: [10, -12.5],
        strokeColor: 'black'
    }),
    position: new Point(0, 0),
    turretRotation: 0,
    tankRotation: 0
};

tank.collection.addChild(tank.turret);
tank.collection.addChild(tank.body);

tank.position = toWorld({ x: 50, y: 50 });
tank.collection.position = tank.position;

var mouse = new Point(0,0);

function onMouseMove(event) {
    cross.position = event.point;
    mouse = toLocal(event.point);
    var tankLoc = toLocal(tank.collection.position);

    var relAngle = Math.atan2((mouse.y - tankLoc.y), (mouse.x - tankLoc.x));
    tank.turret.lastSegment.point = new Point(tank.position.x + 15*Math.cos(relAngle),tank.position.y + 15*Math.sin(relAngle));
    tank.turretRotation = relAngle;
}

function onFrame(event) {
    var tankLoc = toLocal(tank.collection.position);

    var relAngle = Math.atan2((mouse.y - tankLoc.y), (mouse.x - tankLoc.x)) - tank.tankRotation;
    console.log("Rel Angle: " + relAngle);
    if (relAngle > 0.1) {
        tank.body.rotate(5);
        tank.tankRotation += (5 * (Math.PI / 180)) % (2 * Math.PI);
    } else if (relAngle < -0.1) {
        tank.body.rotate(-5);
        tank.tankRotation -= (5 * (Math.PI / 180)) % (2 * Math.PI);
    }
    var movement = new Point(1 * Math.cos(tank.tankRotation), 1 * Math.sin(tank.tankRotation));
    tank.collection.translate(movement);
    tank.position = tank.position + movement;
}