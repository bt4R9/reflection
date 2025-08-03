export class Color {
  private _hex: number;

  private _cache_rgb?: number[];
  private _cache_rgb_string?: string;
  private _cache_hex_string?: string;

  constructor(hex: number) {
    this._hex = hex;
  }

  get rgb() {
    if (!this._cache_rgb) {
      const c = this._hex;

      this._cache_rgb = [
        (c >> 16) & 0xFF,
        (c >> 8) & 0xFF,
        c & 0xFF,
      ];
    }

    return this._cache_rgb;
  }

  get rgb_string() {
    if (!this._cache_rgb_string) {
      this._cache_rgb_string = 'rgb(' + this.rgb.join(',') + ')';
    }

    return this._cache_rgb_string;
  }

  get hex() {
    return this._hex;
  }

  get hex_string() {
    if (!this._cache_hex_string) {
      this._cache_hex_string = '#' + this.rgb.map(c => c.toString(16).padStart(2, '0')).join('');
    }

    return this._cache_hex_string;
  }
}