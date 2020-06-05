import React from 'react';
import {
	Avatar, makeStyles
} from '@material-ui/core';
import { ReactComponent as HeaderIcon } from 'assets/icons/dashboard-header-icon.svg';
import { AuthService } from 'services';

const useStyles = makeStyles(() => ({
	headerAvatar: {
		width: '60px',
		height: '60px',
		marginRight: '20px'
	}
}))

interface Props {
	userName: string
}

const Header: React.FC<Props> = ({
	userName
}) => {
	const classes = useStyles();

	const MenuButton = () => (
		<div className="dashboard__header__menu__btn">
			<span></span>
			<span></span>
			<span></span>
		</div>
	)

	const Section: React.FC<{ className?: string }> = (props) => (
		<section className={`dashboard__header__section${props.className ? ` ${props.className}` : ''}`}>
			{props.children}
		</section>
	)

	return (
		<div className="dashboard__header">
			<Section className="dashboard__header__logo">
				<MenuButton />
				<HeaderIcon />
			</Section>
			<div className="dashboard__header__title">REDAKTIONSPLATTFORM</div>
			<Section>
				<Avatar
					alt="logo"
					src={'https://i.vimeocdn.com/portrait/16787999_300x300'}
					className={classes.headerAvatar}
				/>
				<div className="dashboard__header__profile">
					<span>{userName}</span>
					<div
						className="dashboard__header__profile__logout"
						onClick={() => AuthService.clearUserTokenAndLogout()}
					>Logout</div>
				</div>
			</Section>
		</div>
	)
}

export default Header;