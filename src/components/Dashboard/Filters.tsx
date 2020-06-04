import React, { useState } from 'react';
import {
	TextField
} from '@material-ui/core';
import { enGB } from 'date-fns/locale'
import { DateRangePicker } from 'react-nice-dates';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import 'react-nice-dates/build/style.css';

const Filters: React.FC = () => {
	const [campaign, setCampaign] = useState<string>('');
	const [startDate, setStartDate] = useState<any>()
	const [endDate, setEndDate] = useState<any>()

	return (
		<div className="dashboard__filters">
			<Autocomplete
				value={campaign}
				autoHighlight
				style={{ width: '200px' }}
				options={['Campaign 1', 'Campaign 2', 'Campaign 3']}
				onChange={(event: any, newValue: string | null) => {
					if (newValue) {
						setCampaign(newValue);
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
				minimumDate={new Date()}
				minimumLength={1}
				format='dd MMM yyyy'
				locale={enGB}
			>
				{({ startDateInputProps, endDateInputProps, focus }) => (
					<div className='date__range'>
						<input
							className={'input' + (focus === startDate ? ' -focused' : '')}
							{...startDateInputProps}
							placeholder='Start date'
						/>
						<RightArrowIcon />
						<input
							className={'input' + (focus === endDate ? ' -focused' : '')}
							{...endDateInputProps}
							placeholder='End date'
						/>
					</div>
				)}
			</DateRangePicker>
			<div></div>
		</div>
	)
}

export default Filters;