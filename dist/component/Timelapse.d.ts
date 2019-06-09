/// <reference types="node" />
import { Component, RefObject } from 'react';
export interface ImageProps {
    src: string;
    alt: string;
}
interface TimelapseProps {
    width: number;
    height: number;
    images: ImageProps[];
    preloadedCallback: () => void;
    timelapseHandle: boolean | null;
    fps: number;
}
interface TimelapseStatus {
    loadStatusList: LoadStatus[];
    renderingIndex: number;
}
declare enum LoadStatus {
    Loading = 0,
    Loaded = 1
}
declare class Timelapse extends Component<TimelapseProps, TimelapseStatus> {
    images: HTMLImageElement[] | null;
    canvas: RefObject<HTMLCanvasElement>;
    intervalId: NodeJS.Timeout | null;
    fpsForMilisecond: number;
    constructor(props: TimelapseProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: TimelapseProps): void;
    imagePreLoader: (srcs: string[], cb: any) => HTMLImageElement[];
    enableTimelapse: () => void;
    disableTimelapse: () => void;
    drawCanvas: (index: number) => void;
    render(): JSX.Element;
}
export default Timelapse;
