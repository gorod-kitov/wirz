import React, { useState, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { cast } from 'mobx-state-tree';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
	Card, CardContent
} from '@material-ui/core';
import { ICampaignStore } from 'stores/interfaces';
import dayjs from 'dayjs';

am4core.useTheme(am4themes_animated);

const assignColors = (colors: any[]) => {
	const amColors = [];
	for (var l = 0; l < colors.length; l++) {
		amColors.push(am4core.color(colors[l]));
	}
	return amColors;
}

interface Stores {
	campaign: ICampaignStore
}

const Perfomance: React.FC<any> = inject('campaign')(observer(({ campaign }: Stores) => {
	const [amChart, setAmChart] = useState<any>(null);

	const initChart = useCallback(() => {
		let chart = am4core.create("perfomanceChart", am4charts.XYChart);
		chart.paddingRight = 20;
		const chartColors = ["#4072EE", "#FD4B4B", "#FFB900", "#30CE54", "#FFC75F", "#F9F871"];
		chart.colors.list = assignColors(chartColors);

		// Add week axis
		var weekAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		weekAxis.dataFields.category = "week";
		weekAxis.title.text = "Woche";
		weekAxis.renderer.grid.template.location = 0;
		weekAxis.renderer.ticks.template.disabled = true;
		weekAxis.renderer.line.opacity = 0;
		weekAxis.renderer.grid.template.disabled = true;

		// Add value axis
		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.title.text = "Performance";
		// valueAxis.renderer.labels.template.disabled = true;
		valueAxis.min = 0;
		valueAxis.cursorTooltipEnabled = false;

		// Add series
		const seriesNames: string[] = ['Display', 'Native', 'Social', 'Search'];
		for (let i = 0; i < seriesNames.length; i++) {
			const series = chart.series.push(new am4charts.LineSeries());
			series.name = seriesNames[i];
			series.strokeWidth = 3;
			series.dataFields.valueY = `${seriesNames[i].toLowerCase()}Value`;
			series.dataFields.categoryX = "week";
			series.tensionX = 0.8;

			const bullet = series.bullets.push(new am4charts.CircleBullet());
			bullet.circle.fill = am4core.color("#fff");
			bullet.circle.strokeWidth = 3;

			const hoverState1 = bullet.states.create("hover");
			hoverState1.properties.scale = 1.7;
		}

		interface IMetric {
			date: string,
			name: string,
			value: number
		}

		let data: any = [];
		if (campaign.dateFrom && campaign.dateTo) {
			console.log('sd')
			let startDate = dayjs(campaign.dateFrom).valueOf();
			let endDate = dayjs(campaign.dateTo).valueOf();
			let currentDate = startDate;
			while (currentDate < endDate) {
				let metrics: any[] = [...campaign.metrics2.filter((item: IMetric) => dayjs(item.date).format('DD.MM') === dayjs(currentDate).format('DD.MM'))];
				let display = 0,
					native = 0,
					social = 0,
					search = 0;
				if (metrics.length) {
					[...metrics.filter((item: IMetric) => item.name === 'display')].forEach((item: IMetric) => {
						display += item.value;
					});
					[...metrics.filter((item: IMetric) => item.name === 'native')].forEach((item: IMetric) => {
						native += item.value;
					});
					[...metrics.filter((item: IMetric) => item.name === 'social')].forEach((item: IMetric) => {
						social += item.value;
					});
					[...metrics.filter((item: IMetric) => item.name === 'search')].forEach((item: IMetric) => {
						search += item.value;
					});
				}
				data.push({
					week: dayjs(currentDate).format('DD.MM'),
					displayValue: display,
					nativeValue: native,
					socialValue: social,
					searchValue: search
				});
				currentDate = dayjs(currentDate).add(1, 'day').valueOf();
			}
		}

		chart.data = data;

		// Add title
		var title = chart.titles.push(new am4core.Label());
		title.text = "Performance der ausgewählten Werbemittel";

		if (window.innerWidth > 600) {
			title.fontSize = 25;
			valueAxis.title.fontSize = 25;
			weekAxis.title.fontSize = 25;
		} else {
			title.fontSize = 12;
			valueAxis.title.fontSize = 12;
			weekAxis.title.fontSize = 12;
		}
		title.marginBottom = 15;

		// Add cursor
		chart.cursor = new am4charts.XYCursor();
		chart.cursor.fullWidthLineX = true;
		chart.cursor.xAxis = weekAxis;
		chart.cursor.lineX.strokeWidth = 0;
		chart.cursor.lineX.fill = am4core.color("#000");
		chart.cursor.lineX.fillOpacity = 0.1;
		chart.cursor.behavior = "none";
		// chart.cursor.behavior = "panXY";

		// Add legend
		chart.legend = new am4charts.Legend();

		// Add scrollbar
		chart.scrollbarX = new am4core.Scrollbar();
		chart.scrollbarX.parent = chart.bottomAxesContainer;

		return chart;
	}, [campaign.metrics2, campaign.dateFrom, campaign.dateTo])

	useEffect(() => {
		setAmChart(initChart());
	}, [campaign.campaignIdToView, campaign.metrics2.length, campaign.dateFrom, campaign.dateTo, initChart])

	return (
		<Card className="dashboard__perfomance">
			<CardContent>
				<div id="perfomanceChart" style={{ width: "100%", height: "500px" }} />
			</CardContent>
		</Card>
	)
}));

export default Perfomance;