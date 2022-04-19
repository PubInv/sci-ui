export interface SciPlotLine {
    color: string;
    width: number;
}

export interface SciPlotStyle {
    width: number;
    height: number;
}

export interface SciPlotDataSource {
    source: string;
    label: string;
    style: SciPlotLine;
}