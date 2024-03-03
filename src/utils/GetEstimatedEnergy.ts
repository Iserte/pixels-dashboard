import { Account } from "@prisma/client";

export function GetEstimatedEnergy(account: Account) {
  const energyRecoveryPerHour = 20;
  const now = new Date();

  const timeSinceUpdate = (now.getTime() - account.energyUpdate.getTime()) / (1000 * 60 * 60);
  const recoveredEnergy = timeSinceUpdate * energyRecoveryPerHour;
  const estimateEnergy = Math.floor(account.energy + recoveredEnergy - 1);

  return Math.min(Math.max(estimateEnergy, 0), 1000);
}