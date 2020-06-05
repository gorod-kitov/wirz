import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
	Card, CardContent,
	Table, TableHead, TableCell,
	TableRow, TableBody, TextField,
	Button, IconButton, makeStyles
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import { CampaignService } from 'services';
import dayjs from 'dayjs';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		padding: '20px',
		paddingBottom: '40px !important'
	},
	optionsContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonIcon: {
		marginLeft: '6px',
		fontSize: '20px',
	},
	saveButton: {
		marginTop: '40px',
	},
	setActiveCell: {
		width: '20%',
	},
	activeStatus: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%'
	},
	metricTitle: {
		fontSize: '18px'
	},
	metricInput: {
		width: '100%',
		fontSize: '16px'
	},
	tableHeadCell: {
		fontSize: '18px'
	}
}));

interface IMetric {
	title: string,
	value: number,
	setValue: (value: number) => void,
	isActive: boolean,
	setIsActive: (value: boolean) => void,
}

interface ICampaign {
	id: number,
	user_id: number,
	name: string
}

interface ICampaignData {
	id: number,
	name: string,
	display: number,
	social: number,
	native: number,
	search: number
}

interface Props {
	campaignList: ICampaign[] | undefined
}

const BasicMetricsForm: React.FC<Props> = ({
	campaignList
}) => {
	const [date, setDate] = useState<any>(new Date());
	const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
	const [formMessage, setFormMessage] = useState<{ value: string, error: boolean }>({ value: '', error: false });
	const classes = useStyles();

	useEffect(() => {
		if (campaignList?.length) {
			setCampaigns([
				...campaignList.map((campaign: ICampaign) => ({
					id: campaign.id,
					name: campaign.name,
					display: 0,
					social: 0,
					native: 0,
					search: 0,
				}))
			])
		}
	}, [campaignList]);

	const getSaveDisabled = () => {
		let disabled = false;
		return disabled;
	}

	const handleSave = () => {
		const data = {
			date: dayjs(date).format('YYYY-MM-DD 00:00:00'),
			campaigns
		}
		CampaignService.addMetrics2(data)
			.then((res) => {
				setFormMessage({
					value: res.message,
					error: res.status ? true : false
				});
				setTimeout(() => {
					setFormMessage({
						value: '',
						error: false
					})
				}, 3000);
			})
			.catch((err) => {
				console.error(err);
				setFormMessage({
					value: 'Server error.',
					error: true
				})
			})
	}

	return (
		<Card className="dashboard__metrics__form">
			<CardContent className={classes.container}>
				<div className={classes.optionsContainer}>
					<DatePicker date={date} onDateChange={setDate} locale={enGB}>
						{({ inputProps, focused }) => (
							<div className="date__picker">
								<input
									{...inputProps}
									className={'input' + (focused ? ' -focused' : '')}
									placeholder='Select date'
								/>
							</div>
						)}
					</DatePicker>
				</div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeadCell}>Name</TableCell>
							<TableCell className={classes.tableHeadCell}>Display</TableCell>
							<TableCell className={classes.tableHeadCell}>Social</TableCell>
							<TableCell className={classes.tableHeadCell}>Native</TableCell>
							<TableCell className={classes.tableHeadCell}>Search</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							campaigns.map((campaign: ICampaignData, idx: number) => (
								<TableRow key={idx}>
									<TableCell className={classes.metricTitle}>{campaign.name}</TableCell>
									<TableCell>
										<TextField
											value={campaign.display}
											className={classes.metricInput}
											variant="standard"
											label="ENR %"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												const value = e.target.value;
												setCampaigns(prevState => {
													const idx = prevState.findIndex((item) => item.id === campaign.id);
													if (idx !== -1) {
														prevState[idx].display = +value;
													}
													return [...prevState];
												})
											}}
										/>
									</TableCell>
									<TableCell>
										<TextField
											value={campaign.social}
											className={classes.metricInput}
											variant="standard"
											label="ENR %"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												const value = e.target.value;
												setCampaigns(prevState => {
													const idx = prevState.findIndex((item) => item.id === campaign.id);
													if (idx !== -1) {
														prevState[idx].social = +value;
													}
													return [...prevState];
												})
											}}
										/>
									</TableCell>
									<TableCell>
										<TextField
											value={campaign.native}
											className={classes.metricInput}
											variant="standard"
											label="ENR %"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												const value = e.target.value;
												setCampaigns(prevState => {
													const idx = prevState.findIndex((item) => item.id === campaign.id);
													if (idx !== -1) {
														prevState[idx].native = +value;
													}
													return [...prevState];
												})
											}}
										/>
									</TableCell>
									<TableCell>
										<TextField
											value={campaign.search}
											className={classes.metricInput}
											variant="standard"
											label="ENR %"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												const value = e.target.value;
												setCampaigns(prevState => {
													const idx = prevState.findIndex((item) => item.id === campaign.id);
													if (idx !== -1) {
														prevState[idx].search = +value;
													}
													return [...prevState];
												})
											}}
										/>
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
				<Button
					variant="outlined"
					className={classes.saveButton}
					onClick={() => handleSave()}
					disabled={getSaveDisabled()}
				>
					Publish
					<SaveIcon className={classes.buttonIcon} />
				</Button>
			</CardContent>
			{
				formMessage.value ?
					<Alert severity={formMessage.error ? "error" : "success"}>
						<AlertTitle>{formMessage.error ? 'Error' : 'Success'}</AlertTitle>
						{formMessage.value}
					</Alert> : null
			}
		</Card>
	)
}

export default BasicMetricsForm;


