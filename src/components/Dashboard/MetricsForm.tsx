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
	campaignAutocomplete: {
		width: '200px',
		marginLeft: '25px'
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
	activeIcon: {
		fontSize: '30px'
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

interface Props {
	campaignList: ICampaign[] | undefined
}

const MetricsForm: React.FC<Props> = ({
	campaignList
}) => {
	const [date, setDate] = useState<any>(new Date());
	const [campaign, setCampaign] = useState<string>('');
	const [totalReach, setTotalReach] = useState<number>(0);
	const [totalReachIsActive, setTotalReachIsActive] = useState<boolean>(true);
	const [clicks, setClicks] = useState<number>(0);
	const [clicksIsActive, setClicksIsActive] = useState<boolean>(true);
	const [adEngagement, setAdEngagement] = useState<number>(0);
	const [adEngagementIsActive, setAdEngagementIsActive] = useState<boolean>(true);
	const [pageEngagement, setPageEngagement] = useState<number>(0);
	const [pageEngagementIsActive, setPageEngagementIsActive] = useState<boolean>(true);
	const [activeLength, setActiveLength] = useState<number>(0);
	const [activeLengthIsActive, setActiveLengthIsActive] = useState<boolean>(true);
	const [clickouts, setClickouts] = useState<number>(0);
	const [clickoutsIsActive, setClickoutsIsActive] = useState<boolean>(true);
	const [sales, setSales] = useState<number>(0);
	const [salesIsActive, setSalesIsActive] = useState<boolean>(true);
	const [formMessage, setFormMessage] = useState<{ value: string, error: boolean }>({ value: '', error: false });
	const classes = useStyles();

	useEffect(() => {
		console.log(date);
	}, [date]);

	useEffect(() => {
		if (campaignList?.length) {
			setCampaign(campaignList[0].name);
		}
	}, [campaignList])


	const handleSave = () => {
		const data = {
			date: dayjs(date).format('YYYY-MM-DD 00:00:00'),
			campaign,
			totalReach,
			totalReachIsActive,
			clicks,
			clicksIsActive,
			adEngagement,
			adEngagementIsActive,
			pageEngagement,
			pageEngagementIsActive,
			activeLength,
			activeLengthIsActive,
			clickouts,
			clickoutsIsActive,
			sales,
			salesIsActive
		}
		CampaignService.addMetrics1(data)
			.then((res) => {
				setFormMessage({
					value: res.message,
					error: res.status ? true : false
				});
				setCampaign('');
				setTotalReach(0);
				setClicks(0);
				setAdEngagement(0);
				setPageEngagement(0);
				setActiveLength(0);
				setClickouts(0);
				setSales(0);
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
					<Autocomplete
						value={campaign}
						autoHighlight
						className={classes.campaignAutocomplete}
						options={campaignList?.map((campaign: ICampaign) => campaign.name) || []}
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
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>KPI</TableCell>
							<TableCell></TableCell>
							<TableCell className={classes.setActiveCell}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							[
								{
									title: 'Total Reach',
									value: totalReach,
									setValue: (value: number) => setTotalReach(value),
									isActive: totalReachIsActive,
									setIsActive: (value: boolean) => setTotalReachIsActive(value)
								},
								{
									title: 'Clicks',
									value: clicks,
									setValue: (value: number) => setClicks(value),
									isActive: clicksIsActive,
									setIsActive: (value: boolean) => setClicksIsActive(value)
								},
								{
									title: 'Ad Engagement',
									value: adEngagement,
									setValue: (value: number) => setAdEngagement(value),
									isActive: adEngagementIsActive,
									setIsActive: (value: boolean) => setAdEngagementIsActive(value)
								},
								{
									title: 'Page Engagement',
									value: pageEngagement,
									setValue: (value: number) => setPageEngagement(value),
									isActive: pageEngagementIsActive,
									setIsActive: (value: boolean) => setPageEngagementIsActive(value)
								},
								{
									title: 'Active Length',
									value: activeLength,
									setValue: (value: number) => setActiveLength(value),
									isActive: activeLengthIsActive,
									setIsActive: (value: boolean) => setActiveLengthIsActive(value)
								},
								{
									title: 'Clickouts',
									value: clickouts,
									setValue: (value: number) => setClickouts(value),
									isActive: clickoutsIsActive,
									setIsActive: (value: boolean) => setClickoutsIsActive(value)
								},
								{
									title: 'Sales',
									value: sales,
									setValue: (value: number) => setSales(value),
									isActive: salesIsActive,
									setIsActive: (value: boolean) => setSalesIsActive(value)
								},
							].map((metric: IMetric, idx: number) => (
								<TableRow key={idx}>
									<TableCell className={classes.metricTitle}>{metric.title}</TableCell>
									<TableCell>
										<TextField
											value={metric.value}
											className={classes.metricInput}
											variant="standard"
											label="Enter kpi"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => metric.setValue(+e.target.value)}
										/>
									</TableCell>
									<TableCell>
										{/* <div className={classes.activeStatus}>
											<IconButton edge="end" onClick={() => metric.setIsActive(!metric.isActive)}>
												{
													metric.isActive ? <VisibilityIcon className={classes.activeIcon} style={{ color: '#121212' }} />
														: <VisibilityOffIcon className={classes.activeIcon} />
												}
											</IconButton>
										</div> */}
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

export default MetricsForm;


