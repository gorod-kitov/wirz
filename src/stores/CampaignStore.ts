import { types, flow } from 'mobx-state-tree';
import { CampaignService } from 'services';
import { Metrics1, Metrics2 } from './models';
import { ICampaignStore } from './interfaces';

const CampaignStore = types
	.model({
		campaignIdToView: types.optional(types.maybeNull(types.number), null),
		dateFrom: types.optional(types.string, ''),
		dateTo: types.optional(types.string, ''),
		metrics1: types.optional(types.maybeNull(Metrics1), null),
		metrics2: types.optional(types.array(Metrics2), [])
	})
	.actions((self: ICampaignStore & any) => ({
		setCampaignIdToView(value: number) {
			self.campaignIdToView = value;
			self.loadMetrics1();
			self.loadMetrics2();
		},
		setDateFrom(value: string) {
			self.dateFrom = value;
			self.loadMetrics1();
			self.loadMetrics2();
		},
		setDateTo(value: string) {
			self.dateTo = value;
			self.loadMetrics1();
			self.loadMetrics2();
		},
		loadMetrics1: flow(function* () {
			if (self.campaignIdToView && self.dateFrom && self.dateTo) {
				try {
					self.metrics1 = yield CampaignService.getMetrics1(self.campaignIdToView, {
						date_from: self.dateFrom,
						date_to: self.dateTo
					});
				} catch (err) {
					console.error(err);
				}
			}
		}),
		loadMetrics2: flow(function* () {
			if (self.campaignIdToView && self.dateFrom && self.dateTo) {
				try {
					self.metrics2 = yield CampaignService.getMetrics2(self.campaignIdToView, {
						date_from: self.dateFrom,
						date_to: self.dateTo
					});
				} catch (err) {
					console.error(err);
				}
			}
		}),
	}))

export default CampaignStore.create();