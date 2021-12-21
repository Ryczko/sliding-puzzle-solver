import '/styles/App.scss';

import image from '../static/images/image.png';
import { Board } from './components/Board';
import { BoardView } from './views/BoardView';
import { Solver } from './components/Solver';

const board = new Board(3, 3);
const boardView = new BoardView(board, 800, image);

new Solver(board, boardView);
