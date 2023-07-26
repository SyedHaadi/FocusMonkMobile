import { GET_ROAD_MAP } from './RoadMapActions';

initialState = {
    roadMap: []
};

export const roadMapReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ROAD_MAP:
            return {
                ...state,
                roadMap: action.payload,
            };

        default:
            return state;
    }
};

export default roadMapReducer;
