// src\pages\market\types\marketNews.d.ts
export interface NewsItem {
	seq: string;
	url: string;
	rtime: string;
	title: string;
	webrsid: string;
	type: number;
}

export interface NewsResponse {
	code: number;
	msg: string;
	time: number;
	data: NewsItem[];
	status_code: number;
	status_msg: string;
}
