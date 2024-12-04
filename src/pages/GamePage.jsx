import '../styles/global.scss';
import { Title } from '../components/atoms/Title/Title'
import { HistoryList } from '../components/molecules/HistoryList/HistoryList'
import { GameBoard } from '../components/organisms/GameBoard/GameBoard'

export const GamePage = () => {
    return (
        <div className='mainTitle'>
          <Title />
          <div className='page'>
            <HistoryList />
            <div className='game'>
              <GameBoard />
            </div>
          </div>
        </div>
      )
};