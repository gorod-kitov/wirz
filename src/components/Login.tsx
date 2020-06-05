import React, { useState, useEffect } from 'react';
import {
	TextField, FormControlLabel,
	Checkbox, Button, makeStyles
} from '@material-ui/core';
import AuthBg from 'assets/images/auth-login.png';
import RightArrow from '@material-ui/icons/ArrowRightAlt';
import MailIcon from '@material-ui/icons/Email';
import history from 'stores/history';
import { AuthService } from 'services';

const useStyles = makeStyles(() => ({
	textfield: {
		width: '100%',
		marginBottom: '15px',
	},
	buttonIcon: {
		marginLeft: '6px',
		fontSize: '20px'
	}
}));

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const [stayInSystemIsOn, setStayInSystemIsOn] = useState<boolean>(false);
	const classes = useStyles();

	useEffect(() => {
		setEmailError('');
	}, [email]);

	useEffect(() => {
		setPasswordError('');
	}, [password]);

	const validate = (): boolean => {
		setEmailError(email ? '' : 'Bitte geben Sie einen Benutzernamen ein.');
		setPasswordError(password ? '' : 'Bitte geben Sie Ihr Passwort ein.');
		return (email && password) ? true : false;
	}

	const handleKeyDown = (keyCode: number) => {
		if (keyCode === 13) {
			handleLogin();
		}
	}

	const handleLogin = () => {
		if (validate()) {
			const data = { email, password };
			AuthService.login(data)
				.then((res) => {
					if (!res.status) {
						AuthService.setUserToken(res.api_token);
						history.push('/dashboard');
					} else {
						setPasswordError(res.message);
					}
				})
				.catch((err) => {
					console.error(err);
				})
		}
	}

	return (
		<div
			className="auth__container"
			style={{
				background: `url(${AuthBg}) center / cover`
			}}
		>
			<a className="auth__container__contact" href="mailto:digital@wirz.ch">
				<MailIcon />
				<span>Kontakt</span>
			</a>
			<form className="auth__form">
				<div className="auth__form__title">WIRZ</div>
				<TextField
					variant="standard"
					value={email}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					label="Benutzername"
					className={classes.textfield}
					helperText={emailError}
					error={emailError ? true : false}
					onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e.keyCode)}
				/>
				<TextField
					variant="standard"
					type="password"
					value={password}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					label="Passwort"
					className={classes.textfield}
					helperText={passwordError}
					error={passwordError ? true : false}
					onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e.keyCode)}
				/>
				<div className="auth__form__actions">
					<FormControlLabel
						control={
							<Checkbox
								checked={stayInSystemIsOn}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStayInSystemIsOn(e.target.checked)}
								name="checkedB"
								color="primary"
							/>
						}
						label="Eingeloggt bleiben"
					/>
					<Button
						variant="outlined"
						onClick={() => handleLogin()}
					>
						Abschicken
						<RightArrow className={classes.buttonIcon} />
					</Button>
				</div>
			</form>
		</div>
	)
}

export default Login;