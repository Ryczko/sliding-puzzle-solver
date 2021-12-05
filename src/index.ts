import '/styles/App.scss';

import image from '../static/images/image.png';
import { Board } from './components/Board';
import { BoardView } from './views/BoardView';

const board = new Board(4, 4);
new BoardView(board, 800, image);
