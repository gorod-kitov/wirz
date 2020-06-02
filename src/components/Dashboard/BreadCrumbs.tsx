import React from 'react';

interface IValue {
	link: string,
	title: string
}

interface Props {
	values: IValue[]
}

const BreadCrumbs: React.FC<Props> = ({ values }) => {
	return (
		<div className="dashboard__breadcrumbs">
			<ul>
				{
					values.map((value: IValue, idx: number) => (
						<li key={idx}>
							<a href={value.link}>{value.title}</a>
						</li>
					))
				}
			</ul>
		</div >
	)
}

export default BreadCrumbs;