export interface DeviceControlPayload {
  label: string;
  actions: Action[];
}

interface Action {
  deviceURL: string;
  commands: Command[];
}

interface Command {
  name: string | null;
  parameters?: string[] | number[] | boolean[];
}
