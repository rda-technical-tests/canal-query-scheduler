type PriorizedRequest = {
  internalId: string;
  url: string;
  level: number;
  callback: (response: Response) => void;
};

const Scheduler = class {
  private pendingRequests: Array<PriorizedRequest>;
  private runningRequests: Array<PriorizedRequest>;
  private actualRunningPriority: number;

  public constructor() {
    this.pendingRequests = [];
    this.runningRequests = [];
    this.actualRunningPriority = 0;
  }

  public addRequest = (request: PriorizedRequest) => {
    this.pendingRequests.push(request);
    this.run();
  };

  private executeRequest = (request: PriorizedRequest) => {
    fetch(request.url).then((response: Response) => {
      this.runningRequests = this.runningRequests.filter(
        (element) => element.internalId !== request.internalId
      );
      this.run();
      request.callback(response);
      this.logStatus();
    });
  };

  private logStatus = () => {
    console.log(
      `Actual priority : ${
        this.actualRunningPriority
      } - Pending : [${this.pendingRequests.map(
        (element) => element.internalId
      )}] - Running : [${this.runningRequests.map(
        (element) => element.internalId
      )}] `
    );
  };

  private async run() {
    let notRunForNow: Array<PriorizedRequest> = [];
    this.pendingRequests = this.pendingRequests.sort(
      (a, b) => b.level - a.level
    );
    this.pendingRequests.forEach((request) => {
      if (
        request.level >= this.actualRunningPriority ||
        this.runningRequests.length === 0
      ) {
        this.actualRunningPriority = request.level;
        this.runningRequests.push(request);
        this.executeRequest(request);
      } else {
        notRunForNow.push(request);
      }
    });
    this.pendingRequests = notRunForNow;
    this.logStatus();
  }
};

export { Scheduler, PriorizedRequest };
