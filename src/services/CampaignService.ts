import ApiClient from 'helpers/ApiClient';

interface ICampaingMetricsData1 {
	date: string,
	campaign: string,
	totalReach: number,
	totalReachIsActive: boolean,
	clicks: number,
	clicksIsActive: boolean,
	adEngagement: number,
	adEngagementIsActive: boolean,
	pageEngagement: number,
	pageEngagementIsActive: boolean,
	activeLength: number,
	activeLengthIsActive: boolean,
	clickouts: number,
	clickoutsIsActive: boolean,
	sales: number,
	salesIsActive: boolean,
}

interface ICampaign {
	id: number,
	name: string,
	display: number,
	social: number,
	native: number,
	search: number
}

interface ICampaignMetricData2 {
	date: string,
	campaigns: ICampaign[]
}

export const CampaignService = {
	addMetrics1: (data: ICampaingMetricsData1) => {
		return ApiClient.post('/campaign/metrics1', data);
	},
	getMetrics1: (id: number, data: { date_from: string, date_to: string }) => {
		return ApiClient.get(`/campaign/${id}/metrics1`, data);
	},
	addMetrics2: (data: ICampaignMetricData2) => {
		return ApiClient.post('/campaign/metrics2', data);
	},
	getMetrics2: (id: number, data: { date_from: string, date_to: string }) => {
		return ApiClient.get(`/campaign/${id}/metrics2`, data);
	},
}  