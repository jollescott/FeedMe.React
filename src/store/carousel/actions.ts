import { CarouselActionTypes } from "./types";

export function goForward() : CarouselActionTypes{
    return {
        'type': 'GO_FORWARD'
    }
}

export function goBack(): CarouselActionTypes{
    return {
        'type': 'GO_BACK'
    }
}

export function goHome(): CarouselActionTypes{
    return{
        'type': 'GO_HOME'
    }
}