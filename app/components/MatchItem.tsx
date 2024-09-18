import { MatchDetails } from '~/utils/types';

export interface IAppProps {
  userPuuid: string;
  matchDetails: MatchDetails;
}

export function MatchItem({ userPuuid, matchDetails }: IAppProps) {
  function isWinner() {
    const { participants } = matchDetails.info;
    const participant = participants.find(
      (participant) => participant.puuid === userPuuid
    );
    return participant?.win;
  }

  return (
    <article className={`${isWinner() ? 'bg-blue-500' : 'bg-red-500'} p-2`}>{`${
      matchDetails.metadata.matchId
    } - ${matchDetails.info.gameMode} - ${
      matchDetails.info.gameType
    } - ${isWinner()}`}</article>
  );
}
