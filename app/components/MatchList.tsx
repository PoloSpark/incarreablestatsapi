import { MatchDetails } from '~/utils/types';
import { MatchItem } from './MatchItem';

export interface IAppProps {
  userPuuid: string;
  matchDetails: MatchDetails[];
}

export function MatchList({ userPuuid, matchDetails }: IAppProps) {
  console.log(matchDetails);
  return (
    <section>
      <h2>Match History</h2>
      <ul>
        {matchDetails.map((match) => (
          <li key={match.metadata.matchId}>
            <MatchItem userPuuid={userPuuid} matchDetails={match} />
          </li>
        ))}
      </ul>
    </section>
  );
}
