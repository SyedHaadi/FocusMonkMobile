import { SET_SCHEDULE } from '../Schedule/ScheduleActions';

initialState = {
  schedule: [],
  emptySchedule: false
};

export const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action?.payload,
        emptySchedule: action?.payload?.length > 0 ? false : true
      };

    default:
      return state;
  }
};

export default scheduleReducer;
