export interface StartTime {
  hour: number;
  minute: number;
}

export interface SelectedTime extends StartTime {
  isAddDay: boolean;
}
