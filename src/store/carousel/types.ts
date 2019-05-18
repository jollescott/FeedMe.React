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

export type CarouselActionTypes = IGoForwardAction | IGoBackAction;