import { useEffect } from 'react'
import { useMatchDispatch } from '../../context/matches/context'
import { fetchMatches } from '../../context/matches/actions'
import ErrorBoundary from '../ErrorBoundary'
import { Suspense } from 'react'
import MatchList  from './MatchList'

const LiveMatch = () => {
  const dispatch = useMatchDispatch()

  useEffect(()=>{
    fetchMatches(dispatch)
  },[dispatch]);

  return (
    <div>
      <h1 className="text-gray-900 font-bold mb-2 mt-4 ml-2 text-2xl">Live Games</h1>
      <div className='mt-2 justify-between flex items-center w-full'>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <MatchList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default LiveMatch;