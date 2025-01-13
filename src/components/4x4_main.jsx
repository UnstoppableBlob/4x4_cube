import React, { useState, useEffect } from 'react';

const RubiksCube = () => {
  const [rotateX, setRotateX] = useState(-25);
  const [rotateY, setRotateY] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const TRANSLATION_DISTANCE = '95px';

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotateY(prev => prev + deltaX * 0.5);
    setRotateX(prev => prev - deltaY * 0.5);

    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
   
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);


  const [cubeState, setCubeState] = useState([
 
    'W','W','W','W', 'W','W','W','W', 'W','W','W','W', 'W','W','W','W',
  
    'G','G','G','G', 'G','G','G','G', 'G','G','G','G', 'G','G','G','G',
   
    'R','R','R','R', 'R','R','R','R', 'R','R','R','R', 'R','R','R','R',
   
    'B','B','B','B', 'B','B','B','B', 'B','B','B','B', 'B','B','B','B',
    
    'O','O','O','O', 'O','O','O','O', 'O','O','O','O', 'O','O','O','O',
    
    'Y','Y','Y','Y', 'Y','Y','Y','Y', 'Y','Y','Y','Y', 'Y','Y','Y','Y'
  ]);

  const faces_template = [
 
    [[32,33,34,35], [36,37,38,39], [40,41,42,43], [44,45,46,47]],

    [[48,49,50,51], [52,53,54,55], [56,57,58,59], [60,61,62,63]],
  
    [[64,65,66,67], [68,69,70,71], [72,73,74,75], [76,77,78,79]],
    
    [[16,17,18,19], [20,21,22,23], [24,25,26,27], [28,29,30,31]],

    [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]],
   
    [[80,81,82,83], [84,85,86,87], [88,89,90,91], [92,93,94,95]]
  ];

  const getFaces = (cube) => {
    const faces = Array(6).fill().map(() => Array(4).fill().map(() => Array(4).fill('')));
   
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          faces[i][j][k] = cube[faces_template[i][j][k]];
        }
      }
    }
    return faces;
  };

  const faces = getFaces(cubeState);

  const turn_white = [
    [0, 3], [1,7],[2,11],[3,15],[7,14],[11,13],[15,12],[14,8],[13, 4], [12, 0], [8, 1], [4, 2], [5, 6], [6, 10], [10, 9], [9, 5],
    [48, 32], [49, 33], [50, 34], [51, 35], [64, 48], [65, 49], [66, 50], [67, 51], [16, 64], [17, 65], [18, 66], [19, 67], [32, 16], [33, 17], [34, 18], [35, 19],
  ];

  const turn_white_m = [
    [52, 36], [53, 37], [54, 38], [55, 39], [68, 52], [69, 53], [70, 54], [71, 55], [20, 68], [21, 69], [22, 70], [23, 71], [36, 20], [37, 21], [38, 22], [39, 23],
  ];

  const turn_yellow = [
    [80, 83], [81,87],[82,91],[83,95],[87,94],[91,93],[95,92],[94,88],[93, 84], [92, 80], [88, 81], [84, 82], [85, 86], [86, 90], [90, 89], [89, 84],
    [28, 44], [29, 45], [30, 46], [31, 47], [44, 60], [45, 61], [46, 62], [47, 63], [60, 76], [61, 77], [62, 78], [63, 79], [76, 28], [77, 29], [78, 30], [79, 31],   
  ];

  const turn_yellow_m = [
    [24, 40], [25, 41], [26, 42], [27, 43], [40, 56], [41, 57], [42, 58], [43, 59], [56, 72], [57, 73], [58, 74], [59, 75], [72, 24], [73, 25], [74, 26], [75, 27],
  ];

  const turn_green = [
    [16, 19], [17,23],[18,27],[19,31],[23,30],[27,29],[31,28],[30,24],[29, 20], [28, 16], [24, 17], [20, 18], [21, 22], [22, 26], [26, 25], [25, 21],
    [12, 44], [8, 40], [4, 36], [0, 32], [67, 12], [71, 8], [75, 4], [79, 0], [92, 67], [88, 71], [84, 75], [80, 79], [44, 92], [40, 88], [36, 84], [32, 80],
  ];

  const turn_green_m = [
    [13, 45], [9, 41], [5, 37], [1, 33], [66, 13], [70, 9], [74, 5], [78, 1], [93, 66], [89, 70], [85, 74], [81, 78], [45, 93], [41, 89], [37, 85], [33, 81],
  ];

  const turn_blue = [
    [48, 51], [49,55],[50,59],[51,63],[55,62],[59,61],[63,60],[62,56],[61, 52], [60, 48], [56, 49], [52, 50], [53, 54], [54, 58], [58, 57], [57, 53],
    [76, 83], [72, 87], [68, 91], [64, 95], [3, 76], [7, 72], [11, 68], [15, 64], [35, 3], [39, 7], [43, 11], [47, 15], [83, 35], [87, 39], [91, 43], [95, 47],
  ];

  const turn_blue_m = [
    [77, 82], [73, 86], [69, 90], [65, 94], [2, 77], [6, 73], [10, 69], [14, 65], [34, 2], [38, 6], [42, 10], [46, 14], [82, 34], [86, 38], [90, 42], [94, 46],
  ];

  const turn_red = [
    [32, 35], [33,39],[34,43],[35,47],[39,46],[43,45],[47,44],[46,40],[45, 36], [44, 32], [40, 33], [36, 34], [37, 38], [38, 42], [42, 41], [41, 37],
    [60, 80], [56, 81], [52, 82], [48, 83], [15, 60], [14, 56], [13, 52], [12, 48], [19, 15], [23, 14], [27, 13], [31, 12], [80, 19], [81, 23], [82, 27], [83, 31],
  ];

  const turn_red_m = [
    [87, 30], [86, 26], [85, 22], [84, 18], [30, 8], [26, 9], [22, 10], [18, 11], [8, 49], [9, 53], [10, 57], [11, 61], [49, 87], [53, 86], [57, 85], [61, 84],
  ];

  function doTurn(turnList, middleTurnList = null) {
    const newCube = [...cubeState];
    turnList.forEach(turn => {
      newCube[turn[1]] = cubeState[turn[0]];
    });
    if (middleTurnList) {
      middleTurnList.forEach(turn => {
        newCube[turn[1]] = cubeState[turn[0]];
      });
    }
    setCubeState(newCube);
  }

  const colorMap = {
    'R': '#DC2626',
    'B': '#2563EB', 
    'O': '#EA580C',
    'G': '#16A34A', 
    'W': '#FFFFFF', 
    'Y': '#FCD34D'  
  };

  const scrambleCube = async () => {
    const turns = [
      [turn_red, turn_red_m],
      [turn_blue, turn_blue_m],
      [turn_green, turn_green_m],
      [turn_white, turn_white_m],
      [turn_yellow, turn_yellow_m]
    ];
    const numMoves = 30;
    let currentCubeState = [...cubeState];
   
    for (let i = 0; i < numMoves; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const [turn, middleTurn] = turns[Math.floor(Math.random() * turns.length)];
      const shouldTurnMiddle = Math.random() < 0.5;
      const turnToApply = Math.random() < 0.5 ? turn : turn.map(([a, b]) => [b, a]);
      const middleTurnToApply = shouldTurnMiddle ?
        (Math.random() < 0.5 ? middleTurn : middleTurn.map(([a, b]) => [b, a])) :
        null;
     
      const newCubeState = [...currentCubeState];
      turnToApply.forEach(([a, b]) => {
        newCubeState[b] = currentCubeState[a];
      });
      if (middleTurnToApply) {
        middleTurnToApply.forEach(([a, b]) => {
          newCubeState[b] = currentCubeState[a];
        });
      }
     
      currentCubeState = newCubeState;
      setCubeState(newCubeState);
    }
  };

  const Face = ({ face, transform, zIndex }) => (
    <div
      className="absolute w-48 h-48 grid grid-cols-4 gap-1 p-1 bg-gray-800"
      style={{ transform, zIndex }}
    >
      {face.map((row, i) =>
        row.map((color, j) => (
          <div
            key={`${i}-${j}`}
            className="w-full h-full rounded-sm"
            style={{ backgroundColor: colorMap[color] }}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 pt-24">
      <div
        className="relative w-48 h-48 mb-24 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
      >
        <Face
          face={faces[0]}
          transform={`translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateY > -90 && rotateY < 90 ? 3 : 0}
        />
        <Face
          face={faces[1]}
          transform={`rotateY(90deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateY > 0 ? 3 : 0}
        />
        <Face
          face={faces[2]}
          transform={`rotateY(180deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateY > 90 || rotateY < -90 ? 3 : 0}
        />
        <Face
          face={faces[3]}
          transform={`rotateY(-90deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateY < 0 ? 3 : 0}
        />
        <Face
          face={faces[4]}
          transform={`rotateX(90deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateX < 0 ? 3 : 0}
        />
        <Face
          face={faces[5]}
          transform={`rotateX(-90deg) translateZ(${TRANSLATION_DISTANCE})`}
          zIndex={rotateX > 0 ? 3 : 0}
        />
      </div>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateY(prev => prev - 90)}
        >
          Rotate Left
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateY(prev => prev + 90)}
        >
          Rotate Right
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateX(prev => prev - 90)}
        >
          Rotate Up
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setRotateX(prev => prev + 90)}
        >
          Rotate Down
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center max-w-4xl">
        <button
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
          onClick={() => doTurn(turn_red)}
        >
          Red Face
        </button>
        <button
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
          onClick={() => doTurn(turn_red.map(([a, b]) => [b, a]))}
        >
          Red Face CCW
        </button>
        <button
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
          onClick={() => doTurn(turn_red, turn_red_m)}
        >
          Red Wide
        </button>
        <button
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
          onClick={() => doTurn(
            turn_red.map(([a, b]) => [b, a]),
            turn_red_m.map(([a, b]) => [b, a])
          )}
        >
          Red Wide CCW
        </button>
       
        <button
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
          onClick={() => doTurn(turn_blue)}
        >
          Blue Face
        </button>
        <button
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
          onClick={() => doTurn(turn_blue.map(([a, b]) => [b, a]))}
        >
          Blue Face CCW
        </button>
        <button
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
          onClick={() => doTurn(turn_blue, turn_blue_m)}
        >
          Blue Wide
        </button>
        <button
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
          onClick={() => doTurn(
            turn_blue.map(([a, b]) => [b, a]),
            turn_blue_m.map(([a, b]) => [b, a])
          )}
        >
          Blue Wide CCW
        </button>

        <button
          className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
          onClick={() => doTurn(turn_green)}
        >
          Green Face
        </button>
        <button
          className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
          onClick={() => doTurn(turn_green.map(([a, b]) => [b, a]))}
        >
          Green Face CCW
        </button>
        <button
          className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
          onClick={() => doTurn(turn_green, turn_green_m)}
        >
          Green Wide
        </button>
        <button
          className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
          onClick={() => doTurn(
            turn_green.map(([a, b]) => [b, a]),
            turn_green_m.map(([a, b]) => [b, a])
          )}
        >
          Green Wide CCW
        </button>

        <button
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 border border-gray-300"
          onClick={() => doTurn(turn_white)}
        >
          White Face
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 border border-gray-300"
          onClick={() => doTurn(turn_white.map(([a, b]) => [b, a]))}
        >
          White Face CCW
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 border border-gray-300"
          onClick={() => doTurn(turn_white, turn_white_m)}
        >
          White Wide
        </button>
        <button
          className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 border border-gray-300"
          onClick={() => doTurn(
            turn_white.map(([a, b]) => [b, a]),
            turn_white_m.map(([a, b]) => [b, a])
          )}
        >
          White Wide CCW
        </button>

        <button
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
          onClick={() => doTurn(turn_yellow)}
        >
          Yellow Face
        </button>
        <button
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
          onClick={() => doTurn(turn_yellow.map(([a, b]) => [b, a]))}
        >
          Yellow Face CCW
        </button>
        <button
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
          onClick={() => doTurn(turn_yellow, turn_yellow_m)}
        >
          Yellow Wide
        </button>
        <button
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
          onClick={() => doTurn(
            turn_yellow.map(([a, b]) => [b, a]),
            turn_yellow_m.map(([a, b]) => [b, a])
          )}
        >
          Yellow Wide CCW
        </button>

        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 w-full"
          onClick={scrambleCube}
        >
          Scramble
        </button>
      </div>
    </div>
  );
};

export default RubiksCube;
