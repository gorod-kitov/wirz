import React, { useState, useEffect } from 'react';
import {
	TextField
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { enGB } from 'date-fns/locale'
import { DateRangePicker } from 'react-nice-dates';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import { ICampaignStore } from 'stores/interfaces';
import dayjs from 'dayjs';

interface ICampaign {
	id: number,
	user_id: number,
	name: string
}

interface Props {
	campaignList: ICampaign[] | undefined,
	campaign: ICampaignStore
}

const Filters: React.FC<any> = inject('campaign')(observer(({
	campaignList,
	campaign
}: Props) => {
	const [campaignName, setCampaignName] = useState<string>('');
	const [startDate, setStartDate] = useState<any>(new Date())
	const [endDate, setEndDate] = useState<any>(new Date())

	useEffect(() => {
		if (campaignName && campaignList) {
			const campaignObj = campaignList.find((item) => item.name === campaignName)
			if (campaignObj) {
				campaign.setCampaignIdToView(campaignObj.id);
			}
		}
	}, [campaignName, campaignList, campaign]);

	useEffect(() => {
		campaign.setDateFrom(dayjs(startDate).format('YYYY-MM-DD 00:00:00'));
	}, [campaign, startDate]);

	useEffect(() => {
		campaign.setDateTo(dayjs(endDate).format('YYYY-MM-DD 23:59:59'));
	}, [campaign, endDate, startDate]);

	useEffect(() => {
		if (campaignList?.length) {
			setCampaignName(campaignList[0].name);
		}
	}, [campaignList])

	return (
		<div className="dashboard__filters">
			<Autocomplete
				value={campaignName}
				autoHighlight
				style={{ width: '200px' }}
				options={campaignList?.map((campaign: ICampaign) => campaign.name) || []}
				onChange={(event: any, newValue: string | null) => {
					if (newValue) {
						setCampaignName(newValue);
					}
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Campaign"
						variant="outlined"
					/>
				)}
			/>
			<DateRangePicker
				startDate={startDate}
				endDate={endDate}
				onStartDateChange={setStartDate}
				onEndDateChange={setEndDate}
				format='dd MMM yyyy'
				locale={enGB}
			>
				{({ startDateInputProps, endDateInputProps, focus }) => (
					<div className='date__picker'>
						<input
							{...startDateInputProps}
							className={'input' + (focus === startDate ? ' -focused' : '')}
							placeholder='Start date'
						/>
						<RightArrowIcon />
						<input
							{...endDateInputProps}
							className={'input' + (focus === endDate ? ' -focused' : '')}
							placeholder='End date'
						/>
					</div>
				)}
			</DateRangePicker>
			<div></div>
		</div>
	)
}));

export default Filters;