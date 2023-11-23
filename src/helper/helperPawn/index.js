export function getPawnClassName({
  pawnId,
  activePawnId,
  pawnColor,
  isMaybePawn,
  job,
}) {
  let pawnClassName = `pawn  ${pawnColor}`;

  if (job === "queen") {
    pawnClassName += " queen";
  }

  if (activePawnId === pawnId) {
    pawnClassName += " active";
  } else if (isMaybePawn) {
    pawnClassName += " maybe";
  }

  return pawnClassName;
}
