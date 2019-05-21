import { ICarouselState, CarouselActionTypes } from "./types";

const initialState: ICarouselState = {
    pageIndex: 0
};

export function carouselReducer(state = initialState, action: CarouselActionTypes): ICarouselState {
    switch (action.type) {
        case 'GO_BACK':
            return {
                pageIndex: state.pageIndex - 1
            }
        case 'GO_FORWARD':
            return {
                pageIndex: state.pageIndex + 1
            }
        case 'GO_HOME':
            return {
                pageIndex: 0
            }
        default:
            return state;
    }
}