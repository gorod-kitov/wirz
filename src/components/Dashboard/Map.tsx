import React, { useState, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4lang_de_CH from '@amcharts/amcharts4/lang/de_CH';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
	Card, CardContent
} from '@material-ui/core';

am4core.addLicense("CH203608774");
am4core.useTheme(am4themes_animated);

const Map: React.FC = () => {
	const [map, setMap] = useState<any>(null);

	const initMap = () => {
		const mapChart = am4core.create("mapChart", am4maps.MapChart);
		mapChart.language.locale = am4lang_de_CH;

		// Add zoom control
		mapChart.zoomControl = new am4maps.ZoomControl();

		mapChart.zoomControl.exportable = false;
		mapChart.zoomControl.align = "left";
		mapChart.zoomControl.valign = "top";
		mapChart.zoomControl.cursorOverStyle = am4core.MouseCursorStyle.pointer;

		mapChart.zoomControl.fontSize = 30;
		mapChart.zoomControl.fill = am4core.color("#FFFF01");
		mapChart.zoomControl.realFill = am4core.color("#FFFF02");
		mapChart.zoomControl.minusButton.height = 45;
		mapChart.zoomControl.minusButton.width = 45;
		mapChart.zoomControl.minusButton.background.fill = am4core.color("#FFF")

		mapChart.zoomControl.plusButton.height = 45;
		mapChart.zoomControl.plusButton.width = 45;
		mapChart.zoomControl.plusButton.background.fill = am4core.color("#FFF");

	}

	useEffect(() => {
		setMap(initMap());
	}, [])

	return (
		<Card className="dashboard__map">
			<CardContent>
				<div id="mapChart" />
			</CardContent>
		</Card>
	)
}

export default Map;