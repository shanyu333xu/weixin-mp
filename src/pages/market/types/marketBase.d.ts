// 定义GainItem类型
interface GainItem {
	code: string;
	gain: number;
	gainPoint: number;
	gainSpeed: number;
	id: number;
	name: string;
	newPrice: number;
	suspend: boolean;
	total: number;
	yesterdayPrice: number;
}

// 定义ThreeIndexItem类型
interface ThreeIndexItem {
	suspend: boolean;
	total: number;
	code: string;
	yesterdayPrice: number;
	gainPoint: number;
	name: string;
	id: number;
	gainSpeed: number;
	newPrice: number;
	gain: number;
}

// 定义HeatItem类型
interface HeatItem {
	blockGain: number;
	blockName: string;
	blockid: string;
	sharesGain: number;
	sharesName: string;
	sharesid: string;
}

// 定义Result类型
export interface Result {
	jyr: string;
	resultListByGainDESC: string | Array<GainItem>;
	threeIndexList: string | Array<ThreeIndexItem>;
	szzs: number;
	maximumHeatInFiveDays: string | Array<HeatItem>;
	hotConcept: string | Array<HeatItem>;
	hotIndustry: string | Array<HeatItem>;
	resultListByTotal: string | Array<GainItem>;
	xdzs: number;
	resultListByGain: string | Array<GainItem>;
	resultListByGainSpeed: string | Array<GainItem>;
}
