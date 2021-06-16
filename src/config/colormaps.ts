import * as chroma from 'chroma-js';
import { InterpolationMode } from 'chroma-js';

/**
 * Convenience class for creating color maps.
 */
class ColorMap {

  static Grayscale = new ColorMap({
    stops: [ '#ffffff', '#000000' ],
    name: 'Grayscale',
  });

  static TrafficLight = new ColorMap({
    stops: [ '#ff0000', '#ffff00', '#00ff00' ],
    name: 'Traffic Light',
  });

  static RedBlue = new ColorMap({
    stops: [ '#ff0000', '#0000ff' ],
    name: 'Red-Blue',
  });

  static Flag = new ColorMap({
    stops: [ '#ff0000', '#ffffff', '#0000ff' ],
    name: 'Flag',
  });

  static Blurple = new ColorMap({
    stops: [ '#d732d7', '#587aee' ],
    name: 'Blurple',
  });

  static Jet = new ColorMap({
    stops: [ '#0024ae', '#0088d0', '#00ff00', '#ffff00', '#d732d7', '#d50000' ],
    name: 'Jet',
  });

  static Rainbow = new ColorMap({
    stops: [ '#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#d42dd4' ],
    name: 'Rainbow',
  });

  private _name: string = '';

  private _stops: string[] = [];

  private _colorSpace: InterpolationMode = 'rgb';

  private _domain: number[] = [ 0, 1 ];

  private constructor(params: { stops: string[], colorSpace?: InterpolationMode, domain?: number[], name?: string }) {
    this._name = params.name ? params.name : this._name;
    this._stops = params.stops ? params.stops : this._stops;
    this._colorSpace = params.colorSpace ? params.colorSpace : this._colorSpace;
    this._domain = params.domain ? params.domain : this._domain;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get domain(): number[] {
    return this._domain;
  }

  set domain(domain: number[]) {
    this._domain = domain;
  }

  get stops(): string[] {
    return this._stops;
  }

  set stops(stops: string[]) {
    this._stops = stops;
  }

  get colorSpace(): InterpolationMode {
    return this._colorSpace;
  }

  set colorSpace(colorSpace: InterpolationMode) {
    this._colorSpace = colorSpace;
  }

  getColor(value: number): string {
    const lo = Math.min(...this.domain);
    const hi = Math.max(...this.domain);
    const val = Math.min(hi, Math.max(lo, value));

    return chroma.scale(this._stops)
                 .domain(this._domain)
                 .mode(this._colorSpace)(val)
                 .hex();
  }

  getColorArray(count: number): string[] {
    return chroma.scale(this._stops)
                 .domain(this._domain)
                 .mode(this._colorSpace)
                 .colors(count);
  }

}

export const ColorMaps = [
  ColorMap.Grayscale,
  ColorMap.TrafficLight,
  ColorMap.Blurple,
  ColorMap.Flag,
  ColorMap.Jet,
  ColorMap.Rainbow,
  ColorMap.RedBlue
];
