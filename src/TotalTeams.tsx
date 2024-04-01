import { useState } from "react";

const TeamLKN = {
  WK: {
    LRohul: 9,
    QdeKock: 8.5,
    NPooran: 8.5,
  },
  BAT: {
    KMayers: 7.5,
    DPadikkal: 7.5,
    ATurner: 7,
    DHooda: 7,
    ABadoni: 6.5,
  },
  AR: {
    MStoinis: 8,
    KPandya: 7.5,
    DWilley: 7,
    KGowtham: 6.5,
    PMankad: 6,
    AKulkarni: 5,
  },
  BWL: {
    RBishnoi: 8,
    NaveenUlHaq: 7.5,
    AMishra: 7,
    SMavi: 7,
    SJoseph: 7,
    YThakur: 6.5,
    MKhan: 6.5,
    AKhan: 6,
    MSiddharth: 5.5,
    YSinghCharak: 5.5,
    MYadav: 5,
  },
};
const TeamPBKS = {
  WK: {
    JSharma: 7.5,
    PSingh: 7,
  },
  BAT: {
    SDhawan: 9,
    JBairstow: 8,
    RRossouw: 7,
    ATaide: 6.5,
    HSingh: 6,
    SSingh: 5.5,
    SSingh2: 5,
    ASharma: 4.5,
    VSingh: 4,
  },
  AR: {
    SCurran: 8.5,
    LLivingstone: 8,
    SRaza: 7.5,
    CWoakes: 7,
    RDhawan: 6.5,
  },
  BWL: {
    KRabada: 8.5,
    ASingh: 8.5,
    HPatel: 8,
    NEllis: 7.5,
    RChahar: 7,
    HBrar: 6.5,
    VKaverappa: 5.5,
    TThyagarajan: 5,
    PChoudhary: 4.5,
  },
};

type Player = {
  [key: string]: number;
};

type Team = {
  [key: string]: Player;
};

type TeamComposition = {
  [key: string]: number;
};

type TeamCredit = {
  [key: string]: number;
};

function calculateTeams(
  team1: Team,
  team2: Team,
  selectedPlayers: TeamComposition = { WK: 0, BAT: 0, AR: 0, BWL: 0 },
  selectedCredits: TeamCredit = { WK: 0, BAT: 0, AR: 0, BWL: 0 },
  totalPlayers: number = 0,
  totalTeams: number = 0
): number {
  const maxPlayersPerTeam = 11;
  const maxPlayersPerCategory = 8;
  const maxTotalCredits = 100;

  if (totalPlayers === maxPlayersPerTeam) {
    if (
      Object.values(selectedPlayers).every((val) => val > 0) &&
      Object.values(selectedPlayers).every(
        (val) => val <= maxPlayersPerCategory
      ) &&
      Object.values(selectedCredits).reduce((a, b) => a + b) <= maxTotalCredits
    ) {
      return totalTeams + 1;
    }
    return totalTeams;
  }

  for (let category in team1) {
    for (let player in team1[category]) {
      selectedPlayers[category]++;
      selectedCredits[category] += team1[category][player];
      totalTeams = calculateTeams(
        team1,
        team2,
        { ...selectedPlayers },
        { ...selectedCredits },
        totalPlayers + 1,
        totalTeams
      );
      selectedPlayers[category]--;
      selectedCredits[category] -= team1[category][player];
    }
  }

  for (let category in team2) {
    for (let player in team2[category]) {
      selectedPlayers[category]++;
      selectedCredits[category] += team2[category][player];
      totalTeams = calculateTeams(
        team1,
        team2,
        { ...selectedPlayers },
        { ...selectedCredits },
        totalPlayers + 1,
        totalTeams
      );
      selectedPlayers[category]--;
      selectedCredits[category] -= team2[category][player];
    }
  }

  return totalTeams;
}


const TotalTeams = () => {
  const [num, setNum] = useState<number>();

  function counter(): number {
    const totalTeams = calculateTeams(TeamLKN, TeamPBKS);
    setNum(totalTeams);

    return totalTeams;
  }

  return (
    <>
      <button
        onClick={() => {
          counter();
        }}
      >
        Total teams possible
      </button>
      <div>Total teams : {num}</div>
    </>
  );
};

export default TotalTeams;
