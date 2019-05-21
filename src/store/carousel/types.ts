export interface ICarouselState{
    pageIndex: number;
}

export const GO_FORWARD = 'GO_FORWARD';

interface IGoForwardAction {
    type: typeof GO_FORWARD;
}

export const GO_BACK = 'GO_BACK';

interface IGoBackAction {
    type: typeof GO_BACK
}

export const GO_HOME = 'GO_HOME';

interface IGoHomeAction {
    type: typeof GO_HOME
}

export type CarouselActionTypes = IGoForwardAction | IGoBackAction | IGoHomeAction;