import { Scheduler, PriorizedRequest } from "./scheduler";

console.log("Welcome to query scheduler demo.");

const controller = new Scheduler();

const simulateRequest = (level: number, internalId: string) => {
  const url = "https://reqres.in/api/users?delay=3";
  const callback = () => console.debug(`${internalId} terminée`);
  const request: PriorizedRequest = { url, level, callback, internalId };
  controller.addRequest(request);
};

console.info("On ajoute les requêtes initiales");
console.info("Une requête R1 avec une priorité haute");
simulateRequest(3, "R1");
console.info("Une requête R2 avec une priorité basse");
simulateRequest(1, "R2");
console.info("Une requête R3 avec une priorité moyenne");
simulateRequest(2, "R3");
console.info("Une requête R4 avec une priorité haute");
simulateRequest(3, "R4");
console.info("R5 avec une priorité très haute (donc supérieur à R4)");
simulateRequest(4, "R5");
console.info("R6 avec une priorité haute (égale à R4)");
simulateRequest(3, "R6");
