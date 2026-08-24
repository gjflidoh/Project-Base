// Ported from the REPORTS constant in Stockaz.dc.html.

import { CATALOG, type Product } from './catalog';

export interface ReportBar { label: string; frac: number; highlight?: boolean }
export interface ReportSplit { label: string; amount: number; color: string }
export interface ReportTop extends Product { units: number; revenue: string }
export interface ReportPeriodData {
  total: number;
  sub: string;
  bars: ReportBar[];
  split: ReportSplit[];
  top: ReportTop[];
}

function bars(rows: [string, number, boolean?][]): ReportBar[] {
  return rows.map(([label, frac, highlight]) => ({ label, frac, highlight }));
}
function split(rows: [string, number, string][]): ReportSplit[] {
  return rows.map(([label, amount, color]) => ({ label, amount, color }));
}
function top(rows: [number, number, string][]): ReportTop[] {
  return rows.map(([idx, units, revenue]) => ({ ...CATALOG[idx], units, revenue }));
}

export const REPORTS: Record<'Today' | 'Week' | 'Month', ReportPeriodData> = {
  Today: {
    total: 4820, sub: '63 transactions · avg K76',
    bars: bars([['M', 0.5], ['T', 0.62], ['W', 0.44], ['T', 0.71], ['F', 0.86], ['S', 0.93], ['S', 1, true]]),
    split: split([['Cash', 2340, '#957750'], ['Mobile Money', 2480, '#7C6340']]),
    top: top([[0, 34, 'K850'], [4, 96, 'K96'], [1, 21, 'K462'], [20, 4, 'K848'], [3, 18, 'K360']]),
  },
  Week: {
    total: 28640, sub: '412 transactions · avg K70',
    bars: bars([['W1', 0.78], ['W2', 0.62], ['W3', 0.9], ['W4', 1, true], ['W5', 0.4], ['W6', 0.55], ['W7', 0.68]]),
    split: split([['Cash', 13100, '#957750'], ['Mobile Money', 14340, '#7C6340'], ['Credit', 1200, '#9A8D7D']]),
    top: top([[20, 26, 'K5,512'], [0, 188, 'K4,700'], [21, 14, 'K3,164'], [11, 61, 'K2,318'], [3, 96, 'K1,920']]),
  },
  Month: {
    total: 112480, sub: '1,684 transactions · avg K67',
    bars: bars([['Apr', 0.55], ['May', 0.62], ['Jun', 0.7], ['Jul', 0.84], ['Aug', 1, true], ['Sep', 0], ['Oct', 0]]),
    split: split([['Cash', 48200, '#957750'], ['Mobile Money', 58900, '#7C6340'], ['Credit', 5380, '#9A8D7D']]),
    top: top([[27, 9, 'K24,750'], [33, 4, 'K16,400'], [20, 62, 'K13,144'], [0, 640, 'K16,000'], [26, 5, 'K10,500']]),
  },
};
