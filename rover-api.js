let rover = require('./rover.json');

const moveXY = (isX, isIncrement) => {
  if (isX === 'X') {
    if (isIncrement === 'increment') {
      rover = {
        "x": rover.x + 1,
        "y": rover.y,
        "direction": rover.direction
      };
    } else {
      rover = {
        "x": rover.x - 1,
        "y": rover.y,
        "direction": rover.direction
      };
    }
  } else {
    if (isIncrement === 'increment') {
      rover = {
        "x": rover.x,
        "y": rover.y + 1,
        "direction": rover.direction
      };
    } else {
      rover = {
        "x": rover.x,
        "y": rover.y - 1,
        "direction": rover.direction
      };
    }
  }
}

const moveRoverForwardBackward = (d) => {
  switch (rover.direction) {
    case 'NORTH':
      if (d === 'F') {
        moveXY('Y', 'increment');
      } else {
        moveXY('Y', 'decrement');
      }
      break;
    case 'SOUTH':
      if (d === 'F') {
        moveXY('Y', 'decrement');
      } else {
        moveXY('Y', 'increment');
      }
      break;
    case 'EAST':
      if (d === 'F') {
        moveXY('X', 'increment');
      } else {
        moveXY('X', 'decrement');
      }
      break;
    case 'WEST':
      if (d === 'F') {
        moveXY('X', 'decrement');
      } else {
        moveXY('X', 'increment');
      }
      break;
  }
}

const moveRoverLeftRight = (x) => {
  switch (rover.direction) {
    case 'NORTH':
      if (x === 'L') {
        rover = {
          "x": rover.x,
          "y": rover.y,
          "direction": 'WEST'
        };
      }
      else {
        rover = {
          "x": rover.x,
          "y": rover.y,
          "direction": 'EAST'
        };
      }
      break;
    case 'SOUTH':
      if (x === 'L') {
        rover = {
          "x": rover.x,
          "y": rover.y,
          "direction": 'EAST'
        };
      }
      else {
        rover = {
          "x": rover.x,
          "y": rover.y,
          "direction": 'WEST'
        };
      }
      break;
    case 'EAST':
      if (x === 'L') {
        rover = {
          "x": rover.x,
          "y": rover.y,
          "direction": 'NORTH'
        };
      }
      else {
        rover = {
          "x": rover.x,
          "y": rover.y,
          "direction": 'SOUTH'
        };
      }
      break;
    case 'WEST':
      if (x === 'L') {
        rover = {
          "x": rover.x,
          "y": rover.y,
          "direction": 'SOUTH'
        };
      }
      else {
        rover = {
          "x": rover.x,
          "y": rover.y,
          "direction": 'NORTH'
        };
      }
      break;
  }
}

const createRover = (req, res) => {
  rover = req.body;
  res.send({
    success: true,
    message: 'Rover is set to initial position',
    data: rover
  });
}

const getRoverPosition = (req, res) => {
  res.send({
    success: true,
    message: 'Rover is set to initial position',
    data: rover
  });
}

const moveRover = (req, res) => {
  // Reading id from the URL
  const stringInput = req.body.input;
  const charArray = stringInput.split('');
  console.log(charArray);
  charArray.forEach(element => {
    switch (element) {
      case 'F':
        moveRoverForwardBackward('F');
        break;
      case 'B':
        moveRoverForwardBackward('B');
        break;
      case 'L':
        moveRoverLeftRight('L');
        break;
      case 'R':
        moveRoverLeftRight('R');
        break;
    }
  });
  res.send({
    success: true,
    message: 'Rover is Moved to desired position',
    data: rover
  });
  // switch 
};

module.exports = {
  createRover,
  moveRover,
  getRoverPosition
}