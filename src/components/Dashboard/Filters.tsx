import React, { useState } from 'react';
import {
	MenuItem, TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Filters: React.FC = () => {
	const [campaign, setCampaign] = useState<string>('');


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
		</div>
	)
}

export default Filters;